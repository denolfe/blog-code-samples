import { ResourceHealth } from '../types/resource-health.type';

export abstract class HealthIndicator {
  abstract name: string;
  status: ResourceHealth = 'UNHEALTHY';

  abstract checkHealth(): Promise<void>;
}
