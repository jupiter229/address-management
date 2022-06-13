import { AuthenticationService } from './authentication.service';
import { CreateUserDto } from './dto/create.user.dto';
export declare class AuthenticationController {
    private authService;
    constructor(authService: AuthenticationService);
    register(createUserDto: CreateUserDto): Promise<void>;
    login(req: any): Promise<{
        access_token: string;
    }>;
}
