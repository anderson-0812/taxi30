import { RefreshTokenMobileDto } from "../dtos";
import { Account, Person } from "../entities";

export abstract class IAuthServices {
    abstract signUp(person: Person, google: boolean): Promise<Person>;
    abstract refreshToken(refreshTokenMobileDto: RefreshTokenMobileDto): Promise<any>;
    abstract refreshTokenWeb(token: string): Promise<any>;
    abstract signIn(account: Account,  callFromGoogle: boolean): Promise<any>;
    abstract validateToken(token: string): Promise<any>;
    abstract signInWeb(account: Account, callFromGoogle: boolean): Promise<any>;
    abstract verifyPersonActiveWebGoogle(email: string): Promise<any>;
    abstract getPersonWebGoogle(email: string): Promise<any>;
}