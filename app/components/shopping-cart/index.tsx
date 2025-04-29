import { useEffect, useState } from "react";
import { Alert, toaster } from "evergreen-ui";
import type { Catalog } from "~/components/shopping-cart/types";
import CartList from "~/components/shopping-cart/CartList";
import { getCatalogConfig } from "~/api/common-config";

export default function ShoppingCart() {
  const [catalog, setCatalog] = useState<Catalog | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getCatalogConfig();
        console.log("Got Product List", data);
        setCatalog(data);
      } catch (e: unknown) {
        const msg =
          e instanceof Error
            ? e.message
            : "An error occurred while loading product list. Please try again.";
        setError(msg);
        toaster.danger(msg);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return (
      <Alert title={"Failed to retrieve product catalog"} intent={"danger"}>
        Error: {error}
      </Alert>
    );
  }

  if (loading || !catalog) {
    return <Alert>Loading Catalog...</Alert>;
  }

  return (
    <>
      <h3>Shopping Cart</h3>
      <CartList catalog={catalog} />
    </>
  );
}
