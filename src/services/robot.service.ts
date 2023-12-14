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
    const tarpResponse = await this.tarpAPI.getRobots();
    const tarasResponse = await this.tarasAPI.getRobots();

    const robots: RobotDto[] = tarpResponse.data.robot
      .concat(tarasResponse.data.robot)
      .map((robot) => ({
        key: robot.key,
        name: robot.name,
        customData: robot.key + robot.name,
      }));

    return robots;
  }
}
