import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';
import { ControllerModule } from './controller/controller.module';
import { Restaurant } from './restaurants/entities/restaurant.entity';
import { User } from './users/entites/users.entiy';
import { JwtModule } from './jwt/jwt.module';
import { Verification } from './users/entites/verification.entity';
import { MailModule } from './mail/mail.module';
import { Category } from './restaurants/entities/category.entity';
import { Dish } from './restaurants/entities/dish.entity';

@Module({
  imports: [
    ControllerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.test',
      ignoreEnvFile: process.env.NODE_ENV === 'prod',
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('dev', 'prod').required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_DATABASE: Joi.string().required(),
        PRIVATE_KEY: Joi.string().required(),
        MAILGUN_API_KEY: Joi.string().required(),
        MAILGUN_FROM_EMAIL: Joi.string().required(),
        MAILGUN_DOMAIN: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadEntities: true,
      synchronize: process.env.NODE_ENV !== 'prod',
      logging: process.env.NODE_ENV !== 'prod',
      entities: [User, Restaurant, Verification, Category, Dish],
    }),
    JwtModule.forRoot({
      privateKey: process.env.PRIVATE_KEY,
    }),
    MailModule.forRoot({
      apiKey: process.env.MAILGUN_API_KEY,
      fromEmail: process.env.MAILGUN_FROM_EMAIL,
      domain: process.env.MAILGUN_DOMAIN,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

//앱 전체에 사용하려면 main.ts에 추가

// 이렇게 하면 특정 경로에서만 middleware 사용이 가능함
// implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     //JwtMiddleware를 forRoutes를 통해서
//     //'/uesrs'인 경로(path)에
//     //method가 POST인 경우에만 적용시킨다
//     consumer.apply(jwtMiddleware).forRoutes({
//       path: '/users',
//       method: RequestMethod.POST,
//     });
//   }
// }
