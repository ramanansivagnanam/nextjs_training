import React from 'react';
import styles from '@/styles/FoodItem.module.css';
import Image from 'next/image';
import Link from 'next/link';

export default function FoodItem({item}) {
    const { name, image, order } = item;
    return (
        <div className={styles.fooditemCardContainer}>
            <Image loading="lazy" src={image.url} height="200px" width="200px"  />
            <div className={styles.fooditemDetails}>
                 <p>{name}</p>
                 <div className="btn">
                   <Link href={`/orders/${order}`}> Details </Link>
                </div>
            </div>
        </div>
    )
}
