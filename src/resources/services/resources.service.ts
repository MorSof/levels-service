import { Injectable } from '@nestjs/common';
import { Resource } from '../models/resource.model';
import { ResourcesProvider } from '../providers/resources-provider.service';
import { Bar } from '../../levels/combo/bar/models/bar.model';
import { LevelResourcesGroups } from '../models/level-resources-groups.enum';
import { Goal } from '../../levels/goals/models/goal.model';
import { Level } from '../../levels/models/level.model';

@Injectable()
export class ResourcesService {
  constructor(private readonly resourcesProvider: ResourcesProvider) {}

  async createLevelResources(level: Level): Promise<Resource[]> {
    const resourcesToCreate: Resource[] = [];
    for (let i = 0; i < level.combo.bars.length; i++) {
      const bar: Bar = level.combo.bars[i];
      bar.resources.forEach(
        (resource) =>
          (resource.groupId = `${LevelResourcesGroups.COMBO_BAR_REWARDS}-${i}`),
      );
      resourcesToCreate.push(...bar.resources);
    }
    for (let i = 0; i < level.goals.length; i++) {
      const goal: Goal = level.goals[i];
      goal.resources.forEach(
        (resource) =>
          (resource.groupId = `${LevelResourcesGroups.GOALS_REWARDS}-${i}`),
      );
      resourcesToCreate.push(...goal.resources);
    }

    return this.resourcesProvider.createResources(resourcesToCreate, level.id);
  }

  async getResourcesByLevelId(levelId: number): Promise<Resource[]> {
    return this.resourcesProvider.getResourcesByLevelId(levelId);
  }
}
