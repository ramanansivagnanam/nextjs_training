import Layout from "@/components/Layout";
import { API_URL } from "@/config/config";
import React from "react";
import styles from "@/styles/Order.module.css";
import Image from "next/image";
import Link from "next/link";

export default function SearchPage({ orderItem }) {
  const { image } = orderItem;
  return (
    <Layout>
      <div className={styles.orderItemDetailsContainer}>
        <Link href='/orders'> Go back </Link>
        <Image src={image.url} width="500px" height="400px" />
        <h3>{orderItem.name}</h3>
        <div className={styles.orderItemActions}>
          <div className="btn">
            <Link href="#"> Edit </Link>
          </div>
          <div className="btn">
            <Link href="#"> Delete </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps = async ({ query: { term } }) => {
  const res = await fetch(`${API_URL}/orders/?name_contains=${term}`);
  const orderItem = await res.json();
  return {
    props: {
     orderItem : orderItem[0],
    },
  };
};
