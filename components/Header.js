import Link from "next/link";
import styles from "@/styles/Header.module.css";
import React from "react";
import SearchBar from "./SearchBar";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">TENANT Hotel</Link>
      </div>
      <SearchBar />
      <nav>
        <ul>
          <Link href="/orders">Orders</Link>
          <Link href="/orders/add">Add Item</Link>
        </ul>
      </nav>
    </header>
  );
}
