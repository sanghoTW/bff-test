import { Injectable } from '@nestjs/common';
import { TarpAPI } from 'src/apis/tarp.api';

@Injectable()
export class RobotManager {
  constructor(private readonly tarpAPI: TarpAPI) {}

  async go({
    roadMapId,
    robotKey,
    destinationId,
    callback,
  }: {
    roadMapId: string;
    robotKey?: string;
    destinationId: string;
    callback?: () => void;
  }) {
    // 미션 생성
    const {
      data: { createMission: createdMissionId },
    } = await this.tarpAPI.createMission({
      roadMapId,
      request: {
        robotKey,
        priority: 0,
        stops: [
          {
            stationCandidateIDs: [destinationId],
            passby: false,
            direction: null,
          },
        ],
        orderedStop: true,
      },
    });

    // 미션 구독
    await this.tarpAPI.subscribeMission(
      createdMissionId,
      async (data, resolve) => {
        const status = data.subscribeMission.missionStatus.status;

        console.log('>>>> created mission id: ', createdMissionId);
        console.log('>>>> created mission status : ', status);
        console.log('-------------------------------------------');

        if (status === 'WAITING') {
          // 미션 실행
          await this.tarpAPI.executeMission(createdMissionId);
        }

        if (status === 'FINISHED') {
          // 미션 종료
          await this.tarpAPI.terminateMission(createdMissionId);
        }

        if (status === 'TERMINATED') {
          // 미션 구독 종료
          resolve(createdMissionId);

          // 콜백 함수 실행
          callback?.();
        }
      },
    );

    return createdMissionId;
  }
}
