import pg from "pg";

const { Pool } = pg;

const database = new Pool({
  connectionString: process.env.DATABASE_URL,
});

database.on("error", (error) => {
  console.error("PostgreSQL error:", error);
});

export default database;
