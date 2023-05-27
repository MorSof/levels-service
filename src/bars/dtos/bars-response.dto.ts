import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { ResourceResponseDto } from './resource-response.dto';

/**
 Added the MilestoneResponseDto class just for swagger documentation,
 because it didn't allow me to use the BarsResponseDto type in the ApiModelProperty of the milestones,
 because it's not yet declared.
 Also, this object doesn't include the MilestoneRequestDto too, for the same reason.
 Take a look at the BarsResponseDto and see that the type of milestones is BarsResponseDto and not MilestoneResponseDto,
 so a milestone is also a bar that contains milestones
 **/
export class MilestoneResponseDto {
  @ApiModelProperty({
    type: 'number',
    description: 'The max value to fill the bar`s milestones',
    default: 50,
  })
  maxValue: number;

  @ApiModelProperty({
    isArray: true,
    type: ResourceResponseDto,
    description: 'An array of rewards for the bar',
  })
  rewards?: ResourceResponseDto[];
}

export class BarsResponseDto {
  @ApiModelProperty({
    type: 'number',
    description: 'The id of the bar',
  })
  id: number;

  @ApiModelProperty({
    description: 'The bar name',
  })
  name: string;

  @ApiModelProperty({
    type: 'number',
    description: 'The bar index',
  })
  barIndex: number;

  @ApiModelProperty({
    type: 'number',
    description: 'The max value to fill the bar',
  })
  maxValue: number;

  @ApiModelProperty({
    isArray: true,
    type: MilestoneResponseDto,
    description: 'An array of milestones in the bar',
  })
  milestones?: BarsResponseDto[];

  @ApiModelProperty({
    isArray: true,
    type: ResourceResponseDto,
    description: 'An array of rewards for the bar',
  })
  rewards?: ResourceResponseDto[];

  constructor(partial: Partial<BarsResponseDto>) {
    Object.assign(this, partial);
  }
}
