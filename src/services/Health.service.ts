import { Service } from 'typedi';

@Service()
export class HealthService {
  public showStatus() {
    return 'healthy';
  }
}