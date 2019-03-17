import { HealthIndicator } from '../../health/health-indicator';
import { ResourceHealth } from '../../types/resource-health.type';

export class MockIndicator extends HealthIndicator {
  name = 'Mock Indicator';

  constructor(health?: ResourceHealth) {
    super();
    this.status = health || 'HEALTHY';
  }

  checkHealth(): Promise<void> {
    return new Promise((resolve) => {
      resolve();
    });
  }
}
