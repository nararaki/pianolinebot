import { userdata } from "../logs/logmanage";
import { createMessage } from "./createreplymessage";
import { timerstart,timerfinish, timedata } from "./timer";
export const judge = async(user:userdata):Promise<string>=>{
    if(user.message == "ピアノ弾きます"){
        timerstart(user);
        return createMessage(0);
    }else if(user.message == "終了"){
        try{
            const result:timedata = await timerfinish(user);
            return result.hour + "時間" + result.minute + "分" + result.second +"\n" + createMessage(1);
        }catch{
            return "an error occuerd";
        }
    }else if(user.message == "曲を選んで"){
        return createMessage(2);
    }else if("楽譜を登録します"){
        return createMessage(3);
    }else{
        return createMessage(4);
    }
}