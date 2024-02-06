import { listarMensajesActivos } from '../handlers/listarMensajesActivos'; // ajusta la ruta según tu estructura de archivos
import { createPool } from '../db/db';
import { mocked } from 'ts-jest/utils';

// Mock de createPool para evitar conexiones reales a la base de datos
jest.mock('../db/db', () => ({
  createPool: jest.fn(),
}));

describe('listarMensajesActivos', () => {
  it('debería devolver mensajes correctamente', async () => {
    // Mock de createPool para devolver resultados simulados
    const mockExecute = jest.fn().mockResolvedValue([[/* resultados simulados aquí */]]);
    mocked(createPool).mockReturnValueOnce({
      execute: mockExecute,
    });

    // Simula el evento de la API Gateway
    const event = {
      queryStringParameters: {
        mes: '1',
        cliente: '1',
      },
    };

    // Llama al endpoint y espera que devuelva el resultado esperado
    const result = await listarMensajesActivos(event);
    const parsedResult = JSON.parse(result.body);
    expect(parsedResult).toEqual(/* resultado esperado */);
  });

  it('debería manejar errores correctamente', async () => {
    // Mock de createPool para lanzar un error simulado
    mocked(createPool).mockReturnValueOnce({
      execute: jest.fn().mockRejectedValue(new Error('Error simulado')),
    });

    // Simula el evento de la API Gateway
    const event = {
      queryStringParameters: {
        mes: '1',
        cliente: '1',
      },
    };

    // Llama al endpoint y espera que devuelva un error 500
    const result = await listarMensajesActivos(event);
    expect(result.statusCode).toBe(500);
  });
});
