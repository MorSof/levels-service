import { LevelOwnerProgression } from '../models/level-owner-progression.model';
import { LevelOwnerProgressionEntity } from '../entities/level-owner-progression.entity';
import { LevelsEntityConverter } from '../../levels/services/levels-entity.converter';
import { Level } from '../../levels/models/level.model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LevelOwnerProgressionEntityConverter {
  constructor(private readonly levelEntityConverter: LevelsEntityConverter) {}
  toEntity(
    model: LevelOwnerProgression,
    level?: Level,
  ): LevelOwnerProgressionEntity {
    const entity = new LevelOwnerProgressionEntity({
      id: model.id,
      ownerType: model.ownerType,
      ownerId: model.ownerId,
      score: model.score,
    });

    if (level) {
      entity.levelEntity = this.levelEntityConverter.toEntity(level);
    }

    return entity;
  }

  toModel(entity: LevelOwnerProgressionEntity): LevelOwnerProgression {
    return new LevelOwnerProgression({
      id: entity.id,
      ownerType: entity.ownerType,
      ownerId: entity.ownerId,
      levelOrder: entity.levelEntity?.order,
      score: entity.score,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    });
  }
}
