'use client'

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "~/lib/utils";

const buttonVariants = cva(
  "relative justify-center rounded-md font-medium capitalize ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 px-3 py-2 text-sm font-semibold bg-white border border-button rounded-lg",
  {
    variants: {
      variant: {
        default: "bg-button text-white dark:hover:bg-button/70 hover:bg-button/90",
      },
      size: {
        default: "h-10 px-4 py-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends VariantProps<typeof buttonVariants> {
  className: string;
  alt?: string;
  altOn: boolean
  value: string;
  caps?: boolean;
  capsOn?: boolean;
  label: string;
  appendValue?: (value: string) => void
}

const KeyboardButton = ({ className, variant, size, alt, value, label, caps, capsOn = false, altOn = false, appendValue }: ButtonProps) => {

  const clickValue = () => {
    const ascii = value.charCodeAt(0);
    if (appendValue) {
      if (ascii >= 97 && ascii <= 122 && capsOn) {
        const capital = String.fromCharCode(ascii - 32)
        appendValue(capital)
      } else if (alt && altOn) {
        appendValue(alt)
      } else {
        appendValue(value)
      }
    }

  }
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      onClick={clickValue}
    >
      {
        alt && <div className="absolute top-2 left-2 text-xs">{alt}</div>
      }
      {label}
      {caps && <div className={`w-1 h-1 rounded-full ${capsOn ? 'bg-blue-400' : 'bg-blue-200'} absolute bottom-2 right-2 drop-shadow-glow`}></div>}
      {value == 'Shift' && <div className={`w-1 h-1 rounded-full ${altOn ? 'bg-blue-400' : 'bg-blue-200'} absolute bottom-2 right-2 drop-shadow-glow`}></div>}

    </button>
  )
}

KeyboardButton.displayName = "Button"

export { buttonVariants, KeyboardButton };

