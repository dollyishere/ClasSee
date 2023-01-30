import * as mysql from 'mysql';
import { Connection, ConnectionConfig } from 'mysql';

const config: ConnectionConfig = {
  host: 'DB_HOST',
  user: 'DB_USERNAME',
  password: 'DB_PASSWORD',
  database: 'DB_NAME',
};

const connection: Connection = mysql.createConnection(config);
connection.connect();
export default connection;
