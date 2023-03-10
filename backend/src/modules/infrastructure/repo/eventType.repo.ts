import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { insertManyPlain, insertOnePlain } from 'src/tools';
import { Repository } from 'typeorm';
import { EventType } from '../model';

@Injectable()
export class EventTypeRepo {
  constructor(
    @InjectRepository(EventType)
    private readonly repo: Repository<EventType>,
  ) {}

  async getAll(): Promise<SelectedOnePlainEventType[]> {
    return await this.repo.find();
  }

  async findOneById(id: number): Promise<SelectedOnePlainEventType | null> {
    return await this.repo.findOne({
      where: { id },
    });
  }

  async createOnePlain(
    newEventType: Pick<EventType, PlainKeysAllowedToModify>,
  ): Promise<CreatedOnePlainEventType> {
    return await insertOnePlain<CreatedOnePlainEventType>(this.repo, newEventType);
  }

  async createManyPlain(
    newEventTypes: Pick<EventType, PlainKeysAllowedToModify>[],
  ): Promise<CreatedOnePlainEventType[]> {
    return await insertManyPlain<CreatedOnePlainEventType>(this.repo, newEventTypes);
  }

  async updateOnePlain({
    id,
    ...existingEventType
  }: UpdatedOnePlainEventType): Promise<UpdatedOnePlainEventType> {
    await this.repo.update(id, existingEventType);
    return { id, ...existingEventType };
  }

  async updateManyPlain(
    existingEventTypes: UpdatedOnePlainEventType[],
  ): Promise<UpdatedOnePlainEventType[]> {
    const updatedEventTypes = await this.repo.save(existingEventTypes);
    return updatedEventTypes;
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}

type PrimaryKeys = 'id';
type PlainKeysGeneratedAfterInsert = PrimaryKeys | 'createdAt' | 'updatedAt';

type PlainKeysAllowedToModify = RegularPlainKeys;

type UsuallyReturnedEventTypePlainKeys =
  | PlainKeysGeneratedAfterInsert
  | RegularPlainKeys;

type RegularPlainKeys = never;

export type CreatedOnePlainEventType = Pick<
  EventType,
  PlainKeysAllowedToModify | PlainKeysGeneratedAfterInsert
>;

export type UpdatedOnePlainEventType = Pick<EventType, PrimaryKeys> &
  Partial<Pick<EventType, PlainKeysAllowedToModify>>;

export type SelectedOnePlainEventType = Pick<EventType, UsuallyReturnedEventTypePlainKeys>;
