import { IWall, IWallCalculated } from '../dtos';

interface IData {
  walls: IWall[];
}

const calculateWallInfos = (walls: IData) => {
  const WallsCalculatedData: IWallCalculated[] = [];
  for (const wall of walls.walls) {
    // Cada janela possui as medidas: 2,00 x 1,20 mtos
    const DoorsArea = 2 * 1.2;
    // Cada porta possui as medidas: 0,80 x 1,90
    const WindowsArea = 0.8 * 1.9;
    const WallCalculatedData: IWallCalculated = {
      wallWidth: wall.wallWidth,
      wallHeight: wall.wallHeight,
      wallQtdDoors: wall.wallQtdDoors,
      wallQtdWindows: wall.wallQtdWindows,
      wallTotalArea: wall.wallWidth * wall.wallHeight,
      wallDoorsTotalArea: DoorsArea * wall.wallQtdDoors,
      wallWindowsTotalArea: WindowsArea * wall.wallQtdWindows,
      // Cada litro de tinta é capaz de pintar 5 metros quadrados.
      wallTotalInkQtd: (wall.wallWidth * wall.wallHeight) / 5,
    };
    WallsCalculatedData.push(WallCalculatedData);
  }
};

// const verifyIfWallIsValid = (wall: IWallCalculated) => {
// console.log(wall);
/**
 * TODO
 *
 * 1. Nenhuma parede pode ter menos de 1 metro nem mais de 15 metros
 * 2. O total de área das portas e janelas deve ser no máximo 50% da área de parede
 * 3. A altura da parede deve ser, no mínimo, 30 centímetros maior que a altura da porta.
 * 4. Cada janela possui as medidas: 2,00 x 1,20 mtos
 * 5. Cada porta possui as medidas: 0,80 x 1,90
 * 6. Cada litro de tinta é capaz de pintar 5 metros quadrados.
 * 7. Não considerar teto nem piso.
 * 8. As variações de tamanho das latas de tinta são:
 * - 0,5 L
 * - 2,5 L
 * - 3,6 L
 * - 18 L
 *
 */
// };

export const createNewRoomService = async (data: IData) => {
  calculateWallInfos(data);

  // for (const wall of data.walls) {
  // verifyIfWallIsValid(wall);
  // }
};
