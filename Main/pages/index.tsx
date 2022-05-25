import { Button } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import { motion } from "framer-motion"
const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>NEXT APP</title>
        <meta name="title" content="NEXT APP" />
        <meta name="description" content="NEXT APP" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="">
        <Button whileHover={{
    scale: 1.2,
    transition: { duration: 0.1 }
  }}
  whileTap={{ scale: 0.9 }}
 component={motion.button} className="text-4xl bg-white m-4">Hello World</Button>
      </main>

      <footer></footer>
    </div>
  );
};

export default Home;
