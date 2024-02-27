"use client";

import styles from "./page.module.css";

import ChatroomContainer from "@/app/components/chatroom-container";

export default function Home() {
  return (
    <div className={styles.Home}>
      <ChatroomContainer/>
    </div>
  );
}
