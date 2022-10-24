import { AppError } from '../../../../errors/AppError';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { UserRepositoryInMemory } from '../../repositories/in-memory/UserRepositoryInMemory';
import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;


describe("Authenticate User", () => {
    beforeEach(() => {
        userRepositoryInMemory = new UserRepositoryInMemory();
        authenticateUserUseCase = new AuthenticateUserUseCase(userRepositoryInMemory);
        createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
    });
   
    it("should be able to authenticate an user", async () => {
        const user: ICreateUserDTO = {
            driver_lincense: "00123",
            email: "userteste@gmail.com",
            password: "1234",
            name: "User Teste",
            username: 'testeUser'
        };

       await createUserUseCase.execute(user);
       const result = await authenticateUserUseCase.execute({
            username: user.username,
            password: user.password,
        });

        expect(result).toHaveProperty("token");
    });

    it("should not be able to authenticate an nonexistent user", async () => {
        expect(async () => {
            const result = await authenticateUserUseCase.execute({
                username: "false user",
                password: "user.password",
            });
            
        }).rejects.toBeInstanceOf(AppError);
      
    });


    it("should be able to authenticate with incorrect password", async () => {
        expect(async () => {
            
             const user: ICreateUserDTO = {
                driver_lincense: "00123",
                email: "userteste@gmail.com",
                password: "1234",
                name: "User Teste",
                username: 'testeUser'
             };

            await createUserUseCase.execute(user);
            const result = await authenticateUserUseCase.execute({
                    username: user.username,
                    password: "user.password",
            });

        }).rejects.toBeInstanceOf(AppError);
              
    });
});