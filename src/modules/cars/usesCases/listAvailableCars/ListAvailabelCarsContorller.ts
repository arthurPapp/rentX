import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

class ListAvailableCarsController {
    
    async handle(request: Request, response: Response) {
        const { category_id, brand, name } = request.query
        
        const listaAvailabreCarsUseCase = container.resolve(ListAvailableCarsUseCase);
        const cars = await listaAvailabreCarsUseCase.execute({
            category_id: category_id as string,
            brand: brand as string,
            name: name as string
        });
        return response.json(cars);
    }
}

export { ListAvailableCarsController };