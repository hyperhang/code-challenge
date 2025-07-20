  import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

  @Entity()
  export class Resource {
    @PrimaryGeneratedColumn() // Auto-generated primary key
    id!: number;

    @Column()
    name: string = '';

    @Column()
    description: string = '';

    @Column({ nullable: true })
    type: string = '';

    @Column({ default: true })
    isActive: boolean = true;

    @CreateDateColumn()
    createdAt: Date = new Date();

    @UpdateDateColumn()
    updatedAt: Date = new Date();
  }