import { I18nProvider } from '@lingui/react';
import React, { Fragment } from 'react';
import './App.css';
import ProtectedLayout from './layout/ProtectedLayout';
import PublicLayout from './layout/PublicLayout';
import catalogEs from './locale/es/messages';

const catalgos = { es: catalogEs as any };

function App() {
	return (
		<Fragment>
			<I18nProvider language={'es'} catalogs={catalgos}>
				<PublicLayout />
				<ProtectedLayout />
			</I18nProvider>
		</Fragment>
	);
}

export default App;
