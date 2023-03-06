import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { messages } from 'src/config';
import { Repository } from 'typeorm';
import { AccessScope } from '../model';

@Injectable()
export class AccessScopeRepo {
  constructor(
    @InjectRepository(AccessScope)
    private readonly repo: Repository<AccessScope>,
  ) {}

  async getOneById(
    id: number,
  ): Promise<Pick<AccessScope, 'id' | 'type' | 'createdAt' | 'updatedAt'>> {
    const accessScope = await this.repo.findOne({ where: { id } });
    if (!accessScope)
      throw new BadRequestException(
        messages.repo.common.cantGetNotFoundById(id, 'accessScope'),
      );
    return accessScope;
  }

  async updateOneWithRelations(
    updatedAccessScope: Pick<AccessScope, 'id' | 'userToAccessScopeRelations'>,
  ): Promise<Pick<AccessScope, 'id' | 'userToAccessScopeRelations'>> {
    return await this.repo.save(updatedAccessScope);
  }

  async createOneWithRelations(
    newAccessScope: Pick<AccessScope, 'type' | 'userToAccessScopeRelations'>,
  ): Promise<
    Pick<
      AccessScope,
      'id' | 'type' | 'userToAccessScopeRelations' | 'createdAt' | 'updatedAt'
    >
  > {
    return await this.repo.save(newAccessScope);
  }

  async deleteMany(accessScopeIds: number[]): Promise<void> {
    await this.repo.delete(accessScopeIds);
  }
}
