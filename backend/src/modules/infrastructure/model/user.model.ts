import { PrimaryIdentityColumn } from 'src/tools';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  UpdateDateColumn,
} from 'typeorm';
import { AccessScope, UserToAccessScope } from '.';

@Entity({ name: 'user' })
export class User {
  @PrimaryIdentityColumn('user_id')
  id!: number;

  @Column({
    name: 'first_name',
    nullable: false,
  })
  firstName!: string;

  @Column({
    name: 'last_name',
    nullable: false,
  })
  lastName!: string;

  @Column({
    name: 'email',
    nullable: false,
    unique: true,
  })
  email!: string;

  @Column({
    name: 'salt',
    select: false,
    nullable: false,
  })
  salt!: string;

  @Column({
    name: 'password_hash',
    select: false,
    nullable: false,
  })
  passwordHash!: string;

  @ManyToMany(
    () => AccessScope,
    (accessScope) => accessScope.usersWithThatAccessScope,
  )
  @JoinTable({
    name: 'user_to_access_scope',
    joinColumn: { name: 'user_id' },
    // synchronize is important flag! Without it your migrations will have two conflicting declarations for question_to_category table
    // from https://github.com/typeorm/typeorm/blob/master/docs/decorator-reference.md#jointable
    synchronize: false,
    inverseJoinColumn: { name: 'access_scope_id' },
  })
  accessScopes!: AccessScope[];

  @OneToMany(
    () => UserToAccessScope,
    (userToAccessScope) => userToAccessScope.user,
  )
  userToAccessScopeRelations!: UserToAccessScope[];

  @Column({
    name: 'patronymic',
    nullable: false,
  })
  patronymic!: string;

  @Column({
    name: 'gender',
    nullable: false,
  })
  gender!: string;

  @Column({
    name: 'phone',
    type: 'varchar',
    length: 15,
    nullable: true,
  })
  phone?: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
  })
  updatedAt!: Date;
}