'use client'

import { useLayoutEffect, useState } from 'react'
import { animatePageIn } from '@/lib/pageTransitions'
import { useSelectedLayoutSegments } from 'next/navigation'

export default function Template({ children }: { children: React.ReactNode }) {
  const selected = useSelectedLayoutSegments()
  const [prevRoute, setPrevRoute] = useState(selected.join('-'))

  /** Workaround — router.push() from an intercepted route seems to not trigger a refresh of template.js */
  useLayoutEffect(() => {
    if (prevRoute !== selected.join('-')) {
      animatePageIn()
    }
    setPrevRoute(selected.join('-'))
  }, [selected])

  useLayoutEffect(() => {
    animatePageIn()
  }, [])

  return <>{children}</>
}
