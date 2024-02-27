import {useState} from 'react';
import styles from './components.module.css';
import ChatMessage from "@/app/components/chatroom-chatMessage";

export default function ChatroomChatbox({selectedChat, chatData}) {

  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const chatMessages = chatData[selectedChat.id]?.messages || [];
  const showInput = (Object.keys(selectedChat).length !== 0);

  const handleSubmit = async () => {
    if (!inputValue.trim()) return; // 确保输入不为空

    const chatId = selectedChat.id;

    if (chatData[selectedChat.id]) {
      chatData[selectedChat.id].messages.push({"role": "user", "content": inputValue});
    } else {
      chatData[selectedChat.id] = {messages: [{"role": "user", "content": inputValue}]};
    }

    if (chatId === 'group') {
      // 如果是群聊，将prompt保存到lastPrompt
      await handleGroupSubmit(inputValue);
    } else {
      await handleSingleSubmit(chatId, inputValue);
    }

  };

  const handleSingleSubmit = async (chatId, prompt) => {

    const historyMessages = JSON.parse(JSON.stringify(chatData[selectedChat.id]?.messages || []));
    // 遍历historyMessages，如果有regId属性，删除
    historyMessages.forEach((message) => {
      if (message.id) {
        delete message.id;
      }
    });

    setIsLoading(true);

    // 假设这里是您的 API 请求逻辑，等待请求返回
    const response = await fetch(`/api/${chatId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        historyMessages: historyMessages,
        currentMessage: prompt,
      }),
    });

    // 处理 API 返回的数据
    const data = await response.json();

    const answer = data.choices[0].message
    // 为answer添加id属性
    answer.id = data.regId;
    // 将返回的数据添加到 chatData[selectedChat.id]
    if (chatData[selectedChat.id]) {
      chatData[selectedChat.id].messages.push(answer);
    } else {
      chatData[selectedChat.id] = {messages: [answer]};
    }

    // 清空输入框
    setInputValue('');

    setIsLoading(false);
  };

  const handleGroupSubmit = async (prompt) => {
    let lastPrompt = prompt;
    // 生成1-6的随机数
    let randomNum = Math.floor(Math.random() * 6) + 1;

    // 执行randomNum次handleSubmit
    for (let i = 0; i < randomNum; i++) {
      const randomIndex = Math.floor(Math.random() * 4);

      // 根据随机数字选择对应的 API
      const apis = ['wukong', 'sanzang', 'bajie', 'shaseng'];
      const selectedApi = apis[randomIndex];
      await handleSingleSubmit(selectedApi, lastPrompt);
      lastPrompt = chatData[selectedChat.id].messages[chatData[selectedChat.id].messages.length - 1].content;
    }
  };

  return (
    <div className={styles.ChatroomChatbox}>
      <div className={styles.ChatHeader}>
        <h2 style={{fontWeight: "normal"}}>
          {selectedChat.name} {selectedChat.emoji}
        </h2>
      </div>
      <div className={styles.ChatMessages}>
        {chatMessages.map((message, index) => (
          <ChatMessage key={index} message={message} selectedChat={selectedChat} />
        ))}
      </div>
      <div className={styles.ChatInput}>
        {showInput && (
          <>
            <div className={styles.InputArea}>
              <textarea
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={isLoading}
                style={{width: "100%", height: "100%"}}
              />
            </div>
            <div className={styles.InputButtons}>
              <button onClick={handleSubmit} disabled={isLoading} style={{float: "right"}}>
                {isLoading ? 'Loading...' : 'Submit'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
