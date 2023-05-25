import { Injectable } from '@nestjs/common';
import { Resource } from '../models/resource.model';
import { BaseResourceRequestDto } from '../dtos/base-resource-request.dto';
import { ResourceResponseDto } from '../dtos/resource-response.dto';

@Injectable()
export class ResourcesDtoConverter {
  public convertFrom(resourceRequestDto: BaseResourceRequestDto): Resource {
    const {
      name,
      amount,
      type,
      receivingProbability,
      rarenessProbability,
      resources,
      extraArgs,
    } = resourceRequestDto;
    return new Resource({
      name,
      amount,
      type,
      receivingProbability,
      rarenessProbability,
      resources,
      extraArgs,
    });
  }

  public convertTo(resource: Resource): ResourceResponseDto {
    const {
      name,
      amount,
      type,
      receivingProbability,
      rarenessProbability,
      resources,
      extraArgs,
    } = resource;
    return new ResourceResponseDto({
      name,
      amount,
      type,
      receivingProbability,
      rarenessProbability,
      resources,
      extraArgs,
    });
  }
}
