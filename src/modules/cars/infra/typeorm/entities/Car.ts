import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryColumn } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { Category } from './Category';
import { Specification } from './Specification';

@Entity("cars")
class Car {
    @PrimaryColumn()
    id?: string;

    @Column()
    name: string;

    @Column()
    description: string;
    
    @Column()
    daily_reate: number;

    @Column()
    available: boolean;

    @Column()
    license_plate: string;

    @Column()
    fine_amount: number;

    @Column()
    brand: string;

    @ManyToOne(() => Category)
    @JoinColumn({ name: "category_id" })
    category: Category;

    @Column()
    category_id: string;
    
    @CreateDateColumn()
    created_at: Date;

    @ManyToMany(() => Specification)
    @JoinTable({
        name: "specifications_cars",
        //nome da coluna dentro da tabela de relacionamento que referencia a tabela da entity
        joinColumns: [{ name: "car_id" }],
        //nome da coluna que referencia a tabela que vamos adicionar o relacionamento
        inverseJoinColumns:[{name:"specification_id"}]
    })
    specifications: Specification[];

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
            this.available = true;
        }
    }
}

export { Car };