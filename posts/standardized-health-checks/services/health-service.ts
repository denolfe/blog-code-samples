import { HealthIndicator } from '../health/health-indicator';
import { ResourceHealth } from '../enums/resource-health.enum';

export class HealthService {
  private readonly checks: HealthIndicator[];
  public overallHealth: ResourceHealth = ResourceHealth.HEALTHY;

  constructor(checks: HealthIndicator[]) {
    this.checks = checks;
  }

  async getHealth(): Promise<HealthCheckResult> {
    await Promise.all(
      this.checks.map(check => check.checkHealth())
    );

    const anyUnhealthy = this.checks.some(item =>
      item.status === ResourceHealth.UNHEALTHY
    );

    this.overallHealth = anyUnhealthy
      ? ResourceHealth.UNHEALTHY
      : ResourceHealth.HEALTHY;

    return {
      status: this.overallHealth,
      results: this.checks
    };
  }
}

type HealthCheckResult = {
  status: ResourceHealth,
  results: HealthIndicator[]
};
