import { programarCampania } from '../handlers/programarCampania';
import { createPool } from '../db/db';
import { mocked } from 'ts-jest/utils';

// Mock de createPool para evitar conexiones reales a la base de datos
jest.mock('../db/db', () => ({
  createPool: jest.fn(),
}));

describe('programarCampania', () => {
  it('debería programar una campaña correctamente', async () => {
    // Mock de createPool para devolver resultados simulados
    const mockExecute = jest.fn().mockResolvedValue([{}]);

    mocked(createPool).mockReturnValueOnce({
      execute: mockExecute,
    });

    // Simula el evento de la API Gateway con datos de campaña
    const event = {
      body: JSON.stringify({
        nombre: 'Campaña de prueba',
        idUsuario: 1,
        fechaHoraProgramacion: '2024-02-07T12:00:00.000Z',
        estado: 1,
      }),
    };

    // Llama al endpoint
    const result = await programarCampania(event);

    // Verifica el estado de la respuesta
    expect(result.statusCode).toBe(201);

    // Intenta analizar el cuerpo de la respuesta solo si hay un cuerpo
    if (result.body) {
      const parsedResult = JSON.parse(result.body);
      // Verifica el contenido del cuerpo si es necesario
      expect(parsedResult).toEqual({ mensaje: 'Campaña programada exitosamente' });
    }
  });

  it('debería manejar errores correctamente', async () => {
    // Mock de createPool para lanzar un error simulado
    mocked(createPool).mockReturnValueOnce({
      execute: jest.fn().mockRejectedValue(new Error('Error simulado')),
    });

    // Simula el evento de la API Gateway con datos de campaña
    const event = {
      body: JSON.stringify({
        nombre: 'Campaña de prueba',
        idUsuario: 1,
        fechaHoraProgramacion: '2024-02-07T12:00:00.000Z',
        estado: 1,
      }),
    };

    // Llama al endpoint y espera que devuelva un error 500
    const result = await programarCampania(event);
    expect(result.statusCode).toBe(500);

    // Intenta analizar el cuerpo de la respuesta solo si hay un cuerpo
    if (result.body) {
      const parsedResult = JSON.parse(result.body);
      // Verifica el contenido del cuerpo si es necesario
      // ... Puedes ajustar esto según el contenido esperado en caso de error
    }
  });
});
