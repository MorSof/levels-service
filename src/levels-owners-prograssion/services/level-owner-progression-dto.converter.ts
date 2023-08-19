import { LevelOwnerProgressionRequestDto } from '../../api/build/models/LevelOwnerProgressionRequestDto';
import { LevelOwnerProgressionResponseDto } from '../../api/build/models/LevelOwnerProgressionResponseDto';
import { LevelOwnerProgression } from '../models/level-owner-progression.model';

export class LevelOwnerProgressionDtoConverter {
  toModel(dto: LevelOwnerProgressionRequestDto): LevelOwnerProgression {
    return new LevelOwnerProgression({
      ownerType: dto.ownerType,
      ownerId: dto.ownerId,
      levelOrder: dto.levelOrder,
      score: dto.score,
    });
  }

  toDto(entity: LevelOwnerProgression): LevelOwnerProgressionResponseDto {
    return {
      id: entity.id,
      ownerType: entity.ownerType,
      ownerId: entity.ownerId,
      levelOrder: entity.levelOrder,
      score: entity.score,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
