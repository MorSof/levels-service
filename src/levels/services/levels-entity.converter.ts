import { Injectable } from '@nestjs/common';
import { Level } from '../models/level.model';
import { LevelEntity } from '../entities/level.entity';

@Injectable()
export class LevelsEntityConverter {
  public toModel(levelEntity: LevelEntity): Level {
    const { id, order, playables, lives, stats, combo, goals } = levelEntity;
    const level: Level = new Level({
      id,
      order,
      playables,
      lives,
      combo,
      goals,
      stats,
    });
    return level;
  }

  public toEntity(level: Level): LevelEntity {
    const { id, order, playables, lives, stats, combo, goals } = level;
    const levelEntity: LevelEntity = new LevelEntity({
      id,
      order,
      playables,
      combo,
      goals,
      lives,
      stats,
    });
    return levelEntity;
  }
}
