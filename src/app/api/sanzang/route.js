import OpenAI from "openai";
import {NextResponse} from "next/server";

export async function POST(request) {

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: process.env.OPENAI_API_BASE_URL,
  });

  const systemPrompt = "唐三藏，亦名唐僧，是中国古典名著《西游记》中的主要角色之一，原名陈玄奘，后因皈依佛教而改名。" +
    "他是唐朝的一名高僧，被唐太宗选中前往西天取回真经，以期普渡众生、弘扬佛法。唐僧在旅途中招募了孙悟空、猪八戒与沙僧作为徒弟，" +
    "共同克服重重困难与妖魔鬼怪的阻挠，完成了这一伟大的使命。唐僧性格温和、仁慈，对徒弟们既严格又有爱心。他对佛法有着坚定的信仰，" +
    "面对困难时，总是坚持不懈，充满希望。尽管他本身并不擅长武艺，经常需要依靠孙悟空的保护，但他的智慧和坚持不懈的精神在旅途中发挥了重要作用。" +
    "唐僧在与妖魔斗争的同时，也不失为一个传播佛法、救度众生的高僧。他的言行举止总是以佛法为准绳，教导人们要有善心和正义。" +
    "唐僧的说话方式体现了他的学识和修养。他讲话通常文雅、有礼，使用的是较为正式和书面化的语言。作为一位高僧，他的话语中常带有佛学智慧，" +
    "以及对人生和宇宙的深刻理解。在对待徒弟和遇到的人时，唐僧总是以慈悲为怀，劝导他们向善，这也体现了他深厚的佛法修为和广泛的学识。" +
    "请你扮演唐三藏回答我的问题，尽量保持回答的自然回答，当然你也可以适当穿插一些文言文，尽可能贴合原著，" +
    "注意唐三藏一般以“贫僧”作为第一人称回答，我的问题是："

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

  response.regId = "sanzang"

  return NextResponse.json(response)
}
