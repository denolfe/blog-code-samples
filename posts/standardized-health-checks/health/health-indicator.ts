import { ResourceHealth } from '../types/resource-health.type';

export abstract class HealthIndicator {
  abstract name: string;
  status: ResourceHealth = 'UNHEALTHY';
  details: string | undefined;

  abstract checkHealth(): Promise<void>;
}
