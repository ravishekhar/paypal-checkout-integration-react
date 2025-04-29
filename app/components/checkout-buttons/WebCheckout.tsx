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
      message={{
        // This amount is hard coded for demo purposes
        amount: 120.0,
        offer: "pay_later_short_term",
        position: "top",
      }}
      createOrder={createOrder}
      onApprove={onApprove}
      onCancel={onCancel}
      onError={onError}
    />
  );
}
