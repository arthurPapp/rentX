//sobreecreve o metodo Request para retornar erros personalizados
declare namespace Express{
    export interface Request{
        user: {
            id: string;
        };
    }
}