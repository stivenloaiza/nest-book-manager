import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UserIsMe } from '../guards/alexR.guard';

export function AuthAlex() {
  return applyDecorators(
    UseGuards(AuthGuard(), UserIsMe),
    ApiBearerAuth(),
  );
}
