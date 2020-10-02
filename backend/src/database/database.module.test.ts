import {
	MongooseModule,
	MongooseModuleOptions,
	MongooseOptionsFactory,
} from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

export const DatabaseServiceTest = (
	customOptions: MongooseModuleOptions = {},
) => {
	return class implements MongooseOptionsFactory {
		public async createMongooseOptions(): Promise<MongooseModuleOptions> {
			const mongod = new MongoMemoryServer();
			const uri = await mongod.getUri();
			/* const port = await mongod.getPort();
			const dbPath = await mongod.getDbPath();
			const dbName = await mongod.getDbName(); */

			return {
				uri,
				...customOptions,
			};
		}
	};
};

export const DatabaseModuleTest = (customOpts: MongooseModuleOptions = {}) =>
	MongooseModule.forRootAsync({
		useClass: DatabaseServiceTest(customOpts),
	});
