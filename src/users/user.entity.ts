import { Entity, ObjectIdColumn, Column, ObjectId, BeforeInsert, AfterInsert, AfterUpdate, BeforeRemove, AfterLoad, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Logger } from '@nestjs/common';

@Entity('users')
export class User {
  @ObjectIdColumn()
  id: ObjectId;

  @Column({ unique: true })
  email: string;

  @Column()
  role: string; // 'admin' ou 'client'

  @Column({ nullable: true })
  password: string;

  @Column({ default: false })
  active: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Logger privé pour cette entité
  private readonly logger = new Logger(User.name);

  // 1. Hook avant insertion
  @BeforeInsert()
  logBeforeInsert() {
    this.logger.log(`About to insert a new user with email: ${this.email}`);
  }

  // 2. Hook après insertion
  @AfterInsert()
  logAfterInsert() {
    this.logger.log(`User inserted successfully with email: ${this.email} and ID: ${this.id}`);
  }

  // 2. Hook après mise à jour
  @AfterUpdate()
  logAfterUpdate() {
    this.logger.log(`User with ID: ${this.id} has been updated`);
  }

  // 3. Hook avant suppression
  @BeforeRemove()
  logBeforeRemove() {
    this.logger.warn(`About to remove user with ID: ${this.id} and email: ${this.email}`);
  }

  // 4. Hook après chargement (récupération)
  @AfterLoad()
  logAfterLoad() {
    this.logger.debug(`User with ID: ${this.id} has been loaded from database`);
  }
}