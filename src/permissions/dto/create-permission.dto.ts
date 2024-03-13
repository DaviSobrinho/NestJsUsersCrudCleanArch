import { IsBoolean, IsString } from "class-validator";

export class CreatePermissionDto {
    @IsString()
    permission : string;
    @IsBoolean()
    flg_active : boolean;
}
