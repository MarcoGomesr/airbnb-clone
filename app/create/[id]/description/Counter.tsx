'use client'

import { Button } from '@/components/ui/button'
import { Minus, Plus } from 'lucide-react'
import { useState } from 'react'

export default function Counter({ name }: { name: string }) {
  const [count, setCount] = useState(0)

  const handleIncrement = () => {
    setCount(count + 1)
  }

  const handleDecrement = () => {
    if (count > 0) {
      setCount(count - 1)
    }
  }

  return (
    <div className="flex items-center gap-x-4">
      <input type="hidden" name={name} value={count} />
      <Button
        variant="outline"
        size="icon"
        type="button"
        onClick={handleDecrement}
        disabled={count === 0}
      >
        <Minus className="w-4 h-4 text-primary" />
      </Button>
      <span className="text-2xl font-bold">{count}</span>
      <Button
        variant="outline"
        size="icon"
        type="button"
        onClick={handleIncrement}
      >
        <Plus className="w-4 h-4 text-primary" />
      </Button>
    </div>
  )
}
