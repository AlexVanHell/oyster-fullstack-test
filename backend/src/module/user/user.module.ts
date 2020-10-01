import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from '../../shared/shared.module';
import { UserService } from './service/user.service';
import { UserDocument, UserSchema } from './user.schema';

@Module({
	controllers: [],
	providers: [UserService],
	imports: [
		SharedModule,
		MongooseModule.forFeature([
			{ name: UserDocument.name, schema: UserSchema },
		]),
	],
	exports: [UserService],
})
export class UserModule {}
