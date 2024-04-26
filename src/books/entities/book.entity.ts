import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'books' })
export class Book {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    author: string;

    @Column({ nullable: true })
    description?: string;

    @Column({ nullable: true })
    summary?: string;

    @Column({ nullable: true })
    publicationDate?: Date;

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
