import BN from 'bignumber.js';
export declare const dp: (amount: any, coin: any) => any;
export declare const dpUI: (amount: any, dp?: number) => any;
export declare const prettyBalance: (amount: any, coin: any, dp?: number) => any;
export declare const prettyFiatBalance: (amount: any, rate: any) => any;
export declare const cryptoToFiat: (amount: any, rate: any) => BN;
export declare const fiatToCrypto: (amount: any, rate: any) => any;
export declare const formatFiat: (amount: any, dp?: number) => string | BN;
export declare const stringToNumber: (amountStr: any) => number;
