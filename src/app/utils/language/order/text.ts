export type typeOrderText = {
  mainTitle: string;
  subTitle: string;
};

export const orderStatusTranslations: { [key: string]: string } = {
  CONFIRM: 'CONFIRMADA',
  IN_PROGRESS: 'EN PROCESO',
  FAILED: 'FALLIDO',
};

export const EN_orderText: typeOrderText = {
  mainTitle: 'YOUR ORDER',
  subTitle: 'ORDER #',
};

export const ES_orderText: typeOrderText = {
  mainTitle: 'PEDIDO',
  subTitle: 'DETALLES',
  
};
