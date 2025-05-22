import { Card, CardHeader } from '@/shared/components/ui/card'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'
import { Textarea } from '@/shared/components/ui/textarea'
import Counter from './Counter'
import CreateBottomBar from '../createBottomBar'
import { createDescriptionPage } from '../actions'

export default async function DescriptionPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return (
    <>
      <div className="w-3/5 mx-auto">
        <h2 className="text-3xl font-semibold tracking-tight transition-colors">
          Please describe your home as good as you can!
        </h2>
      </div>

      <form action={createDescriptionPage}>
        <input type="hidden" name="id" value={id} />
        <div className="mx-auto w-3/5 mt-10 flex flex-col gap-y-5 mb-36">
          <div className="flex flex-col gap-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              type="text"
              name="title"
              id="title"
              required
              placeholder="Short and simple..."
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              name="description"
              id="description"
              required
              placeholder="Please describe your home..."
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <Label htmlFor="price">Price</Label>
            <Input
              type="number"
              name="price"
              id="price"
              required
              placeholder="Price per Night in USD"
              min={10}
            />
          </div>

          <div className="flex flex-col gap-y-2">
            <Label htmlFor="image">Image</Label>
            <Input
              type="file"
              name="image"
              accept="image/*"
              required
              className="cursor-pointer"
            />
          </div>

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
        </div>
        <CreateBottomBar />
      </form>
    </>
  )
}
