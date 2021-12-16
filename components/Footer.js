import Link from 'next/link';
import React from 'react'

export default function Footer() {
    return (
        <footer>
            <p>Copy right @2022</p>
            <p><Link href="/about">About</Link></p>
        </footer>
    )
}
