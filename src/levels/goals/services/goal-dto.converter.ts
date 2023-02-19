import { Injectable } from '@nestjs/common';
import { GoalRequestDto } from '../dtos/goal-request.dto';
import { Goal } from '../models/goal.model';
import { GoalResponseDto } from '../dtos/goal-response.dto';
import { ResourcesDtoConverter } from '../../../resources/convertes/resources-dto.converter';

@Injectable()
export class GoalDtoConverter {
  constructor(private readonly resourcesDtoConverter: ResourcesDtoConverter) {}

  public convertFrom(goalRequestDto: GoalRequestDto): Goal {
    const { score, rewards } = goalRequestDto;
    return new Goal({
      score,
      rewards: rewards.map((reward) =>
        this.resourcesDtoConverter.convertFrom(reward),
      ),
    });
  }

  public convertTo(goal: Goal): GoalResponseDto {
    const { score, rewards } = goal;
    return new GoalResponseDto({ score, rewards });
  }
}
