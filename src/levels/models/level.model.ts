import { Stats } from './stats.model';
import { Combo } from '../combo/models/combo.model';
import { Playable } from '../playable/models/playable.model';
import { Bar } from '../bar/models/bar.model';

export class Level {
  id: number;
  order: number;
  playables: Playable[];
  lives: number;
  combo: Combo;
  stats?: Stats;
  goals: Bar[];

  constructor(partial: Partial<Level>) {
    Object.assign(this, partial);
    if (partial.stats) {
      return;
    }
    this.stats = this.playables.reduce((stats, playable) => {
      const countByName = stats.playables.countByName;
      if (countByName[playable.name]) {
        countByName[playable.name] = countByName[playable.name] + 1;
      } else {
        countByName[playable.name] = 1;
      }
      stats.playables.total++;
      return stats;
    }, new Stats());
  }
}
