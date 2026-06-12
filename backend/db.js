import { Pool } from "pg";
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "Dayployed",
  password: "8525",
  port: 5432,
});
export default pool;