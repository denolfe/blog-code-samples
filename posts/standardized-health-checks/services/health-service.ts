import { HealthIndicator } from '../health/health-indicator';
import { ResourceHealth } from '../types/resource-health.type';

export class HealthService {
  private readonly checks: HealthIndicator[];
  public overallHealth: ResourceHealth = 'HEALTHY';

  constructor(checks: HealthIndicator[]) {
    this.checks = checks;
  }

  async getHealth(): Promise<HealthCheckResult> {
    await Promise.all(
      this.checks.map((check) => {
          return check.checkHealth();
        }
      )
    );

    // Return unhealthy if any dependency is unhealthy
    if (this.checks.some((item) => {
      return item.status === 'UNHEALTHY';
    })) {
      this.overallHealth = 'UNHEALTHY';
    } else {
      this.overallHealth = 'HEALTHY'
    }

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
