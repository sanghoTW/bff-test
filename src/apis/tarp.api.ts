import { AxiosError } from 'axios';
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TarpAPI {
  readonly endpoint: string = this.config.get('TARP_SERVER');
  readonly token: string = this.config.get('TARP_TOKEN');
  readonly query = {
    operationName: 'getRobots',
    query: 'query getRobots { robot { key name }}',
  };

  constructor(
    private readonly httpService: HttpService,
    private readonly config: ConfigService,
  ) {}

  async getRobots(): Promise<any> {
    const result = await firstValueFrom(
      this.httpService
        .post(this.endpoint, this.query, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .pipe(
          catchError((error: AxiosError) => {
            throw `TarpAPI getRobots error: ${error.message}`;
          }),
        ),
    );

    return result.data.data.robot;
  }
}
