import { getServerUrl } from "~/api/server";

export async function getClientConfig() {
  const response = await fetch(
    new URL("/api/paypal/client-config", getServerUrl()),
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  return await response.json();
}

export async function getCatalogConfig() {
  const response = await fetch(
    new URL("/api/catalog/products", getServerUrl()),
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  return await response.json();
}
