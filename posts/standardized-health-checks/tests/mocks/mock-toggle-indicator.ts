import { HealthIndicator } from '../../health/health-indicator';
import { ResourceHealth } from '../../enums/resource-health.enum';

export class MockToggleIndicator extends HealthIndicator {
  name = 'Mock Toggle Indicator';

  constructor(health?: ResourceHealth) {
    super();
    this.status = health || ResourceHealth.Healthy;
  }

  checkHealth(): Promise<void> {
    this.status = this.status === ResourceHealth.Healthy
      ? ResourceHealth.Unhealthy
      : ResourceHealth.Healthy;

    return new Promise((resolve) => {
      resolve();
    });
  }
}
