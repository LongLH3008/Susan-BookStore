"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentStatus = exports.PaymentMethod = exports.OrderState = void 0;
var OrderState;
(function (OrderState) {
    OrderState["pending"] = "pending";
    OrderState["confirmed"] = "confirmed";
    OrderState["shipped"] = "shipped";
    OrderState["cancelled"] = "cancelled";
})(OrderState || (exports.OrderState = OrderState = {}));
var PaymentMethod;
(function (PaymentMethod) {
    PaymentMethod["CreditCard"] = "credit_card";
    PaymentMethod["PayPal"] = "paypal";
    PaymentMethod["Other"] = "other";
})(PaymentMethod || (exports.PaymentMethod = PaymentMethod = {}));
var PaymentStatus;
(function (PaymentStatus) {
    PaymentStatus["Authorized"] = "authorized";
    PaymentStatus["Processed"] = "processed";
    PaymentStatus["Failed"] = "failed";
})(PaymentStatus || (exports.PaymentStatus = PaymentStatus = {}));
