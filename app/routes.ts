import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("appswitch", "routes/appswitch/home.tsx"),
] satisfies RouteConfig;
