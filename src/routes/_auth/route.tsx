import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth')({
  component: Auth,
})

function Auth() {
  return <div>
    {/* <h1>heading in auth</h1> */}
    <Outlet/>
  </div>
}
