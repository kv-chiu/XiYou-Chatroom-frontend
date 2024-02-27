import styles from './components.module.css'

import ChatroomSidebar from "@/app/components/chatroom-sidebar";
import ChatroomChatbox from "@/app/components/chatroom-chatbox";
import ChatroomSidenav from "@/app/components/chatroom-sidenav";
import {useEffect, useState} from "react";

export default function ChatroomContainer() {

  const [selectedChat, setSelectedChat] = useState({});
  const [chatData, setChatData] = useState({});

  const handleChatSelection = (chat) => {
    if (!chatData[chat.id]) {
        setChatData({...chatData, [chat.id]: chatData[chat.id]});
        setSelectedChat(chat);
      return;
    }
    setSelectedChat(chat);
  };

  useEffect(() => {
    if (selectedChat) {
      //选择聊天室后，将滚动条滚动到底部
      const chatMessages = document.querySelector(`.${styles.ChatMessages}`);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
  }, [selectedChat]);

  return (
    <div className={styles.ChatroomContainer}>
      <ChatroomSidenav/>
      <ChatroomSidebar onChatSelection={handleChatSelection} chatData={chatData}/>
      <ChatroomChatbox selectedChat={selectedChat} chatData={chatData}/>
    </div>
  );
}
