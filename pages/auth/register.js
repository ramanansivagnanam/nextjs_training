import Layout from "@/components/Layout";
import React, { useContext, useState } from "react";
import styles from "@/styles/Form.module.css";
import { AuthContext } from '@/context/AuthContext';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function registerPage() {
  const { user , error, register } = useContext(AuthContext);
  const [values, updateValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = event => {
    const { name, value } = event.target;
    updateValues({ ...values, [name] : value });
  }

  const hanldeSubmit = event => {
    event.preventDefault();
    if(values.password !== values.confirmPassword){
      toast.error("Password doesnt match");
      return;
    }
    register(values);
    if(error){
      toast.error(error.message);
    }
  }

  return (
    <Layout title="Register">
      <div className={styles.formContainer}>
        <h1>Register</h1>
        <form onSubmit={hanldeSubmit}>
          <div className={styles.formInputContainer}>
            <label htmlFor="name">Username</label>
            <input
              type="text"
              value={values.username}
              name="username"
              onChange={handleChange}
            />
          </div>
          <div className={styles.formInputContainer}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              value={values.email}
              name="email"
              onChange={handleChange}
            />
          </div>
          <div className={styles.formInputContainer}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              value={values.password}
              name="password"
              onChange={handleChange}
            />
          </div>
          <div className={styles.formInputContainer}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              value={values.confirmPassword}
              name="confirmPassword"
              onChange={handleChange}
            />
          </div>
          <div className="btn" onClick={hanldeSubmit}>Register</div>
        </form>
      </div>
      <ToastContainer />
    </Layout>
  );
}
