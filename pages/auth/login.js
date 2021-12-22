import Layout from "@/components/Layout";
import React, { useContext, useEffect, useState } from "react";
import styles from "@/styles/Form.module.css";
import { AuthContext } from "@/context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function loginPage() {
  const { user , error, login} = useContext(AuthContext);

  const [values, updateValues] = useState({
    email: "",
    password: "",
  });

  useEffect(() => error && toast.error(error) )

  const handleChange = event => {
    const { name, value } = event.target;
    updateValues({ ...values, [name] : value });
  }

  const hanldeSubmit = event => {
    event.preventDefault();
    login(values);   

  }
  return (
    <Layout title="login">
      <div className={styles.formContainer}>
        <h1>Login</h1>
        <div className={styles.formInputContainer}>
          <label htmlFor="email">Username</label>
          <input
            type="email"
            value={values.username}
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
        <div className="btn" onClick={hanldeSubmit}>Login</div>
      </div>
      <ToastContainer />
    </Layout>
  );
}
