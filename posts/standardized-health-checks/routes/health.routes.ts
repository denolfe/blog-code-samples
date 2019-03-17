import { SomeServiceCheck } from '../health/some-service.check';
import { HealthService } from '../services/health-service';
import { Router } from 'express';

const healthRoutes = Router();

healthRoutes.get('/health', async (req, res) => {
  const healthService = new HealthService(
    [
      new SomeServiceCheck(),
      // Add more checks here...
    ]
  );

  const healthResults = await healthService.getHealth();

  res.status(healthResults.status === 'HEALTHY' ? 200 : 503)
    .send({
      status: healthResults.status, dependencies: healthResults.results
    });
});

export { healthRoutes };
