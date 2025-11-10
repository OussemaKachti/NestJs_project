import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Le username est obligatoire' })
  @IsString({ message: 'Le username doit être une chaîne de caractères' })
  username: string;

  @IsNotEmpty({ message: 'L\'email est obligatoire' })
  @IsEmail({}, { message: 'L\'email doit être une adresse email valide' })
  email: string;

  status?: string; // Optionnel pour la création
}

