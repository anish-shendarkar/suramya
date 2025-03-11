import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';
import { Outfit, OutfitSchema } from 'src/schemas/outfit.schema';
import { Jewellery, JewellerySchema } from 'src/schemas/jewellery.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Outfit.name, schema: OutfitSchema },
      { name: Jewellery.name, schema: JewellerySchema },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
