"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscountApplyTo = exports.DiscountType = void 0;
var DiscountType;
(function (DiscountType) {
    DiscountType["percentage"] = "percentage";
    DiscountType["fix_amount"] = "fix_amount";
})(DiscountType || (exports.DiscountType = DiscountType = {}));
var DiscountApplyTo;
(function (DiscountApplyTo) {
    DiscountApplyTo["all"] = "all";
    DiscountApplyTo["specific"] = "specific";
    DiscountApplyTo["category"] = "category";
})(DiscountApplyTo || (exports.DiscountApplyTo = DiscountApplyTo = {}));
