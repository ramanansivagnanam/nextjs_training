import React, { useState } from "react";
import styles from "@/styles/AddItem.module.css";
import Layout from "@/components/Layout";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_URL } from "@/config/config";
import { useRouter  } from 'next/router';
import Image from 'next/image';
import Modal from '@/components/Modal';
import ImageUpload from "@/components/ImageUpload";

export default function EditPage({order}) {

  const { name, description, address, time, id, image  } = order;  

  const [ show, setShow] = useState(false);

  const router = useRouter();
  const [values, updateValues] = useState({
    name,
    time,
    description,
    address,
    image 
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
    const res = await fetch(`${API_URL}/orders/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
    if (!res.ok) {
      toast.error("Some error occured");
    } else {
      const { order } = await res.json();
      router.push(`orders/${order}`)
    }
  };

  const handleClose = () => {
      setShow(false);
  }

  return (
    <Layout title="Edit item">
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
          Update Item
        </div>
      </form>
      <ToastContainer />
      <div className={styles.imageThumbnail}>
            <Image src={image.url} alt="image" height="80px" width="80px" />
            <div className={styles.buttonStyles} onClick={() => setShow(true)}>Set Image</div>
      </div>
      <Modal show={show} title="Image Preview" handleClose={handleClose}>
          <ImageUpload id={id} />
       </Modal> 
    </Layout>
  );
}

export const getServerSideProps = async ({params: { id }}) => {
    const res = await fetch(`${API_URL}/orders/${id}`);
    const order = await res.json();
    return {
        props: {
            order
        }
    }
}