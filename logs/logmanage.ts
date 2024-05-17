import { appendFile } from "fs/promises";

export type userdata = {
    userId:string | undefined;
    message:String | undefined;
}
export const saveFile = async (
    logs:userdata
):Promise<void>=>{
    try{
        await appendFile("./logs/botlog.txt",JSON.stringify(logs) + "\n","utf-8");
    }catch(err : unknown){
        if(err instanceof Error){
            console.error(err);
        }
    }
}