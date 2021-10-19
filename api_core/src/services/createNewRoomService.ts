import createHttpError from 'http-errors';
import { v4 as uuidv4 } from 'uuid';
import { UserModel } from '../config/db/mongodb/models';
import { IWall, IWallCalculated } from '../dtos';

interface IDataFromDB {
  id: string;
  name: string;
  walls: IWallCalculated[];
  totalInkCans:
    | {
        '0.5L': number;
        '2.5L': number;
        '3.6L': number;
        '18L': number;
      }
    | undefined;
}

const calculateWallInfos = (walls: IWall[]) => {
  const WallsCalculatedData: IWallCalculated[] = [];
  for (const wall of walls) {
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

  return WallsCalculatedData;
};

const verifyIfWallIsValid = (wall: IWallCalculated) => {
  // 1. Nenhuma parede pode ter menos de 1 metro nem mais de 15 metros
  if (wall.wallTotalArea < 1) {
    return {
      isValid: false,
      message: 'Nenhuma parede pode ter menos de 1 metro nem mais de 15 metros',
    };
  }
  if (wall.wallTotalArea > 15) {
    return {
      isValid: false,
      message: 'Nenhuma parede pode ter menos de 1 metro nem mais de 15 metros',
    };
  }

  if (
    wall.wallQtdDoors + wall.wallWindowsTotalArea - wall.wallTotalArea >
    wall.wallTotalArea / 2
  ) {
    return {
      isValid: false,
      message:
        'O total de área das portas e janelas deve ser no máximo 50% da área de parede.',
    };
  }
  // 3. A altura da parede deve ser, no mínimo, 30 centímetros maior que a altura da porta.
  // Cada janela possui as medidas: 2,00 x 1,20 mtos
  // Cada porta possui as medidas: 0,80 x 1,90
  // 1 metro = 100 centimetros
  if (wall.wallHeight - 30 > 1.9 * 100) {
    return {
      isValid: false,
      message:
        'A altura da parede deve ser, no mínimo, 30 centímetros maior que a altura da porta.',
    };
  }
  return { isValid: true };
};

const verifyInkCansToTotalArea = async (totalRoomInk: number) => {
  let totalRoomInkValue = totalRoomInk;
  const cans = {
    '0.5L': 0,
    '2.5L': 0,
    '3.6L': 0,
    '18L': 0,
  };
  while (totalRoomInkValue > 0) {
    if (totalRoomInkValue > 0 && totalRoomInkValue < 2) {
      while (totalRoomInkValue > 0) {
        cans['0.5L'] += 1;
        totalRoomInkValue -= 0.5;
      }
      return cans;
    }
    if (totalRoomInkValue < 2) {
      while (totalRoomInkValue >= 0.5) {
        cans['0.5L'] += 1;
        totalRoomInkValue -= 0.5;
      }
    }
    if (totalRoomInk > 2 && totalRoomInk < 10) {
      while (totalRoomInkValue >= 2.5) {
        cans['2.5L'] += 1;
        totalRoomInkValue -= 2.5;
      }
    }
    if (totalRoomInk > 10 && totalRoomInk < 14.4) {
      while (totalRoomInkValue >= 3.6) {
        cans['3.6L'] += 1;
        totalRoomInkValue -= 3.6;
      }
    }
    if (totalRoomInk > 14.4 && totalRoomInk < 18) {
      while (totalRoomInkValue >= 18) {
        cans['18L'] += 1;
        totalRoomInkValue -= 18;
      }
    }
  }
};

export const createNewRoomService = async (
  userId: string,
  roomName: string,
  data: IWall[]
) => {
  if (data.length !== 4) {
    throw new createHttpError.BadRequest(
      'Cada sala deve ser composta por quatro paredes'
    );
  }
  const userData = await UserModel.findOne({ id: userId });

  if (!userData) throw new createHttpError.InternalServerError();

  if (userData.rooms.length) {
    userData.rooms.forEach((room: IDataFromDB) => {
      if (room.name === roomName)
        throw new createHttpError.BadRequest(
          'O nome para o ambiente já está em uso'
        );
    });
  }
  const wallInfosCalculated = calculateWallInfos(data);
  let totalRoomInk = 0;
  for (const wall of wallInfosCalculated) {
    const isWallValid = verifyIfWallIsValid(wall);
    if (!isWallValid.isValid) {
      throw new createHttpError.BadRequest(isWallValid.message);
    }
    totalRoomInk += wall.wallTotalInkQtd;
  }
  const totalInkCans = await verifyInkCansToTotalArea(totalRoomInk);
  const id = uuidv4();
  const RoomInfos = {
    id,
    name: roomName,
    walls: wallInfosCalculated,
    totalInkCans,
  };
  userData.rooms.push(RoomInfos);
  await userData.save();
  return { success: true, message: 'sala criada com sucesso', data: RoomInfos };
};
