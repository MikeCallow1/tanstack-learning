import {
  RouterProvider,
  createRouter,
  createRoute,
  createRootRoute,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { EstablishmentsPage } from './pages/EstablishmentsPage'
import { App } from './App'
import { EstablishmentPage } from './pages/EstablishmentPage'
import { fetchEstablishment } from './services/api'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const rootRoute = createRootRoute({
  component: () => (
    <>
      <App />
      <TanStackRouterDevtools />
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  ),
})

const establishmentsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'establishments/$localAuthorityId',
  component: EstablishmentsPage,
})

const establishmentRoute = createRoute({
  validateSearch: (search) =>
    search as {
      fhrsId: number
    },
  getParentRoute: () => rootRoute,
  path: 'establishment/$fhrsId',
  component: EstablishmentPage,
  loaderDeps: ({ search: { fhrsId } }) => ({ fhrsId }), // ?fhrsId=123
  // loader: ({ deps: { fhrsId } }) => fetchEstablishment(fhrsId),
})

const routeTree = rootRoute.addChildren([establishmentsRoute, establishmentRoute])

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export const CodeBasedRouterProvider = () => {
  return (
    <RouterProvider router={router} basepath='/tanstack-learning/' />
  )
};