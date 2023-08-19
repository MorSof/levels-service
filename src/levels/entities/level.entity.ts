import { LevelOwnerProgressionEntity } from 'src/levels-owners-prograssion/entities/level-owner-progression.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'levels' })
export class LevelEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index()
  order: number;

  @Column('json')
  playables: {
    name: string;
    ttl: number;
    interactableTime?: number;
    cooldown: number;
    vertices: number[];
    score: number;
  }[];

  @Column()
  lives: number;

  @Column({ nullable: true, type: 'json' })
  stats: {
    playables: {
      countByName: object;
      total: number;
    };
  };

  @OneToMany(
    () => LevelOwnerProgressionEntity,
    (progression: LevelOwnerProgressionEntity) => progression.levelOrder,
  )
  progressions: LevelOwnerProgressionEntity[];

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

  constructor(partial: Partial<LevelEntity>) {
    Object.assign(this, partial);
  }
}
