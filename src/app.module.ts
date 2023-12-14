import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TarpAPI } from './apis/tarp.api';
import { TarasAPI } from './apis/taras.api';
import { RobotService } from './services/robot.service';
import { RobotController } from './controllers/robot.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [RobotController],
  providers: [RobotService, TarasAPI, TarpAPI],
})
export class AppModule {}
