import { Injectable } from '@nestjs/common';
import { Level } from '../models/level.model';
import { LevelEntity } from '../entities/level.entity';

@Injectable()
export class LevelsEntityConverter {
  public toModel(levelEntity: LevelEntity): Level {
    const { id, order, playables, lives, stats } = levelEntity;
    const level: Level = new Level({
      id,
      order,
      playables,
      lives,
      stats,
    });
    return level;
  }

  public toEntity(level: Level): LevelEntity {
    const { id, order, playables, lives, stats } = level;
    const levelEntity: LevelEntity = new LevelEntity({
      id,
      order,
      playables,
      lives,
      stats,
    });
    return levelEntity;
  }
}
