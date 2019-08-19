import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { IdeaController } from './idea.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/user.entity';
import { FollowsEntity } from '../profile/follows.entity';
import { IdeaService } from './idea.service';
import { AuthMiddleware } from '../user/auth.middleware';
import { UserModule } from '../user/user.module';
import { IdeaEntity } from './idea.entity';

@Module({
    imports: [TypeOrmModule.forFeature([IdeaEntity, UserEntity, FollowsEntity]), UserModule],
    providers: [IdeaService],
    controllers: [
        IdeaController
    ]
})
export class IdeaModule implements NestModule {
    public configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthMiddleware)
            .forRoutes(
                { path: 'ideas', method: RequestMethod.GET },
                { path: 'ideas', method: RequestMethod.POST },
                { path: 'ideas/:id', method: RequestMethod.DELETE },
                { path: 'ideas/:id', method: RequestMethod.PUT },
                { path: 'ideas/:id', method: RequestMethod.GET }
            );
    }
}
