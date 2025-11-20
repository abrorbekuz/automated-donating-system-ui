import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from 'src/components/ui/avatar' // Adjust the path accordingly
import { useMeContext } from 'src/hooks/MeContext'
import { cn } from 'src/lib/utils'
import { Label } from '../ui/label'
import { Button } from '../ui/button'

const UserAvatar = ({ className, usernameOnly }: { className?: string; usernameOnly?: boolean }) => {
  const { loading, error, me } = useMeContext()

  if (loading || error) return <></>

  if (usernameOnly) {
    return (
      <Button variant="outline">
        <Label className="uppercase">{me?.user.username}</Label>
      </Button>
    )
  }

  return (
    <Button variant="outline">
      <Avatar className={cn('h-8 w-8 border-2 border-foreground', className)}>
        <AvatarImage
          className="bg-background object-cover object-center"
          src={me?.image || '/nouserimage.webp'}
          alt="User"
        />
        <AvatarFallback className="uppercase">{me?.user.username[0]}</AvatarFallback>
      </Avatar>
    </Button>
  )
}

export default UserAvatar
