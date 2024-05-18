import {load} from "ts-dotenv";
import { ConnectionConfig, ConnectionOptions } from "mysql2";
const env = load({
    PASSWORD:String,
    USER:String,
    HOST:String,
    DB_PORT:String,
    DATABASE:String,
  });
  export const access:ConnectionOptions = {
    host: env.HOST,
      port: parseInt(env.DB_PORT,10),
      user: "nararaki",
      password: env.PASSWORD,
      database: env.DATABASE,
      multipleStatements: true,
  }
export default {
    db: {
      host: env.HOST,
      port: parseInt(env.DB_PORT,10),
      user: env.USER,
      password: env.PASSWORD,
      database: env.DATABASE,
      multipleStatements: true,
    },
  };