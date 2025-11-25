 import { Injectable } from '@nestjs/common';

 @Injectable()
 export class MessagesService {
   create(content: string, status: string) {
     // Temporary in-memory stub while TypeORM is disabled
     return { content, status };
   }
 }

