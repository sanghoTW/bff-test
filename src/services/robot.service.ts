import { Injectable } from '@nestjs/common';
import { RobotManager } from 'src/manager/robot.manager';

@Injectable()
export class RobotService {
  constructor(private readonly robotManager: RobotManager) {}

  async go() {
    return await this.robotManager.go({
      roadMapId: 'b35684f4-eee8-4b38-8c2e-87e05feea0ac',
      robotKey: 'mock-robot-2ddc39d7-dd8a-4b5c-803b-b70207805330',
      destinationId: 'c0fc26ce-af65-40c3-af4d-7a4df033f62e',
      callback: () => {
        console.log('>>>> callback function executed');
      },
    });
  }
}
