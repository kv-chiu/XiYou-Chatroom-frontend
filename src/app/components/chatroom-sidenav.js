import Image from 'next/image'; // 导入 Image 组件
import styles from './components.module.css'

export default function ChatroomSidenav() {
  return (
    <div className={styles.ChatroomSidenav}>
      <div className={styles.Icons}>
        <div className={styles.GithubIcon}>
          <a href={"https://github.com"} target={"_blank"}>
            <Image src={"/github.svg"} alt={"github"} width={40} height={40}/>
          </a>
        </div>
      </div>
    </div>
  );
}
