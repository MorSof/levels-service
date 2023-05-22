import { Injectable } from '@nestjs/common';
import { Bar } from '../models/bar.model';
import { BarsProvider } from '../providers/bars-provider.service';
import { LevelBarsType } from '../models/level-bars.enum';

@Injectable()
export class BarsService {
  private readonly LEVEL_BARS_PREFIX = `level-`;
  private readonly COMBO_BARS_NAME_SUFFIX = `-combo-bars`;
  private readonly GOALS_BARS_NAME_SUFFIX = `-goals-bars`;

  constructor(private readonly barsProvider: BarsProvider) {}

  async fetchBars(
    levelId: number,
    levelBarsType: LevelBarsType,
  ): Promise<Bar[]> {
    const barsName = this.barsNameBuilder(levelId, levelBarsType);
    return await this.barsProvider.fetchBarsByName(barsName);
  }

  async createBars(
    levelId: number,
    levelBarsType: LevelBarsType,
    bars: Bar[],
  ): Promise<Bar[]> {
    const barsName = this.barsNameBuilder(levelId, levelBarsType);
    const createdBars: Bar[] = [];
    for (let i = 0; i < bars.length; i++) {
      bars[i].name = barsName;
      bars[i].barIndex = i;
      createdBars.push(await this.barsProvider.createBar(bars[i]));
    }
    return createdBars;
  }

  private barsNameBuilder(
    levelId: number,
    levelBarsType: LevelBarsType,
  ): string {
    switch (levelBarsType) {
      case LevelBarsType.COMBO:
        return `${this.LEVEL_BARS_PREFIX}${levelId}${this.COMBO_BARS_NAME_SUFFIX}`;
      case LevelBarsType.GOALS:
        return `${this.LEVEL_BARS_PREFIX}${levelId}${this.GOALS_BARS_NAME_SUFFIX}`;
    }
    return null;
  }
}
