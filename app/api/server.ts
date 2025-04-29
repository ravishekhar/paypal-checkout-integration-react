const BACKEND_API_SERVER_SANDBOX =
  "https://merchant-server-sandbox-9f408d8a31d6.herokuapp.com";

const BACKEND_API_SERVER_PRODUCTION =
  "https://merchant-server-production-80668a0e1d67.herokuapp.com";

export function getServerUrl() {
  return BACKEND_API_SERVER_PRODUCTION;
}
