import { createFileRoute } from '@tanstack/react-router'
import { EstablishmentsPage } from '../../pages/EstablishmentsPage';

export const Route = createFileRoute('/establishments/$localAuthorityId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <EstablishmentsPage />
}
