'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/shared/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/shared/components/ui/select'
import { useCountries } from '@/shared/utils/getCountries'
import { HomeMap } from '@/shared/components/general/HomeMap'
import { Button } from '@/shared/components/ui/button'
import SubmitButton from '@/shared/components/general/SubmitButton'
import { Card, CardHeader } from '@/shared/components/ui/card'
import Counter from '../(pages)/create/[id]/description/Counter'

export default function SearchComponent() {
  const [step, setStep] = useState(1)
  const [locationValue, setLocationValue] = useState('')
  const { getAllCountries } = useCountries()

  const SubmitButtonLocal = () => {
    if (step === 1) {
      return (
        <Button onClick={() => setStep(step + 1)} type="button">
          Next
        </Button>
      )
    } else if (step === 2) {
      return <SubmitButton />
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="rounded-full py-2 px-5 border flex items-center cursor">
          <div className="flex h-full divide-x font-medium cursor-pointer">
            <p className="px-4">Anywhere</p>
            <p className="px-4">Any Week</p>
            <p className="px-4">Add Guests</p>
          </div>
          <Search className="bg-primary text-white p-1 w-8 h-8 rounded-full cursor-pointer" />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form className="gap-4 flex flex-col">
          <input type="hidden" name="country" value={locationValue} />
          {step === 1 ? (
            <>
              <DialogHeader>
                <DialogTitle>Select a Country</DialogTitle>
                <DialogDescription>Please choose a country</DialogDescription>
              </DialogHeader>
              <Select required onValueChange={setLocationValue}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Countries</SelectLabel>
                    {getAllCountries().map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.flag} {item.label} / {item.region}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <HomeMap locationValue={locationValue} />
            </>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>Select all info you need</DialogTitle>
                <DialogDescription>Please choose a country</DialogDescription>
              </DialogHeader>

              <Card>
                <CardHeader className="flex flex-col gap-y-5">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex flex-col">
                      <h3 className="underline font-medium">Guest</h3>
                      <p className="text-muted-foreground">
                        How many guests do you want?
                      </p>
                    </div>

                    <Counter name="guests" />
                  </div>
                  <div className="flex items-center justify-between w-full">
                    <div className="flex flex-col">
                      <h3 className="underline font-medium">Rooms</h3>
                      <p className="text-muted-foreground">
                        How many Rooms do you have?
                      </p>
                    </div>

                    <Counter name="bedrooms" />
                  </div>
                  <div className="flex items-center justify-between w-full">
                    <div className="flex flex-col">
                      <h3 className="underline font-medium">Bathrooms</h3>
                      <p className="text-muted-foreground">
                        How many Bathrooms do you have?
                      </p>
                    </div>

                    <Counter name="bathrooms" />
                  </div>
                </CardHeader>
              </Card>
            </>
          )}

          <DialogFooter>
            <SubmitButtonLocal />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
