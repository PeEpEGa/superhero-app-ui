import type { QueryClient } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  Link,
  Outlet,
} from "@tanstack/react-router";
import Header from "../shared/components/Header";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
  {
    component: RootComponent,
    notFoundComponent: NotFoundComponent,
  }
);

function RootComponent() {
  return (
    <div className="flex flex-col h-screen w-full overflow-hidden">
      {/* Header */}
      <Header />

      {/* Main content */}
      <main className="h-full overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
}

function NotFoundComponent() {
  return (
    <div>
      <p>This is the notFoundComponent configured on root route</p>
      <Link to="/">Start Over</Link>
    </div>
  );
}
