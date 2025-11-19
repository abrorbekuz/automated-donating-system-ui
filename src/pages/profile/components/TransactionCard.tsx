import React from 'react'
import { Card } from 'src/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from 'src/components/ui/dialog'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from 'src/components/ui/drawer'
import { DiamondIcon } from 'lucide-react'
import { Separator } from 'src/components/ui/separator'
import { Button } from 'src/components/ui/button'
import { TransactionType } from 'src/types/transactionType'
import useMediaQuery from 'src/hooks/use-media-query'
import { format } from 'date-fns'
import { NavLink } from 'react-router-dom'

const TransactionCard: React.FC<{ node: TransactionType }> = ({ node }) => {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery('(min-width: 768px)')

  return isDesktop ? (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Card className={`flex flex-col gap-3 p-4 ${node.status === 'done' && 'border-primary'}`}>
          <div className="flex h-full items-start gap-2">
            <div className="flex w-full flex-col">
              <h2 className="overflow-hidden text-lg font-normal md:whitespace-normal">{node.service.title}</h2>
              <div className="flex justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  {format(new Date(node.createdAt), 'MMMM dd, yyyy h:mm a')}
                </div>
                {node.amount} {node.currency}
              </div>
            </div>
          </div>
          <Separator />
          <div className="flex flex-wrap items-center gap-4">
            {node.products.map((product, idx) => (
              <React.Fragment key={idx}>
                {product.title}
                {idx < node.products.length - 1 && <DiamondIcon className="h-2 w-2" />}
              </React.Fragment>
            ))}
          </div>
        </Card>
      </DialogTrigger>
      <DialogContent className="min-w-[800px]">
        <DialogHeader>
          <DialogTitle>Transaction</DialogTitle>
          <DialogDescription>Details</DialogDescription>
        </DialogHeader>
        <div className="flex gap-4">
          <img
            src={
              node.status === 'done'
                ? '/assets/ok.png'
                : `https://api.qrserver.com/v1/create-qr-code/?data=${node.paymentLink}&amp;size=200x200`
            }
            className="aspect-square h-[200px] w-[200px] object-contain"
          />

          <div className="flex flex-col justify-center gap-3">
            <div>
              <strong>Total Amount:</strong> {node.amount} {node.currency}
            </div>
            <div>
              <strong>Payment Method:</strong> {node.paymentMethod}
            </div>
            <div>
              <strong>Service:</strong> {node.service.title}
            </div>
            <div>
              <strong>Server:</strong> {node.outputs}
            </div>
            {node.status !== 'done' && (
              <NavLink to={node.paymentLink}>
                <Button>Pay</Button>
              </NavLink>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  ) : (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Card className={`flex flex-col gap-3 p-3 ${node.status === 'done' && 'border-primary'}`}>
          <div className="flex h-full items-start gap-2">
            <div className="flex w-full flex-col">
              <h2 className="overflow-hidden text-lg font-normal md:whitespace-normal">{node.service.title}</h2>
              <div className="flex justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  {format(new Date(node.createdAt), 'MMMM dd, yyyy h:mm a')}
                </div>
                {node.amount} {node.currency}
              </div>
            </div>
          </div>
          <Separator />
          <div className="flex flex-wrap items-center gap-4">
            {node.products.map((product, idx) => (
              <React.Fragment key={idx}>
                {product.title}
                {idx < node.products.length - 1 && <DiamondIcon className="h-2 w-2" />}
              </React.Fragment>
            ))}
          </div>
        </Card>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Transaction</DrawerTitle>
          <DrawerDescription>Details</DrawerDescription>
        </DrawerHeader>
        <div className="flex w-full flex-col items-center justify-center gap-8 p-4">
          {node.status !== 'done' && (
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?data=${node.paymentLink}&amp;size=200x200`}
              className="aspect-square h-[200px] w-[200px] object-contain"
            />
          )}
          <Card className="flex flex-col gap-3 p-4">
            <div>
              <strong>Total Amount:</strong> {node.amount} {node.currency}
            </div>
            <div>
              <strong>Payment Method:</strong> {node.paymentMethod}
            </div>
            <div>
              <strong>Service:</strong> {node.service.title}
            </div>
            <div>
              <strong>Server:</strong> {node.outputs}
            </div>

            {node.status !== 'done' ? (
              <NavLink to={node.paymentLink}>
                <Button className="w-full">Pay</Button>
              </NavLink>
            ) : (
              <div>
                <strong>Status:</strong> ✅
              </div>
            )}
          </Card>
        </div>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default TransactionCard
