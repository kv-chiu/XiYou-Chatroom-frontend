import OpenAI from "openai";
import {NextResponse} from "next/server";
import getEnv from "@/app/components/config";

export async function POSTwukong(request) {

  const openai = new OpenAI({
    apiKey: getEnv('key'),
    baseURL: getEnv('url'),
    dangerouslyAllowBrowser: true,
  });

  const systemPrompt = "孙悟空，亦称美猴王，是中国古典名著《西游记》中的核心角色之一，原为花果山水帘洞的石猴，" +
    "因修炼成仙而拥有变化莫测的神通和72变的本领。他拜菩提祖师为师，学得了一身好武艺和法术，其中包括筋斗云，能一跃十万八千里。" +
    "孙悟空性格狡猾、机智、勇敢，不畏强权，曾一度大闹天宫，被封为“齐天大圣”。后因佛祖降伏，成为唐僧取经路上的第一位弟子，负责保护师傅西行取经，" +
    "途中斗妖除魔，展现出非凡的智慧和力量。孙悟空忠诚勇敢，无论遇到多大的困难和危险，都毫不退缩，用他的聪明才智和无比的武艺保护唐僧安全。" +
    "他的性格虽然有时候显得轻狂和不羁，但他对师傅的忠诚以及对正义的坚持不懈，赢得了众多读者的喜爱。孙悟空的言行充满了对自由和正义的追求，" +
    "他的故事激励了无数人勇敢面对困难，坚持自我。作为一位神通广大的仙猴，他的话语中既有俏皮和幽默，也充满了对生命和宇宙奥秘的探索与思考。" +
    "在对待敌人时，他既有慈悲为怀的一面，也有果断严厉的一面，这体现了他复杂而丰富的性格特点。请你扮演孙悟空回答我的问题，" +
    "尽量保持回答的自然回答，当然你也可以适当穿插一些文言文，尽可能贴合原著，注意孙悟空一般以“俺老孙”作为第一人称回答但不一定，我的问题是："

  const params = request;

  let messages = [];
  let historyLength = 0;
  if (Array.isArray(params.historyMessages)) {
    historyLength = params.historyMessages.length;
  } else {
    historyLength = 0;
  }
  if (historyLength > 4) {
    const lastFourMessages = params.historyMessages.slice(historyLength - 4);
    messages.push({ role: "system", content: systemPrompt });
    messages = messages.concat(lastFourMessages);
  } else if (historyLength > 0) {
    messages.push({ role: "system", content: systemPrompt });
    messages = messages.concat(params.historyMessages);
  } else {
    messages.push({ role: "system", content: systemPrompt });
  }
  messages.push({ role: "user", content: params.currentMessage });

  const response = await openai.chat.completions.create({
    model: getEnv('model'),
    messages: messages,
    temperature: 0,
    max_tokens: 1024,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  response.regId = "wukong";

  return NextResponse.json(response)
}
