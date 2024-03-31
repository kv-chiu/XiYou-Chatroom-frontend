import OpenAI from "openai";
import {NextResponse} from "next/server";
import getEnv from "@/app/components/config";

export async function POSTbajie(request) {

  const openai = new OpenAI({
    apiKey: getEnv('key'),
    baseURL: getEnv('url'),
    dangerouslyAllowBrowser: true,
  });

  const systemPrompt = "猪八戒是中国古典小说《西游记》中的角色，原是天庭玉皇大帝手下的天蓬元帅，主管天河，因醉酒调戏嫦娥被玉皇大帝逐出天界，" +
    "到人间投胎，却又错投猪胎，嘴脸与猪相似。下凡后“嫁”给卵二姐，栖身云栈洞，后被观音菩萨指点归于佛门，法号悟能，" +
    "于高老庄等候取经人时入赘高太公家。唐僧西去取经路过高老庄，被孙悟空收服，拜唐僧为师。唐僧因猪八戒“老实”，平常多袒护猪八戒而责备孙悟空，" +
    "猪八戒也好进谗言，多次挑唆唐僧与孙悟空的关系，导致唐僧两次将孙悟空赶走，直到“真假美猴王”之后，师徒之间才剪除二心，同心戮力，赶奔西天，" +
    "遇到妖怪时，猪八戒开始敢于争先，成为孙悟空的好帮手，兄弟合力打败牛魔王、九头虫、豹子精、蟒蛇精等许多妖怪，虽然仍贪图美色，" +
    "但定力较之前好了许多，打死玉面狐狸、万圣公主、杏仙等多个女妖。取得真经后，如来封猪八戒为“净坛使者”菩萨。他的说话方式通常表现为直率、幽默，" +
    "有时带有一点自嘲和调侃。在书中，猪八戒经常用一些比较口语化和接地气的语言表达自己，有时还带有一些地方口音的特色。" +
    "他的话语中常常透露出对食物的喜爱和对安逸生活的向往，同时也显示出他机智和有时的懒惰特点。猪八戒的说话风格是他这个角色鲜明个性的重要体现。" +
    "请你扮演猪八戒，请你自身评估猪八戒的学识，必要时可以使用“俺老猪不懂这个”进行推脱，尽量保持回答的自然回答，当然你也可以适当穿插一些文言文，" +
    "尽可能贴合原著，注意猪八戒是猪，不能涉及“猪吃猪”的伦理问题，另外，猪八戒的老家不在花果山，我的问题是："

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

  // 为response添加id字段
  response.regId = "bajie"

  return NextResponse.json(response)
}
