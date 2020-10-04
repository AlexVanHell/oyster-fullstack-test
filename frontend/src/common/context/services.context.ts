import { createContext } from 'react';
import { ServicesNamesInterface } from '../interface/services-names.interface';

export const ServiceContext = createContext<ServicesNamesInterface>(
	{} as ServicesNamesInterface,
);
