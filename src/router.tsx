// import { createBrowserRouter, RouteObject } from 'react-router-dom'

import { createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

// export const routerObjects: RouteObject[] = [
//   {
//     path: '/',
//     Component: MainPage,
//   },
//   {
//     path: '/payments/done',
//     Component: PaymentDone,
//   },
//   {
//     path: '/home',
//     Component: HomePage,
//   },
//   {
//     path: '/sell',
//     Component: SellProduct,
//   },
//   {
//     path: '/profile',
//     Component: Profile,
//   },
//   {
//     path: '/profile/settings',
//     Component: Settings,
//   },
//   {
//     path: '/profile/help',
//     Component: Profile,
//   },
//   {
//     path: '/product/:name',
//     Component: Product,
//   },
//   {
//     path: '/:category/:name',
//     Component: Category,
//   },
//   {
//     path: '/:name',
//     Component: Product,
//   },
// ]

// export function createRouter(): ReturnType<typeof createBrowserRouter> {
//   // Wrap the mapping in startTransition to avoid UI blocking
//   const routeWrappers = routerObjects.map((router) => {
//     // @ts-ignore TODO: better type support
//     const getLayout = router.Component?.getLayout || getDefaultLayout
//     const Component = router.Component ?? getDefaultLayout

//     let page
//     // Use startTransition for rendering that may suspend
//     startTransition(() => {
//       router.path === '/'
//         ? (page = <Component key={null} type={''} props={undefined} />)
//         : (page = getLayout(<Component key={null} type={''} props={undefined} />))
//     })

//     return {
//       ...router,
//       element: page,
//       Component: null, // Set to null as we're using the element
//       ErrorBoundary: ErrorPage,
//     }
//   })

//   return createBrowserRouter(routeWrappers)
// }

export const router = createRouter({ routeTree })
