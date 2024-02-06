import mysql, { Pool, Connection } from 'mysql2/promise';

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'aws_serverless',
};

export const createPool = (): Pool => {
  return mysql.createPool(dbConfig);
};

export const connectDB = async (): Promise<Connection> => {
  try {
    const pool = createPool();
    const connection = await pool.getConnection();
    return connection;
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    throw error; // Puedes manejar el error según tus necesidades
  }
};

export const closeConnection = (connection: Connection): void => {
  try {
    connection.release(); 
  } catch (error) {
    console.error('Error al cerrar la conexión a la base de datos:', error);
    // Puedes manejar el error según tus necesidades
  }
};
