import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { AnimatePresence, MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

import appCss from "../styles.css?url";
import { BootScreen } from "@/components/boot-screen";
import { Dock } from "@/components/dock";
import { InteractiveFavicon } from "@/components/interactive-favicon";
import { ThemeProvider } from "@/components/theme-provider";
import { TopBar } from "@/components/top-bar";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="max-w-md rounded-3xl bg-background p-10 text-center neu">
        <p className="font-mono text-xs tracking-[0.3em] text-primary uppercase">404</p>
        <h1 className="mt-4 text-2xl font-bold">This screen doesn't exist</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          The route you followed isn't part of this app.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex h-11 items-center justify-center rounded-xl bg-background px-5 text-sm font-medium text-primary neu-interactive"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="max-w-md rounded-3xl bg-background p-10 text-center neu">
        <h1 className="text-xl font-semibold tracking-tight">This screen didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong. Try again or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex h-11 items-center justify-center rounded-xl bg-background px-5 text-sm font-medium text-primary neu-interactive"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex h-11 items-center justify-center rounded-xl bg-background px-5 text-sm font-medium neu-interactive"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Gaurav Khetwal — Full-Stack Developer" },
      {
        name: "description",
        content:
          "Portfolio of Gaurav Khetwal, a full-stack developer turning complex problems into clear, useful software.",
      },
      { name: "author", content: "Gaurav Khetwal" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&family=JetBrains+Mono:wght@400;500&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <InteractiveFavicon />
        <MotionConfig reducedMotion="user">
          <BootScreen />
          <div className="relative flex min-h-screen flex-col">
            <TopBar />
            <main className="flex-1">
              <AnimatePresence mode="wait" initial={false}>
                {/* Required: nested routes render here. */}
                <Outlet key={pathname} />
              </AnimatePresence>
            </main>
            <Dock />
          </div>
        </MotionConfig>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
