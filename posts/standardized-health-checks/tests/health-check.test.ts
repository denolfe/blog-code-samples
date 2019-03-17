import axios from 'axios';
import { HealthService } from '../services/health-service';
import { MockIndicator } from './mocks/mock-indicator';

describe('Health Checks', () => {
  it('should return healthy if all downstream dependencies are healthy', async () => {
    const result = await axios.get('http://localhost:8080/health');
    expect(result.status).toBe(200);
    expect(result.data.dependencies[0].status).toEqual('HEALTHY');
  });

  describe('Health Service', () => {
    it('should evaluate health - healthy', async () => {
      const service = new HealthService([
        new MockIndicator()
      ]);

      const result = await service.getHealth();

      expect(result.status).toEqual('HEALTHY');
      expect(result.results[0].status).toEqual('HEALTHY');
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
  });
});
