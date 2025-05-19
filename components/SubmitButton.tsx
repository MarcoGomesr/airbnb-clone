'use client'

import { useFormStatus } from 'react-dom'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'

export default function SubmitButton() {
  const { pending } = useFormStatus()
  const handleClick = () => {
    console.log('Submit button clicked')
  }
  return (
    <>
      {pending ? (
        <Button disabled size="lg">
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          Next
        </Button>
      ) : (
        <Button type="submit" size="lg" onClick={handleClick}>
          Next
        </Button>
      )}
    </>
  )
}
