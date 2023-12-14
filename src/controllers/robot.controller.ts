import { Controller, Get } from '@nestjs/common';
import { RobotService } from 'src/services/robot.service';

@Controller()
export class RobotController {
  constructor(private readonly robotService: RobotService) {}

  @Get()
  async getRobots(): Promise<any> {
    const robots = await this.robotService.getRobots();
    return robots;
  }
}
