export type typeHomeText = {
    mainText: string,
    segmentLabel1: string,
    segmentLabel2: string,
    firstButtonCard: string,
    secondButtonCard: string,
    mainTextBenefits: string,
    firstMainCardBenefits: string,
    firstSubtextCardBenefits: string,
    secondMainCardBenefits: string,
    secondSubtextCardBenefits: string,
    thirdMainCardBenefits: string,
    thirdSubtextCardBenefits: string,
};

export type typeToastText = {
    message?: string,
    header?: string,
    subHeader?: string,
    buttonText?: string;
    buttonText2?: string;
};

export const EN_toastTextWholesale: typeToastText = {
    header: 'BUYING WHOLESALE?',
    subHeader: 'LET’S CHAT ON WHATSAPP FOR THE BEST SERVICE!',
    buttonText: 'YES, OPEN WHATSAPP',
    buttonText2: 'NO, THANKS',
}

export const ES_toastTextWholesale: typeToastText = {
    header: '¿COMPRA AL POR MAYOR?',
    subHeader: '¡HABLEMOS POR WHATSAPP PARA UNA MEJOR ASESORIA!',
    buttonText: 'SÍ, ABRIR WHATSAPP',
    buttonText2: 'NO, GRACIAS',
}

export const EN_toastText = {
    message: 'ADDED TO CART!'
};

export const ES_toastText = {
    message: 'AGREGADO AL CARRITO!'
};


export const EN_homeText : typeHomeText = {
    mainText: 'OUR PRODUCTS',
    segmentLabel1: 'POWER STRIP',
    segmentLabel2: 'VOLTAGE REGULATOR',
    firstButtonCard: 'ADD CART',
    secondButtonCard: 'MORE INFO',
    mainTextBenefits: 'OUR BENEFITS',
    firstMainCardBenefits: 'SHOP FROM ANYWHERE',
    firstSubtextCardBenefits: "ADD THE PRODUCTS YOU WANT TO YOUR CART. WE'LL DELIVER THEM TO WHEREVER YOU ARE.",
    secondMainCardBenefits: 'CHOOSE PAYMENT METHOD',
    secondSubtextCardBenefits: 'PAY WITH CARD OR CASH. YOUR MONEY IS PROTECTED WITH MERCADO PAGO.',
    thirdMainCardBenefits: 'YOUR PRODUCTS IN 48 HOURS',
    thirdSubtextCardBenefits: 'YOUR PACKAGES ARE SAFE. YOU HAVE THE SUPPORT OF A NATIONAL SHIPPING COMPANY.',
};


export const ES_homeText : typeHomeText = {
    mainText: 'NUESTROS PRODUCTOS',
    segmentLabel1: 'MULTITOMA',
    segmentLabel2: 'REGULADOR DE VOLTAJE',
    firstButtonCard: 'AGREGAR',
    secondButtonCard: 'MÁS INFO',
    mainTextBenefits: 'NUESTROS BENEFICIOS',
    firstMainCardBenefits: 'COMPRA DESDE AQUÍ',
    firstSubtextCardBenefits: 'AGREGA LOS PRODUCTOS A TU CARRITO. TE LOS LLEGA DONDE ESTÉS.',
    secondMainCardBenefits: 'ELIGE MÉTODO PAGO',
    secondSubtextCardBenefits: 'PAGA CON TARJETA O EN EFECTIVO. TU DINERO ESTÁ SEGURO EN MERCADO PAGO.',
    thirdMainCardBenefits: 'TUS PRODUCTOS EN 48H',
    thirdSubtextCardBenefits: 'TUS PAQUETES ESTÁN SEGUROS. TIENES EL APOYO DE UNA EMPRESA DE ENVÍOS.',
};
