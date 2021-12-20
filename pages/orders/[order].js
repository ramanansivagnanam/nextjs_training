import Layout from "@/components/Layout";
import { API_URL } from "@/config/config";
import React from "react";
import styles from "@/styles/Order.module.css";
import Image from "next/image";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from 'next/router';
export default function OrderDetailPage({ orderItem }) {
  const router = useRouter();
  const { image } = orderItem;
  const handleDelete = async () => {
    const res = await fetch(`${API_URL}/orders/${orderItem.id}`,{
      method: 'DELETE'
    });
    if(!res.ok){
      toast(res.message);
    } else {
      toast('Item deleted successfully');
      router.push(`/`);
    }
  }
  return (
    <Layout>
      <div className={styles.orderItemDetailsContainer}>
        {/* <Image src={image && image.url} alt="image" width="500px" height="400px" /> */}
        <h3>{orderItem.name}</h3>
        <div className={styles.orderItemActions}>
          <div className="btn">
            <Link href="#"> Edit </Link>
          </div>
          <div className="btn" onClick={handleDelete}>
            Delete
          </div>
        </div>
      </div>
      <ToastContainer />
    </Layout>
  );
}

export const getStaticPaths = async () => {
  const res = await fetch(`${API_URL}/orders`);
  const orders = await res.json();
  const paths = orders.map((item) => ({
    params: { order: item.order },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params: { order } }) => {
  const res = await fetch(`${API_URL}/orders/?order=${order}`);
  const orderItem = await res.json();
  console.log(orderItem);

  return {
    props: {
     orderItem:orderItem[0],
    },
    revalidate: 1,
  };
};

// export const getServerSideProps = async ({ query: { order } }) => {
//   const res = await fetch(`${API_URL}/api/orders/${order}`);
//   const orderItem = await res.json();
//   return {
//     props: {
//       orderItem,
//     },
//   };
// };
