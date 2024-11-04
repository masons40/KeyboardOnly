'use client'

import { Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { saveMessageAction } from "~/server/actions/actions";
import { Button } from "../ui/button";
import { InputBox } from "../ui/input-box";
import { KeyboardButton } from "../ui/keyboard-button";

export interface Point {
    x: number;
    y: number;
}

const VirtualKeyBoard = () => {
    const [inputTextArray, setInputTextArray] = useState<string[][]>([['']]);
    const [inputText, setInputText] = useState<string>('');
    const [cursorPos, setCursorPos] = useState<number>(0)
    const [cursorPosition, setCursorPosition] = useState<Point>({ x: 0, y: 0 })
    const [caps, setCaps] = useState(false)
    const [alt, setAlt] = useState(false)

    const appendValue = (value: string) => {
        setInputText((prev) => {
            return prev.slice(0, cursorPos) + value + prev.slice(cursorPos, prev.length);
        }
        )
        setCursorPos(cursorPos + 1)
    }

    const backspace = () => {
        setInputText((prev) => {
            return prev.slice(0, cursorPos - 1) + prev.slice(cursorPos, inputText.length);
        }
        )
        setCursorPos(cursorPos - 1)
    }

    const left = () => {
        if (cursorPos > 0) setCursorPos(cursorPos - 1)
    }

    const right = () => {
        if (cursorPos < inputText.length) setCursorPos(cursorPos + 1)
    }

    const up = () => {
        const split = inputText.split('\n')
        let cumulativeLength = 0;
        const index = split.findIndex(part => {
            cumulativeLength += part.length + 1; // Adding 1 for the '\n' character
            return cumulativeLength > cursorPos;
        });
        if (split[index] && index - 1 >= 0) {
            const diff = (cumulativeLength - cursorPos)
            // if (split[index+1]!.length > diff)
            for (let i = index + 1; i < split.length; i++) {
                if (split[i]!.length > diff) {
                    setCursorPos(cumulativeLength - diff)
                } else {
                    setCursorPos(cumulativeLength)
                }
            }
            setCursorPos(cursorPos + diff + split[index].length)
        }
    }

    const down = () => {
        const split = inputText.split('\n')
        let cumulativeLength = 0;
        const index = split.findIndex(part => {
            cumulativeLength += part.length + 1; // Adding 1 for the '\n' character
            return cumulativeLength > cursorPos;
        })
        if (split[index] && index + 1 < split.length) {
            const diff = (cumulativeLength - cursorPos)
            // if (split[index+1]!.length > diff)
            for (let i = index + 1; i < split.length; i++) {
                if (split[i]!.length > diff) {
                    setCursorPos(cumulativeLength + diff)
                } else {
                    setCursorPos(cumulativeLength)
                }
            }
            setCursorPos(cursorPos + diff + split[index].length)
        }
    }

    const saveMessage = async () => {
        await saveMessageAction(inputText).then(
            () => {
                setInputText('')
            },
            () => {
                toast.error("Couldn't save the message");
            },
        );
    }

    return (
        <div className="space-y-4 w-full p-2 pr-0 mx-auto">
            <div className="flex items-center space-x-2 w-5/6 mx-auto">
                <InputBox value={inputTextArray} position={cursorPosition} text={inputText} pos={cursorPos} className="h-36" />
                {/* <Textarea value={inputText} readOnly/> */}
                <Button onClick={saveMessage} className="bg-button text-white dark:hover:bg-button/70 hover:bg-button/90"><Send />Send</Button>
            </div>
            <div className="grid grid-cols-13 grid-rows-5 w-fit gap-1 mx-auto">
                <KeyboardButton className="w-16 h-16 rounded-md" value={"`"} alt={'¬'} capsOn={caps} altOn={alt} appendValue={appendValue} label={"`"} />
                <KeyboardButton className="col-start-2 row-start-1 w-16 h-16 rounded-md" value={"1"} alt={'!'} capsOn={caps} altOn={alt} appendValue={appendValue} label={"1"} />
                <KeyboardButton className="col-start-3 row-start-1 w-16 h-16 rounded-md" value={"2"} alt={'"'} capsOn={caps} altOn={alt} appendValue={appendValue} label={"2"} />
                <KeyboardButton className="col-start-4 row-start-1 w-16 h-16 rounded-md" value={"3"} alt={'£'} capsOn={caps} altOn={alt} appendValue={appendValue} label={"3"} />
                <KeyboardButton className="col-start-5 row-start-1 w-16 h-16 rounded-md" value={"4"} alt={'$'} capsOn={caps} altOn={alt} appendValue={appendValue} label={"4"} />
                <KeyboardButton className="col-start-6 row-start-1 w-16 h-16 rounded-md" value={"5"} alt={'%'} capsOn={caps} altOn={alt} appendValue={appendValue} label={"5"} />
                <KeyboardButton className="col-start-7 row-start-1 w-16 h-16 rounded-md" value={"6"} alt={'^'} capsOn={caps} altOn={alt} appendValue={appendValue} label={"6"} />
                <KeyboardButton className="col-start-8 row-start-1 w-16 h-16 rounded-md" value={"7"} alt={'&'} capsOn={caps} altOn={alt} appendValue={appendValue} label={"7"} />
                <KeyboardButton className="col-start-9 row-start-1 w-16 h-16 rounded-md" value={"8"} alt={'*'} capsOn={caps} altOn={alt} appendValue={appendValue} label={"8"} />
                <KeyboardButton className="col-start-10 row-start-1 w-16 h-16 rounded-md" value={"9"} alt={'('} capsOn={caps} altOn={alt} appendValue={appendValue} label={"9"} />
                <KeyboardButton className="w-16 h-16 col-start-11 rounded-md" value={"0"} alt={')'} capsOn={caps} altOn={alt} appendValue={appendValue} label={"0"} />
                <div className="col-span-2 col-start-12 row-start-1" onClick={() => backspace()}><KeyboardButton className="w-full h-16 rounded-md" value={""} capsOn={caps} altOn={alt} appendValue={appendValue} label={"Backspace"} /></div>

                <KeyboardButton className="row-start-2 w-16 h-16 rounded-md" value={"\t"} capsOn={caps} altOn={alt} appendValue={appendValue} label={"Tab"} />
                <KeyboardButton className="row-start-2 w-16 h-16 rounded-md" value={"q"} capsOn={caps} altOn={alt} appendValue={appendValue} label={"q"} />
                <KeyboardButton className="row-start-2 w-16 h-16 rounded-md" value={"w"} capsOn={caps} altOn={alt} appendValue={appendValue} label={"w"} />
                <KeyboardButton className="row-start-2 w-16 h-16 rounded-md" value={"e"} capsOn={caps} altOn={alt} appendValue={appendValue} label={"e"} />
                <KeyboardButton className="row-start-2 w-16 h-16 rounded-md" value={"r"} capsOn={caps} altOn={alt} appendValue={appendValue} label={"r"} />
                <KeyboardButton className="row-start-2 w-16 h-16 rounded-md" value={"t"} capsOn={caps} altOn={alt} appendValue={appendValue} label={"t"} />
                <KeyboardButton className="row-start-2 w-16 h-16 rounded-md" value={"y"} capsOn={caps} altOn={alt} appendValue={appendValue} label={"y"} />
                <KeyboardButton className="row-start-2 w-16 h-16 rounded-md" value={"u"} capsOn={caps} altOn={alt} appendValue={appendValue} label={"u"} />
                <KeyboardButton className="row-start-2 w-16 h-16 rounded-md" value={"i"} capsOn={caps} altOn={alt} appendValue={appendValue} label={"i"} />
                <KeyboardButton className="row-start-2 w-16 h-16 rounded-md" value={"o"} capsOn={caps} altOn={alt} appendValue={appendValue} label={"o"} />
                <KeyboardButton className="row-start-2 w-16 h-16 rounded-md" value={"p"} capsOn={caps} altOn={alt} appendValue={appendValue} label={"p"} />
                <KeyboardButton className="row-start-2 w-16 h-16 rounded-md" value={"["} alt={'{'} capsOn={caps} altOn={alt} appendValue={appendValue} label={"{"} />
                <KeyboardButton className="row-start-2 w-16 h-16 rounded-md" value={"]"} alt={'}'} capsOn={caps} altOn={alt} appendValue={appendValue} label={"}"} />

                <div className="col-start-1 row-start-3 " onClick={() => setCaps(!caps)}><KeyboardButton className="w-16 h-16 rounded-md" value={""} caps capsOn={caps} altOn={alt} appendValue={appendValue} label={"Caps"} /></div>
                <KeyboardButton className="col-start-2 row-start-3 w-16 h-16 rounded-md" value={"a"} capsOn={caps} altOn={alt} appendValue={appendValue} label={"a"} />
                <KeyboardButton className="col-start-3 row-start-3 w-16 h-16 rounded-md" value={"s"} capsOn={caps} altOn={alt} appendValue={appendValue} label={"s"} />
                <KeyboardButton className="col-start-4 row-start-3 w-16 h-16 rounded-md" value={"d"} capsOn={caps} altOn={alt} appendValue={appendValue} label={"d"} />
                <KeyboardButton className="col-start-5 row-start-3 w-16 h-16 rounded-md" value={"f"} capsOn={caps} altOn={alt} appendValue={appendValue} label={"f"} />
                <KeyboardButton className="col-start-6 row-start-3 w-16 h-16 rounded-md" value={"g"} capsOn={caps} altOn={alt} appendValue={appendValue} label={"g"} />
                <KeyboardButton className="col-start-7 row-start-3 w-16 h-16 rounded-md" value={"h"} capsOn={caps} altOn={alt} appendValue={appendValue} label={"h"} />
                <KeyboardButton className="col-start-8 row-start-3 w-16 h-16 rounded-md" value={"j"} capsOn={caps} altOn={alt} appendValue={appendValue} label={"j"} />
                <KeyboardButton className="col-start-9 row-start-3 w-16 h-16 rounded-md" value={"k"} capsOn={caps} altOn={alt} appendValue={appendValue} label={"k"} />
                <KeyboardButton className="col-start-10 row-start-3 w-16 h-16 rounded-md" value={"l"} capsOn={caps} altOn={alt} appendValue={appendValue} label={"l"} />
                <KeyboardButton className="col-start-11 row-start-3 w-16 h-16 rounded-md" value={";"} alt={':'} capsOn={caps} altOn={alt} appendValue={appendValue} label={";"} />
                <KeyboardButton className="col-span-2 col-start-12 row-start-3 h-16 rounded-md" value={"\n"} capsOn={caps} altOn={alt} appendValue={appendValue} label={"Enter"} />

                <KeyboardButton className="col-start-1 row-start-4 w-16 h-16 rounded-md" value={"\\"} alt={'|'} capsOn={caps} altOn={alt} appendValue={appendValue} label={"\\"} />
                <KeyboardButton className="col-start-2 row-start-4 w-16 h-16 rounded-md" value={"z"} capsOn={caps} altOn={alt} appendValue={appendValue} label={"z"} />
                <KeyboardButton className="col-start-3 row-start-4 w-16 h-16 rounded-md" value={"x"} capsOn={caps} altOn={alt} appendValue={appendValue} label={"x"} />
                <KeyboardButton className="col-start-4 row-start-4 w-16 h-16 rounded-md" value={"c"} capsOn={caps} altOn={alt} appendValue={appendValue} label={"c"} />
                <KeyboardButton className="col-start-5 row-start-4 w-16 h-16 rounded-md" value={"v"} capsOn={caps} altOn={alt} appendValue={appendValue} label={"v"} />
                <KeyboardButton className="col-start-6 row-start-4 w-16 h-16 rounded-md" value={"b"} capsOn={caps} altOn={alt} appendValue={appendValue} label={"b"} />
                <KeyboardButton className="col-start-7 row-start-4 w-16 h-16 rounded-md" value={"n"} capsOn={caps} altOn={alt} appendValue={appendValue} label={"n"} />
                <KeyboardButton className="col-start-8 row-start-4 w-16 h-16 rounded-md" value={"m"} capsOn={caps} altOn={alt} appendValue={appendValue} label={"m"} />
                <KeyboardButton className="row-start-4 w-16 h-16 rounded-md" value={","} alt={'<'} capsOn={caps} altOn={alt} appendValue={appendValue} label={","} />
                <KeyboardButton className="row-start-4 w-16 h-16 rounded-md" value={"."} alt={'>'} capsOn={caps} altOn={alt} appendValue={appendValue} label={"."} />
                <KeyboardButton className="row-start-4 w-16 h-16 rounded-md" value={"/"} alt={'?'} capsOn={caps} altOn={alt} appendValue={appendValue} label={"/"} />
                <KeyboardButton className="col-start-13 row-start-4 w-16 h-16 rounded-md" value={"'"} alt={'@'} capsOn={caps} altOn={alt} appendValue={appendValue} label={"'"} />

                <div className="col-span-2 col-start-1 row-start-5" onClick={() => setAlt(!alt)}><KeyboardButton className="w-full h-16 rounded-md" value={""} capsOn={caps} altOn={alt} appendValue={appendValue} label={"Shift"} /></div>
                <KeyboardButton className="col-start-3 row-start-5 w-16 h-16 rounded-md" value={"-"} alt={'_'} capsOn={caps} altOn={alt} appendValue={appendValue} label={"-"} />
                <KeyboardButton className="col-start-4 row-start-5 w-16 h-16 rounded-md" value={"="} alt={'+'} capsOn={caps} altOn={alt} appendValue={appendValue} label={"="} />
                <KeyboardButton className="col-span-5 col-start-5 row-start-5 h-16 rounded-md" value={"\u00A0"} capsOn={caps} altOn={alt} appendValue={appendValue} label={"Space Bar"} />
                <KeyboardButton className="col-start-10 row-start-5 h-16 rounded-md" value={"#"} alt={'~'} capsOn={caps} altOn={alt} appendValue={appendValue} label={"#"} />

                <div onClick={() => up()} className="col-start-12 row-start-4"><KeyboardButton className="w-16 h-16 rounded-md" value={""} capsOn={caps} altOn={alt} label={"Up"} /></div>
                <div onClick={() => down()} className="col-start-12 row-start-5"><KeyboardButton className="w-16 h-16 rounded-md" value={""} capsOn={caps} altOn={alt} label={"Down"} /></div>
                <div onClick={() => right()} className="col-start-13 row-start-5"><KeyboardButton className="w-16 h-16 rounded-md" value={""} capsOn={caps} altOn={alt} label={"Right"} /></div>
                <div onClick={() => left()} className="col-start-11 row-start-5"><KeyboardButton className="w-16 h-16 rounded-md" value={""} capsOn={caps} altOn={alt} label={"Left"} /></div>
            </div>
        </div>
    )
}

export default VirtualKeyBoard