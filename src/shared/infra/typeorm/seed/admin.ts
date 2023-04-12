import { hash } from 'bcryptjs';
import { v4 as uuidV4 } from 'uuid';

import createConnection from '..';


async function create() {
    const connection = await createConnection("localhost");
    const id = uuidV4();
    const password = await hash("admin",8);

    
    await connection.query(
        `INSERT INTO USERS(id, name, email, password, username, "isAdmin", created_at, driver_lincense)
        VALUES( '${id}', 'admin','admin@rentx.com.br','${password}', 'admin', true, 'now()', 'XXXXXXX')
        `
    );

    await connection.close;
}

create().then(() => console.log("created user admin!"));