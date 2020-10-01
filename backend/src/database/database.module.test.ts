import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

export const DatabaseModuleTest = (customOpts: MongooseModuleOptions = {}) =>
	MongooseModule.forRootAsync({
		useFactory: async (): Promise<MongooseModuleOptions> => {
			const mongod = new MongoMemoryServer();
			const uri = await mongod.getUri();
			/* const port = await mongod.getPort();
			const dbPath = await mongod.getDbPath();
			const dbName = await mongod.getDbName(); */

			return {
				uri,
				...customOpts,
			};
		},
		imports: [],
	});
