export const createMessage = (
    type:number):string=>{
       if(type == 0){
            return "練習開始です！頑張ってください！";
       }else if(type == 1){
        return "練習終了"//chat gpt evaluate the time
       }else if(type == 2){
          
        return "曲名+この曲がよろしいでしょう";//select from database
       }else if(type == 3){
        return "どの楽譜または曲を購入しましたか?";
       }else{
        return "済みません、よく分かりません";
       }
}