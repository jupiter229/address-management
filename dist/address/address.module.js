"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressModule = void 0;
const common_1 = require("@nestjs/common");
const address_controller_1 = require("./address.controller");
const address_service_1 = require("./address.service");
const mongoose_1 = require("@nestjs/mongoose");
const network_client_module_1 = require("../network-client/network-client.module");
const address_schema_1 = require("./schema/address.schema");
const auth_schema_1 = require("../authentication/schemas/auth.schema");
const authentication_module_1 = require("../authentication/authentication.module");
let AddressModule = class AddressModule {
};
AddressModule = __decorate([
    (0, common_1.Module)({
        controllers: [address_controller_1.AddressController],
        providers: [address_service_1.AddressService],
        imports: [
            authentication_module_1.AuthenticationModule,
            network_client_module_1.NetworkClientModule,
            mongoose_1.MongooseModule.forFeature([
                { name: address_schema_1.Address.name, schema: address_schema_1.AddressSchema },
                { name: auth_schema_1.Auth.name, schema: auth_schema_1.AuthSchema },
            ]),
        ],
    })
], AddressModule);
exports.AddressModule = AddressModule;
//# sourceMappingURL=address.module.js.map