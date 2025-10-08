import mysql from "mysql2/promise";

export const db = await mysql.createConnection({
  host: "sql12.freesqldatabase.com",
  user: "sql12801525",
  password: "sql12801525",
  database: "qhWA7lIhYH",
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0,
});

export const testConnection = async () => {
  try {
    await db.connect();
    console.log("Database connected successfully!");
  } catch (err) {
    console.error("Database connection failed:", err.message);
  }
};
