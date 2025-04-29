import { useCallback, useState } from "react";
import {
  captureOrderApi,
  createOrderApi,
  getOrderApi,
} from "~/api/paypal-checkout";
import type {
  PayPalButtonOnApprove,
  PayPalButtonCreateOrder,
  PayPalButtonOnCancel,
  PayPalButtonOnError,
} from "@paypal/paypal-js";
import { Alert, Checkbox, toaster } from "evergreen-ui";
import type { MessagesInput } from "~/components/MessageList";
import MessageList from "~/components/MessageList";
import type { PayPalCheckoutSdkInitOptions } from "~/components/checkout-buttons/types";
import WebCheckout from "~/components/checkout-buttons/WebCheckout";
import WebCheckoutWithAppSwitch from "~/components/checkout-buttons/WebCheckoutWithAppSwitch";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

export function OneTimePayPalCheckoutButton({
  initOptions,
  enableAppSwitch,
}: {
  enableAppSwitch: boolean;
  initOptions: PayPalCheckoutSdkInitOptions;
}) {
  const {
    environment,
    enableOrderCapture,
    clientID: clientId,
    currency,
    intent,
  } = initOptions;
  const [messages, setMessages] = useState<MessagesInput[]>([]);
  const addMessage = useCallback(
    ({ intent, title }: Pick<MessagesInput, "title" | "intent">) => {
      switch (intent) {
        case "success":
          toaster.success(title);
          break;
        case "warning":
          toaster.warning(title);
          break;
        case "danger":
          toaster.danger(title);
          break;
        default:
          toaster.notify(title);
      }

      setMessages((prevMessages) => [
        ...prevMessages,
        { intent, title, key: window.crypto.randomUUID() },
      ]);
    },
    [],
  );
  const [orderDataPostBuyerApproval, setOrderDataPostBuyerApproval] = useState<
    unknown | null
  >(null);

  const [captureOrderResponse, setCaptureOrderResponse] = useState<
    unknown | null
  >(null);

  const createOrder = useCallback<PayPalButtonCreateOrder>(async () => {
    addMessage({ title: "Creating Order ID" });
    try {
      return createOrderApi();
    } catch (err: unknown) {
      const title =
        err instanceof Error
          ? err.message
          : "An error occurred while creating order";
      addMessage({ intent: "danger", title });
    }
  }, []);

  const onApprove = useCallback<PayPalButtonOnApprove>(
    async (data) => {
      try {
        addMessage({
          intent: "success",
          title: "Buyer Approved the Order. Fetching Order Details",
        });
        const res = await getOrderApi({ orderID: data.orderID });
        setOrderDataPostBuyerApproval(res);
        addMessage({
          intent: "success",
          title: "Successfully fetched Order Data.",
        });
        if (enableOrderCapture) {
          addMessage({
            title: "Capturing Order Data",
          });
          const captureResponse = await captureOrderApi({
            orderID: data.orderID,
          });
          addMessage({
            intent: "success",
            title: "Successfully captured Order.",
          });
          setCaptureOrderResponse(captureResponse);
        } else {
          addMessage({
            title: "Environment is not enabled for capturing the order.",
          });
        }
      } catch (err: unknown) {
        const title =
          err instanceof Error
            ? err.message
            : "An error occurred while fetching order details";
        addMessage({ intent: "danger", title });
      }
    },
    [enableOrderCapture],
  );

  const onCancel = useCallback<PayPalButtonOnCancel>(() => {
    addMessage({ intent: "warning", title: "Buyer Cancelled" });
  }, []);
  const onError = useCallback<PayPalButtonOnError>((err) => {
    const msg = "An Error occurred:" + err;
    addMessage({ intent: "danger", title: msg });
  }, []);

  return (
    <>
      <h3>One time PayPal Checkout example</h3>
      <Alert
        intent="none"
        title={`PayPal environment: ${environment}`}
        marginBottom={32}
      >
        {enableOrderCapture ? (
          <>Order Capture post buyer approval is enabled</>
        ) : (
          <>Order capture is disabled.</>
        )}
      </Alert>

      <MessageList messages={messages} />
      <PayPalScriptProvider
        options={{
          clientId,
          currency,
          intent: intent?.toLowerCase(),
          environment: environment === "live" ? "production" : "sandbox",
        }}
      >
        {enableAppSwitch ? (
          <WebCheckoutWithAppSwitch
            initOptions={initOptions}
            createOrder={createOrder}
            onApprove={onApprove}
            onCancel={onCancel}
            onError={onError}
          />
        ) : (
          <WebCheckout
            initOptions={initOptions}
            createOrder={createOrder}
            onApprove={onApprove}
            onCancel={onCancel}
            onError={onError}
          />
        )}
      </PayPalScriptProvider>

      {/*
      This information is only rendered here for demo purposes. In real production application,
      only the necessary details should be exposed from your serverside to your web application.
      */}
      {orderDataPostBuyerApproval && (
        <div>
          <h3>Response from GET order API</h3>
          <p>
            This information is only rendered here for demo purposes. In real
            production application, only the necessary details should be exposed
            from your serverside to your web application.
          </p>
          <pre>{JSON.stringify(orderDataPostBuyerApproval)}</pre>
        </div>
      )}

      {/*
      This information is only rendered here for demo purposes. In real production application,
      only the necessary details should be exposed from your serverside to your web application.
      */}
      {captureOrderResponse && (
        <div>
          <h3>Response from Capture order API</h3>
          <p>
            This information is only rendered here for demo purposes. In real
            production application, only the necessary details should be exposed
            from your serverside to your web application.
          </p>
          <pre>{JSON.stringify(captureOrderResponse)}</pre>
        </div>
      )}
    </>
  );
}
