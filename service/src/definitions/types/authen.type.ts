import { IsNotEmpty, IsString } from 'class-validator';

// [ POST ] authen/generate-token
export class AuthenGenerateTokenRequestDto {
  @IsString()
  @IsNotEmpty()
  userId!: string;

  @IsString()
  @IsNotEmpty()
  env!: string;
}

export type TAuthenGenerateTokenResponse = {};
