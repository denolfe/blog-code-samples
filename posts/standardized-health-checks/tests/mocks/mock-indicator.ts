import { HealthIndicator } from '../../health/health-indicator';
import { ResourceHealth } from '../../enums/resource-health.enum';

export class MockIndicator extends HealthIndicator {
  name = 'Mock Indicator';

  constructor(health?: ResourceHealth, details?: string) {
    super();
    this.status = health || ResourceHealth.Healthy;
    if (details) {
      this.details = details;
    }
  }

  checkHealth(): Promise<void> {
    return new Promise((resolve) => {
      resolve();
    });
  }
}
