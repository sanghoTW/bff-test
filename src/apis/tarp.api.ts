import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { HttpAPI } from './http.api';

@Injectable()
export class TarpAPI extends HttpAPI {
  constructor(
    protected readonly httpService: HttpService,
    protected readonly config: ConfigService,
  ) {
    super(httpService, config, 'TARP_SERVER', 'TARP_TOKEN');
  }

  async getRobots(): Promise<any> {
    const query = {
      operationName: 'getRobots',
      query: 'query getRobots { robot { key name }}',
    };

    return this.fetchData(query);
  }
}
