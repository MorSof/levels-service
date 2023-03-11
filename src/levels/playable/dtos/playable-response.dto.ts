import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class PlayableResponseDto {
  @ApiModelProperty({
    type: 'string',
    description: 'The name of the playable',
  })
  name: string;

  @ApiModelProperty({
    type: 'number',
    description: 'The ttl of the playable',
  })
  ttl: number;

  @ApiModelProperty({
    type: 'number',
    description: 'The interactableTime of the playable',
  })
  interactableTime?: number;

  @ApiModelProperty({
    type: 'number',
    description: 'The cooldown of the playable',
  })
  cooldown: number;

  @ApiModelProperty({
    type: 'number',
    description: 'The score of the playable',
  })
  score: number;

  @ApiModelProperty({
    type: 'array',
    description: 'An array of vertices for the playable',
    items: { type: 'number' },
  })
  vertices: number[];

  constructor(partial: Partial<PlayableResponseDto>) {
    Object.assign(this, partial);
  }
}
