import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  BeforeInsert,
  BeforeUpdate,
  Unique,
} from 'typeorm';
import { LevelEntity } from '../../levels/entities/level.entity';

@Entity({ name: 'level_owner_progression' })
@Unique(['ownerType', 'ownerId', 'levelOrder'])
export class LevelOwnerProgressionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ownerType: string;

  @Column()
  ownerId: string;

  @ManyToOne(() => LevelEntity, (level) => level.order)
  @JoinColumn({ name: 'levelOrder' })
  levelOrder: number;

  @Column()
  score: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  beforeInsert() {
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  @BeforeUpdate()
  beforeUpdate() {
    this.updatedAt = new Date();
  }

  constructor(partial: Partial<LevelOwnerProgressionEntity>) {
    Object.assign(this, partial);
  }
}
