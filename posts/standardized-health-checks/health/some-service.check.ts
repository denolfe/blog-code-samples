import axios, { AxiosResponse } from 'axios';
import { HealthIndicator } from './health-indicator';

export class SomeServiceCheck extends HealthIndicator {
  name: string = 'Some Service';

  async checkHealth(): Promise<void> {
    let result: AxiosResponse<any>;
    try {
      const pingURL = `http://localhost:8080/ping`;
      result = await axios(pingURL);

      this.status = result.status === 200 ? 'HEALTHY' : 'UNHEALTHY';
    } catch (e) {
      this.status = 'UNHEALTHY';
      console.log(`HEALTH: ${this.name} is unhealthy.`, e);
    }
  }
}
