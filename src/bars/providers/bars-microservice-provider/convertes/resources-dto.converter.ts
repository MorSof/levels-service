import { Injectable } from '@nestjs/common';
import { ResourceResponseDto } from '../dtos/resource-response.dto';
import { Resource } from '../../../models/resource.model';
import { CreateResourceRequestDto } from '../dtos/create-resource-request.dto';

@Injectable()
export class ResourcesDtoConverter {
  public toModel(resourceResponseDto: ResourceResponseDto): Resource {
    const {
      name,
      amount,
      type,
      receivingProbability,
      rarenessProbability,
      extraArgs,
    } = resourceResponseDto;
    return new Resource({
      name,
      amount,
      type,
      receivingProbability,
      rarenessProbability,
      extraArgs,
    });
  }

  public toDto(resource: Resource): CreateResourceRequestDto {
    const {
      name,
      amount,
      type,
      receivingProbability,
      rarenessProbability,
      extraArgs,
    } = resource;
    return new CreateResourceRequestDto({
      name,
      amount,
      type,
      receivingProbability,
      rarenessProbability,
      extraArgs,
    });
  }
}
