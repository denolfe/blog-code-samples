import { HealthService } from '../services/health-service';
import { MockIndicator } from './mocks/mock-indicator';
import { MockToggleIndicator } from './mocks/mock-toggle-indicator';
import { ResourceHealth } from '../enums/resource-health.enum';

describe('Health Checks', () => {
  describe('Health Service', () => {
    it('should evaluate health - healthy', async () => {
      const service = new HealthService([
        new MockIndicator()
      ]);

      const result = await service.getHealth();

      expect(result.status).toEqual(ResourceHealth.HEALTHY);
      expect(result.results[0].status).toEqual(ResourceHealth.HEALTHY);
      expect(result.results[0].details).not.toBeDefined()
    });

    it('should evaluate health - unhealthy', async () => {
      const service = new HealthService([
        new MockIndicator(ResourceHealth.UNHEALTHY)
      ]);

      const result = await service.getHealth();

      expect(result.status).toEqual(ResourceHealth.UNHEALTHY);
      expect(result.results[0].status).toEqual(ResourceHealth.UNHEALTHY);
    });

    it('should evaluate unhealthy if mixed health dependencies', async () => {
      const service = new HealthService([
        new MockIndicator(),
        new MockIndicator(ResourceHealth.UNHEALTHY)
      ]);

      const result = await service.getHealth();

      expect(result.status).toEqual(ResourceHealth.UNHEALTHY);
      expect(result.results.filter((result) => result.status === ResourceHealth.HEALTHY).length).toBe(1);
      expect(result.results.filter((result) => result.status === ResourceHealth.UNHEALTHY).length).toBe(1);
    });

    it('should be able to return to healthy after being unhealthy', async () => {
      const service = new HealthService([
        new MockToggleIndicator(),
      ]);

      let result = await service.getHealth();
      expect(result.status).toEqual(ResourceHealth.UNHEALTHY);

      result = await service.getHealth();
      expect(result.status).toEqual(ResourceHealth.HEALTHY);
    });

    it('should return details when unhealthy', async () => {
      const unhealthyDetails = 'Unable to communicate to DB';
      const service = new HealthService([
        new MockIndicator(ResourceHealth.UNHEALTHY, unhealthyDetails),
      ]);

      let result = await service.getHealth();
      expect(result.status).toEqual(ResourceHealth.UNHEALTHY);
      expect(result.results[0].details).toEqual(unhealthyDetails);
    });
  });
});
