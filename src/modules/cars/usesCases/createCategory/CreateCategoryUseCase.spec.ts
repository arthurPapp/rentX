import { AppError } from '../../../../errors/AppError';
import { CategoriesRepositoryInMemory } from '../../repositories/in-memory/CategoriesRepositoryInMemory';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

//serve para agrupar os testes
describe("Create category", () => {
    // sempre antes de um teste fara essa função
    beforeEach(() => {
        categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
        createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemory);
    });

   //onde vão os teste 
    it("should be able to create a new category", async () => {
        const category = {
             name: "Category Teste",
            description: "Category Description Test"
        }
        await createCategoryUseCase.execute({
           name: category.name,
            description : category.description,
        });

        const categoryCreated = await categoriesRepositoryInMemory.findByName(category.name);
        
        //o comparador do resultado com a função
        expect(categoryCreated).toHaveProperty("id");
        
    });
      it("should not be able to create a new category with name exists", async () => {
          expect(async () => {
              const category = {
                  name: "Category Teste",
                  description: "Category Description Test"
              }
              await createCategoryUseCase.execute({
                  name: category.name,
                  description: category.description,
              });
              await createCategoryUseCase.execute({
                  name: category.name,
                  description: category.description,
              });
        
              //o comparador do resultado com a função
          }).rejects.toBeInstanceOf(AppError);
        
    });
});