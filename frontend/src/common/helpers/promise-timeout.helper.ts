export const promiseTimeout = <P>(time: number) =>
	new Promise((resolve: () => PromiseLike<P> | void) =>
		setTimeout(resolve, time),
	);
