import { Resource } from '../models/resource.model';

export abstract class ResourcesProvider {
  abstract createResources(
    resource: Resource[],
    levelId: number,
  ): Promise<Resource[]>;
  abstract getResourcesByLevelId(levelId: number): Promise<Resource[]>;
}
