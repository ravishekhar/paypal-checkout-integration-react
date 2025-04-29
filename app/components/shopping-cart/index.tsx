import { useEffect, useState } from "react";
import { Alert, toaster } from "evergreen-ui";
import type { Catalog } from "~/components/shopping-cart/types";
import CartList from "~/components/shopping-cart/CartList";
import { getCatalogConfig } from "~/api/common-config";
import { useAppSelector } from "~/data/hooks";
import type { RootState } from "~/data/store";

export default function ShoppingCart() {
  const [catalog, setCatalog] = useState<Catalog | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const apiServerName = useAppSelector(
    (state: RootState) => state.shoppingCart.apiServerName,
  );
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getCatalogConfig({ apiServerName });
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
      <h3>Shopping Basket</h3>
      <CartList catalog={catalog} />
    </>
  );
}
