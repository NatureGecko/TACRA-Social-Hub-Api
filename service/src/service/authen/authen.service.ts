import { Storage } from '@google-cloud/storage';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../modules/prisma/prisma.service';
import { AuthenGenerateTokenRequestDto } from '../../definitions/types';

@Injectable()
export class AuthenService {
  constructor(private readonly prisma: PrismaService) {}

  // [ POST ] authen/generate-token
  async generateToken(input: AuthenGenerateTokenRequestDto) {
    let targetProfile = await this.prisma.userProfile.findFirst({
      where: { site: input.env, id: input.userId },
    });
    if (!targetProfile) {
      targetProfile = await this.prisma.userProfile.create({
        data: {
          id: input.userId,
          site: input.env,
          name: 'No name',
        },
      });
    }

    // if(!targetProfile){
    //   throw new
    // }

    // if (!targetUser) {
    //   throw new GeneralError('AUTHENTICATION_INVALID_CREDENTIALS');
    // }

    // const hashedInputPassword = await bcrypt.hash(
    //   input.password,
    //   targetUser.salt,
    // );

    // const passwordValid = hashedInputPassword.localeCompare(
    //   targetUser.password,
    // );

    // if (passwordValid) {
    //   throw new GeneralError('AUTHENTICATION_INVALID_CREDENTIALS');
    // }
    // const payload = { sub: targetUser.id, username: targetUser.username };
    // const accessToken = await this.jwtService.signAsync(payload);

    // console.log(input.env);
    // console.log(input.userId);
    // console.log(input);
    return { accessToken: '' };
  }
}
