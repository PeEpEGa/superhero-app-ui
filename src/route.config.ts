import { createRouter } from "@tanstack/react-router";
import { queryClient } from "./shared/providers/queryClient";
import { routeTree } from "./routeTree.gen";

export const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
  defaultPreload: "intent",
  defaultPreloadStaleTime: 0,
  scrollRestoration: true,
});

// Register things for typesafety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
