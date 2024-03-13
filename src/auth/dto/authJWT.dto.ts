export class AuthJWTDto {
    constructor(
        readonly id: number,
        readonly email: string,
        readonly permission: number
    ) {}
}
