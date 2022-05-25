import * as React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import { CacheProvider, EmotionCache } from "@emotion/react";
import theme from "../src/Themes/theme";
import createEmotionCache from "../src/Utils/createEmotionCache";
import "../src/styles/globals.css";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <style jsx global>{`
  body {
    background: #112036;
    vertical-align: baseline;
  }
}
`}</style>

      <Head>
        {/* Please Uncomment and fill */}
        {/* <title>NEXT APP</title> */}
        {/* <meta property='og:title' content='NEXT APP' /> */}
        <meta property="og:type" content="website" />
        {/* <meta property='og:image' content='IMAGE_SRC' /> */}
        {/* <meta property='og:url' content='URL OF THE WEBSITE' /> */}
        {/* <meta property='og:description' content='DESCRIPTION' /> */}
        <meta property="twitter:card" content="summary_large_image" />

        {/* <meta name="description" content="DESCRIPTION"></meta> */}
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        {/* <CssBaseline /> Tailwind used Preflight Reset Already, so this is redundant*/}
        <div className="bg-slate-900 bg-hero-image bg-no-repeat bg-cover bg-top bg-fixed">
          {/* <Navbar isTopPage={isTopPage} setIsTopPage={setIsTopPage} /> */}
          <div className="flex flex-col justify-between h-screen">
            <Component {...pageProps} />
            {/* <Footer /> */}
          </div>
        </div>
      </ThemeProvider>
    </CacheProvider>
  );
}
