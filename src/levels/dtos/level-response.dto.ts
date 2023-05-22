import { ComboResponseDto } from '../combo/dtos/combo-response.dto';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { PlayableResponseDto } from '../playable/dtos/playable-response.dto';
import { BarsResponseDto } from '../../bars/dtos/bars-response.dto';

export class LevelResponseDto {
  @ApiModelProperty({
    type: 'string',
    description: 'The id of the level',
  })
  id: number;

  @ApiModelProperty({
    type: 'number',
    description: 'The level order',
  })
  order: number;

  @ApiModelProperty({
    type: PlayableResponseDto,
    description: 'The playables of the level',
    isArray: true,
  })
  playables: PlayableResponseDto[];

  @ApiModelProperty({
    type: 'object',
    description: 'The stats of the level',
  })
  stats: {
    playables: {
      countByName: object;
      total: number;
    };
  };

  @ApiModelProperty({
    type: 'string',
    description: 'The lives of the level',
  })
  lives: number;

  @ApiModelProperty({
    isArray: true,
    type: BarsResponseDto,
    description: 'An array of goals for the level',
  })
  goals: BarsResponseDto[];

  @ApiModelProperty({
    type: ComboResponseDto,
    description: 'The combo for the level',
  })
  combo: ComboResponseDto;

  constructor(partial: Partial<LevelResponseDto>) {
    Object.assign(this, partial);
  }
}
