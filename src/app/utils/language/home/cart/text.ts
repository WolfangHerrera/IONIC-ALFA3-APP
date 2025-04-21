export type typeCartText = {
    mainText: string,
    subtitleText: string
    emptyCartText: string
    buttonCart: string
    mainTextCustomerDetails: string
    subtextCustomerDetails: string
    checkboxCustomerDetails: string
    documentTypeLabel: string
    formDocumentType: typeFormDocumentType
    documentNumberCustomer: string
    fullNameCustomer: string
    phoneNumberCustomer: string
    emailCustomer: string
    streetAddressCustomer: string
    cityCustomer: string
    mainTextShipping: string
    fullNameShipping: string
    phoneNumberShipping: string
    streetAddressShipping: string
    cityShipping: string
    mainTextPayment: string
    paymethodLabel: string
    formSelectPaymethod: typeFormSelectPaymethod
    buttonOrder: string
    alertTextDeleteItem: alertText
    alertTextLocalStorage: alertText
    alertTextCheckoutCart: alertText
    toastCheckoutCart: string
    toastCheckoutCartRedirect: string
};

type alertText = {
    header?: string,
    message?: string,
    buttons?: string[]
}

type typeFormDocumentType = {
    CC: string,
    NIT: string,
    PASSPORT: string,
    FOREIGN_DOCUMENT: string
}

type typeFormSelectPaymethod = {
    CARD: string,
    ACCOUNT: string,
    BANCOLOMBIA: string,
    NEQUI: string,
    DAVIPLATA: string,
};

const EN_alertTextDeleteItem: alertText = {
    header: 'DELETE PRODUCT?',
    message: 'IT WILL BE REMOVED FROM YOUR CART.',
    buttons: ['DELETE','CANCEL'],
}

const ES_alertTextDeleteItem: alertText = {
    header: '¿ELIMINAR PRODUCTO?',
    message: '¡SE ELIMINARA DEL CARRITO!',
    buttons: ['ELIMINAR','CANCELAR'],
}

const EN_alertTextLocalStorage: alertText = {
    header: 'DO YOU WANT TO USE THE PREVIOUS INFORMATION?',
    buttons: ['USE PREVIOUS INFO','START OVER'],
}

const ES_alertTextLocalStorage: alertText = {
    header: '¿DESEA USAR LA INFORMACIÓN ANTERIOR?',
    buttons: ['USAR INFORMACIÓN ANTERIOR','EMPEZAR DE NUEVO'],
}

const EN_alertTextCheckoutCart: alertText = {
    header: 'PROCEED WITH YOUR ORDER?',
    message: 'TAP CONFIRM ORDER TO FINALIZE YOUR PURCHASE.',
    buttons: ['CONFIRM ORDER','CANCEL ORDER'],
}

const ES_alertTextCheckoutCart: alertText = {
    header: '¿REALIZAR PEDIDO?',
    message: 'TOQUE CONFIRMAR PEDIDO PARA FINALIZAR SU COMPRA.',
    buttons: ['CONFIRMAR PEDIDO','CANCELAR PEDIDO'],
}

const EN_formDocumentType = {
    CC: 'CITIZENSHIP DOCUMENT',
    NIT: 'NIT',
    PASSPORT: 'PASSPORT',
    FOREIGN_DOCUMENT: 'FOREIGN DOCUMENT',
}
const ES_formDocumentType = {
    CC: 'CEDULA DE CIUDADANIA',
    NIT: 'NIT',
    PASSPORT: 'PASAPORTE',
    FOREIGN_DOCUMENT: 'CEDULA DE EXTRANJERIA',
}

const EN_formSelectPaymethod = {
    CARD: 'CREDIT CARD / DEBIT CARD',
    ACCOUNT: 'ACCOUNT TRANSFER (PSE)',
    BANCOLOMBIA: 'BANCOLOMBIA (ACCOUNT)',
    NEQUI: 'NEQUI',
    DAVIPLATA: 'DAVIPLATA',
}

const ES_formSelectPaymethod = {
    CARD: 'TARJETA DE CRÉDITO / DÉBITO',
    ACCOUNT: 'TRANSFERENCIA BANCARIA (PSE)',
    BANCOLOMBIA: 'BANCOLOMBIA (# CUENTA)',
    NEQUI: 'NEQUI',
    DAVIPLATA: 'DAVIPLATA',
}


export const EN_cartText : typeCartText = {
    mainText: 'YOUR CART',
    subtitleText: 'ITEMS',
    emptyCartText: 'NO ITEMS IN CART',
    buttonCart: 'CHECKOUT',
    mainTextCustomerDetails: 'CUSTOMER DETAILS',
    subtextCustomerDetails: 'CUSTOMER INFO',
    checkboxCustomerDetails: 'USE SAME INFORMATION FOR SHIPPING?',
    documentTypeLabel: 'DOCUMENT TYPE',
    formDocumentType: EN_formDocumentType,
    documentNumberCustomer: 'DOCUMENT NUMBER',
    fullNameCustomer: 'FULL NAME',
    phoneNumberCustomer: 'PHONE NUMBER',
    emailCustomer: 'EMAIL',
    streetAddressCustomer: 'BUSINNESS NAME | STREET ADDRESS',
    cityCustomer: 'CITY',
    mainTextShipping: 'SHIPPING ADDRESS',
    fullNameShipping: 'FULL NAME',
    phoneNumberShipping: 'PHONE NUMBER',
    streetAddressShipping: 'BUSINESS NAME | STREET ADDRESS',
    cityShipping: 'CITY',
    mainTextPayment: 'PAYMENT DETAIL',
    paymethodLabel: 'PAYMENT METHOD',
    formSelectPaymethod: EN_formSelectPaymethod,
    buttonOrder: 'ORDER NOW',
    alertTextDeleteItem: EN_alertTextDeleteItem,
    alertTextLocalStorage: EN_alertTextLocalStorage,
    alertTextCheckoutCart: EN_alertTextCheckoutCart,
    toastCheckoutCart: 'ORDER PLACED SUCCESSFULLY',
    toastCheckoutCartRedirect: 'REDIRECTING TO PAYMENT GATEWAY!',
};


export const ES_cartText : typeCartText = {
    mainText: 'TU CARRITO',
    subtitleText: 'ARTÍCULOS',
    emptyCartText: 'NO HAY ARTÍCULOS EN EL CARRITO',
    buttonCart: 'REALIZAR PEDIDO',
    mainTextCustomerDetails: 'DETALLES DEL CLIENTE',
    subtextCustomerDetails: 'INFORMACIÓN DEL CLIENTE',
    checkboxCustomerDetails: '¿USAR LA MISMA INFORMACIÓN PARA EL ENVÍO?',
    documentTypeLabel: 'TIPO DE DOCUMENTO',
    formDocumentType: ES_formDocumentType,
    documentNumberCustomer: 'NÚMERO DE DOCUMENTO',
    fullNameCustomer: 'NOMBRE COMPLETO',
    phoneNumberCustomer: 'NÚMERO DE CELULAR',
    emailCustomer: 'CORREO ELECTRÓNICO',
    streetAddressCustomer: 'NOMBRE DE LA EMPRESA | DIRECCIÓN',
    cityCustomer: 'CIUDAD',
    mainTextShipping: 'DIRECCIÓN DE ENVÍO',
    fullNameShipping: 'NOMBRE COMPLETO',
    phoneNumberShipping: 'NÚMERO DE CELULAR',
    streetAddressShipping: 'NOMBRE DE LA EMPRESA | DIRECCIÓN',
    cityShipping: 'CIUDAD',
    mainTextPayment: 'DETALLES DE PAGO',
    paymethodLabel: 'MÉTODO DE PAGO',
    formSelectPaymethod: ES_formSelectPaymethod,
    buttonOrder: 'CONFIRMAR PEDIDO',
    alertTextDeleteItem: ES_alertTextDeleteItem,
    alertTextLocalStorage: ES_alertTextLocalStorage,
    alertTextCheckoutCart: ES_alertTextCheckoutCart,
    toastCheckoutCart: 'PEDIDO REALIZADO CON ÉXITO',
    toastCheckoutCartRedirect: '¡REDIRIGIENDO A MERCADOPAGO!',
};
