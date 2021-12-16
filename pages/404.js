
import Link from 'next/link';
import React from 'react';
import styles from '@/styles/404.module.css';
import { FaExclamationTriangle } from 'react-icons/fa';
export default function PageNotFound() {
    return (
        <div className={styles.error}>
            <h1> <FaExclamationTriangle />Page Not Found</h1>
           <div className={styles.mainpage}> <Link href="/">Go back to the main page</Link>
           </div>
        </div>
    )
}
