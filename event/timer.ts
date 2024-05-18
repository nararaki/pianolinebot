import { FieldPacket, OkPacket, QueryResult, RowDataPacket, } from "mysql2/promise";
import { connection } from "../env/connectdatabase";
import { userdata } from "../logs/logmanage";
export type timedata = {
    userId:String | undefined;
    second:number;
    minute:number;
    hour:number;
}
type StarttimeResult = [[{ starttime: number }], [string]];
export const timerstart = async(
    user:userdata
)=>{
    let startdate = Date.now();
    startdate /= 1000;
    startdate = Math.floor(startdate);
    //insert into database the value startdate
    const re = await insertstarttime(user,startdate);
    console.log(re);
}
export const timerfinish = async(
    user:userdata
):Promise<timedata>=>{
    //get date from datebase where userId correspond with 
    const results = await getStartTime(user) as unknown as StarttimeResult;
    console.log(results);
    const starttime:number = results[0][0].starttime;
    console.log(starttime); 
    let finishdate:number = Date.now();
    finishdate = Math.floor(finishdate / 1000);
    let elapesedtime = finishdate - starttime;
    let second:number = Math.floor(elapesedtime % 60);
    let minute:number = (Math.floor(elapesedtime/60)) % 60;
    let hour:number = (Math.floor(elapesedtime/3600)%24);
    let resulttime:timedata = {
        userId:user.userId,
        second:second,
        minute:minute,
        hour:hour,
    } 
    return resulttime;
}
const override = (user: userdata, time: number): Promise<[QueryResult, FieldPacket[]]> => {
    return connection()
        .then((connection) => {
            console.log("connected");
            const result = connection.query("update time set starttime = ? where userid = ?;",
                [time, user.userId]);
            connection.end();
            return result;
        });
}
const getStartTime = async(user:userdata):Promise<[QueryResult,FieldPacket[]]>=>{
   return connection()
    .then(async(connection)=>{
        const result = await connection.query("select starttime from time where userid =?",
            [user.userId]
        );
    connection.end();
    return result;
    })
    .catch((err)=>{
        throw err;
    })
}
const insertstarttime = async (user: userdata, startdate: number): Promise<[QueryResult, FieldPacket[]]> => {
    return connection()
        .then(async(connection) => {
            console.log("aaa");
            const result = await connection.query("insert into time(userid,starttime) values(?,?);",
                [user.userId, startdate]
            );
            connection.end();
            return result;
        })
        .catch((err) => {
            if(err.errno == 1062){
                const result = override(user,startdate);
                return result;
            }else{
                throw err;
            }
        });
};
