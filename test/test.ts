import mysql, { ConnectionOptions, RowDataPacket,ResultSetHeader,ProcedureCallPacket } from 'mysql2/promise';
import { userdata } from '../logs/logmanage';
const access: ConnectionOptions = {
  user: 'test',
  database: 'test',
};



