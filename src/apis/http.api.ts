import { AxiosError } from 'axios';
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class HttpAPI {
  constructor(
    protected readonly httpService: HttpService,
    protected readonly config: ConfigService,
    private readonly endpointKey: string,
    private readonly tokenKey: string,
  ) {}

  async fetchData(query: {
    operationName: string;
    query: string;
  }): Promise<any> {
    const endpoint = this.config.get(this.endpointKey);
    const token = this.config.get(this.tokenKey);
    const { operationName } = query;

    const result = await firstValueFrom(
      this.httpService
        .post(endpoint, query, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .pipe(
          catchError((error: AxiosError) => {
            throw `${operationName} error: ${error.message}`;
          }),
        ),
    );

    return result.data;
  }
}
