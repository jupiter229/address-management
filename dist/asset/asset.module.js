"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetModule = void 0;
const common_1 = require("@nestjs/common");
const asset_service_1 = require("./asset.service");
const mongoose_1 = require("@nestjs/mongoose");
const asset_schema_1 = require("./schemas/asset.schema");
const address_schema_1 = require("../address/schema/address.schema");
let AssetModule = class AssetModule {
};
AssetModule = __decorate([
    (0, common_1.Module)({
        providers: [asset_service_1.AssetService],
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: asset_schema_1.Asset.name, schema: asset_schema_1.AssetSchema },
                { name: address_schema_1.Address.name, schema: address_schema_1.AddressSchema },
            ]),
        ],
    })
], AssetModule);
exports.AssetModule = AssetModule;
//# sourceMappingURL=asset.module.js.map