const runEmbedding = require("./openai.js");

exports.App = class App {
  // Create a custom named function on the App to be applied to your records
  async transform(records) {
    for (const record of records) {

      // Call runEmbedding with the health_info
      const health_info = record.get("health_info");
      try {
        const embedding = await runEmbedding(health_info);
        record.set("embedding", embedding);
        console.log("embedding in file", embedding)
      } catch (error) {
        console.error("Error calling runEmbedding:", error);
      }
    }

    // Use records `unwrap` transform on CDC formatted records
    // Has no effect on other formats
    records.unwrap();

    return records;
  }

  async run(turbine) {

    let source = await turbine.resources("pg_db");

    let records = await source.records("health_data");

    let transformed = await turbine.process(records, this.transform);

    let destination = await turbine.resources("pg_db_vector");

    await destination.write(transformed, "health_data");
  }
};
