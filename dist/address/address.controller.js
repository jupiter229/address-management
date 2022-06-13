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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressController = void 0;
const common_1 = require("@nestjs/common");
const address_service_1 = require("./address.service");
const common_2 = require("@nestjs/common");
const create_address_dto_1 = require("./dto/create.address.dto");
const jwt_auth_guard_1 = require("../authentication/jwt-auth.guard");
const transfer_assets_dto_1 = require("./dto/transfer.assets.dto");
let AddressController = class AddressController {
    constructor(addressService) {
        this.addressService = addressService;
    }
    async generateNewAddress(createAddressDto, req) {
        const address = await this.addressService.generateAddress(req.user.id, createAddressDto);
        if (address) {
            return {
                address: address.address,
                code: createAddressDto.code,
            };
        }
        throw new common_1.HttpException({
            status: common_1.HttpStatus.BAD_REQUEST,
            error: 'Ops, an error occurred, please try again later',
        }, common_1.HttpStatus.BAD_REQUEST);
    }
    getAddresses(req, query) {
        const { page = 1 } = query;
        return this.addressService.getAddresses(req.user.id, { page });
    }
    getAssets(params, req) {
        const { addressId } = params;
        return this.addressService.getAssets(req.user.id, addressId);
    }
    transferAsset(transferAssetsDto, req, params) {
        const { addressId } = params;
        return this.addressService.transferAsset(req.user.id, addressId, transferAssetsDto);
    }
};
__decorate([
    (0, common_2.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_2.Post)(''),
    __param(0, (0, common_2.Body)()),
    __param(1, (0, common_2.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_address_dto_1.CreateAddressDto, Object]),
    __metadata("design:returntype", Promise)
], AddressController.prototype, "generateNewAddress", null);
__decorate([
    (0, common_2.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(''),
    __param(0, (0, common_2.Request)()),
    __param(1, (0, common_2.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AddressController.prototype, "getAddresses", null);
__decorate([
    (0, common_2.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('/:addressId'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_2.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AddressController.prototype, "getAssets", null);
__decorate([
    (0, common_2.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_2.Post)('/:addressId/transfer'),
    __param(0, (0, common_2.Body)()),
    __param(1, (0, common_2.Request)()),
    __param(2, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [transfer_assets_dto_1.TransferAssetsDto, Object, Object]),
    __metadata("design:returntype", void 0)
], AddressController.prototype, "transferAsset", null);
AddressController = __decorate([
    (0, common_1.Controller)('address'),
    __metadata("design:paramtypes", [address_service_1.AddressService])
], AddressController);
exports.AddressController = AddressController;
//# sourceMappingURL=address.controller.js.map