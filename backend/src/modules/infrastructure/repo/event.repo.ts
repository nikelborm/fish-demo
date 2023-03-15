import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  createManyPlain,
  createOnePlain,
  deleteEntityByIdentity,
  findOnePlainByIdentity,
  getAllEntities,
  updateManyPlain,
  updateManyWithRelations,
  updateOnePlain,
  updateOneWithRelations,
} from 'src/tools';
import type { EntityRepoMethodTypes } from 'src/types';
import { Repository } from 'typeorm';
import { Event } from '../model';

@Injectable()
export class EventRepo {
  constructor(
    @InjectRepository(Event)
    private readonly repo: Repository<Event>,
  ) {}

  getAll = getAllEntities(this.repo)<Config>();

  findOneById = async (
    id: number,
  ): Promise<RepoTypes['SelectedOnePlainEntity'] | null> =>
    await findOnePlainByIdentity(this.repo)<Config>()({ id });

  createOnePlain = createOnePlain(this.repo)<Config>();
  createManyPlain = createManyPlain(this.repo)<Config>();

  updateManyPlain = updateManyPlain(this.repo)<Config>();
  updateOnePlain = updateOnePlain(this.repo)<Config>();

  updateManyWithRelations = updateManyWithRelations(this.repo)<Config>();
  updateOneWithRelations = updateOneWithRelations(this.repo)<Config>();

  deleteOneById = async (id: number): Promise<void> =>
    await deleteEntityByIdentity(this.repo)<Config>()({ id });
}

type RepoTypes = EntityRepoMethodTypes<
  Event,
  {
    EntityName: 'Event';
    RequiredToCreateAndSelectRegularPlainKeys: 'createdAt' | 'updatedAt';
    OptionalToCreateAndSelectRegularPlainKeys: null;

    ForbiddenToCreateGeneratedPlainKeys: 'id' | 'createdAt' | 'updatedAt';
    ForbiddenToUpdatePlainKeys: 'id' | 'createdAt' | 'updatedAt';
    ForbiddenToUpdateRelationKeys: null;
    UnselectedByDefaultPlainKeys: null;
  }
>;

type Config = RepoTypes['Config'];
