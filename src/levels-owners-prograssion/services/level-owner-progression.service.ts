import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { LevelOwnerProgressionEntity } from '../entities/level-owner-progression.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { LevelOwnerProgressionEntityConverter } from './level-owner-progression-entity.converter';
import { LevelOwnerProgression } from '../models/level-owner-progression.model';
import { LevelsService } from 'src/levels/services/levels.service';

@Injectable()
export class LevelOwnerProgressionService {
  constructor(
    @InjectRepository(LevelOwnerProgressionEntity)
    private readonly repository: Repository<LevelOwnerProgressionEntity>,
    private readonly levelOwnerProgressionEntityConverter: LevelOwnerProgressionEntityConverter,
    private readonly levelsService: LevelsService,
  ) {}

  async create(
    progression: LevelOwnerProgression,
    overrideExisting = true,
  ): Promise<LevelOwnerProgression> {
    const level = await this.levelsService.findOneByLevelOrder(
      progression.levelOrder,
    );

    if (!level) {
      throw new NotFoundException(
        `The level with order ${progression.levelOrder} does not exist.`,
      );
    }

    let entity = await this.getOneProgression(progression);
    if (entity) {
      if (overrideExisting) {
        return await this.update(entity.id, progression);
      } else {
        throw new BadRequestException(
          'The combination of ownerId, ownerType, and levelOrder already exists.',
        );
      }
    }

    entity = this.levelOwnerProgressionEntityConverter.toEntity(
      progression,
      level,
    );

    const savedEntity = await this.repository.save(entity);
    return this.levelOwnerProgressionEntityConverter.toModel(savedEntity);
  }

  async update(
    id: number,
    updatedProgression: LevelOwnerProgression,
  ): Promise<LevelOwnerProgression | undefined> {
    const entity =
      this.levelOwnerProgressionEntityConverter.toEntity(updatedProgression);
    await this.repository.update(id, entity);
    return this.findById(id);
  }

  async findById(id: number): Promise<LevelOwnerProgression | undefined> {
    const entity = await this.repository.findOne({ where: { id } });
    if (entity) {
      return this.levelOwnerProgressionEntityConverter.toModel(entity);
    }
    return undefined;
  }

  async findAll(
    ownerId?: string,
    ownerType?: string,
  ): Promise<LevelOwnerProgression[]> {
    const queryBuilder = this.repository
      .createQueryBuilder('progression')
      .innerJoinAndSelect('progression.levelEntity', 'level');

    if (ownerId) {
      queryBuilder.andWhere('progression.ownerId = :ownerId', { ownerId });
    }

    if (ownerType) {
      queryBuilder.andWhere('progression.ownerType = :ownerType', {
        ownerType,
      });
    }

    queryBuilder.orderBy('level.order', 'ASC');

    const entities = await this.getAllProgression(ownerId, ownerType);
    return entities.map(this.levelOwnerProgressionEntityConverter.toModel);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected !== 0;
  }

  private async getAllProgression(
    ownerId: string,
    ownerType: string,
  ): Promise<LevelOwnerProgressionEntity[]> {
    return await this.getProgressionQuery(ownerId, ownerType).getMany();
  }

  private async getOneProgression(
    progression: LevelOwnerProgression,
  ): Promise<LevelOwnerProgressionEntity> {
    return await this.getProgressionQuery(
      progression.ownerId,
      progression.ownerType,
      progression.levelOrder,
    ).getOne();
  }

  private getProgressionQuery(
    ownerId: string,
    ownerType: string,
    levelOrder?: number,
  ): SelectQueryBuilder<LevelOwnerProgressionEntity> {
    const queryBuilder = this.repository
      .createQueryBuilder('progression')
      .innerJoinAndSelect('progression.levelEntity', 'level');

    if (ownerId) {
      queryBuilder.andWhere('progression.ownerId = :ownerId', { ownerId });
    }

    if (ownerType) {
      queryBuilder.andWhere('progression.ownerType = :ownerType', {
        ownerType,
      });
    }

    if (levelOrder) {
      queryBuilder.andWhere('level.order = :levelOrder', { levelOrder });
    }

    queryBuilder.orderBy('level.order', 'ASC');

    return queryBuilder;
  }
}
