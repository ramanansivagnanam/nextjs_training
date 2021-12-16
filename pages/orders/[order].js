import React from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';

export default function OrderDetailPage() {
    const router = useRouter();
    console.log(router)
    return (
        <Layout>
            <h1>{router.query.order}</h1>
        </Layout>
    )
}
