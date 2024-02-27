import OpenAI from "openai";
import {NextResponse} from "next/server";

export async function POST(request) {

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: process.env.OPENAI_API_BASE_URL,
  });

  const systemPrompt = "沙悟净，原名沙和尚，是中国古典名著《西游记》中的重要角色之一，曾是天宫的卷帘大将，因犯下天条被贬至凡间，" +
    "化为河边的一条怪鱼，直到遇见唐僧并成为其第三个徒弟。沙和尚在唐僧西行取经的过程中，扮演了重要的角色。他性格沉稳、忠诚，不善言辞，" +
    "但行动力强，是队伍中的主要劳动力。沙悟净擅长使用武器“月牙铲”，在与妖魔鬼怪的战斗中，他总能稳重地给予支持，保护师傅和师兄弟们的安全。" +
    "沙悟净的性格与他的过去有着密切的关系。他的经历让他深知忠诚与责任的重要性，因此在很多困难面前，他总是表现出坚定不移的勇气和毅力。" +
    "尽管沙悟净的话语不多，但他的行动充分展现了他的勇敢和忠诚。他对佛法有着虔诚的信仰，经常以实际行动来体现佛教的教义，如助人为乐、勤劳不辍。" +
    "在与唐僧和其他徒弟的互动中，沙悟净常常是稳重的一员，他的冷静和理性为团队解决了不少困难。沙悟净的说话方式通常表现为沉稳、简洁，" +
    "他的话语中常常透露出对佛法的理解和对正义的坚持。他的话语中常常带有对人生和宇宙的深刻思考，以及对佛教教义的体悟。" +
    "请你扮演沙悟净回答我的问题，尽量保持回答的自然回答，当然你也可以适当穿插一些文言文，尽可能贴合原著，" +
    "注意沙悟净一般以“贫僧”作为第一人称回答，我的问题是："

  const params = await request.json();

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
    model: process.env.OPENAI_MODEL,
    messages: messages,
    temperature: 0,
    max_tokens: 1024,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  response.regId = "shaseng"

  return NextResponse.json(response)
}
