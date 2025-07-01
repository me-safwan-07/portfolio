'use client'

import { SiFacebook, SiGithub, SiInstagram, SiX, SiYoutube } from '@icons-pack/react-simple-icons'
import {
  Button,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator
} from '@/packages/ui'
import { CodeIcon, CommandIcon, LinkIcon, LogInIcon, LogOutIcon } from 'lucide-react'
import { Fragment, useCallback, useEffect, useState } from 'react'

import { useCopyToClipboard } from '@/app/hooks/use-copy-to-clipboard'
import { signOut, useSession } from '@/lib/auth-client'
import {
  SITE_FACEBOOK_URL,
  SITE_GITHUB_URL,
  SITE_INSTAGRAM_URL,
  SITE_X_URL,
  SITE_YOUTUBE_URL
} from '@/app/lib/constants'
import { useDialogsStore } from '@/stores/dialogs'
import { useRouter } from 'next/navigation'

type Groups = Array<{
  name: string
  actions: Array<{
    title: string
    icon: React.ReactNode
    onSelect: () => void | Promise<void>
  }>
}>

const CommandMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [copy] = useCopyToClipboard()
  const { data: session } = useSession()
  const { setIsSignInOpen } = useDialogsStore()
  const router = useRouter()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setIsOpen((value) => !value)
      }
    }

    document.addEventListener('keydown', down)

    return () => document.removeEventListener('keydown', down)
  }, [])

  const openLink = useCallback((url: string) => {
    setIsOpen(false)
    window.open(url, '_blank', 'noopener')
  }, [])

  const groups: Groups = [
    {
      name: 'Account',
      actions: [
        ...(session
          ? [
              {
                title: "Sign out",
                icon: <LogOutIcon />,
                onSelect: async () => {
                  await signOut({
                    fetchOptions: {
                      onSuccess: () => {
                        router.refresh()
                      }
                    }
                  })
                }
              }
            ]
          : [
              {
                title: "Sign in",
                icon: <LogInIcon />,
                onSelect: () => {
                  setIsOpen(false)
                  setIsSignInOpen(true)
                }
              }
            ])
      ]
    },
    {
      name: "General",
      actions: [
        {
          title: "Copy link",
          icon: <LinkIcon />,
          onSelect: async () => {
            setIsOpen(false)

            await copy({ text: globalThis.location.href })
          }
        },
        {
          title: "Source code",
          icon: <CodeIcon />,
          onSelect: () => openLink('https://github.com/tszhong0411/nelsonlai.me')
        }
      ]
    },
    {
      name: "Social",
      actions: [
        {
          title: 'GitHub',
          icon: <SiGithub />,
          onSelect: () => openLink(SITE_GITHUB_URL)
        },
        {
          title: 'Facebook',
          icon: <SiFacebook />,
          onSelect: () => openLink(SITE_FACEBOOK_URL)
        },
        {
          title: 'Instagram',
          icon: <SiInstagram />,
          onSelect: () => openLink(SITE_INSTAGRAM_URL)
        },
        {
          title: 'X',
          icon: <SiX />,
          onSelect: () => openLink(SITE_X_URL)
        },
        {
          title: 'YouTube',
          icon: <SiYoutube />,
          onSelect: () => openLink(SITE_YOUTUBE_URL)
        }
      ]
    }
  ]

  return (
    <>
      <Button
        variant='ghost'
        className='size-9 p-0'
        onClick={() => setIsOpen(true)}
        aria-label={"Open command menu"}
      >
        <CommandIcon />
      </Button>
      <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
        <CommandInput placeholder={"Type a command or search"} />
        <CommandList>
          <CommandEmpty>{"No results found."}</CommandEmpty>
          {groups.map((group, i) => (
            <Fragment key={group.name}>
              <CommandGroup heading={group.name}>
                {group.actions.map((action) => (
                  <CommandItem key={action.title} onSelect={action.onSelect}>
                    {action.icon}
                    {action.title}
                  </CommandItem>
                ))}
              </CommandGroup>
              {i === groups.length - 1 ? null : <CommandSeparator />}
            </Fragment>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  )
}

export default CommandMenu
