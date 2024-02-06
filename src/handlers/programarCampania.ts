import { APIGatewayProxyHandler } from 'aws-lambda';
import { createPool } from '../db/db';
import { Campania } from '../models/Campania'; 

export const programarCampania: APIGatewayProxyHandler = async (event) => {
  try {
    const { nombre, idUsuario, fechaHoraProgramacion, estado } = JSON.parse(event.body || '{}');

    // Validar y procesar los datos según tus necesidades
    if (!nombre || !idUsuario || !fechaHoraProgramacion || estado === undefined) {
      // Validación básica de campos obligatorios
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Faltan campos obligatorios' }),
      };
    }

    const nuevaCampania: Campania = {
      idCampania: 0, // Asume que la base de datos asignará el ID automáticamente
      nombre,
      idUsuario,
      fechaHoraProgramacion: new Date(fechaHoraProgramacion),
      estado,
    };

    const pool = createPool();

    const query = 'INSERT INTO campania (nombre, idUsuario, fechaHoraProgramacion, estado) VALUES (?, ?, ?, ?)';
    const params = [nuevaCampania.nombre, nuevaCampania.idUsuario, nuevaCampania.fechaHoraProgramacion, nuevaCampania.estado];

    await pool.execute(query, params);

    return {
      statusCode: 200,
      body: JSON.stringify({ mensaje: 'Campaña programada exitosamente' }),
    };
  } catch (error) {
    console.error('Error al programar campaña:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error interno del servidor' }),
    };
  }
};
