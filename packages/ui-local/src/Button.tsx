import clsx from 'clsx'
import * as React from 'react'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  kind?: 'primary' | 'secondary'
}

export function Button(props: ButtonProps) {
  const { className, kind, ...rest } = props
  return (
    <button
      {...rest}
      className={clsx(className, ' px-3 py-2 rounded text-white', {
        'bg-blue-500 hover:bg-blue-600': kind === 'primary',
        'bg-gray-500 hover:bg-gray-600': kind === 'secondary',
      })}
    >
      {props.children}
    </button>
  )
}
