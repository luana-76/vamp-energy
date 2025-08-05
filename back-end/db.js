// db.js
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString:"postgresql://logincadastrovamp_7q1s_user:tGzE7LGhgqPoO18stjxeKqDo2Q9Wr7Qt@dpg-d290at6r433s73c2dmu0-a.oregon-postgres.render.com/logincadastrovamp_7q1s",
  ssl: { rejectUnauthorized: false } // obrigatório para Render
});

export default pool;
