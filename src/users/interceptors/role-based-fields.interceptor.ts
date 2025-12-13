import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class RoleBasedFieldsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const path = request.url || request.path || '';
    
    // Détecter le rôle depuis le chemin de la route
    let userRole = 'client'; // Par défaut
    if (path.includes('/admin/')) {
      userRole = 'admin';
    } else if (path.includes('/client/')) {
      userRole = 'client';
    } else {
      // Sinon, récupérer depuis le header ou query
      userRole = request.headers['role'] || request.query.role || 'client';
    }

    return next.handle().pipe(
      map((data) => {
        if (Array.isArray(data)) {
          return data.map((item) => this.filterFieldsByRole(item, userRole));
        }
        return this.filterFieldsByRole(data, userRole);
      }),
    );
  }

  private filterFieldsByRole(data: any, role: string): any {
    if (!data || typeof data !== 'object') {
      return data;
    }

    // Pour admin, inclure tous les champs : id, email, role, createdAt, updatedAt
    if (role === 'admin') {
      return {
        id: data.id,
        email: data.email,
        role: data.role,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      };
    }

    // Pour client, inclure seulement id et email
    if (role === 'client') {
      return {
        id: data.id,
        email: data.email,
      };
    }

    // Par défaut, retourner seulement id et email
    return {
      id: data.id,
      email: data.email,
    };
  }
}

