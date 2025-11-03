// importer Module
import { Module } from '@nestjs/common';
// importer AppController
import { AppController } from './app.controller';
@Module({
imports: [],
controllers: [AppController],
providers: [],
})
export class AppModule {}