import { IsBoolean, IsString } from 'class-validator';

export class MutationOutput {
  @IsString()
  error?: string;

  @IsBoolean()
  ok: boolean;
}
