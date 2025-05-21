import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { useFormStatus } from 'react-dom'

export function ReservationSubmit() {
  const { pending } = useFormStatus()

  return (
    <>
      {pending ? (
        <Button className="w-full" disabled>
          <Loader2 className="w-4 h-4 animate-spin mr-2" />
          Please wait...
        </Button>
      ) : (
        <Button className="w-full" type="submit">
          Make a reservation
        </Button>
      )}
    </>
  )
}
