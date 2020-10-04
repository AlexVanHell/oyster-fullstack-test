import React from 'react';
import { IntlProvider } from 'react-intl';
import './App.scss';
import { ServiceContext } from './common/context/services.context';
import { buildServices } from './common/helpers/build-services.helper';
import { flattenMessages } from './common/helpers/flatten-messages.helper';
import Spanish from './lang/es';
import RoutesHandler from './routes/RoutesHandler';

function App() {
	return (
		<IntlProvider
			defaultLocale={'es'}
			locale={'es'}
			messages={flattenMessages(Spanish)}
		>
			<ServiceContext.Provider value={buildServices()}>
				<RoutesHandler />
			</ServiceContext.Provider>
		</IntlProvider>
	);
}

export default App;
