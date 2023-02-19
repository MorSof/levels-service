import { Injectable } from '@nestjs/common';
import { Resource } from '../models/resource.model';
import { ResourcesProvider } from '../providers/resources-provider.service';

@Injectable()
export class ResourcesService {
  constructor(private readonly resourcesProvider: ResourcesProvider) {}

  async create(resource: Resource[], levelId: number): Promise<Resource[]> {
    return this.resourcesProvider.createResources(resource, levelId);
  }

  async getResourcesByLevelId(levelId: number): Promise<Resource[]> {
    return this.resourcesProvider.getResourcesByLevelId(levelId);
  }
}
