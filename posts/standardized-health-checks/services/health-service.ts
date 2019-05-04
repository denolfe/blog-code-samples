import { HealthIndicator } from '../health/health-indicator';
import { ResourceHealth } from '../enums/resource-health.enum';

export class HealthService {
  private readonly checks: HealthIndicator[];
  public overallHealth: ResourceHealth = ResourceHealth.Healthy;

  constructor(checks: HealthIndicator[]) {
    this.checks = checks;
  }

  async getHealth(): Promise<HealthCheckResult> {
    await Promise.all(
      this.checks.map(check => check.checkHealth())
    );

    const anyUnhealthy = this.checks.some(item =>
      item.status === ResourceHealth.Unhealthy
    );

    this.overallHealth = anyUnhealthy
      ? ResourceHealth.Unhealthy
      : ResourceHealth.Healthy;

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
