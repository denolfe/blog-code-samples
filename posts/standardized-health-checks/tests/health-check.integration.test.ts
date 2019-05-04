import axios from 'axios';
import { ResourceHealth } from '../enums/resource-health.enum';

// Service MUST be running!
describe('Health Checks - Integration', () => {
  it('should return healthy if all downstream dependencies are healthy', async () => {
    const result = await axios.get('http://localhost:8080/health');
    expect(result.status).toBe(200);
    expect(result.data.dependencies[0].status).toEqual(ResourceHealth.Healthy);
  });
});
