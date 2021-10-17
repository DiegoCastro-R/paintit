export interface IWall {
  wallWidth: number;
  wallHeight: number; // A altura da parede deve ser, no mínimo, 30 centímetros maior que a altura da porta.
  wallQtdDoors: number; // Cada janela possui as medidas: 2,00 x 1,20 mtos
  wallQtdWindows: number; // Cada porta possui as medidas: 0,80 x 1,90
}

export interface IWallCalculated extends IWall {
  // Area em m² = width * height
  wallTotalArea: number; // Nenhuma parede pode ter menos de 1 metro nem mais de 15 metros
  wallDoorsTotalArea: number; // O total de área das portas e janelas deve ser no máximo 50% da área de parede
  wallWindowsTotalArea: number; // O total de área das portas e janelas deve ser no máximo 50% da área de parede
  // Lata de Tinta por m² = wallTotalArea / 5
  wallTotalInkQtd: number; // Cada litro de tinta é capaz de pintar 5 metros quadrados.
}
