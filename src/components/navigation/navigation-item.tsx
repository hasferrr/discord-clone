'use client'

import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'

import { ActionTooltip } from '@/components/action-tooltip'
import { cn } from '@/lib/utils'

interface NavigationItemProps {
  id: string
  name: string
  image: string | null
}

const NavigationItem = ({ id, name, image }: NavigationItemProps) => {
  const params = useParams()
  const router = useRouter()

  const handleClick = () => router.push(`/servers/${id}`)

  return (
    <div>
      <ActionTooltip
        label={name}
        side="right"
        align="center"
      >
        <button
          onClick={handleClick}
          className="group flex items-center"
        >
          <div className={cn('absolute left-0 bg-primary rounded-r-[24px] transition-all w-[4px]',
            params?.['serverId'] !== id && 'group-hover:h-[20px]',
            params?.['serverId'] === id ? 'h-[36px]' : 'h-[8px]',
          )} />
          <div className={cn('w-[48px] h-[48px] rounded-[24px] mx-3',
            'flex overflow-hidden transition-all select-none',
            'group group-hover:rounded-[16px]',
            params['serverId'] === id && 'rounded-[16px]',
          )}>
            <Image
              className="object-cover"
              src={`https://storage.googleapis.com/server-profile/${image}`}
              alt="server"
              width={48}
              height={48}
              priority
              unoptimized
            />
          </div>
        </button>
      </ActionTooltip>
    </div>
  )
}

export default NavigationItem
