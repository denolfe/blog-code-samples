import { HealthService } from '../services/health-service';
import { MockIndicator } from './mocks/mock-indicator';
import { MockToggleIndicator } from './mocks/mock-toggle-indicator';

describe('Health Checks', () => {
  describe('Health Service', () => {
    it('should evaluate health - healthy', async () => {
      const service = new HealthService([
        new MockIndicator()
      ]);

      const result = await service.getHealth();

      expect(result.status).toEqual('HEALTHY');
      expect(result.results[0].status).toEqual('HEALTHY');
      expect(result.results[0].details).not.toBeDefined()
    });

    it('should evaluate health - unhealthy', async () => {
      const service = new HealthService([
        new MockIndicator('UNHEALTHY')
      ]);

      const result = await service.getHealth();

      expect(result.status).toEqual('UNHEALTHY');
      expect(result.results[0].status).toEqual('UNHEALTHY');
    });

    it('should evaluate unhealthy if mixed health dependencies', async () => {
      const service = new HealthService([
        new MockIndicator(),
        new MockIndicator('UNHEALTHY')
      ]);

      const result = await service.getHealth();

      expect(result.status).toEqual('UNHEALTHY');
      expect(result.results.filter((result) => result.status === 'HEALTHY').length).toBe(1);
      expect(result.results.filter((result) => result.status === 'UNHEALTHY').length).toBe(1);
    });

    it('should be able to return to healthy after being unhealthy', async () => {
      const service = new HealthService([
        new MockToggleIndicator(),
      ]);

      let result = await service.getHealth();
      expect(result.status).toEqual('UNHEALTHY');

      result = await service.getHealth();
      expect(result.status).toEqual('HEALTHY');
    });

    it('should return details when unhealthy', async () => {
      const unhealthyDetails = 'Unable to communicate to DB';
      const service = new HealthService([
        new MockIndicator('UNHEALTHY', unhealthyDetails),
      ]);

      let result = await service.getHealth();
      expect(result.status).toEqual('UNHEALTHY');
      expect(result.results[0].details).toEqual(unhealthyDetails);
    });
  });
});
