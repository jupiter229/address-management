"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepositSchema = exports.Deposit = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose = require("mongoose");
const asset_schema_1 = require("../../asset/schemas/asset.schema");
const address_schema_1 = require("./address.schema");
let Deposit = class Deposit {
};
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose.Schema.Types.ObjectId, ref: 'Address' }),
    __metadata("design:type", address_schema_1.Address)
], Deposit.prototype, "address", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose.Schema.Types.ObjectId, ref: 'Asset' }),
    __metadata("design:type", asset_schema_1.Asset)
], Deposit.prototype, "asset", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Deposit.prototype, "amount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true }),
    __metadata("design:type", String)
], Deposit.prototype, "txHash", void 0);
Deposit = __decorate([
    (0, mongoose_1.Schema)()
], Deposit);
exports.Deposit = Deposit;
exports.DepositSchema = mongoose_1.SchemaFactory.createForClass(Deposit);
//# sourceMappingURL=deposit.schema.js.map