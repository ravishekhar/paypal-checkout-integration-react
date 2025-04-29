import type { Route } from "../+types/home";
import store from "~/data/store";
import { Heading, majorScale, Pane } from "evergreen-ui";
import UserEmail from "~/components/UserEmail";
import ShoppingCart from "~/components/shopping-cart";
import { PayPalCheckoutButton } from "~/components/checkout-buttons";
import { Provider } from "react-redux";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "PayPal Checkout Examples with App Switch" },
    { name: "description", content: "PayPal Checkout Examples!" },
  ];
}

export default function Home() {
  return (
    <Provider store={store}>
      <Pane marginX={majorScale(2)}>
        <Heading size={900}>PayPal checkout example (with app switch)</Heading>
        <UserEmail></UserEmail>
        <ShoppingCart />
        <PayPalCheckoutButton enableAppSwitch={true} />
      </Pane>
    </Provider>
  );
}
