import type {
  PayPalButtonCreateOrder,
  PayPalButtonOnApprove,
  PayPalButtonOnCancel,
  PayPalButtonOnError,
} from "@paypal/paypal-js";

export interface PayPalCheckoutSdkInitOptions {
  clientID: string;
  webBaseUrl: string;
  currency: string;
  intent: string;
  environment: string;
  enableOrderCapture: boolean;
}

export interface PayPalCheckoutButtonInitOptions {
  initOptions: PayPalCheckoutSdkInitOptions;
  createOrder: PayPalButtonCreateOrder;
  onApprove: PayPalButtonOnApprove;
  onCancel: PayPalButtonOnCancel;
  onError: PayPalButtonOnError;
}
