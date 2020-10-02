import { I18n } from '@lingui/react';
import React, { ComponentType, FunctionComponent } from 'react';

export interface I18nProps {
	i18n: { [key: string]: any };
}

export const withI18n = <P extends Record<string, any>>(
	Component: ComponentType<P>,
): FunctionComponent<P> => (props: P) => {
	return (
		<I18n>{({ i18n }) => <Component i18n={i18n} {...props}></Component>}</I18n>
	);
};
