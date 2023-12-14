import { Injectable } from '@nestjs/common';
import { TarpAPI } from 'src/apis/tarp.api';
import { TarasAPI } from 'src/apis/taras.api';
import { RobotDto } from 'src/dto/robot.dto';

@Injectable()
export class RobotService {
  constructor(
    private readonly tarasAPI: TarasAPI,
    private readonly tarpAPI: TarpAPI,
  ) {}

  async getRobots() {
    const robotsFromTarpServer = await this.tarpAPI.getRobots();
    const robotsFromTarasServer = await this.tarasAPI.getRobots();

    const robots: RobotDto[] = robotsFromTarpServer
      .concat(robotsFromTarasServer)
      .map((robot) => ({
        key: robot.key,
        name: robot.name,
        customData: robot.key + robot.name,
      }));

    return robots;
  }
}
