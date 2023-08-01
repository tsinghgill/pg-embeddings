# Data Embedding Transformation Demo

This demo project takes health data from a SQL database, transforms a text field in each record to create an embedding using OpenAI, and then writes the result to a PostgreSQL database with the pgvector extension. pgvector is a PostgreSQL extension designed for vector similarity search, and it can also be used for storing embeddings.

## Prerequisites

- PostgreSQL
- pgvector extension
- OpenAI API key

## Set Up

### Source PostgreSQL Database

First, create a table in your PostgreSQL database to hold the health data:

```sql
CREATE TABLE health_data (
  id SERIAL PRIMARY KEY,
  patient_id INTEGER,
  health_info TEXT
);
```

Next, insert some sample records:

```sql
INSERT INTO health_data (patient_id, health_info) VALUES (1, 'Some health information for patient 1');
INSERT INTO health_data (patient_id, health_info) VALUES (2, 'Some health information for patient 2');
INSERT INTO health_data (patient_id, health_info) VALUES (3, 'Some health information for patient 3');
```

### Destination PostgreSQL Database with pgvector
Ensure that the pgvector extension is installed in your PostgreSQL instance. Enable the pgvector extension by running:

```sql
create extension vector;
```

Next, create a table to hold the health data and embeddings:

```sql
CREATE TABLE health_data (
  id SERIAL PRIMARY KEY,
  patient_id INTEGER,
  health_info TEXT,
  embedding vector(1536)
);
```