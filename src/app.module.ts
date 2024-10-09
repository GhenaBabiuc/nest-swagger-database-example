import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatsModule } from './modules/cats/cats.module';
import { CatEntity } from './modules/cats/cat.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'test_user',
      password: 'test_pass',
      database: 'test_db',
      entities: [CatEntity],
      synchronize: true,
    }),
    CatsModule,
  ],
})
export class AppModule {
}
