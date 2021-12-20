import React, { useState } from "react";
import styles from "@/styles/AddItem.module.css";
import Layout from "@/components/Layout";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_URL } from "@/config/config";
import { useRouter  } from 'next/router';

export default function addPage() {
  const router = useRouter();
  const [values, updateValues] = useState({
    name: "",
    time: "",
    description: "",
    address: "",
    image: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    updateValues({ ...values, [name]: value });
  };

  const handleAddSumbmit = async (event) => {
    event.preventDefault();
    const hasEmptyFields = Object.values(values).some(
      (value) => value.trim() === ""
    );
    if (hasEmptyFields) {
      return toast.error("Please fill all the fields");
    }
    const res = await fetch(`${API_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
    console.log(res)
    if (!res.ok) {
      toast.error("Some error occured");
    } else {
      const { order } = await res.json();
      router.push(`orders/${order}`)
    }
  };

  return (
    <Layout>
      <form onSubmit={handleAddSumbmit}>
        <div className={styles.addItemContainer}>
          <div className={styles.inputContainer}>
            <input
              name="name"
              className={styles.inputInline}
              type="text"
              value={values.name}
              placeholder="item name"
              onChange={handleChange}
            />
          </div>
          <div className={styles.inputContainer}>
            <input
              name="time"
              className={styles.inputInline}
              type="text"
              value={values.time}
              placeholder="time"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={styles.textAreaContainer}>
          <textarea
            name="description"
            value={values.description}
            onChange={handleChange}
            className={styles.inputInline}
            placeholder="description"
          />
        </div>
        <div className={styles.textAreaContainer}>
          <textarea
            name="address"
            className={styles.inputInline}
            value={values.address}
            onChange={handleChange}
            placeholder="address"
          />
        </div>
        <div className={styles.buttonStyles} onClick={handleAddSumbmit}>
          Add Item
        </div>
      </form>
      <ToastContainer />
    </Layout>
  );
}
