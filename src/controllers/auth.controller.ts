import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { ApiResponse, ApiTags, ApiBadRequestResponse, ApiOperation } from "@nestjs/swagger";

import { LogoutDto, RefreshTokenMobileDto, RefreshTokenWebDto, SignInGoogleDto, SignInMobileDto, SignInWebDto, SignUpDto, ValidateTokenDto } from "../core/dtos";
import { ErrorSignInResponseDto, ErrorSignUpResponseDto, SuccessLogoutResponseDto, SuccessRefreshTokenResponseDto, SuccessSignInResponseDto
    , SuccessSignUpResponseDto, SuccessValidateTokenDto } from "../core/dtos/responses";
import { AuthUseCases } from "../use-cases/auth";

@ApiTags('Autenticación')
@Controller('/api/auth')
export class AuthController {
    constructor(private authUseCases: AuthUseCases) { }

    @ApiOperation({ 
        summary: 'Registrar usuarios',
        description: 'Registrar nuevos usuarios en el sistema.'
    })
    @Post('/signup')
    @ApiResponse({
        status: 201,
        description: 'Registro de usuario exitoso',
        type: SuccessSignUpResponseDto
    })
    @ApiBadRequestResponse({
        status: 400,
        description: 'El usuario ya se encuentra registrado o faltan campos en el cuerpo de la petición',
        type: ErrorSignUpResponseDto,
    })
    signUp(@Body() signUpDto: SignUpDto) {
        return this.authUseCases.signup(signUpDto);
    }

    @HttpCode(HttpStatus.OK)
    @Post('/signin')
    @ApiResponse({
        status: 200,
        description: `Inicio de sesión para dispositivos móviles. En caso de que exista un error, el campo "Error Code" de la respuesta será 102.`,
        type: SuccessSignInResponseDto
    })
    singIn(@Body() singInMobileDto: SignInMobileDto) {
        return this.authUseCases.singin(singInMobileDto);
    }

    @Post('/refresh-token')
    @ApiResponse({
        status: 201,
        description: `Refresca el token de JWT para acceso a los recursos. Es para dispositivos móviles.`,
        type: SuccessRefreshTokenResponseDto
    })
    refreshToken(@Body() refreshTokenMobileDto: RefreshTokenMobileDto) {
        return this.authUseCases.refreshToken(refreshTokenMobileDto);
    }

    @Post('/signin-web')
    @ApiResponse({
        status: 201,
        description: 'Inicio de Sesión para web.',
        type: SuccessSignInResponseDto
    })
    @ApiResponse({
        status: 400,
        description: 'Existen problemas al iniciar sesión o faltan campos en el cuerpo de la petición',
        type: ErrorSignInResponseDto,
    })
    singInWeb(@Body() signInWebDto: SignInWebDto) {
        return this.authUseCases.signinWeb(signInWebDto);
    }

    @Post('/validate-token')
       @ApiResponse({
        status: 201,
        description: 'Validación de token para web llevada a cabo correctamente.',
        type: SuccessValidateTokenDto
    })
    validateToken(@Body() validateTokenDto: ValidateTokenDto) {
        return this.authUseCases.validateToken(validateTokenDto);
    }

    @Post('/refresh-token-web')
    @ApiResponse({
        status: 201,
        description: `Refresca el token de JWT para acceso a los recursos. Es usado en la versión web.`,
        type: SuccessRefreshTokenResponseDto
    })
    refreshTokenWeb(@Body() refreshTokenWebDto: RefreshTokenWebDto) {
        return this.authUseCases.refreshTokenWeb(refreshTokenWebDto);
    }

    @Post('/signin-google')
    @ApiResponse({
        status: 201,
        description: 'Inicio de sesión con google exitoso',
        type: SuccessSignInResponseDto
    })
    @ApiResponse({
        status: 400,
        description: 'Existen problemas al iniciar sesión con google o faltan campos en el cuerpo de la petición',
        type: ErrorSignInResponseDto,
    })
    singInGoogle(@Body() signInGoogleDto: SignInGoogleDto) {
        return this.authUseCases.singInGoogle(signInGoogleDto.token, signInGoogleDto.google, signInGoogleDto.callFromWeb);
    }

    @Post('/logout')
    @ApiResponse({
        status: 201,
        description: 'Cerrado de sesión exitoso.',
        type: SuccessLogoutResponseDto
    })
    logout(@Body() logoutDto: LogoutDto) {
        return this.authUseCases.logout(logoutDto);
    }
}