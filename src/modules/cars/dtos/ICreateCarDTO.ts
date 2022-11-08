interface ICreateCarDTO{
    name: string;
    description: string;
    daily_reate: number;
    license_plate: string;
    fine_amount: number;
    brand: string;
    category_id: string;
}

export { ICreateCarDTO };