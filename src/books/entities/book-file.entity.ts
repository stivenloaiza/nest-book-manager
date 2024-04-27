import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Book } from './book.entity';
import { User } from 'src/users/entities/user.entity';

@Entity({ name: 'book_files' })
export class BookFile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Campo relacional
  @ManyToOne(() => Book, { nullable: false })
  @JoinColumn({ name: 'book' })
  @Column('uuid')
  book;

  @Column({ nullable: true })
  mimetype?: string;

  @Column()
  url: string;

  // Campos relacionales
  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'createdBy' })
  @Column('uuid')
  createdBy: string;
  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'updatedBy' })
  @Column({ nullable: true })
  updatedBy?: string;
  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'deletedBy' })
  @Column('uuid', { nullable: true })
  deletedBy?: string;

  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date;
}
