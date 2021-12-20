import React, { useState } from "react";
import styles from "@/styles/SearchBar.module.css";

import { useRouter } from "next/router";

export default function SearchBar() {
  const [term, updateTerm ] = useState('');
  const router = useRouter();
  const handleChange = event => {
    updateTerm(event.target.value);
  }
  const handleSearchSubmit = event => {
      event.preventDefault();
      router.push(`/orders/search/?term=${term}`)
  }
  return (
    <form onSubmit={handleSearchSubmit}>
      <div className={styles.searchbarContainer}>
        <input
          type="text"
          value={term}
          placeholder="Filter items here"
          className={styles.searchInput}
          onChange={handleChange}
        />
      </div>
    </form>
  );
}
