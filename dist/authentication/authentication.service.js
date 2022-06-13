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
exports.AuthenticationService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const auth_schema_1 = require("./schemas/auth.schema");
const bcryptjs = require("bcryptjs");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
let AuthenticationService = class AuthenticationService {
    constructor(configService, jwtService, authDocumentModel) {
        this.configService = configService;
        this.jwtService = jwtService;
        this.authDocumentModel = authDocumentModel;
    }
    async register(createUserDto) {
        const existingUser = await this.authDocumentModel.findOne({
            email: createUserDto.email,
        });
        if (existingUser) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.BAD_REQUEST,
                error: 'Email has already been used',
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        const hash = await bcryptjs.hash(createUserDto.password, parseInt(this.configService.get('PASSWORD_SALT')));
        await this.authDocumentModel.create({
            email: createUserDto.email,
            password: hash,
        });
    }
    async login(user) {
        const payload = { id: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
    async validateUser(email, pass) {
        const user = await this.authDocumentModel.findOne({
            email,
        });
        if (user) {
            const isMatch = await bcryptjs.compare(pass, user.password);
            if (isMatch) {
                return {
                    id: user.id,
                };
            }
        }
        return null;
    }
};
AuthenticationService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, mongoose_1.InjectModel)(auth_schema_1.Auth.name)),
    __metadata("design:paramtypes", [config_1.ConfigService,
        jwt_1.JwtService,
        mongoose_2.Model])
], AuthenticationService);
exports.AuthenticationService = AuthenticationService;
//# sourceMappingURL=authentication.service.js.map