import styles from './components.module.css'; // 你的样式文件

const getNameById = (id) => {
  if (id === 'user') {
    return '小书生';
  } else if (id === 'wukong') {
    return '悟空';
  } else if (id === 'sanzang') {
    return '三藏';
  } else if (id === 'bajie') {
    return '八戒';
  } else if (id === 'shaseng') {
    return '沙僧';
  }
}

export default function ChatMessage ({ message, key }) {
  // 根据 message.role 的值设置不同的样式类名
  const messageTextClass = message.role === 'user' ? styles.UserMessageText : styles.AssistantMessageText;
  const messageAvatarClass = message.role === 'user' ? styles.UserMessageAvatar : styles.AssistantMessageAvatar;
  const messageContainerClass = message.role === 'user' ? styles.UserMessageContainer : styles.AssistantMessageContainer;
  const messageNameContainer = message.role === 'user' ? styles.UserMessageNameContainer : styles.AssistantMessageNameContainer;
  const messageName = message.role === 'user' ? styles.UserMessageName : styles.AssistantMessageName;
  const isUser = message.role === 'user';

  return (
    <div className={`${messageContainerClass}`}>
      <div key={key} className={`${messageAvatarClass}`}>
        {isUser ? (
          <img src={"/user.png"} alt="user avatar" width={36} height={36} />
        ) : (
          <img src={`/${message.id}.webp`} alt="assistant avatar" width={36} height={36} style={{borderRadius: '50%'}} />
        )}
      </div>
      <div className={`${messageNameContainer}`}>
        <div className={`${messageName}`}>
          {isUser ? (
            <p style={{marginTop: "3px", marginBottom: "5px"}}>{getNameById(message.id)}</p>
          ) : (
            <p style={{marginTop: "3px", marginBottom: "5px"}}>{getNameById(message.id)}</p>
          )}
        </div>
        <div key={key} className={`${messageTextClass}`}>
          <p style={{marginTop: "11px", marginBottom: "11px"}}>{message.content}</p>
        </div>
      </div>
    </div>
  );
};
