import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Publico } from 'src/common/decorators/publico.decorator';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RefreshAuthGuard } from './guards/refresh-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Publico()
  @Post('registrar')
  registrar(@Body() registerDto: CreateUserDto) {
    return this.authService.registrar(
      registerDto.nome,
      registerDto.email,
      registerDto.senha,
    );
  }

  @Publico()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  signIn(@Req() req: LoginUserDto) {
    return this.authService.login(req.usuario);
  }

  @Publico()
  @UseGuards(RefreshAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  reautenticar(@Req() refreshDto: LoginUserDto) {
    return this.authService.reautenticar(refreshDto.usuario);
  }
}
