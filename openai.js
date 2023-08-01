require('dotenv').config();
const { Configuration, OpenAIApi } = require("openai");

async function runEmbedding(inputText) {
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });

    const openai = new OpenAIApi(configuration);

    const embeddingResponse = await openai.createEmbedding({
        model: 'text-embedding-ada-002',
        input: inputText,
    });

    const [{ embedding }] = embeddingResponse.data.data;

    return embedding
}

// Export the function
module.exports = runEmbedding;
