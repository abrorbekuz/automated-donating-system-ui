import { createFileRoute } from '@tanstack/react-router'
import PaymentDone from 'src/components/paymentdone'

export const Route = createFileRoute('/payments/done')({
  component: PaymentDone,
})
