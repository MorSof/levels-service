import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { ResourceResponseDto } from '../../../../resources/dtos/resource-response.dto';

export class BarResponseDto {
  @ApiModelProperty({
    type: 'number',
    description: 'The goal of the bar',
  })
  goal: number;

  @ApiModelProperty({
    type: ResourceResponseDto,
    description: 'The resources of the bar',
    isArray: true,
  })
  resources?: ResourceResponseDto[];

  constructor(partial: Partial<BarResponseDto>) {
    Object.assign(this, partial);
  }
}
