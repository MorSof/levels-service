import { Injectable } from '@nestjs/common';
import { Resource } from '../models/resource.model';
import { ResourcesProvider } from '../providers/resources-provider.service';
import { LevelResourcesGroups } from '../models/level-resources-groups.enum';
import { Level } from '../../levels/models/level.model';
import { Bar } from '../../levels/bar/models/bar.model';

@Injectable()
export class ResourcesService {
  constructor(private readonly resourcesProvider: ResourcesProvider) {}

  async createLevelResources(level: Level): Promise<Resource[]> {
    const resourcesToCreate: Resource[] = [];
    resourcesToCreate.push(
      ...this.addGroupIdPerBar(
        level.combo.bars,
        LevelResourcesGroups.COMBO_BAR_REWARDS,
      ),
    );
    resourcesToCreate.push(
      ...this.addGroupIdPerBar(level.goals, LevelResourcesGroups.GOALS_REWARDS),
    );
    return this.resourcesProvider.createResources(resourcesToCreate, level.id);
  }

  async getResourcesByLevelId(
    levelId: number,
    fulfillResourcesProbabilities: boolean,
  ): Promise<Resource[]> {
    return this.resourcesProvider.getResourcesByLevelId(
      levelId,
      fulfillResourcesProbabilities,
    );
  }

  private addGroupIdPerBar(
    bars: Bar[],
    levelResourcesGroups: LevelResourcesGroups,
  ): Resource[] {
    const resourcesToCreate: Resource[] = [];
    for (let i = 0; i < bars.length; i++) {
      const bar: Bar = bars[i];
      bar.resources.forEach(
        (resource) => (resource.groupId = `${levelResourcesGroups}-${i}`),
      );
      resourcesToCreate.push(...bar.resources);
    }
    return resourcesToCreate;
  }
}
