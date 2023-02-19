import { Module } from '@nestjs/common';
import { ResourcesDtoConverter } from './convertes/resources-dto.converter';
import { ResourcesProvider } from './providers/resources-provider.service';
import { ResourcesMicroserviceProvider } from './providers/resources-microservice-provider/resources-microservice-provider.service';
import { ResourcesService } from './services/resources.service';

@Module({
  providers: [
    ResourcesDtoConverter,
    ResourcesService,
    {
      provide: ResourcesProvider,
      useClass: ResourcesMicroserviceProvider,
    },
  ],
  exports: [ResourcesDtoConverter, ResourcesService],
})
export class ResourceModule {}
