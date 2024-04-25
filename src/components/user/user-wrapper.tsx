import type { User } from '@prisma/client'

import { cn } from '@/lib/utils'

import UserInformation from './user-information'
import UserPhoto from './user-photo'

interface UserWrapperProps {
  children?: React.ReactNode
  user: User
  className?: string
  showButton?: boolean
  imageFromGCS?: boolean
}

const UserWrapper = ({
  children,
  user,
  className,
  showButton = false,
  imageFromGCS = true,
}: UserWrapperProps) => (
  <div className={cn('relative w-[340px] rounded-lg p-0 m-0 bg-server dark:bg-server-dark', className)}>
    <div className="absolute rounded-t-lg bg-[rgb(188,156,154)] h-[3.75rem] w-full" />
    <div className="p-4 m-0 space-y-3 rounded-lg shadow-md">
      <UserPhoto image={user.image} username={user.username} imageFromGCS={imageFromGCS} />
      <UserInformation user={user} showButton={showButton}>
        {children}
      </UserInformation>
    </div>
  </div>
)

export default UserWrapper
