import { Controller, Get } from '@nestjs/common';
import { RobotService } from 'src/services/robot.service';

@Controller()
export class RobotController {
  constructor(private readonly robotService: RobotService) {}

  @Get('go')
  async go(): Promise<any> {
    return await this.robotService.go();
  }
}
