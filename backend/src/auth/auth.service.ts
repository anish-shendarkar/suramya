import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { use } from 'passport';
import { AdminService } from '../admin/admin.service';
import * as bcrypt from 'bcryptjs';
@Injectable()
export class AuthService {
  constructor(
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.adminService.findUserByEmail(email);

    if (user) {
      console.log('authservice validate user', user);
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        console.log('authservice password match', passwordMatch);
        return user;
      }
    }
    return null;
  }

  generateToken(user) {
    console.log('authservice generate token', user);
    const payload = { id: user._id, role: user.role };
    const token = this.jwtService.sign(payload);
    return { token, role: user.role };
  }
}
