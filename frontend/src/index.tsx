import React from 'react';
import ReactDOM from 'react-dom';
import { IntlProvider } from 'react-intl';
import App from './App';
import { flattenMessages } from './common/helpers/flatten-messages.helper';
import './index.scss';
import Spanish from './lang/es';
import * as serviceWorker from './serviceWorker';

const intlEs = flattenMessages(Spanish);

ReactDOM.render(
	<React.StrictMode>
		<IntlProvider defaultLocale={'es'} locale={'es'} messages={intlEs}>
			<App />
		</IntlProvider>
	</React.StrictMode>,
	document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
