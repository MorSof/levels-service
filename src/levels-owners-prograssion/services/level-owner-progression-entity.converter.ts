import { LevelOwnerProgression } from '../models/level-owner-progression.model';
import { LevelOwnerProgressionEntity } from '../entities/level-owner-progression.entity';

export class LevelOwnerProgressionEntityConverter {
  toEntity(model: LevelOwnerProgression): LevelOwnerProgressionEntity {
    return new LevelOwnerProgressionEntity({
      ownerType: model.ownerType,
      ownerId: model.ownerId,
      levelOrder: model.levelOrder,
      score: model.score,
    });
  }

  toModel(entity: LevelOwnerProgressionEntity): LevelOwnerProgression {
    return new LevelOwnerProgression({
      id: entity.id,
      ownerType: entity.ownerType,
      ownerId: entity.ownerId,
      levelOrder: entity.levelOrder,
      score: entity.score,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    });
  }
}
