import React from 'react';
import App from './App';
import JestI18n from './test/test-utils';

test('renders app', () => {
	const app = JestI18n.mountWithIntl(<App />);
	expect(app).toBeDefined();
});
