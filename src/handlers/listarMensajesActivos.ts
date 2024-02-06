// listarMensajesActivos.ts
import { APIGatewayProxyHandler } from 'aws-lambda';
import { createPool } from '../db/db';
import { RowDataPacket } from 'mysql2';
import { Mensaje } from '../models/Mensaje';

export const listarMensajesActivos: APIGatewayProxyHandler = async (event) => {
  try {
    const month = event.queryStringParameters?.mes;
    const clienteId = event.queryStringParameters?.cliente;

    // Validar parámetros de consulta
    if (!month || isNaN(Number(month))) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'El parámetro mes es inválido' }),
      };
    }

    const pool = createPool();

    let query = 'SELECT * FROM Mensaje WHERE MONTH(fechaHoraEnvio) = ?';
    const params = [month];

    // Agregar condición para el filtro por clienteId
    if (clienteId) {
      // Validar que clienteId sea un número
      if (isNaN(Number(clienteId))) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: 'El parámetro cliente es inválido' }),
        };
      }

      query += ' AND clienteId = ?';
      params.push(clienteId);
    }

    const [results] = await pool.execute<RowDataPacket[]>(query, params);

    // Mapear los resultados al modelo Mensaje
    const mensajes: Mensaje[] = results.map((result) => ({
      idMensaje: result.idMensaje,
      estadoEnvio: result.estadoEnvio,
      fechaHoraEnvio: new Date(result.fechaHoraEnvio),
      mensaje: result.mensaje,
    }));

    return {
      statusCode: 200,
      body: JSON.stringify(mensajes),
    };
  } catch (error) {
    console.error('Error al listar mensajes activos:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};
