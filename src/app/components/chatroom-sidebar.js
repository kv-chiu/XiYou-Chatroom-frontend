import styles from './components.module.css'

const directory = [
  { id: 'group', name: '西游四人组', avatar: '/group.webp', emoji: "🤗", defaultState: "[群公告]中期考核将近，请大家准备好报告", type: "group" },
  { id: 'wukong', name: '悟空', avatar: '/wukong.webp', emoji: "😄", defaultState: "[动态]昨天又去蟠桃宴了哈哈哈", type: "single" },
  { id: 'sanzang', name: '三藏', avatar: '/sanzang.webp', emoji: "😊", defaultState: "[个性签名]一路向西", type: "single" },
  { id: 'bajie', name: '八戒', avatar: '/bajie.webp', emoji: "😎", defaultState: "[动态][图片]终于回到高老庄了", type: "single" },
  { id: 'shaseng', name: '沙僧', avatar: '/shaseng.webp', emoji: "🙂", defaultState: "[动态][加油]天庭五好青年", type: "single" }
];

export default function ChatroomSidebar({onChatSelection, chatData}) {

  const handleChatSelection = (chat) => {
    onChatSelection(chat);
  }

  const recentMessage = (chatId) => {
    let recentMessage = chatData[chatId]?.messages[chatData[chatId]?.messages.length - 1].content || directory.find(chat => chat.id === chatId).defaultState;

    const maxLineWidth = 16; // 设置一行的最大宽度，根据需要修改
    recentMessage = recentMessage.length > maxLineWidth ? recentMessage.slice(0, maxLineWidth - 3) + "..." : recentMessage;

    return recentMessage;
  };

  return (
    <div className={styles.ChatroomSidebar}>
        {directory.map((chat) => (
          <div key={chat.id} onClick={() => handleChatSelection(chat)} className={styles.Chat}>
            <div className={styles.ChatAvatar}>
              <img src={chat.avatar} alt={chat.name} className={styles.avatar}/>
            </div>
            <div className={styles.ChatPreview}>
              <div className={styles.ChatInfo}>
                <span className={styles.ChatName}>{chat.name}</span>
                <p className={styles.RecentMessage}>{recentMessage(chat.id)}</p>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
