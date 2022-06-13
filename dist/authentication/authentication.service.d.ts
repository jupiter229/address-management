import { CreateUserDto } from './dto/create.user.dto';
import { Model } from 'mongoose';
import { AuthDocument } from './schemas/auth.schema';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
export declare class AuthenticationService {
    private configService;
    private jwtService;
    private authDocumentModel;
    constructor(configService: ConfigService, jwtService: JwtService, authDocumentModel: Model<AuthDocument>);
    register(createUserDto: CreateUserDto): Promise<void>;
    login(user: AuthDocument): Promise<{
        access_token: string;
    }>;
    validateUser(email: string, pass: string): Promise<any>;
}
