import { LevelOwnerProgressionRequestDto } from '../../api/build/models/LevelOwnerProgressionRequestDto';
import { LevelOwnerProgressionResponseDto } from '../../api/build/models/LevelOwnerProgressionResponseDto';
import { LevelOwnerProgression } from '../models/level-owner-progression.model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LevelOwnerProgressionDtoConverter {
  toModel(dto: LevelOwnerProgressionRequestDto): LevelOwnerProgression {
    return new LevelOwnerProgression({
      ownerType: dto.ownerType,
      ownerId: dto.ownerId,
      levelOrder: dto.levelOrder,
      score: dto.score,
    });
  }

  toDto(model: LevelOwnerProgression): LevelOwnerProgressionResponseDto {
    return {
      id: model.id,
      ownerType: model.ownerType,
      ownerId: model.ownerId,
      levelOrder: model.levelOrder,
      score: model.score,
    };
  }
}
