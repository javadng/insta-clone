import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navigation from "../components/nav";
import LoadingSpinner from "../components/ui/loading-spinner";
import "../styles/globalStyle.css";
import "../styles/imageclasses.css";

const MyApp = ({ Component, pageProps: { session, ...pageProps } }) => {
  const [loading, setLoading] = useState(false);
  const Router = useRouter();

  useEffect(() => {
    const start = () => {
      setLoading(true);
    };

    const end = () => {
      setLoading(false);
    };

    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);

    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, [Router.events]);

  return (
    <SessionProvider session={pageProps.session}>
      <Head>
        <title>InstaClone V1</title>
        <meta name="description" content="This is clone from Instagram.com" />
        <link
          rel="icon"
          type="image/x-icon"
          href="/images/Instagram_logo_2022.svg.png"
        />
      </Head>
      <main className="container mx-auto">
        <div className="md:grid grid-cols-[10rem_1fr] lg:grid-cols-navigation">
          {loading ? <LoadingSpinner /> : <Component {...pageProps} />}
          <Navigation />
        </div>
      </main>
    </SessionProvider>
  );
};

export default MyApp;
