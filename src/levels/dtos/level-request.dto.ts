import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { ComboRequestDto } from '../combo/dtos/combo-request.dto';
import { PlayableRequestDto } from '../playable/dtos/playable-request.dto';
import { BarRequestDto } from '../bar/dtos/bar-request.dto';

export class LevelRequestDto {
  @ApiModelProperty({
    isArray: true,
    type: PlayableRequestDto,
    description: 'An array of playables for the level',
  })
  playables: PlayableRequestDto[];

  @ApiModelProperty({
    isArray: true,
    type: BarRequestDto,
    description: 'An array of goals for the level',
  })
  goals: BarRequestDto[];

  @ApiModelProperty({
    type: 'number',
    description: 'The lives of the level',
    required: true,
  })
  lives: number;

  @ApiModelProperty({
    description: 'The combo for the level',
  })
  combo: ComboRequestDto;
}
