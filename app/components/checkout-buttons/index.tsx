import { Alert } from "evergreen-ui";
import { useEffect, useState } from "react";
import { OneTimePayPalCheckoutButton } from "~/components/checkout-buttons/OneTimePayPalCheckoutButton";
import type { PayPalCheckoutSdkInitOptions } from "~/components/checkout-buttons/types";
import { getClientConfig } from "~/api/common-config";

export function PayPalCheckoutButton({
  enableAppSwitch = false,
}: {
  enableAppSwitch?: boolean;
}) {
  const [paypalCheckoutInitOptions, setPaypalCheckoutInitOptions] =
    useState<PayPalCheckoutSdkInitOptions | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setPaypalCheckoutInitOptions(null);

      try {
        const data = await getClientConfig();
        console.log("Got PayPal initOptions response", data);
        setPaypalCheckoutInitOptions(data);
      } catch (e: unknown) {
        setError(
          e instanceof Error
            ? e.message
            : "An error occurred while loading client configuration. Please try again.",
        );
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return (
      <Alert
        title={"Failed to retrieve checkout configuration"}
        intent={"danger"}
      >
        Error: {error}
      </Alert>
    );
  }

  if (loading || !paypalCheckoutInitOptions) {
    return <Alert>Loading checkout configuration...</Alert>;
  }

  return (
    <OneTimePayPalCheckoutButton
      enableAppSwitch={enableAppSwitch}
      initOptions={paypalCheckoutInitOptions}
    />
  );
}
