import axios, { AxiosResponse } from 'axios';
import { HealthIndicator } from './health-indicator';

export class SomeServiceCheck extends HealthIndicator {
  name: string = 'Some Service';

  async checkHealth(): Promise<void> {
    let result: AxiosResponse<any>;
    try {
      const pingURL = `http://localhost:8080/ping`;
      result = await axios(pingURL);

      if (result.status === 200) {
        this.status = 'HEALTHY';
      } else {
        this.status = 'UNHEALTHY';
        this.details = `Received status: ${result.status}`;
      }
    } catch (e) {
      this.status = 'UNHEALTHY';
      this.details = e.message;
      console.log(`HEALTH: ${this.name} is unhealthy.`, e.message);
    }
  }
}
