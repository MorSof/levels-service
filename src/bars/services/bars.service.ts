import { Injectable } from '@nestjs/common';
import { Bar } from '../models/bar.model';
import { BarsProvider } from '../providers/bars-provider.service';

@Injectable()
export class BarsService {
  private readonly COMBO_BARS_NAME_TEMPLATE = `level-%s-combo-bars`;
  private readonly GOALS_BARS_NAME_TEMPLATE = `level-%s-goals-bars`;

  constructor(private readonly barsProvider: BarsProvider) {}

  async createComboBars(levelId: number, bars: Bar[]): Promise<Bar[]> {
    const barsName = this.COMBO_BARS_NAME_TEMPLATE.replace(
      '%s',
      String(levelId),
    );
    return this.createBars(barsName, bars);
  }

  async createGoalsBars(levelId: number, bars: Bar[]): Promise<Bar[]> {
    const barsName = this.GOALS_BARS_NAME_TEMPLATE.replace(
      '%s',
      String(levelId),
    );
    return await this.createBars(barsName, bars);
  }

  private async createBars(barsName: string, bars: Bar[]): Promise<Bar[]> {
    const createdBars: Bar[] = [];
    for (let i = 0; i < bars.length; i++) {
      bars[i].name = barsName;
      bars[i].barIndex = i;
      createdBars.push(await this.barsProvider.createBar(bars[i]));
    }
    return createdBars;
  }
}
