export class Configuracion {
    constructor(
      public nombre: string = '',
      public apellido: string = '',
      public rangoMaximo: number = 4,
      public intentos: number = 3
    ) {}
  }