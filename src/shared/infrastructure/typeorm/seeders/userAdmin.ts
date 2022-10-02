import { hash } from 'bcrypt';
import { v4 as uuidV4 } from 'uuid';

import createConnection from '../index';

async function create() {
  const id = uuidV4();
  const password = await hash('admin', 8);
  const connection = await createConnection('localhost');
  connection.query(`
  INSERT INTO users(id,name,email,password,is_admin,created_at,driver_license)
  VALUES('${id}','admin','admin@rentx.com.br','${password}',true,'now()','1234')
  `);
  await connection.close();
}

create().then(() => console.log('User admin created'));
