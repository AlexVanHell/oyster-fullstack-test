import React from 'react';
import './App.scss';
import { ServiceContext } from './common/context/services.context';
import { buildServices } from './common/helpers/build-services.helper';
import RoutesHandler from './routes/RoutesHandler';

function App() {
	return (
		<ServiceContext.Provider value={buildServices()}>
			<RoutesHandler />
		</ServiceContext.Provider>
	);
}

export default App;
