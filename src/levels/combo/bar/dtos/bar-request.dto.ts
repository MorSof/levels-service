import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { ResourceRequestDto } from '../../../../resources/dtos/resource-request.dto';

export class BarRequestDto {
  @ApiModelProperty({
    type: 'number',
    description: 'The goal of the bar',
    required: true,
  })
  goal: number;

  @ApiModelProperty({
    type: ResourceRequestDto,
    isArray: true,
    required: false,
  })
  resources?: ResourceRequestDto[];
}
