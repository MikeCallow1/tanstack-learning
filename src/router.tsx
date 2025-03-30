import {
  RouterProvider,
  createRouter,
  createRoute,
  createRootRoute,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { EstablishmentsPage } from './pages/EstablishmentsPage'
import { App } from './App'

const rootRoute = createRootRoute({
  component: () => (
    <>
      <App />
      <TanStackRouterDevtools />
    </>
  ),
})

const establishmentsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'establishments/$localAuthorityId',
  component: EstablishmentsPage,
})

const routeTree = rootRoute.addChildren([establishmentsRoute])

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export const CodeBasedRouterProvider = () => {
  return (
    <RouterProvider router={router} />
  )
};