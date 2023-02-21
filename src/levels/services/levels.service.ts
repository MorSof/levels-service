import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Level } from '../models/level.model';
import { LevelsEntityConverter } from './levels-entity.converter';
import { LevelEntity } from '../entities/level.entity';
import { ResourcesService } from '../../resources/services/resources.service';
import { LevelResourcesGroups } from '../../resources/models/level-resources-groups.enum';
import { Resource } from '../../resources/models/resource.model';

@Injectable()
export class LevelsService {
  constructor(
    @InjectRepository(LevelEntity)
    private readonly levelsRepository: Repository<LevelEntity>,
    private readonly levelsEntityConverter: LevelsEntityConverter,
    private readonly resourcesService: ResourcesService,
  ) {}

  public async findOne(id: number): Promise<Level> {
    const levelEntity: LevelEntity = await this.levelsRepository.findOneBy({
      id,
    });
    return this.levelsEntityConverter.toModel(levelEntity);
  }

  public async findAll(): Promise<Level[]> {
    const levelEntities: LevelEntity[] = await this.levelsRepository.find();
    return levelEntities?.map((levelEntity) =>
      this.levelsEntityConverter.toModel(levelEntity),
    );
  }

  public async create(level: Level): Promise<Level> {
    let levelEntity: LevelEntity = this.levelsEntityConverter.toEntity(level);
    levelEntity = await this.levelsRepository.save(levelEntity);
    level = this.levelsEntityConverter.toModel(levelEntity);

    const resourcesResponse: Resource[] =
      await this.resourcesService.createLevelResources(level);
    this.injectResourcesByGroups(resourcesResponse, level);
    return level;
  }

  public async update(id: number, level: Level): Promise<Level> {
    level.id = id;
    let levelEntity: LevelEntity = this.levelsEntityConverter.toEntity(level);
    levelEntity = await this.levelsRepository.save(levelEntity);
    return this.levelsEntityConverter.toModel(levelEntity);
  }

  public async remove(id: number): Promise<void> {
    await this.levelsRepository.delete({ id });
  }

  private injectResourcesByGroups(resources: Resource[], level: Level): void {
    for (const resource of resources) {
      if (resource.groupId) {
        const split = resource.groupId.split('-');
        if (split[0] == LevelResourcesGroups.COMBO_BAR_REWARDS) {
          level.combo.bars[split[1]].resources = resource;
        } else if (split[0] == LevelResourcesGroups.GOALS_REWARDS) {
          level.goals[split[1]].resources = resource;
        }
      }
    }
  }
}
