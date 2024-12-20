'use client'

import { useEffect, useRef } from "react";

export type InputBoxProps = {
  className?: string;
  text: string;
  pos: number;
}

const InputBox = ({ text, pos }: InputBoxProps) => {

  const textBoxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollToBottomSmooth()
  }, [text])

  const handleInput = () => {
    if (textBoxRef.current) {
      textBoxRef.current.scrollTop = textBoxRef.current.scrollHeight
    }
  }

  const scrollToBottomSmooth = () => {
    if (textBoxRef.current) {
      textBoxRef.current.scrollTo({
        top: textBoxRef.current.scrollHeight,
        behavior: 'smooth'
      })
    }
  }


  return (
    <div role="textbox"
      aria-multiline="true"
      tabIndex={0}
      className="w-80 md:w-96 h-28 overflow-y-scroll bg-input border border-gray-300 rounded-md p-3 shadow-sm text-wrap whitespace-pre-wrap break-words"
      ref={textBoxRef}
      onInput={handleInput}
    >
      {text.slice(0, pos)}
      <span className="animate-blink border-r-2 border-black dark:border-white"></span>
      {text.slice(pos)}
    </div>
  )
}

InputBox.displayName = "InputBox"

export { InputBox };

