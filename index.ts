import express from "express";
import { Application,Response,Request } from "express";
const app : Application = express();
import * as line from "@line/bot-sdk";
import  { load }  from "ts-dotenv";
import { userdata,saveFile } from "./logs/logmanage";
import { judge } from "./event/judgeUserMessage";
import { readFile } from "fs/promises";
const env = load({
    CHANNEL_ACCESSTOKEN:String,
    CHANNEL_SECRET:String,
    PORT:Number,
});
const port = env.PORT || 3000; 
const config = {
    channelAccessToken:env.CHANNEL_ACCESSTOKEN,
}

const middlewareconfig = {
    channelAccessToken:env.CHANNEL_ACCESSTOKEN,
    channelSecret:env.CHANNEL_SECRET,
}

const clientConfig:line.ClientConfig = config;

const client = new line.messagingApi.MessagingApiClient(clientConfig);

const textEventHandler = async (
  event:line.WebhookEvent
):Promise<line.MessageAPIResponseBase | undefined>=>{
  if(event.type !== "message" || event.message.type !== "text"){
      return;
  }
  const { replyToken } = event;
  const user:userdata = {userId:event.source.userId,message:event.message.text};
  saveFile(user);
  let message:string = await judge(user);
  const MessageObject :line.Message = await readMessageFromFile("./data/selectmusic.json");
  await client.replyMessage({
      replyToken:replyToken as string,
      messages:[{
          type:"text",
          text:message,
      },MessageObject,
    ],
  });
}

app.post( //⑤
  '/webhook',
  line.middleware(middlewareconfig),
  async (req: Request, res: Response): Promise<Response> => {
    const events: line.WebhookEvent[] = req.body.events;
    await Promise.all(
      events.map(async (event: line.WebhookEvent) => {
        try {
          await textEventHandler(event);
        } catch (err: unknown) {
          if (err instanceof Error) {
            console.error(err);
          }
          return res.status(500);
        }
      })
    );
    return res.status(200);
  }
);

app.all("/nara",()=>{
  console.log("hogehoge");
})

async function readMessageFromFile(filePath: string): Promise<line.Message> {
  const data = await readFile(filePath, 'utf-8');
  return JSON.parse(data);
}


app.listen(port);

console.log("listen on port " + port);