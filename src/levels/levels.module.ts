import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LevelsController } from './controllers/levels.controller';
import { LevelsService } from './services/levels.service';
import { LevelsEntityConverter } from './services/levels-entity.converter';
import { LevelsDtoConverter } from './services/levels-dto.converter';
import { ComboModule } from './combo/combo.module';
import { PlayableModule } from './playable/playable.module';
import { LevelEntity } from './entities/level.entity';
import { BarsModule } from '../bars/bars.module';

@Module({
  controllers: [LevelsController],
  providers: [LevelsService, LevelsEntityConverter, LevelsDtoConverter],
  imports: [
    TypeOrmModule.forFeature([LevelEntity]),
    ComboModule,
    PlayableModule,
    BarsModule,
  ],
  exports: [LevelsService, LevelsEntityConverter, LevelsDtoConverter],
})
export class LevelsModule {}
