import { PayPalButtons } from "@paypal/react-paypal-js";
import type { PayPalCheckoutButtonInitOptions } from "~/components/checkout-buttons/types";

export default function WebCheckout({
  createOrder,
  onApprove,
  onCancel,
  onError,
}: PayPalCheckoutButtonInitOptions) {
  return (
    <PayPalButtons
      createOrder={createOrder}
      onApprove={onApprove}
      onCancel={onCancel}
      onError={onError}
    />
  );
}
