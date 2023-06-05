import { ApiProperty } from "@nestjs/swagger";
import { SuccessResponseDto } from "../generic_response.dto";

export class SuccessUpdateStatusDto extends SuccessResponseDto {
    @ApiProperty({ example: "Notificación Persona actualizada correctamente" })
    message: string;
    
    @ApiProperty({ example: null })
    data: string;
}