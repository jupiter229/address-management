"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringToNumber = exports.formatFiat = exports.fiatToCrypto = exports.cryptoToFiat = exports.prettyFiatBalance = exports.prettyBalance = exports.dpUI = exports.dp = void 0;
const bignumber_js_1 = require("bignumber.js");
const cryptoassets_1 = require("@liquality/cryptoassets");
const VALUE_DECIMALS = 6;
const dp = (amount, coin) => {
    if (!amount)
        return amount;
    return new bignumber_js_1.default(amount).dp(cryptoassets_1.assets[coin].decimals);
};
exports.dp = dp;
const dpUI = (amount, dp = VALUE_DECIMALS) => {
    if (!amount)
        return amount;
    return new bignumber_js_1.default(amount).dp(dp, bignumber_js_1.default.ROUND_FLOOR);
};
exports.dpUI = dpUI;
const prettyBalance = (amount, coin, dp = VALUE_DECIMALS) => {
    if (!amount || !coin)
        return amount;
    amount = (0, cryptoassets_1.unitToCurrency)(cryptoassets_1.assets[coin], amount);
    return (0, exports.dpUI)(amount, dp);
};
exports.prettyBalance = prettyBalance;
const prettyFiatBalance = (amount, rate) => {
    if (!amount || !rate)
        return amount;
    const fiatAmount = new bignumber_js_1.default(amount).times(rate);
    if (fiatAmount) {
        return fiatAmount.toFormat(2, bignumber_js_1.default.ROUND_CEIL);
    }
    return new bignumber_js_1.default(0);
};
exports.prettyFiatBalance = prettyFiatBalance;
const cryptoToFiat = (amount, rate) => {
    if (!rate)
        return new bignumber_js_1.default(amount);
    return new bignumber_js_1.default(amount).times(rate);
};
exports.cryptoToFiat = cryptoToFiat;
const fiatToCrypto = (amount, rate) => {
    if (!rate)
        return amount;
    return new bignumber_js_1.default(amount).dividedBy(rate).dp(VALUE_DECIMALS, bignumber_js_1.default.ROUND_FLOOR);
};
exports.fiatToCrypto = fiatToCrypto;
const formatFiat = (amount, dp = 2) => {
    if (amount) {
        return new bignumber_js_1.default(amount).toFormat(dp, bignumber_js_1.default.ROUND_CEIL).toString();
    }
    return new bignumber_js_1.default(0);
};
exports.formatFiat = formatFiat;
const stringToNumber = (amountStr) => {
    if (amountStr) {
        return parseFloat(amountStr.toString().replace(/,/i, '').replace(/\D/g, ''));
    }
    return 0;
};
exports.stringToNumber = stringToNumber;
//# sourceMappingURL=coinFormatter.js.map