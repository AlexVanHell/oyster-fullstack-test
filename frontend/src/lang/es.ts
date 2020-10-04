export default {
	API_ERRORS: {
		CON00: 'Ocurrio un error al intentar comunicarse con el servidor',
		GEN00: 'Error interno del servidor. Contacte al administrador',
		GEN01: 'Error interno del servidor. Contacte al administrador',
		USR03: 'Usuario y/o contraseña incorrectos',
		USR06:
			'No se esta proporcionando correctamente la petición a la API, contacte al administrador',
	},
	loading: 'Cargando...',
	login: {
		title: 'Iniciar sesión',
		username: 'Usuario o correo electrónico',
		password: 'Contraseña',
		start_button: 'Iniciar',
		validation: {
			username: {
				required: 'El usuario es requerido',
			},
			password: {
				required: 'La contraseña es requerida',
			},
		},
		success: 'Iniciando sesión...',
	},
	dashboard: {
		title: 'Inicio',
		logout: 'Cerrar sesión',
		welcome: 'Bienvenido {name}',
	},
};
