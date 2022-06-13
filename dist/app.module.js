"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const authentication_module_1 = require("./authentication/authentication.module");
const config_1 = require("@nestjs/config");
const network_client_module_1 = require("./network-client/network-client.module");
const throttler_1 = require("@nestjs/throttler");
const wallet_module_1 = require("./wallet/wallet.module");
const wallet_schema_1 = require("./wallet/schema/wallet.schema");
const mongoose_1 = require("@nestjs/mongoose");
const AutoIncrementFactory = require("mongoose-sequence");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            authentication_module_1.AuthenticationModule,
            network_client_module_1.NetworkClientModule,
            throttler_1.ThrottlerModule.forRoot({
                ttl: 60,
                limit: 10,
            }),
            mongoose_1.MongooseModule.forRoot(process.env.MONGO_DB_URL),
            mongoose_1.MongooseModule.forFeatureAsync([
                {
                    name: wallet_schema_1.Wallet.name,
                    useFactory: async (connection) => {
                        const schema = wallet_schema_1.WalletSchema;
                        const AutoIncrement = AutoIncrementFactory(connection);
                        schema.plugin(AutoIncrement, {
                            inc_field: 'derivationIndex',
                            start_seq: 0,
                        });
                        return schema;
                    },
                    inject: [(0, mongoose_1.getConnectionToken)()],
                },
            ]),
            wallet_module_1.WalletModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map