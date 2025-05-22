'use client'

import { useFormStatus } from 'react-dom'
import { Button } from './ui/button'
import { Heart, Loader2 } from 'lucide-react'

export default function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <>
      {pending ? (
        <Button disabled size="lg">
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          Next
        </Button>
      ) : (
        <Button type="submit" size="lg">
          Next
        </Button>
      )}
    </>
  )
}

export function AddToFavoritesButton() {
  const { pending } = useFormStatus()
  return (
    <>
      {pending ? (
        <Button
          variant="outline"
          size="icon"
          disabled
          className="bg-primary-foreground"
        >
          <Loader2 className="w-4 h-4 animate-spin text-primary" />
        </Button>
      ) : (
        <Button
          variant="outline"
          size="icon"
          className="bg-primary-foreground"
          type="submit"
        >
          <Heart />
        </Button>
      )}
    </>
  )
}

export function RemoveFromFavoritesButton() {
  const { pending } = useFormStatus()
  return (
    <>
      {pending ? (
        <Button
          variant="outline"
          size="icon"
          disabled
          className="bg-primary-foreground"
        >
          <Loader2 className="w-4 h-4 animate-spin text-primary" />
        </Button>
      ) : (
        <Button
          variant="outline"
          size="icon"
          className="bg-primary-foreground"
          type="submit"
        >
          <Heart className="w-4 h-4 text-primary" fill="#E21C49" />
        </Button>
      )}
    </>
  )
}
