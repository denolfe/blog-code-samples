import { HealthIndicator } from '../../health/health-indicator';
import { ResourceHealth } from '../../types/resource-health.type';

export class MockToggleIndicator extends HealthIndicator {
  name = 'Mock Toggle Indicator';

  constructor(health?: ResourceHealth) {
    super();
    this.status = health || 'HEALTHY';
  }

  checkHealth(): Promise<void> {
    this.status = this.status === 'HEALTHY'
      ? 'UNHEALTHY'
      : 'HEALTHY';

    return new Promise((resolve) => {
      resolve();
    });
  }
}