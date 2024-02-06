// models/Mensaje.ts
export interface Mensaje {
  idMensaje: number;
  estadoEnvio: number;
  fechaHoraEnvio: Date;
  mensaje: string;
  // Puedes agregar otras propiedades según tu esquema de base de datos
}
