import { WebSocket } from 'ws';
import { AxiosError } from 'axios';
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Client, createClient } from 'graphql-ws';
import { catchError, firstValueFrom } from 'rxjs';

interface Operation {
  query: string;
  variables: {
    missionId: string;
  };
}

@Injectable()
export class API {
  private wsClient: Client;

  constructor(
    protected readonly httpService: HttpService,
    protected readonly config: ConfigService,
    private readonly endpointKey: string,
    private readonly tokenKey: string,
  ) {
    this.setupWSClient();
  }

  setupWSClient() {
    this.wsClient = createClient({
      url: this.config.get(`WS_${this.endpointKey}`),
      connectionParams: {
        Authorization: `Bearer ${this.config.get(this.tokenKey)}`,
      },
      webSocketImpl: WebSocket,
    });
  }

  async subscribeData(
    operation: Operation,
    callback: (event: any, resolve: (value: unknown) => void) => void,
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      (async () => {
        const subscription = this.wsClient.iterate(operation);
        for await (const event of subscription) {
          const { data, errors } = event;
          if (data) {
            callback(data, resolve);
          }

          if (errors) {
            reject(errors);
          }
        }
      })();
    });
  }

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
