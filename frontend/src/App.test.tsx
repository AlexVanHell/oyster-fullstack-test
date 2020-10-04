import { render } from '@testing-library/react';
import React from 'react';
import App from './App';

test('renders app', () => {
	const app = render(<App />);
	expect(app).toBeDefined();
});
