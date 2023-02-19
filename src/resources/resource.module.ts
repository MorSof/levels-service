import { Module } from '@nestjs/common';
import { ResourcesDtoConverter } from './convertes/resources-dto.converter';
import { ResourcesProvider } from './providers/resources-provider.service';
import { ResourcesMicroserviceProvider } from './providers/resources-microservice-provider/resources-microservice-provider.service';
import { ResourcesService } from './services/resources.service';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [
    ResourcesDtoConverter,
    ResourcesService,
    {
      provide: ResourcesProvider,
      useClass: ResourcesMicroserviceProvider,
    },
    {
      provide: 'RESOURCES_BASE_URL',
      useFactory: (configService: ConfigService) =>
        configService.get('RESOURCES_PROVIDER_BASE_URL'),
      inject: [ConfigService],
    },
  ],
  exports: [ResourcesDtoConverter, ResourcesService],
})
export class ResourceModule {}
