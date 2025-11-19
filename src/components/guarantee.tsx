import { ChevronRight } from 'lucide-react'
import React, { useState } from 'react'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from 'src/components/ui/dialog'
import { Button } from './ui/button'

const Guarantee = () => {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant={'secondary'} className="flex items-center gap-2">
            💯 Guaranteed service
            <ChevronRight size={16} />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <div className="hidden">
            <DialogTitle />
            <DialogDescription />
          </div>
          <div className="flex flex-col items-center gap-6">
            <div className="text-2xl font-bold">💯 Guaranteed</div>
            <div className="text-center text-lg">
              Service guarateed. Seller will not receive payment until you confirm receipt of the item
            </div>

            <DialogClose asChild className="w-full">
              <Button onClick={() => setOpen(false)}>Okay, thanks</Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Guarantee
