import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { ResourceResponseDto } from '../../../resources/dtos/resource-response.dto';

export class GoalResponseDto {
  @ApiModelProperty({
    type: 'string',
    description: 'The score to achieve the goal',
  })
  score: number;

  @ApiModelProperty({
    type: ResourceResponseDto,
    description: 'The resources you achieve when winning the goal',
    isArray: true,
  })
  resources?: ResourceResponseDto[];

  constructor(partial: Partial<GoalResponseDto>) {
    Object.assign(this, partial);
  }
}
