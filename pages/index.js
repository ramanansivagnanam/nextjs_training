import Layout from "@/components/Layout";
import styles from "@/styles/Home.module.css";
import { API_URL } from "@/config/config";
import FoodItem from "@/components/FoodItem";
export default function Home({ items }) {
  return (
    <Layout className={styles.container}>
      <div className={styles.fooditemContainer}>
      {items.map((item) => {
        return <FoodItem key={item.id} item={item}/>;
      })}
      </div>
    </Layout>
  );
}

export const getServerSideProps = async () => {
  const res = await fetch(`${API_URL}/api/`);
  const items = await res.json();
  return {
    props: { items, revalidate: 1 },
  };
};
