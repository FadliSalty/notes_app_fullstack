import mysql from "mysql2/promise";

export const db = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "notes_db",
});

export const testConnection = async () => {
  try {
    await db.connect();
    console.log("Database connected successfully!");
  } catch (err) {
    console.error("Database connection failed:", err.message);
  }
};
