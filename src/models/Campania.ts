// models/Campania.ts
export interface Campania {
  idCampania: number;
  nombre: string;
  idUsuario: number;
  fechaHoraProgramacion: Date;
  estado: number;
  // Puedes agregar otras propiedades según tu esquema de base de datos
}
