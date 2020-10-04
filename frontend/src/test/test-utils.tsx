import { mount, shallow } from 'enzyme';
import { ReactElement } from 'react';
import { IntlConfig, IntlProvider } from 'react-intl';
import { flattenMessages } from '../common/helpers/flatten-messages.helper';
import Spanish from '../lang/es';

const intlEs = flattenMessages(Spanish);

const defaultLocale = 'es';
const JestI18n = {
	mountWithIntl: (
		node: ReactElement,
		locale = defaultLocale,
		messages: IntlConfig['messages'] = intlEs,
	) => {
		return mount(node, {
			wrappingComponent: IntlProvider,
			wrappingComponentProps: {
				locale,
				defaultLocale,
				messages,
			},
		});
	},
	shallowWithIntl: (
		node: ReactElement,
		locale = defaultLocale,
		messages: IntlConfig['messages'] = intlEs,
	) => {
		return shallow(node, {
			wrappingComponent: IntlProvider,
			wrappingComponentProps: {
				locale,
				defaultLocale,
				messages,
			},
		});
	},
};

export default JestI18n;
