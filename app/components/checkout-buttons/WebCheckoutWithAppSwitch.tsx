import { usePayPalButtons } from "@paypal/react-paypal-js";
import type { PayPalCheckoutButtonInitOptions } from "~/components/checkout-buttons/types";
import { InlineAlert } from "evergreen-ui";
import { useEffect } from "react";

export default function WebCheckoutWithAppSwitch({
  createOrder,
  onApprove,
  onCancel,
  onError,
}: PayPalCheckoutButtonInitOptions) {
  // This feature is currently available only on alpha version of @paypal/react-paypal-js
  const { Buttons, isLoaded, hasReturned, resume } = usePayPalButtons({
    appSwitchWhenAvailable: true,
    createOrder,
    onApprove,
    onCancel,
    onError,
  });

  useEffect(() => {
    if (isLoaded && hasReturned()) {
      resume();
    }
  }, [resume, isLoaded, hasReturned]);
  return (
    <>
      <InlineAlert marginBottom={10} intent={"success"}>
        App Switch When Available Enabled
      </InlineAlert>

      {isLoaded ? <Buttons></Buttons> : null}
    </>
  );
}
