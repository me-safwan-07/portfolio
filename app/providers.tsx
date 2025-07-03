'use client'

import { TRPCReactProvider } from '@/packages/trpc/client'
import { Toaster, TooltipProvider } from '@/packages/ui'
import { ThemeProvider } from 'next-themes'



type ProvidesProps = {
  children: React.ReactNode
}

const Providers = (props: ProvidesProps) => {
  const { children } = props

  return (
    <TRPCReactProvider>
      <ThemeProvider
        attribute='class'
        defaultTheme='system'
        enableSystem
        enableColorScheme
        disableTransitionOnChange
      >
        <TooltipProvider>
          {children}
          <Toaster
            toastOptions={{
              duration: 2500
            }}
            visibleToasts={5}
            expand
          />
        </TooltipProvider>
      </ThemeProvider>
    </TRPCReactProvider>
  )
}

export default Providers
