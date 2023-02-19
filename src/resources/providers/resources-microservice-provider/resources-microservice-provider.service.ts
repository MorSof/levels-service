import { Injectable } from '@nestjs/common';
import { ResourcesProvider } from '../resources-provider.service';
import { Resource } from '../../models/resource.model';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ResourcesMicroserviceProvider extends ResourcesProvider {
  constructor(private readonly configService: ConfigService) {
    super();
  }

  async createResources(
    resource: Resource[],
    levelId: number,
  ): Promise<Resource[]> {
    return undefined;
  }

  async getResourcesByLevelId(levelId: number): Promise<Resource[]> {
    return undefined;
  }
}
