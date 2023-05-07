import clsx from 'clsx'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: string
  parentClassName?: string
}

export function Input(props: InputProps) {
  const { icon, parentClassName, ...rest } = props
  return (
    <div
      className={clsx(
        parentClassName,
        'relative',
        'group',
        'bg-white rounded',
        'text-black'
      )}
    >
      <span
        className={clsx(
          'material-symbols-rounded',
          'absolute top-1/2 left-1 -translate-y-1/2',
          'transition-all',
          'text-gray-500 group-focus-within:text-black font-sm'
        )}
      >
        {icon ?? 'search'}
      </span>
      <input
        className={clsx('w-full pl-8 pr-2 py-2', 'bg-transparent')}
        type="search"
        placeholder="search..."
        {...rest}
      />
    </div>
  )
}
