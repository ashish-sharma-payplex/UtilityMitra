import { useEffect } from "react";
import Head from "next/head";
import { Provider, useDispatch } from "react-redux";
import { store } from "@/src/redux/store";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/footer";
import "@/styles/globals.css";
import { hydrateFromStorage } from "@/src/redux/slices/autSlice";
import { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";

function AuthHydrator({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(hydrateFromStorage());
  }, [dispatch]);

  return children;
}

function AppContent({ Component, pageProps }) {
  const router = useRouter();
  const isAdmin = router.pathname.startsWith("/admin");

  return (
    <>
      <Head>
        <title>UtilityMitra</title>
        <link rel="icon" type="image/png" sizes="512x512" href="/favicon.png" />
        <meta name="theme-color" content="#1A914B" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#ffffff",
            color: "#222",
            borderRadius: "12px",
            padding: "14px 18px",
            fontSize: "14px",
            fontWeight: "600",
            boxShadow: "0 6px 20px rgba(0,0,0,0.12)",
          },
          success: {
            iconTheme: {
              primary: "#16a34a",
              secondary: "#fff",
            },
          },
        }}
      />

      {/* ✅ Ek hi wrapper — Navbar, Page, Footer sab 1200px ke andar */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%" }}>
        {!isAdmin && <Navbar />}
        <Component {...pageProps} />
        {!isAdmin && <Footer />}
      </div>
    </>
  );
}

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <AuthHydrator>
        <AppContent Component={Component} pageProps={pageProps} />
      </AuthHydrator>
    </Provider>
  );
}