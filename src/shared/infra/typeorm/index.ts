import { Connection, createConnection, getConnectionOptions } from 'typeorm';

//para rodar com a api no docker
// export default async (host = "database"): Promise<Connection> => {
//   const defaultOptions = await getConnectionOptions();


//   return createConnection(
//     Object.assign(defaultOptions, {
//       host: process.env.NODE_ENV === "test"
//         ? "localhost"
//         : host,
//       database: process.env.NODE_ENV === "test"
//         ? "rentx_test"
//         : defaultOptions.database,
//     })
//   );

export default async (): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();


  return createConnection(
    Object.assign(defaultOptions, {
      database: process.env.NODE_ENV === "test"
        ? "rentx_test"
        : defaultOptions.database,
    })
  );


}