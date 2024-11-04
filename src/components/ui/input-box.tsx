'use client'

import { type Point } from "../keyboard/virtual-keyboard";

export type InputBoxProps = {
  className?: string;
  value: string[][]
  position: Point

  text: string;
  pos: number;
}

const InputBox = ({ className, value, position, text, pos }: InputBoxProps) => {
  return (
    <div className="w-5/6 rounded-md border-input bg-input max-w-xl overflow-y-scroll mx-auto p-2 text-md border h-32 whitespace-pre-wrap break-words focus:outline-none pointer-events-none">
      {text.slice(0, pos)}
      <span className="animate-blink border-r-2 border-black dark:border-white"></span>
      {text.slice(pos)}
    </div>
  )
}

InputBox.displayName = "InputBox"

export { InputBox };

