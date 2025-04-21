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
};

export type typeAccountText = {
    loginUser: typeLoginUserText,
    notLoginUser: typeNotLoginUserText,
};

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
};

const ES_notLoginUserText : typeNotLoginUserText = {
    mainText: 'CUENTA',
    titleCard: 'ALFA3 ELÉCTRICOS',
    subtitleCard: 'HEY! BIENVENIDO A NUESTRA TIENDA',
    usernameLabel: 'NÚMERO DE DOCUMENTO',
    passwordLabel: 'CONTRASEÑA',
    buttonCard: 'INICIAR SESIÓN',
    buttonCard2: 'REGISTRAR',
};

export const EN_AccountText : typeAccountText = {
    loginUser: EN_loginUserText,
    notLoginUser: EN_notLoginUserText,
};

export const ES_AccountText : typeAccountText = {
    loginUser: ES_loginUserText,
    notLoginUser: ES_notLoginUserText,
};