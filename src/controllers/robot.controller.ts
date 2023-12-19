import { Controller, Post } from '@nestjs/common';
import { RobotService } from 'src/services/robot.service';

@Controller()
export class RobotController {
  constructor(private readonly robotService: RobotService) {}

  @Post('go')
  async go(): Promise<any> {
    return await this.robotService.go();
  }
}
