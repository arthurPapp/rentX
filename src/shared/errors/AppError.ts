export class AppError {
    public readonly message: string;
    public readonly statuCode: number;
    
    constructor(message:string, statusCode = 400) {
        this.message = message;
        this.statuCode = statusCode;
    }
}