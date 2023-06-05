import { ApiProperty } from "@nestjs/swagger";
import { SuccessResponseDto } from "../generic_response.dto";

export class RefreshTokenDto {
    @ApiProperty({ example: 1 })
    idRefreshToken: number;

    @ApiProperty({
        example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZFBlcnNvbiI6NCwiaWRlbnRpZmljYXRpb24iOiIwMTYwMDAxMjQwMDAxIiwiZnVsbG5hbWUiOiJNb3ZlciBVIE1vdmVyIFUiLCJuYW1lIjoiTW92ZXIgVSIsImxhc3RuYW1lIjoiTW92ZXIgVSIsImVtYWlsIjoibW92ZXJ1QHVjdWVuY2EuZWR1LmVjIiwiaWRBY2NvdW50Ijo1LCJ1c2VybmFtZSI6Im1vdmVydSIsImFjdGl2ZSI6dHJ1ZSwiaW1hZ2UiOiIiLCJyZWZyZXNoIjp0cnVlLCJjb3VudHJ5Q29kZSI6Iis1OTMiLCJyb2xlIjoxLCJjZWxscGhvbmUiOiIwOTkxNTM5Mjg2IiwiaXNEaXNhYmxlZCI6ZmFsc2UsImdvb2dsZSI6ZmFsc2UsImlhdCI6MTY3NDU5MzQ4MiwiZXhwIjoxNjc0NzY2MjgyfQ.f3VB561hSbHqcRMB7Hg3JqgKXriBNPZcH7H0RKD6Qy8"
    })
    token: string;

    @ApiProperty({ example: "1674669143610" })
    expiryDate: string;

    @ApiProperty({ example: 1 })
    platform: number;
}

export class RefreshTokenInformationDto {
    @ApiProperty({ example: 1 })
    idRefreshToken: number;

    @ApiProperty({
        example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZFBlcnNvbiI6NCwiaWRlbnRpZmljYXRpb24iOiIwMTYwMDAxMjQwMDAxIiwiZnVsbG5hbWUiOiJNb3ZlciBVIE1vdmVyIFUiLCJuYW1lIjoiTW92ZXIgVSIsImxhc3RuYW1lIjoiTW92ZXIgVSIsImVtYWlsIjoibW92ZXJ1QHVjdWVuY2EuZWR1LmVjIiwiaWRBY2NvdW50Ijo1LCJ1c2VybmFtZSI6Im1vdmVydSIsImFjdGl2ZSI6dHJ1ZSwiaW1hZ2UiOiIiLCJyZWZyZXNoIjp0cnVlLCJjb3VudHJ5Q29kZSI6Iis1OTMiLCJyb2xlIjoxLCJjZWxscGhvbmUiOiIwOTkxNTM5Mjg2IiwiaXNEaXNhYmxlZCI6ZmFsc2UsImdvb2dsZSI6ZmFsc2UsImlhdCI6MTY3NDU5MzQ4MiwiZXhwIjoxNjc0NzY2MjgyfQ.f3VB561hSbHqcRMB7Hg3JqgKXriBNPZcH7H0RKD6Qy8"
    })
    token: string;
}

export class SuccessGetRefreshTokenResponseDto extends SuccessResponseDto {
    @ApiProperty({ example: "Refresh Token obtenido correctamente" })
    message: string;

    @ApiProperty({ type: RefreshTokenDto })
    data: RefreshTokenDto;
}
