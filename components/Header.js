import Link from "next/link";
import styles from "@/styles/Header.module.css";
import React, { useContext } from "react";
import SearchBar from "./SearchBar";
import { AuthContext } from "@/context/AuthContext";

export default function Header() {
  const { user, error, logout } = useContext(AuthContext);

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">TENANT Hotel</Link>
      </div>
      <SearchBar />
      <nav>
        <ul>
          {user ? (
            <>
              <li>
                <Link href="/orders">Orders</Link>
              </li>
              <li>
                <Link href="/orders/add">Add Item</Link>
              </li>
              <li onClick={logout}>
                <Link href="#">Logout</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/auth/login">Login</Link>
              </li>
              <li>
                <Link href="/auth/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
