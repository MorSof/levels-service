import { Inject, Injectable } from '@nestjs/common';
import { ResourcesProvider } from '../resources-provider.service';
import { Resource } from '../../models/resource.model';

@Injectable()
export class ResourcesMicroserviceProvider extends ResourcesProvider {
  constructor(
    @Inject('RESOURCES_BASE_URL') private readonly RESOURCES_BASE_URL: string,
  ) {
    super();
  }

  async createResources(
    resource: Resource[],
    levelId: number,
  ): Promise<Resource[]> {
    console.log(this.RESOURCES_BASE_URL)
    return undefined;
  }

  async getResourcesByLevelId(levelId: number): Promise<Resource[]> {
    return undefined;
  }
}
