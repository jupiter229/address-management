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
exports.AssetService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const asset_schema_1 = require("./schemas/asset.schema");
const address_schema_1 = require("../address/schema/address.schema");
const mongoose_2 = require("mongoose");
const lodash_1 = require("lodash");
const cryptoassets_1 = require("@liquality/cryptoassets");
let AssetService = class AssetService {
    constructor(assetDocumentModel, addressDocumentModel) {
        this.assetDocumentModel = assetDocumentModel;
        this.addressDocumentModel = addressDocumentModel;
        assetDocumentModel.find({}).then((results) => {
            if (results.length === 0) {
                const assetsAsArr = (0, lodash_1.values)(cryptoassets_1.assets);
                (0, lodash_1.forEach)(assetsAsArr, async function (singleAsset) {
                    try {
                        await assetDocumentModel.create(Object.assign(Object.assign({}, singleAsset), { isEnable: false }));
                    }
                    catch (e) {
                        console.log(e.message);
                    }
                });
            }
        });
    }
};
AssetService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(asset_schema_1.Asset.name)),
    __param(1, (0, mongoose_1.InjectModel)(address_schema_1.Address.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], AssetService);
exports.AssetService = AssetService;
//# sourceMappingURL=asset.service.js.map