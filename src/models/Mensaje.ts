// models/Mensaje.ts
export interface Mensaje {
  idMensaje: number;
  estadoEnvio: number;
  fechaHoraEnvio: Date;
  mensaje: string;
}
