'use client'

import { useState } from 'react'
import Image from 'next/image'

import { categoryItems } from '@/lib/categoryItems'
import { Card, CardHeader } from './ui/card'

export function SelectCategory() {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    undefined
  )

  return (
    <div className="grid grid-cols-4 gap-8 mt-10 w-3/5 mx-auto mb-36">
      <input
        type="hidden"
        name="categoryName"
        value={selectedCategory as string}
      />
      {categoryItems.map((category) => (
        <div key={category.id} className="cursor-pointer">
          <Card
            className={
              selectedCategory === category.name ? 'border-primary' : ''
            }
            onClick={() => setSelectedCategory(category.name)}
          >
            <CardHeader>
              <Image
                src={category.imageUrl}
                alt={category.name}
                width={32}
                height={32}
                className="w-10 h-10"
              />
              <h3 className="font-medium">{category.name}</h3>
            </CardHeader>
          </Card>
        </div>
      ))}
    </div>
  )
}
