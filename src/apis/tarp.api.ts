import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { API } from './api';

@Injectable()
export class TarpAPI extends API {
  constructor(
    protected readonly httpService: HttpService,
    protected readonly config: ConfigService,
  ) {
    super(httpService, config, 'TARP_SERVER', 'TARP_TOKEN');
  }

  async createMission(variables): Promise<any> {
    const operation = {
      operationName: 'createMission',
      query:
        'mutation createMission($roadMapId: ID!, $request: CreateMissionInput!) { createMission(roadMapID: $roadMapId, request: $request) }',
      variables,
    };

    return this.fetchData(operation);
  }

  async executeMission(missionId: string): Promise<any> {
    const operation = {
      operationName: 'executeMission',
      query:
        'mutation executeMission($missionId: ID!) { executeMission(missionID: $missionId) }',
      variables: {
        missionId,
      },
    };

    return this.fetchData(operation);
  }

  async terminateMission(missionId: string): Promise<any> {
    const operation = {
      operationName: 'terminateMission',
      query:
        'mutation terminateMission($missionId: ID!) { terminateMission(missionID: $missionId) }',
      variables: {
        missionId,
      },
    };

    return this.fetchData(operation);
  }

  async subscribeMission(
    missionId: string,
    onUpdate: (event: any, resolve: (value: unknown) => void) => void,
  ): Promise<any> {
    const operation = {
      query:
        'subscription subscribeMission($missionId: ID!) { subscribeMission(missionID: $missionId) { missionStatus { status }}}',
      variables: {
        missionId,
      },
    };

    return this.subscribeData(operation, onUpdate);
  }
}
