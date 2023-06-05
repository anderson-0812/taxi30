import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

import { isRequiredMessage } from "../constants";

export class CreateRefreshTokenDto {
    @ApiProperty({
        example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZFBlcnNvbiI6NCwiaWRlbnRpZmljYXRpb24iOiIwMTYwMDAxMjQwMDAxIiwiZnVsbG5hbWUiOiJNb3ZlciBVIE1vdmVyIFUiLCJuYW1lIjoiTW92ZXIgVSIsImxhc3RuYW1lIjoiTW92ZXIgVSIsImVtYWlsIjoibW92ZXJ1QHVjdWVuY2EuZWR1LmVjIiwiaWRBY2NvdW50Ijo1LCJ1c2VybmFtZSI6Im1vdmVydSIsImFjdGl2ZSI6dHJ1ZSwiaW1hZ2UiOiIiLCJyZWZyZXNoIjp0cnVlLCJjb3VudHJ5Q29kZSI6Iis1OTMiLCJyb2xlIjoxLCJjZWxscGhvbmUiOiIwOTkxNTM5Mjg2IiwiaXNEaXNhYmxlZCI6ZmFsc2UsImdvb2dsZSI6ZmFsc2UsImlhdCI6MTY3NDU5MzQ4MiwiZXhwIjoxNjc0NzY2MjgyfQ.f3VB561hSbHqcRMB7Hg3JqgKXriBNPZcH7H0RKD6Qy8"
    })
    @IsNotEmpty({ message: isRequiredMessage('token') })
    token: string;

    @ApiProperty({ example: 1 })
    @IsNotEmpty({ message: isRequiredMessage('plataforma') })
    platform: number;

    @ApiProperty({ example: 1 })
    @IsNotEmpty({ message: isRequiredMessage('persona') })
    idPerson?: number;
}
export class RefreshTokenMobileDto {
    @ApiProperty({
        example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZFBlcnNvbiI6NCwiaWRlbnRpZmljYXRpb24iOiIwMTYwMDAxMjQwMDAxIiwiZnVsbG5hbWUiOiJNb3ZlciBVIE1vdmVyIFUiLCJuYW1lIjoiTW92ZXIgVSIsImxhc3RuYW1lIjoiTW92ZXIgVSIsImVtYWlsIjoibW92ZXJ1QHVjdWVuY2EuZWR1LmVjIiwiaWRBY2NvdW50Ijo1LCJ1c2VybmFtZSI6Im1vdmVydSIsImFjdGl2ZSI6dHJ1ZSwiaW1hZ2UiOiIiLCJyZWZyZXNoIjp0cnVlLCJjb3VudHJ5Q29kZSI6Iis1OTMiLCJyb2xlIjoxLCJjZWxscGhvbmUiOiIwOTkxNTM5Mjg2IiwiaXNEaXNhYmxlZCI6ZmFsc2UsImdvb2dsZSI6ZmFsc2UsImlhdCI6MTY3NDU5MzQ4MiwiZXhwIjoxNjc0NzY2MjgyfQ.f3VB561hSbHqcRMB7Hg3JqgKXriBNPZcH7H0RKD6Qy8"
    })
    @IsNotEmpty({ message: isRequiredMessage('token') })
    token: string;

    @ApiProperty({ example: 1 })
    @IsNotEmpty({ message: isRequiredMessage('id Persona') })
    idPerson: number;
}

export class ValidateTokenDto {
    @ApiProperty({
        example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZFBlcnNvbiI6NCwiaWRlbnRpZmljYXRpb24iOiIwMTYwMDAxMjQwMDAxIiwiZnVsbG5hbWUiOiJNb3ZlciBVIE1vdmVyIFUiLCJuYW1lIjoiTW92ZXIgVSIsImxhc3RuYW1lIjoiTW92ZXIgVSIsImVtYWlsIjoibW92ZXJ1QHVjdWVuY2EuZWR1LmVjIiwiaWRBY2NvdW50Ijo1LCJ1c2VybmFtZSI6Im1vdmVydSIsImFjdGl2ZSI6dHJ1ZSwiaW1hZ2UiOiIiLCJyZWZyZXNoIjp0cnVlLCJjb3VudHJ5Q29kZSI6Iis1OTMiLCJyb2xlIjoxLCJjZWxscGhvbmUiOiIwOTkxNTM5Mjg2IiwiaXNEaXNhYmxlZCI6ZmFsc2UsImdvb2dsZSI6ZmFsc2UsImlhdCI6MTY3NDU5MzQ4MiwiZXhwIjoxNjc0NzY2MjgyfQ.f3VB561hSbHqcRMB7Hg3JqgKXriBNPZcH7H0RKD6Qy8"
    })
    @IsNotEmpty({ message: isRequiredMessage('token') })
    token: string;
}

export class RefreshTokenWebDto extends ValidateTokenDto { }

