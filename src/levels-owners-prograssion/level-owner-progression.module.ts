import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LevelOwnerProgressionEntity } from './entities/level-owner-progression.entity';
import { LevelOwnerProgressionService } from './services/level-owner-progression.service';
import { LevelOwnerProgressionController } from './controllers/level-owner-progression.controller';
import { LevelOwnerProgressionDtoConverter } from './services/level-owner-progression-dto.converter';
import { LevelOwnerProgressionEntityConverter } from './services/level-owner-progression-entity.converter';

@Module({
  imports: [TypeOrmModule.forFeature([LevelOwnerProgressionEntity])],
  providers: [
    LevelOwnerProgressionService,
    LevelOwnerProgressionDtoConverter,
    LevelOwnerProgressionEntityConverter,
  ],
  controllers: [LevelOwnerProgressionController],
  exports: [LevelOwnerProgressionService],
})
export class LevelOwnerProgressionModule {}
