import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataModule } from './data/data.module';
import { DatabaseModule } from './database/database.module';
import { StaticModule } from './static.module';

@Module({
  imports: [DataModule, DatabaseModule,StaticModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
