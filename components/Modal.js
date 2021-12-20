import React, { useState, useEffect } from "react";
import styles from "@/styles/Modal.module.css";
import ReactDOM from "react-dom";

export default function Modal({
  show,
  handleClose,
  title,
  children,
  showFooter,
}) {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  });

  const modalComponent = show ? (
    <div className={styles.overlay}>
      <div className={styles.modalContainer}>
        <div className={styles.modalHeader}>
          <h2>{title}</h2>
          <span onClick={handleClose}> X </span>
        </div>
        <div className={styles.modalContent}>{children}</div>
        { showFooter &&
          <div className={styles.modalFooter}>
            <h2> Modal Footer</h2>
          </div>
        }
      </div>
    </div>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalComponent,
      document.getElementById("modal-root")
    );
  } else {
    return null;
  }
}
