import { getServerUrl } from "~/api/server";
import store from "~/data/store";
export const createOrderApi = async () => {
  const state = store.getState();
  const response = await fetch(
    new URL("/api/paypal/create-order", getServerUrl()),
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        /**
         * Important: DO NOT USE IN PRODUCTION
         * In this example the user's email is being persisted in Web Browser's state and Local Storage,
         * and is being passed during create order stage to your serverside.
         * In an ideal application the user's email should be securely stored in your server side.
         * Your web application should use a secure non-enumerable identifiers to refers to the state.
         */
        ...(state.user.emailAddress
          ? { buyerEmail: state.user.emailAddress }
          : {}),
        onApproveUrl: window.location.href,
        onCancelUrl: window.location.href,
        cart: state.shoppingCart.items,
      }),
    },
  );
  const data = await response.json();
  // The backend server returns complete response of PayPal create order api.
  // In an ideal production application, only return the necessary data to the web, i.e. only the orderID in this case
  console.log("Create PayPal order response", data);
  return data.id;
};

export const getOrderApi = async ({
  orderID,
}: {
  orderID: string;
}): Promise<unknown> => {
  const url = new URL("/api/paypal/get-order", getServerUrl());
  url.searchParams.append("orderID", orderID);
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  // The backend server returns complete response of PayPal GET order api details
  // In an ideal production application, only return the necessary data to the web.
  console.log("Get PayPal order response", data);
  return data;
};

export const captureOrderApi = async ({
  orderID,
}: {
  orderID: string;
}): Promise<unknown> => {
  const response = await fetch(
    new URL("/api/paypal/capture-order", getServerUrl()),
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ orderID }),
    },
  );
  const data = await response.json();
  // The backend server returns complete response of PayPal Capture order api details
  // In an ideal production application, only return the necessary data to the web.
  console.log("Capture PayPal order response", data);
  return data;
};
