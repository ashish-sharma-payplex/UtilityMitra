import { useRouter } from "next/router";
import BillerPage from "@/src/components/utility/BillerPage";

const BillersIndex = () => {
  const router  = useRouter();
  const { service } = router.query;

  if (!router.isReady || !service) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "sans-serif",
        color: "#888",
        fontSize: 15,
      }}>
        Loading...
      </div>
    );
  }

  return <BillerPage slug={service} />;
};

export default BillersIndex;