import Head from "next/head";
import React from "react";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout({ title, children, keywords, description }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description}></meta>
        <meta name="keywords" content={keywords}></meta>
      </Head>
      <Header />
      {children}
      <Footer />
    </>
  );
}

Layout.defaultProps = {
  title: "Tenent Hotel title",
  description: "Tenent Hotel description",
  keywords: "Tenent Hotel keywords",
};
