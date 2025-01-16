import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioEntity } from '../usuario/usuario.entity'; 
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt'; 

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsuarioEntity) 
    private readonly usuarioRepository: Repository<UsuarioEntity>, 
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(loginDto: LoginDto): Promise<any> {
    const { email, password } = loginDto;
    const user = await this.usuarioRepository.findOne({ where: { email } });
  
    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado.');
    }
  
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Contraseña incorrecta.');
    }
  
    const payload = { email: user.email, sub: user.id, role: user.role };
    const token = this.jwtService.sign(payload);
  
    // Modificación: Incluir userId en la respuesta
    return { 
      message: 'Inicio de sesión exitoso',
      accessToken: token,
      role: user.role,
      userId: user.id  // Aquí se agrega el userId
    };
  }  
}
