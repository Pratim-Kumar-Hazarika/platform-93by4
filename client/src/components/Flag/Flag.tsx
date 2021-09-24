import { ReactNode } from 'react'
import { Error } from '../'
import featureFlags from '../../../flags.json'

export function Flag({
  children,
  flag,
}: {
  children: ReactNode
  flag?: string
}) {
  // feature state
  let featureState = true
  if (flag && featureFlags.hasOwnProperty(flag)) {
    featureState = featureFlags[flag as keyof typeof featureFlags]
  }

  return <>{featureState ? children : ''}</>
}
