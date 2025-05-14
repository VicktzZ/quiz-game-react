import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/concluded')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/concluded"!</div>
}
