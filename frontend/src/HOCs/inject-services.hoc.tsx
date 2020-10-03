import React, { ComponentType, FunctionComponent } from 'react';
import { ServiceContext } from '../common/context/services.context';
import { ServicesNamesInterface } from '../common/interface/services-names.interface';

export type InjectServicesWrappedProps<
	Services extends keyof ServicesNamesInterface = never
> = {
	services: Pick<ServicesNamesInterface, Services>;
};

type WithInjectServicesProps<P> = Omit<
	P,
	keyof InjectServicesWrappedProps
> & {};

export const injectServices = <
	P extends InjectServicesWrappedProps = InjectServicesWrappedProps
>(
	WrappedComponent: ComponentType<P>,
	services: InstanceType<any>[],
): FunctionComponent<WithInjectServicesProps<P>> => {
	const filterServices = (servicesNames: ServicesNamesInterface) => {
		return Object.keys(servicesNames).reduce((prev, key) => {
			const instance = servicesNames[key as keyof ServicesNamesInterface];
			const findService = services.find((S) => instance instanceof S);

			return {
				...prev,
				...(findService && {
					[key]: servicesNames[key as keyof ServicesNamesInterface],
				}),
			};
		}, {} as ServicesNamesInterface);
	};

	return function Wrapped({ ...props }: WithInjectServicesProps<P>) {
		return (
			<ServiceContext.Consumer>
				{(s) => (
					<WrappedComponent
						{...(props as P)}
						services={filterServices(s as ServicesNamesInterface)}
					/>
				)}
			</ServiceContext.Consumer>
		);
	};
};
