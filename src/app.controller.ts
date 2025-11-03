// importer Controller et Get
import { Controller, Get } from '@nestjs/common';
// créer une classe et préciser que c'est un Controller à l'aide du décorateur @Controller
// On peut ajouter un préfixe pour accéder aux routes de ce Controller
@Controller("/app")
// ajouter export pour utiliser cette classe dans d'autre fichiers
export class AppController {
// @Get précise la route qui va déclencher la fonction getRoute()
@Get()
getRoute() {
return 'Welcome Oussema Kachti';
}
// On peut ajouter plusieurs routes
@Get("/test")
getTestRoute() {
return "This is a test route"
}
}