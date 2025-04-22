type typeLoginUserText = {
    mainText: string,
    buttonCard: string,
};

type typeNotLoginUserText = {
    mainText: string,
    titleCard: string,
    subtitleCard: string,
    usernameLabel: string,
    passwordLabel: string,
    buttonCard: string,
    buttonCard2: string,
    alertTextCreateAccount: alertText,
    toastTextRegister: alertText,
    toastTextUserAlreadyExist: alertText,
    toastTextLogin: alertText,
    toastTextUserNotExist: alertText,
    toastTextInvalidPassword: alertText,
    toastTextLogout: alertText,
    toastTextUserRegister: alertText,
    toastTextRegisterFailed: alertText,
};

type alertText = {
    header?: string,
    message?: string,
    buttons?: string[]
}

export type typeAccountText = {
    loginUser: typeLoginUserText,
    notLoginUser: typeNotLoginUserText,
};

const EN_toastTextRegisterFailed : alertText = {
    message: 'FAILED TO REGISTER USER!',
}

const ES_toastTextRegisterFailed : alertText = {
    message: 'FALLO EN EL REGISTRO DEL USUARIO!',
}

const EN_toastTextUserRegister : alertText = {
    message: 'USER REGISTER SUCCESSFUL!',
}

const ES_toastTextUserRegister : alertText = {
    message: 'USUARIO REGISTRADO EXITOSAMENTE!',
}

const EN_toastTextRegister : alertText = {
    message: 'REGISTER SUCCESSFUL!',
}

const ES_toastTextRegister : alertText = {
    message: 'REGISTRO EXITOSO!',
}

const EN_toastTextUserAlreadyExist : alertText = {
    message: 'SORRY, THAT USERNAME IS ALREADY TAKEN! :)',
}
const ES_toastTextUserAlreadyExist : alertText = {
    message: 'LO SENTIMOS, ESE NOMBRE DE USUARIO YA ESTÁ OCUPADO! :)',
}

const EN_toastTextLogin : alertText = {
    message: 'LOGIN SUCCESSFUL!',
}

const ES_toastTextLogin : alertText = {
    message: 'INICIO DE SESIÓN EXITOSO!',
}

const EN_toastTextUserNotExist : alertText = {
    message: 'SORRY, WE COULDN NOT FIND AN ACCOUNT WITH THAT USERNAME! :)',
}
const ES_toastTextUserNotExist : alertText = {
    message: 'LO SENTIMOS, NO PUDIMOS ENCONTRAR UNA CUENTA CON ESE NOMBRE DE USUARIO! :)',
}

const EN_toastTextInvalidPassword : alertText = {
    message: 'SORRY, THAT PASSWORD IS NOT RIGHT! :)',
}

const ES_toastTextInvalidPassword : alertText = {
    message: 'LO SENTIMOS, ESA CONTRASEÑA NO ES CORRECTA! :)',
}

const EN_toastTextLogout : alertText = {
    message: 'LOGOUT SUCCESSFUL!',
}

const ES_toastTextLogout : alertText = {
    message: 'SESIÓN CERRADA EXITOSAMENTE!',
}

const EN_alertCreateAccount: alertText = {
    header: 'DO YOU WANT TO CREATE AN ACCOUNT?',
    message: 'TAP ACCEPT TO CREATE YOUR ACCOUNT.',
    buttons: ['ACCEPT', 'CANCEL'],
}

const ES_alertCreateAccount: alertText = {
    header: '¿DESEA CREAR UNA CUENTA?',
    message: 'TAP EN ACEPTAR PARA CREAR SU CUENTA.',
    buttons: ['ACEPTAR', 'CANCELAR'],
}

const EN_loginUserText : typeLoginUserText = {
    mainText: 'YOUR ACCOUNT',
    buttonCard: 'LOGOUT',
};

const ES_loginUserText : typeLoginUserText = {
    mainText: 'TU CUENTA',
    buttonCard: 'CERRAR SESIÓN',
};

const EN_notLoginUserText : typeNotLoginUserText = {
    mainText: 'ACCOUNT',
    titleCard: 'ALFA3 ELECTRICS',
    subtitleCard: 'HEY! WELCOME TO OUR SHOP',
    usernameLabel: 'DOCUMENT NUMBER',
    passwordLabel: 'PASSWORD',
    buttonCard: 'LOGIN',
    buttonCard2: 'REGISTER',
    alertTextCreateAccount: EN_alertCreateAccount,
    toastTextRegister: EN_toastTextRegister,
    toastTextUserAlreadyExist: EN_toastTextUserAlreadyExist,
    toastTextLogin: EN_toastTextLogin,
    toastTextUserNotExist: EN_toastTextUserNotExist,
    toastTextInvalidPassword: EN_toastTextInvalidPassword,
    toastTextLogout: EN_toastTextLogout,
    toastTextUserRegister: EN_toastTextUserRegister,
    toastTextRegisterFailed: EN_toastTextRegisterFailed,
};

const ES_notLoginUserText : typeNotLoginUserText = {
    mainText: 'CUENTA',
    titleCard: 'ALFA3 ELÉCTRICOS',
    subtitleCard: 'HEY! BIENVENIDO A NUESTRA TIENDA',
    usernameLabel: 'NÚMERO DE DOCUMENTO',
    passwordLabel: 'CONTRASEÑA',
    buttonCard: 'INICIAR SESIÓN',
    buttonCard2: 'REGISTRAR',
    alertTextCreateAccount: ES_alertCreateAccount,
    toastTextRegister: ES_toastTextRegister,
    toastTextUserAlreadyExist: ES_toastTextUserAlreadyExist,
    toastTextLogin: ES_toastTextLogin,
    toastTextUserNotExist: ES_toastTextUserNotExist,
    toastTextInvalidPassword: ES_toastTextInvalidPassword,
    toastTextLogout: ES_toastTextLogout,
    toastTextUserRegister: ES_toastTextUserRegister,
    toastTextRegisterFailed: ES_toastTextRegisterFailed,
};

export const EN_AccountText : typeAccountText = {
    loginUser: EN_loginUserText,
    notLoginUser: EN_notLoginUserText,
};

export const ES_AccountText : typeAccountText = {
    loginUser: ES_loginUserText,
    notLoginUser: ES_notLoginUserText,
};