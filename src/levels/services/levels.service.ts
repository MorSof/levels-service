import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Level } from '../models/level.model';
import { LevelsEntityConverter } from './levels-entity.converter';
import { LevelEntity } from '../entities/level.entity';
import { ResourcesService } from '../../resources/services/resources.service';

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
    return this.levelsEntityConverter.convertFrom(levelEntity);
  }

  public async findAll(): Promise<Level[]> {
    const levelEntities: LevelEntity[] = await this.levelsRepository.find();
    return levelEntities?.map((levelEntity) =>
      this.levelsEntityConverter.convertFrom(levelEntity),
    );
  }

  public async create(level: Level): Promise<Level> {
    for (const bar of level.combo.bars) {
      bar.rewards = await this.resourcesService.create(bar.rewards, level.id);
    }
    for (const goal of level.goals) {
      goal.rewards = await this.resourcesService.create(goal.rewards, level.id);
    }
    let levelEntity: LevelEntity = this.levelsEntityConverter.convertTo(level);
    levelEntity = await this.levelsRepository.save(levelEntity);
    return this.levelsEntityConverter.convertFrom(levelEntity);
  }

  public async createAll(levels: Level[]): Promise<Level[]> {
    let levelEntities: LevelEntity[] = levels?.map((level) =>
      this.levelsEntityConverter.convertTo(level),
    );
    levelEntities = await this.levelsRepository.save(levelEntities);
    return levelEntities?.map((levelEntity) =>
      this.levelsEntityConverter.convertFrom(levelEntity),
    );
  }

  public async update(id: number, level: Level): Promise<Level> {
    level.id = id;
    let levelEntity: LevelEntity = this.levelsEntityConverter.convertTo(level);
    levelEntity = await this.levelsRepository.save(levelEntity);
    return this.levelsEntityConverter.convertFrom(levelEntity);
  }

  public async remove(id: number): Promise<void> {
    await this.levelsRepository.delete({ id });
  }
}
