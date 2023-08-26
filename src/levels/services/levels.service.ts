import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Level } from '../models/level.model';
import { LevelsEntityConverter } from './levels-entity.converter';
import { LevelEntity } from '../entities/level.entity';
import { BarsService } from '../../bars/services/bars.service';
import { Bar } from '../../bars/models/bar.model';
import { Combo } from '../combo/models/combo.model';
import { LevelBarsType } from '../../bars/models/level-bars.enum';

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

    return this.getLevelWithBars(level);
  }

  public async findOneByLevelOrder(order: number): Promise<Level> {
    const levelEntity: LevelEntity = await this.levelsRepository.findOneBy({
      order,
    });
    if (levelEntity == null) {
      throw new NotFoundException(
        `The level with order ${order} does not exist.`,
      );
    }
    const level = this.levelsEntityConverter.toModel(levelEntity);

    return this.getLevelWithBars(level);
  }

  public async findAll(): Promise<Level[]> {
    const levelEntities: LevelEntity[] = await this.levelsRepository.find();
    return Promise.all(
      levelEntities?.map(
        async (levelEntity) =>
          await this.getLevelWithBars(
            this.levelsEntityConverter.toModel(levelEntity),
          ),
      ),
    );
  }

  public async create(level: Level): Promise<Level> {
    let levelEntity: LevelEntity = this.levelsEntityConverter.toEntity(level);
    await this.validateLevelDoesNotExists(levelEntity);

    levelEntity = await this.levelsRepository.save(levelEntity);

    const comboBarsPromise = this.barsService.createBars(
      levelEntity.id,
      LevelBarsType.COMBO,
      level.combo.bars,
    );
    const goalsBarsPromise = this.barsService.createBars(
      levelEntity.id,
      LevelBarsType.GOALS,
      level.goals,
    );

    const [comboBars, goalsBars] = await Promise.all([
      comboBarsPromise,
      goalsBarsPromise,
    ]);

    return this.loadBarsToLevel(level, comboBars, goalsBars);
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

  private async getLevelWithBars(level: Level): Promise<Level> {
    const comboBarsPromise = await this.barsService.fetchBars(
      level.id,
      LevelBarsType.COMBO,
    );
    const goalsBarsPromise = await this.barsService.fetchBars(
      level.id,
      LevelBarsType.GOALS,
    );
    const [comboBars, goalsBars] = await Promise.all([
      comboBarsPromise,
      goalsBarsPromise,
    ]);

    return this.loadBarsToLevel(level, comboBars, goalsBars);
  }

  private loadBarsToLevel(
    level: Level,
    comboBars: Bar[],
    goalsBars: Bar[],
  ): Level {
    level.combo = new Combo({ bars: comboBars });
    level.goals = goalsBars;
    return level;
  }

  private async validateLevelDoesNotExists(levelEntity: LevelEntity) {
    const entity = await this.levelsRepository.findOneBy({
      order: levelEntity.order,
    });
    if (entity) {
      throw new ConflictException(
        `level with order number ${levelEntity.order} is already exists`,
      );
    }
  }
}
