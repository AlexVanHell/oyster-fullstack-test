import { UserDocumentInterface } from '../../module/user/user.schema';
import { ConfigDbInterface } from './config-db.interface';
import { ConfigDirInterface } from './config-dir.interface';
import { ConfigJwtOptionsInterface } from './config-jwt-options.interface';
import { ConfigPasswordInterface } from './config-password.interface';

export interface ConfigInterface {
	/** debugMode */
	debugMode: boolean;
	/** Main directories paths */
	dir: ConfigDirInterface;
	/** Database credentials and parameters */
	db: ConfigDbInterface;
	/** Password generation configuration */
	password: ConfigPasswordInterface;
	/** Jwt authentication configuration */
	auth: ConfigJwtOptionsInterface;
	/** First admin user values */
	adminUser: Partial<UserDocumentInterface>;
}
