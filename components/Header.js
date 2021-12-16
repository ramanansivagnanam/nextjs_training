import Link from "next/link";
import styles from "@/styles/Header.module.css";
import React from "react";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">Hotel</Link>
      </div>

      <nav>
        <ul>
          <Link href="/orders">Orders</Link>
        </ul>
      </nav>
    </header>
  );
}
