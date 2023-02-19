import { Injectable } from '@nestjs/common';
import { Level } from '../models/level.model';
import { LevelEntity } from '../entities/level.entity';

@Injectable()
export class LevelsEntityConverter {
  public convertFrom(levelEntity: LevelEntity): Level {
    const { id, playables, lives, stats } = levelEntity;
    const level: Level = new Level({
      id,
      playables,
      lives,
      combo: { bars: [] },
      goals: [],
      stats,
    });

    for (const bar of levelEntity.combo.bars) {
      level.combo.bars.push({
        goal: bar.goal,
        rewards: bar.resourcesIds.map((resourceId) => {
          return { id: resourceId };
        }),
      });
    }
    for (const goal of levelEntity.goals) {
      level.goals.push({
        score: goal.score,
        rewards: goal.resourcesIds.map((resourceId) => {
          return { id: resourceId };
        }),
      });
    }
    return level;
  }

  public convertTo(level: Level): LevelEntity {
    const { id, playables, lives, stats } = level;
    const levelEntity: LevelEntity = new LevelEntity({
      id,
      playables,
      combo: { bars: [] },
      goals: [],
      lives,
      stats,
    });
    for (const bar of level.combo.bars) {
      levelEntity.combo.bars.push({
        goal: bar.goal,
        resourcesIds: bar.rewards.map((resource) => resource.id),
      });
    }
    for (const goal of level.goals) {
      levelEntity.goals.push({
        score: goal.score,
        resourcesIds: goal.rewards.map((resource) => resource.id),
      });
    }
    return levelEntity;
  }
}
