import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TarpAPI } from './apis/tarp.api';
import { RobotService } from './services/robot.service';
import { RobotController } from './controllers/robot.controller';
import { ConfigModule } from '@nestjs/config';
import { RobotManager } from './manager/robot.manager';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [RobotController],
  providers: [TarpAPI, RobotService, RobotManager],
})
export class AppModule {}
