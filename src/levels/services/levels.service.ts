import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Level } from '../models/level.model';
import { LevelsEntityConverter } from './levels-entity.converter';
import { LevelEntity } from '../entities/level.entity';
import { BarsService } from '../../bars/services/bars.service';
import { Bar } from '../../bars/models/bar.model';
import { Combo } from '../combo/models/combo.model';

@Injectable()
export class LevelsService {
  constructor(
    @InjectRepository(LevelEntity)
    private readonly levelsRepository: Repository<LevelEntity>,
    private readonly levelsEntityConverter: LevelsEntityConverter,
    private readonly barsService: BarsService,
  ) {}

  public async findOneById(id: number): Promise<Level> {
    const levelEntity: LevelEntity = await this.levelsRepository.findOneBy({
      id,
    });
    if (levelEntity == null) {
      throw new NotFoundException('Level not found');
    }
    const level = this.levelsEntityConverter.toModel(levelEntity);

    // TODO - Fetch bars

    return level;
  }

  public async findOneByLevelOrder(order: number): Promise<Level> {
    const levelEntity: LevelEntity = await this.levelsRepository.findOneBy({
      order,
    });
    if (levelEntity == null) {
      throw new NotFoundException('Level not found');
    }
    const level = this.levelsEntityConverter.toModel(levelEntity);

    // TODO - Fetch bars

    return level;
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

    const comboBars: Bar[] = await this.barsService.createComboBars(
      levelEntity.id,
      level.combo.bars,
    );
    const goalsBars: Bar[] = await this.barsService.createGoalsBars(
      levelEntity.id,
      level.goals,
    );

    level = this.levelsEntityConverter.toModel(levelEntity);
    level.combo = new Combo({ bars: comboBars });
    level.goals = goalsBars;
    return level;
  }

  public async remove(id: number): Promise<void> {
    const levelEntity: LevelEntity = await this.levelsRepository.findOneBy({
      id,
    });
    if (levelEntity == null) {
      throw new NotFoundException('Level not found');
    }

    // TODO - Remove bars

    await this.levelsRepository.delete(id);
  }
}
