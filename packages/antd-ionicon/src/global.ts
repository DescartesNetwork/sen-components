/// <reference types="react" />

declare namespace JSX {
  interface IntrinsicElements {
    'ion-icon': any
  }
}

declare module '*.svg' {
  import * as React from 'react'

  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >

  const src: string
  export default src
}
