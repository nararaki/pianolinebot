import * as sql from "mysql2/promise";
import config from "./config";
import { access } from "./config";
export const connection = async()=>{
  return await sql.createConnection(access);
}