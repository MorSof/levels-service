import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BarsMicroserviceProvider } from './bars-microservice-provider.service';
import { HttpModule } from '@nestjs/axios';
import { BarsProvider } from '../bars-provider.service';
import { BarsDtoConverter } from './convertes/bars-dto.converter';
import { ResourcesDtoConverter } from './convertes/resources-dto.converter';

@Module({
  imports: [HttpModule],
  providers: [
    BarsDtoConverter,
    ResourcesDtoConverter,
    {
      provide: BarsProvider,
      useClass: BarsMicroserviceProvider,
    },
    {
      provide: 'BARS_BASE_URL',
      useFactory: (configService: ConfigService) =>
        configService.get('BARS_PROVIDER_BASE_URL'),
      inject: [ConfigService],
    },
  ],
  exports: [BarsProvider],
})
export class BarsMicroserviceProviderModule {}
