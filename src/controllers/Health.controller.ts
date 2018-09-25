import { Controller, Get } from "routing-controllers";
import { HealthService } from '../services/Health.service';

@Controller()
export class HealthController {

  constructor(
    private healthService: HealthService
  ) { }

  @Get("/health")
  getAll() {
    return this.healthService.showStatus();
  }

}