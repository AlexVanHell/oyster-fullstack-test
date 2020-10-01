import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigService } from './config/service/config.service';
import { UserService } from './module/user/service/user.service';
import { UserModule } from './module/user/user.module';
import { SharedModule } from './shared/shared.module';

@Module({
	imports: [SharedModule, UserModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {
	constructor(
		private readonly configService: ConfigService,
		private readonly userService: UserService,
	) {}

	public async onModuleInit() {
		Logger.log(
			`You can see api-docs at http://localhost:${process.env.PORT}/api-docs`,
			AppModule.name,
		);

		const debugMode = this.configService.get('debugMode');
		const admin = this.configService.get('adminUser');

		if (debugMode) {
			Logger.log(`Creating admin user`, AppModule.name);
		}

		try {
			const exists = await this.userService.getByUsername(admin.username);

			if (!exists) {
				await this.userService.create({
					...admin,
				});
				if (debugMode) {
					Logger.log(`User created`, AppModule.name);
				}
			}
		} catch (err) {
			Logger.error(err, AppModule.name);
		}
	}
}
