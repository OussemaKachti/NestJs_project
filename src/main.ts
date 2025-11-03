// importer NestFactory
import { NestFactory } from '@nestjs/core';
// importer AppModule
import { AppModule } from './app.module';
async function bootstrap() {
// on va créer une nouvelle application Nest à partir de notre module «AppModule »
const app = await NestFactory.create(AppModule);
// on va choisir le port sur lequel notre application va être lancée
await app.listen(3000);
}
// on va exécuter notre fonction
bootstrap();