import { ApiProperty } from '@nestjs/swagger';

/**
 Added the InnerResourceResponse class just for swagger documentation,
 because it didn't allow me to use the BaseResourceRequestDto type in the ApiProperty of the inner resources,
 because it's not yet declared.
 Also, this object doesn't include the InnerResourceRequestDto too, for the same reason.
 Take a look at the ResourceResponseDto and see that the type of inner resources is ResourceResponseDto and not InnerResourceResponse,
 so an inner resource is also a resource that contains inner resources
 **/
export class InnerResourceResponse {
  readonly ownerId?: string;

  readonly ownerType?: string;

  readonly groupId?: string;

  @ApiProperty({})
  readonly type: string;

  @ApiProperty({})
  readonly name: string;

  @ApiProperty({
    type: 'number',
    nullable: true,
    default: null,
  })
  readonly amount?: number;

  @ApiProperty({
    type: 'number',
    nullable: true,
    minimum: 0,
    maximum: 1,
    default: 1,
  })
  readonly receivingProbability: number;

  @ApiProperty({
    type: 'number',
    nullable: true,
    minimum: 0,
    maximum: 1,
    default: 0.5,
  })
  readonly rarenessProbability: number;

  @ApiProperty({
    type: 'object',
    additionalProperties: true,
    required: false,
    nullable: true,
  })
  readonly extraArgs: Record<string, any>;
}

export class ResourceResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty({
    description: 'The type of the resource',
  })
  type: string;

  @ApiProperty({
    description: 'The name of the resource',
  })
  name: string;

  @ApiProperty({
    nullable: true,
  })
  amount?: number;

  @ApiProperty({
    nullable: true,
  })
  receivingProbability?: number;

  @ApiProperty({
    nullable: true,
  })
  rarenessProbability?: number;

  @ApiProperty({
    isArray: true,
    type: InnerResourceResponse,
  })
  resources?: ResourceResponseDto[];

  @ApiProperty({
    nullable: true,
  })
  extraArgs?: object;

  constructor(partial: Partial<ResourceResponseDto>) {
    Object.assign(this, partial);
  }
}
