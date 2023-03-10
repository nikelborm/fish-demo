import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { Request } from 'express';
import {
  ConfigKeys,
  IAppConfigMap,
  messages,
  TypedConfigService,
} from 'src/config';
import { UserUseCase } from 'src/modules/user';
import { AccessEnum, ALLOWED_SCOPES_KEY } from 'src/tools';
import {
  AllowedForArgs,
  EndpointAccess,
  UserAuthInfo,
  UserLevelScopes,
} from 'src/types';
import { AccessTokenUseCase } from '../services';

@Injectable()
export class AccessTokenGuard implements CanActivate {
  private readonly IS_DEVELOPMENT: boolean;

  constructor(
    private readonly configService: TypedConfigService<IAppConfigMap>,
    private readonly accessTokenUseCase: AccessTokenUseCase,
    private readonly userUseCase: UserUseCase,
    private readonly reflector: Reflector,
  ) {
    this.IS_DEVELOPMENT = this.configService.get(ConfigKeys.IS_DEVELOPMENT);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const [allScopes, request] = this.getRouteScopesAndRequestFrom(context);

    if (!allScopes) return true;

    if (!allScopes.length) return true;

    const routeLevelScope = allScopes.find((scope) =>
      Object.values(EndpointAccess).includes(scope as any),
    ) as EndpointAccess;

    const userLevelScopes = allScopes.filter(
      (scope) => !Object.values(EndpointAccess).includes(scope as any),
    ) as UserLevelScopes[];

    if (routeLevelScope === AccessEnum.PUBLIC) return true;

    if (routeLevelScope === AccessEnum.FORBIDDEN) return false;

    if (routeLevelScope === AccessEnum.DEVELOPMENT_ONLY)
      if (this.IS_DEVELOPMENT) return true;
      else throw new UnauthorizedException(messages.auth.developmentOnly);

    if (routeLevelScope === AccessEnum.UNAUTHORIZED_ONLY) {
      if (!request.headers.authorization) return true;
      throw new UnauthorizedException(messages.auth.unauthorizedOnly);
    }

    const userId = await this.accessTokenUseCase.decodeAuthHeaderAndGetUserId(
      request.headers.authorization,
    );

    const userFromDB: UserAuthInfo =
      await this.userUseCase.getOneByIdWithAccessScopes(userId);

    request.user = userFromDB;

    if (routeLevelScope === AccessEnum.AUTHORIZED) return true;

    // const userAccessScopeTypes = new Set(
    //   userFromDB.accessScopes.map(({ type }) => type),
    // );

    // for (const endpointAccessScope of userLevelScopes) {
    //   if (Array.isArray(endpointAccessScope)) {
    //     if (endpointAccessScope.every(userAccessScopeTypes.has)) return true;
    //     continue;
    //   }

    //   if (userAccessScopeTypes.has(endpointAccessScope)) return true;
    // }
    // return false;
    console.log('userLevelScopes: ', userLevelScopes);
    return true;
  }

  private getRouteScopesAndRequestFrom(
    context: ExecutionContext,
  ): [AllowedForArgs | null, Request] {
    return [
      this.reflector.get<AllowedForArgs>(
        ALLOWED_SCOPES_KEY,
        context.getHandler(),
      ),
      context.getArgByIndex<Request>(0),
    ];
  }
}
