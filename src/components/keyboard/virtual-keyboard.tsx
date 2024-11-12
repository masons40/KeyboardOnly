'use client'

import { ArrowBigDown, ArrowBigLeft, ArrowBigRight, ArrowBigUp, ArrowBigUpDash, Delete, Loader2, Send } from "lucide-react";
import { type SetStateAction, useState } from "react";
import { toast } from "sonner";
import { saveMessageAction } from "~/server/actions/actions";
import { Button } from "../ui/button";
import { InputBox } from "../ui/input-box";
import { KeyboardButton } from "../ui/keyboard-button";

const VirtualKeyBoard = ({ setOpen }: { setOpen?: (value: SetStateAction<boolean>) => void }) => {
    const [inputText, setInputText] = useState<string>('');
    const [cursorPos, setCursorPos] = useState<number>(0)
    const [caps, setCaps] = useState(false)
    const [alt, setAlt] = useState(false)
    const [loading, setLoading] = useState(false);
    const [mobileKeyboard, setMobileKeyboard] = useState<"text" | "numbers" | "alt">("text")
    const M_CHARS_LENGTH = 28;

    const appendValue = (value: string) => {
        setInputText((prev) => {
            return prev.slice(0, cursorPos) + value + prev.slice(cursorPos, prev.length);
        }
        )
        setCursorPos(cursorPos + 1)
    }

    const backspace = () => {
        if (cursorPos > 0) {
            setInputText((prev) => {
                return prev.slice(0, cursorPos - 1) + prev.slice(cursorPos, inputText.length);
            }
            )
            setCursorPos(cursorPos - 1)
        }
    }

    const left = () => {
        if (cursorPos > 0) setCursorPos(cursorPos - 1)
    }

    const right = () => {
        if (cursorPos < inputText.length) setCursorPos(cursorPos + 1)
    }

    const up = () => {
        if (Math.floor(cursorPos / M_CHARS_LENGTH) > 0) setCursorPos(cursorPos - M_CHARS_LENGTH)
    }

    const down = () => {
        if (cursorPos + M_CHARS_LENGTH <= inputText.length) {
            setCursorPos(cursorPos + M_CHARS_LENGTH)
        }
    }

    const saveMessage = async () => {
        setLoading(true)
        await saveMessageAction(inputText).then(
            () => {
                setInputText('')
            },
            () => {
                toast.error("Couldn't save the message");
            },
        );
        setLoading(false)
    }

    const changeView = async (view: "text" | "numbers" | "alt") => {
        setMobileKeyboard(view)
    }

    return (
        <div className="space-y-4 w-full md:p-2 pr-0 mx-auto">
            <div className="flex-wrap flex items-center justify-center space-x-2 w-5/6 mx-auto">
                <InputBox text={inputText} pos={cursorPos} className="h-36" />
                <Button onClick={async () => {
                    await saveMessage();
                    if (setOpen) setOpen(false);
                }
                } disabled={inputText.length === 0} className="mt-2 bg-button text-white dark:hover:bg-button/70 hover:bg-button/90">
                    {loading ? <Loader2 className="mr-1 h-4 w-4 animate-spin" /> : <Send className="mr-1 h-4 w-4" />}
                    Send
                </Button>
            </div>
            <div className="hidden lg:grid grid-cols-13 grid-rows-5 w-fit gap-0.5 xl:gap-1 mx-auto">
                <KeyboardButton className="w-12 h-12 xl:w-16 xl:h-16 rounded-md" value={"`"} alt={'¬'} capsOn={caps} altOn={alt} appendValue={appendValue} label={"`"} />
                <KeyboardButton className="col-start-2 row-start-1 w-12 h-12 xl:w-16 xl:h-16 rounded-md" value={"1"} alt={'!'} capsOn={caps} altOn={alt} appendValue={appendValue} label={"1"} />
                <KeyboardButton className="col-start-3 row-start-1 w-12 h-12 xl:w-16 xl:h-16 rounded-md" value={"2"} alt={'"'} capsOn={caps} altOn={alt} appendValue={appendValue} label={"2"} />
                <KeyboardButton className="col-start-4 row-start-1 w-12 h-12 xl:w-16 xl:h-16 rounded-md" value={"3"} alt={'£'} capsOn={caps} altOn={alt} appendValue={appendValue} label={"3"} />
                <KeyboardButton className="col-start-5 row-start-1 w-12 h-12 xl:w-16 xl:h-16 rounded-md" value={"4"} alt={'$'} capsOn={caps} altOn={alt} appendValue={appendValue} label={"4"} />
                <KeyboardButton className="col-start-6 row-start-1 w-12 h-12 xl:w-16 xl:h-16 rounded-md" value={"5"} alt={'%'} capsOn={caps} altOn={alt} appendValue={appendValue} label={"5"} />
                <KeyboardButton className="col-start-7 row-start-1 w-12 h-12 xl:w-16 xl:h-16 rounded-md" value={"6"} alt={'^'} capsOn={caps} altOn={alt} appendValue={appendValue} label={"6"} />
                <KeyboardButton className="col-start-8 row-start-1 w-12 h-12 xl:w-16 xl:h-16 rounded-md" value={"7"} alt={'&'} capsOn={caps} altOn={alt} appendValue={appendValue} label={"7"} />
                <KeyboardButton className="col-start-9 row-start-1 w-12 h-12 xl:w-16 xl:h-16 rounded-md" value={"8"} alt={'*'} capsOn={caps} altOn={alt} appendValue={appendValue} label={"8"} />
                <KeyboardButton className="col-start-10 row-start-1 w-12 h-12 xl:w-16 xl:h-16 rounded-md" value={"9"} alt={'('} capsOn={caps} altOn={alt} appendValue={appendValue} label={"9"} />
                <KeyboardButton className="w-12 h-12 xl:w-16 xl:h-16 col-start-11 rounded-md" value={"0"} alt={')'} capsOn={caps} altOn={alt} appendValue={appendValue} label={"0"} />
                <div className="col-span-2 col-start-12 row-start-1" onClick={() => backspace()}><KeyboardButton className="w-full h-12 xl:h-16 rounded-md" value={""} label={"Backspace"} /></div>

                <KeyboardButton className="row-start-2 w-12 h-12 xl:w-16 xl:h-16 rounded-md" value={"\t"} capsOn={caps} altOn={alt} appendValue={appendValue} label={"Tab"} />
                <KeyboardButton className="row-start-2 w-12 h-12 xl:w-16 xl:h-16 rounded-md" value={"q"} capsOn={caps} altOn={alt} appendValue={appendValue} label={"q"} />
                <KeyboardButton className="row-start-2 w-12 h-12 xl:w-16 xl:h-16 rounded-md" value={"w"} capsOn={caps} altOn={alt} appendValue={appendValue} label={"w"} />
                <KeyboardButton className="row-start-2 w-12 h-12 xl:w-16 xl:h-16 rounded-md" value={"e"} capsOn={caps} altOn={alt} appendValue={appendValue} label={"e"} />
                <KeyboardButton className="row-start-2 w-12 h-12 xl:w-16 xl:h-16 rounded-md" value={"r"} capsOn={caps} altOn={alt} appendValue={appendValue} label={"r"} />
                <KeyboardButton className="row-start-2 w-12 h-12 xl:w-16 xl:h-16 rounded-md" value={"t"} capsOn={caps} altOn={alt} appendValue={appendValue} label={"t"} />
                <KeyboardButton className="row-start-2 w-12 h-12 xl:w-16 xl:h-16 rounded-md" value={"y"} capsOn={caps} altOn={alt} appendValue={appendValue} label={"y"} />
                <KeyboardButton className="row-start-2 w-12 h-12 xl:w-16 xl:h-16 rounded-md" value={"u"} capsOn={caps} altOn={alt} appendValue={appendValue} label={"u"} />
                <KeyboardButton className="row-start-2 w-12 h-12 xl:w-16 xl:h-16 rounded-md" value={"i"} capsOn={caps} altOn={alt} appendValue={appendValue} label={"i"} />
                <KeyboardButton className="row-start-2 w-12 h-12 xl:w-16 xl:h-16 rounded-md" value={"o"} capsOn={caps} altOn={alt} appendValue={appendValue} label={"o"} />
                <KeyboardButton className="row-start-2 w-12 h-12 xl:w-16 xl:h-16 rounded-md" value={"p"} capsOn={caps} altOn={alt} appendValue={appendValue} label={"p"} />
                <KeyboardButton className="row-start-2 w-12 h-12 xl:w-16 xl:h-16 rounded-md" value={"["} alt={'{'} capsOn={caps} altOn={alt} appendValue={appendValue} label={"{"} />
                <KeyboardButton className="row-start-2 w-12 h-12 xl:w-16 xl:h-16 rounded-md" value={"]"} alt={'}'} capsOn={caps} altOn={alt} appendValue={appendValue} label={"}"} />

                <div className="col-start-1 row-start-3 " onClick={() => setCaps(!caps)}><KeyboardButton className="w-12 h-12 xl:w-16 xl:h-16 rounded-md" value={""} caps capsOn={caps} label={"Caps"} /></div>
                <KeyboardButton className="col-start-2 row-start-3 w-12 h-12 xl:w-16 xl:h-16 rounded-md" value={"a"} capsOn={caps} altOn={alt} appendValue={appendValue} label={"a"} />
                <KeyboardButton className="col-start-3 row-start-3 w-12 h-12 xl:w-16 xl:h-16 rounded-md" value={"s"} capsOn={caps} altOn={alt} appendValue={appendValue} label={"s"} />
                <KeyboardButton className="col-start-4 row-start-3 w-12 h-12 xl:w-16 xl:h-16 rounded-md" value={"d"} capsOn={caps} altOn={alt} appendValue={appendValue} label={"d"} />
                <KeyboardButton className="col-start-5 row-start-3 w-12 h-12 xl:w-16 xl:h-16 rounded-md" value={"f"} capsOn={caps} altOn={alt} appendValue={appendValue} label={"f"} />
                <KeyboardButton className="col-start-6 row-start-3 w-12 h-12 xl:w-16 xl:h-16 rounded-md" value={"g"} capsOn={caps} altOn={alt} appendValue={appendValue} label={"g"} />
                <KeyboardButton className="col-start-7 row-start-3 w-12 h-12 xl:w-16 xl:h-16 rounded-md" value={"h"} capsOn={caps} altOn={alt} appendValue={appendValue} label={"h"} />
                <KeyboardButton className="col-start-8 row-start-3 w-12 h-12 xl:w-16 xl:h-16 rounded-md" value={"j"} capsOn={caps} altOn={alt} appendValue={appendValue} label={"j"} />
                <KeyboardButton className="col-start-9 row-start-3 w-12 h-12 xl:w-16 xl:h-16 rounded-md" value={"k"} capsOn={caps} altOn={alt} appendValue={appendValue} label={"k"} />
                <KeyboardButton className="col-start-10 row-start-3 w-12 h-12 xl:w-16 xl:h-16 rounded-md" value={"l"} capsOn={caps} altOn={alt} appendValue={appendValue} label={"l"} />
                <KeyboardButton className="col-start-11 row-start-3 w-12 h-12 xl:w-16 xl:h-16 rounded-md" value={";"} alt={':'} capsOn={caps} altOn={alt} appendValue={appendValue} label={";"} />
                <KeyboardButton className="col-span-2 col-start-12 row-start-3 h-12 xl:h-16 rounded-md" value={"\n"} appendValue={appendValue} label={"Enter"} />

                <KeyboardButton className="col-start-1 row-start-4 w-12 h-12 xl:w-16 xl:h-16 rounded-md" value={"\\"} alt={'|'} capsOn={caps} altOn={alt} appendValue={appendValue} label={"\\"} />
                <KeyboardButton className="col-start-2 row-start-4 w-12 h-12 xl:w-16 xl:h-16 rounded-md" value={"z"} capsOn={caps} altOn={alt} appendValue={appendValue} label={"z"} />
                <KeyboardButton className="col-start-3 row-start-4 w-12 h-12 xl:w-16 xl:h-16 rounded-md" value={"x"} capsOn={caps} altOn={alt} appendValue={appendValue} label={"x"} />
                <KeyboardButton className="col-start-4 row-start-4 w-12 h-12 xl:w-16 xl:h-16 rounded-md" value={"c"} capsOn={caps} altOn={alt} appendValue={appendValue} label={"c"} />
                <KeyboardButton className="col-start-5 row-start-4 w-12 h-12 xl:w-16 xl:h-16 rounded-md" value={"v"} capsOn={caps} altOn={alt} appendValue={appendValue} label={"v"} />
                <KeyboardButton className="col-start-6 row-start-4 w-12 h-12 xl:w-16 xl:h-16 rounded-md" value={"b"} capsOn={caps} altOn={alt} appendValue={appendValue} label={"b"} />
                <KeyboardButton className="col-start-7 row-start-4 w-12 h-12 xl:w-16 xl:h-16 rounded-md" value={"n"} capsOn={caps} altOn={alt} appendValue={appendValue} label={"n"} />
                <KeyboardButton className="col-start-8 row-start-4 w-12 h-12 xl:w-16 xl:h-16 rounded-md" value={"m"} capsOn={caps} altOn={alt} appendValue={appendValue} label={"m"} />
                <KeyboardButton className="row-start-4 w-12 h-12 xl:w-16 xl:h-16 rounded-md" value={","} alt={'<'} altOn={alt} appendValue={appendValue} label={","} />
                <KeyboardButton className="row-start-4 w-12 h-12 xl:w-16 xl:h-16 rounded-md" value={"."} alt={'>'} altOn={alt} appendValue={appendValue} label={"."} />
                <KeyboardButton className="row-start-4 w-12 h-12 xl:w-16 xl:h-16 rounded-md" value={"/"} alt={'?'} altOn={alt} appendValue={appendValue} label={"/"} />
                <KeyboardButton className="col-start-13 row-start-4 w-12 h-12 xl:w-16 xl:h-16 rounded-md" value={"'"} alt={'@'} altOn={alt} appendValue={appendValue} label={"'"} />

                <div className="col-span-2 col-start-1 row-start-5" onClick={() => setAlt(!alt)}><KeyboardButton className="w-full h-12 xl:h-16 rounded-md" value={""} altOn={alt} label={"Shift"} /></div>
                <KeyboardButton className="col-start-3 row-start-5 w-12 h-12 xl:w-16 xl:h-16 rounded-md" value={"-"} alt={'_'} altOn={alt} appendValue={appendValue} label={"-"} />
                <KeyboardButton className="col-start-4 row-start-5 w-12 h-12 xl:w-16 xl:h-16 rounded-md" value={"="} alt={'+'} altOn={alt} appendValue={appendValue} label={"="} />
                <KeyboardButton className="col-span-5 col-start-5 row-start-5 h-12 xl:h-16 rounded-md" value={"\u00A0"} altOn={alt} appendValue={appendValue} label={"Space Bar"} />
                <KeyboardButton className="col-start-10 row-start-5 h-12 xl:h-16 rounded-md" value={"#"} alt={'~'} altOn={alt} appendValue={appendValue} label={"#"} />

                <div onClick={() => up()} className="col-start-12 row-start-4"><KeyboardButton className="w-12 h-12 xl:w-16 xl:h-16 rounded-md" value={""} label={"Up"} /></div>
                <div onClick={() => down()} className="col-start-12 row-start-5"><KeyboardButton className="w-12 h-12 xl:w-16 xl:h-16 rounded-md" value={""} label={"Down"} /></div>
                <div onClick={() => right()} className="col-start-13 row-start-5"><KeyboardButton className="w-12 h-12 xl:w-16 xl:h-16 rounded-md" value={""} label={"Right"} /></div>
                <div onClick={() => left()} className="col-start-11 row-start-5"><KeyboardButton className="w-12 h-12 xl:w-16 xl:h-16 rounded-md" value={""} label={"Left"} /></div>
            </div>


            {
                mobileKeyboard === "text" &&
                <div className="grid grid-cols-10 grid-rows-4 gap-0.5 w-fit mx-auto lg:hidden">
                    <KeyboardButton className={"h-8 w-8 rounded-sm "} capsOn={caps} value={"q"} label={"q"} appendValue={appendValue} />
                    <KeyboardButton className={"h-8 w-8 rounded-sm"} capsOn={caps} value={"w"} label={"w"} appendValue={appendValue} />
                    <KeyboardButton className={"h-8 w-8 rounded-sm"} capsOn={caps} value={"e"} label={"e"} appendValue={appendValue} />
                    <KeyboardButton className={"h-8 w-8 rounded-sm"} capsOn={caps} value={"r"} label={"r"} appendValue={appendValue} />
                    <KeyboardButton className={"h-8 w-8 rounded-sm"} capsOn={caps} value={"t"} label={"t"} appendValue={appendValue} />
                    <KeyboardButton className={"h-8 w-8 rounded-sm"} capsOn={caps} value={"y"} label={"y"} appendValue={appendValue} />
                    <KeyboardButton className={"h-8 w-8 rounded-sm"} capsOn={caps} value={"u"} label={"u"} appendValue={appendValue} />
                    <KeyboardButton className={"h-8 w-8 rounded-sm"} capsOn={caps} value={"i"} label={"i"} appendValue={appendValue} />
                    <KeyboardButton className={"h-8 w-8 rounded-sm"} capsOn={caps} value={"o"} label={"o"} appendValue={appendValue} />
                    <KeyboardButton className={"h-8 w-8 rounded-sm"} capsOn={caps} value={"p"} label={"p"} appendValue={appendValue} />

                    <KeyboardButton className="col-start-1 row-start-2 h-8 w-8 rounded-sm" capsOn={caps} value={"a"} label={"a"} appendValue={appendValue} />
                    <KeyboardButton className="col-start-2 row-start-2 h-8 w-8 rounded-sm" capsOn={caps} value={"s"} label={"s"} appendValue={appendValue} />
                    <KeyboardButton className="col-start-3 row-start-2 h-8 w-8 rounded-sm" capsOn={caps} value={"d"} label={"d"} appendValue={appendValue} />
                    <KeyboardButton className="col-start-4 row-start-2 h-8 w-8 rounded-sm" capsOn={caps} value={"f"} label={"f"} appendValue={appendValue} />
                    <KeyboardButton className="col-start-5 row-start-2 h-8 w-8 rounded-sm" capsOn={caps} value={"g"} label={"g"} appendValue={appendValue} />
                    <KeyboardButton className="col-start-6 row-start-2 h-8 w-8 rounded-sm" capsOn={caps} value={"h"} label={"h"} appendValue={appendValue} />
                    <KeyboardButton className="col-start-7 row-start-2 h-8 w-8 rounded-sm" capsOn={caps} value={"j"} label={"j"} appendValue={appendValue} />
                    <KeyboardButton className="col-start-8 row-start-2 h-8 w-8 rounded-sm" capsOn={caps} value={"k"} label={"k"} appendValue={appendValue} />
                    <KeyboardButton className="col-start-9 row-start-2 h-8 w-8 rounded-sm" capsOn={caps} value={"l"} label={"l"} appendValue={appendValue} />
                    <KeyboardButton className="col-start-10 row-start-2 h-8 w-8 rounded-sm" value={"@"} label={"@"} appendValue={appendValue} />

                    <div className="col-start-1 row-start-3" onClick={() => setCaps(!caps)}><KeyboardButton className="h-8 w-8 rounded-sm" caps capsOn={caps} value={""} label={<ArrowBigUpDash className="mx-auto" />} /></div>
                    <KeyboardButton className="col-start-2 row-start-3 h-8 w-8 rounded-sm" capsOn={caps} value={"z"} label={"z"} appendValue={appendValue} />
                    <KeyboardButton className="col-start-3 row-start-3 h-8 w-8 rounded-sm" capsOn={caps} value={"x"} label={"x"} appendValue={appendValue} />
                    <KeyboardButton className="col-start-4 row-start-3 h-8 w-8 rounded-sm" capsOn={caps} value={"c"} label={"c"} appendValue={appendValue} />
                    <KeyboardButton className="col-start-5 row-start-3 h-8 w-8 rounded-sm" capsOn={caps} value={"v"} label={"v"} appendValue={appendValue} />
                    <KeyboardButton className="col-start-6 row-start-3 h-8 w-8 rounded-sm" capsOn={caps} value={"b"} label={"b"} appendValue={appendValue} />
                    <KeyboardButton className="col-start-7 row-start-3 h-8 w-8 rounded-sm" capsOn={caps} value={"n"} label={"n"} appendValue={appendValue} />
                    <KeyboardButton className="col-start-8 row-start-3 h-8 w-8 rounded-sm" capsOn={caps} value={"m"} label={"m"} appendValue={appendValue} />
                    <KeyboardButton className="col-start-9 row-start-3 h-8 w-8 rounded-sm" value={"?"} label={"?"} appendValue={appendValue} />
                    <KeyboardButton className="col-start-10 row-start-3 h-8 w-8 rounded-sm" value={"\t"} label={"Tab"} appendValue={appendValue} />

                    <div className="col-span-2 col-start-1 row-start-4" onClick={() => changeView("numbers")}><KeyboardButton className="h-8 w-full rounded-sm" value={""} label={"123"} /></div>
                    <KeyboardButton className="col-start-3 row-start-4 h-8 w-8 rounded-sm" value={","} label={","} appendValue={appendValue} />
                    <KeyboardButton className="col-span-4 col-start-4 row-start-4 h-8 rounded-sm" value={"\u00A0"} label={"space"} appendValue={appendValue} />
                    <KeyboardButton className="h-8 rounded-sm col-span-2 col-start-8 row-start-4" value={"\n"} appendValue={appendValue} label={"Return"} />
                    <div className="col-start-10 row-start-4" onClick={() => backspace()}><KeyboardButton className="h-8 w-8 rounded-sm" value={""} label={<Delete className="mx-auto" />} /></div>

                </div>
            }

            {
                mobileKeyboard === "numbers" &&
                <div className="grid grid-cols-10 grid-rows-4 gap-0.5 w-fit mx-auto lg:hidden">
                    <KeyboardButton className={"h-8 w-8 rounded-sm"} value={"1"} label={"1"} appendValue={appendValue} />
                    <KeyboardButton className={"h-8 w-8 rounded-sm"} value={"2"} label={"2"} appendValue={appendValue} />
                    <KeyboardButton className={"h-8 w-8 rounded-sm"} value={"3"} label={"3"} appendValue={appendValue} />
                    <KeyboardButton className={"h-8 w-8 rounded-sm"} value={"4"} label={"4"} appendValue={appendValue} />
                    <KeyboardButton className={"h-8 w-8 rounded-sm"} value={"5"} label={"5"} appendValue={appendValue} />
                    <KeyboardButton className={"h-8 w-8 rounded-sm"} value={"6"} label={"6"} appendValue={appendValue} />
                    <KeyboardButton className={"h-8 w-8 rounded-sm"} value={"7"} label={"7"} appendValue={appendValue} />
                    <KeyboardButton className={"h-8 w-8 rounded-sm"} value={"8"} label={"8"} appendValue={appendValue} />
                    <KeyboardButton className={"h-8 w-8 rounded-sm"} value={"9"} label={"9"} appendValue={appendValue} />
                    <KeyboardButton className={"h-8 w-8 rounded-sm"} value={"0"} label={"0"} appendValue={appendValue} />

                    <KeyboardButton className="col-start-1 row-start-2 h-8 w-8 rounded-sm" value={"-"} label={"-"} appendValue={appendValue} />
                    <KeyboardButton className="col-start-2 row-start-2 h-8 w-8 rounded-sm" value={"/"} label={"/"} appendValue={appendValue} />
                    <KeyboardButton className="col-start-3 row-start-2 h-8 w-8 rounded-sm" value={":"} label={":"} appendValue={appendValue} />
                    <KeyboardButton className="col-start-4 row-start-2 h-8 w-8 rounded-sm" value={";"} label={";"} appendValue={appendValue} />
                    <KeyboardButton className="col-start-5 row-start-2 h-8 w-8 rounded-sm" value={"("} label={"("} appendValue={appendValue} />
                    <KeyboardButton className="col-start-6 row-start-2 h-8 w-8 rounded-sm" value={")"} label={")"} appendValue={appendValue} />
                    <KeyboardButton className="col-start-7 row-start-2 h-8 w-8 rounded-sm" value={"$"} label={"$"} appendValue={appendValue} />
                    <KeyboardButton className="col-start-8 row-start-2 h-8 w-8 rounded-sm" value={"&"} label={"&"} appendValue={appendValue} />
                    <div onClick={() => up()} className="col-start-9 row-start-2"><KeyboardButton className="h-8 w-8 rounded-sm" value={""} label={<ArrowBigUp className="mx-auto" />} /></div>
                    <div onClick={() => down()} className="col-start-10 row-start-2"><KeyboardButton className="h-8 w-8 rounded-sm" value={""} label={<ArrowBigDown className="mx-auto" />} /></div>

                    <div className="w-full col-start-1 row-start-3" onClick={() => changeView("alt")}><KeyboardButton className="h-8 w-8 rounded-sm text-xs" value={""} label={"#+="} /></div>
                    <KeyboardButton className="col-start-2 row-start-3 h-8 w-8 rounded-sm" value={"."} label={"."} appendValue={appendValue} />
                    <KeyboardButton className="col-start-3 row-start-3 h-8 w-8 rounded-sm" value={","} label={","} appendValue={appendValue} />
                    <KeyboardButton className="col-start-4 row-start-3 h-8 w-8 rounded-sm" value={"?"} label={"?"} appendValue={appendValue} />
                    <KeyboardButton className="col-start-5 row-start-3 h-8 w-8 rounded-sm" value={"!"} label={"!"} appendValue={appendValue} />
                    <KeyboardButton className="col-start-6 row-start-3 h-8 w-8 rounded-sm" value={"'"} label={"'"} appendValue={appendValue} />
                    <KeyboardButton className="col-start-7 row-start-3 h-8 w-8 rounded-sm" value={"@"} label={"@"} appendValue={appendValue} />
                    <KeyboardButton className="col-start-8 row-start-3 h-8 w-8 rounded-sm" value={"\""} label={"\""} appendValue={appendValue} />
                    <div onClick={() => left()} className="col-start-9 row-start-3"><KeyboardButton className="h-8 w-8 rounded-sm" value={""} label={<ArrowBigLeft className="mx-auto" />} /></div>
                    <div onClick={() => right()} className="col-start-10 row-start-3"><KeyboardButton className="h-8 w-8 rounded-sm" value={""} label={<ArrowBigRight className="mx-auto" />} /></div>

                    <div className="col-span-2 col-start-1 row-start-4" onClick={() => changeView("text")}><KeyboardButton className="w-full h-8 rounded-sm" value={""} label={"ABC"} /></div>
                    <KeyboardButton className="col-start-3 row-start-4 h-8 w-8 rounded-sm" value={","} label={","} appendValue={appendValue} />
                    <KeyboardButton className="col-span-4 col-start-4 row-start-4 rounded-sm h-8" value={"\u00A0"} label={"space"} appendValue={appendValue} />
                    <KeyboardButton className="h-8 rounded-sm col-span-2 col-start-8 row-start-4" value={"\n"} appendValue={appendValue} label={"Return"} />
                    <div className="col-start-10 row-start-4" onClick={() => backspace()}><KeyboardButton className="h-8 w-8 rounded-sm" value={""} label={<Delete className="mx-auto" />} /></div>
                </div>
            }

            {
                mobileKeyboard === "alt" &&
                <div className="grid grid-cols-10 grid-rows-4 gap-0.5 w-fit mx-auto lg:hidden">
                    <KeyboardButton className={"h-8 w-8 rounded-sm"} value={"["} label={"["} appendValue={appendValue} />
                    <KeyboardButton className={"h-8 w-8 rounded-sm"} value={"]"} label={"]"} appendValue={appendValue} />
                    <KeyboardButton className={"h-8 w-8 rounded-sm"} value={"{"} label={"{"} appendValue={appendValue} />
                    <KeyboardButton className={"h-8 w-8 rounded-sm"} value={"}"} label={"}"} appendValue={appendValue} />
                    <KeyboardButton className={"h-8 w-8 rounded-sm"} value={"#"} label={"#"} appendValue={appendValue} />
                    <KeyboardButton className={"h-8 w-8 rounded-sm"} value={"%"} label={"%"} appendValue={appendValue} />
                    <KeyboardButton className={"h-8 w-8 rounded-sm"} value={"^"} label={"^"} appendValue={appendValue} />
                    <KeyboardButton className={"h-8 w-8 rounded-sm"} value={"*"} label={"*"} appendValue={appendValue} />
                    <KeyboardButton className={"h-8 w-8 rounded-sm"} value={"+"} label={"+"} appendValue={appendValue} />
                    <KeyboardButton className={"h-8 w-8 rounded-sm"} value={"="} label={"="} appendValue={appendValue} />

                    <KeyboardButton className="col-start-1 row-start-2 h-8 w-8 rounded-sm" value={"_"} label={"_"} appendValue={appendValue} />
                    <KeyboardButton className="col-start-2 row-start-2 h-8 w-8 rounded-sm" value={"\\"} label={"\\"} appendValue={appendValue} />
                    <KeyboardButton className="col-start-3 row-start-2 h-8 w-8 rounded-sm" value={"|"} label={"|"} appendValue={appendValue} />
                    <KeyboardButton className="col-start-4 row-start-2 h-8 w-8 rounded-sm" value={"~"} label={"~"} appendValue={appendValue} />
                    <KeyboardButton className="col-start-5 row-start-2 h-8 w-8 rounded-sm" value={"<"} label={"<"} appendValue={appendValue} />
                    <KeyboardButton className="col-start-6 row-start-2 h-8 w-8 rounded-sm" value={">"} label={">"} appendValue={appendValue} />
                    <KeyboardButton className="col-start-7 row-start-2 h-8 w-8 rounded-sm" value={"£"} label={"£"} appendValue={appendValue} />
                    <KeyboardButton className="col-start-8 row-start-2 h-8 w-8 rounded-sm" value={"€"} label={"€"} appendValue={appendValue} />
                    <KeyboardButton className="col-start-9 row-start-2 h-8 w-8 rounded-sm" value={""} label={<ArrowBigUp className="mx-auto" />} />
                    <KeyboardButton className="col-start-10 row-start-2 h-8 w-8 rounded-sm" value={""} label={<ArrowBigDown className="mx-auto" />} />

                    <div className="w-full col-start-1 row-start-3" onClick={() => changeView("numbers")}><KeyboardButton className="h-8 w-8 rounded-sm" value={""} label={"123"} /></div>
                    <KeyboardButton className="col-start-2 row-start-3 h-8 w-8 rounded-sm" value={"."} label={"."} appendValue={appendValue} />
                    <KeyboardButton className="col-start-3 row-start-3 h-8 w-8 rounded-sm" value={","} label={","} appendValue={appendValue} />
                    <KeyboardButton className="col-start-4 row-start-3 h-8 w-8 rounded-sm" value={"?"} label={"?"} appendValue={appendValue} />
                    <KeyboardButton className="col-start-5 row-start-3 h-8 w-8 rounded-sm" value={"!"} label={"!"} appendValue={appendValue} />
                    <KeyboardButton className="col-start-6 row-start-3 h-8 w-8 rounded-sm" value={"'"} label={"'"} appendValue={appendValue} />
                    <KeyboardButton className="col-start-7 row-start-3 h-8 w-8 rounded-sm" value={"¥"} label={"¥"} appendValue={appendValue} />
                    <KeyboardButton className="col-start-8 row-start-3 h-8 w-8 rounded-sm" value={"·"} label={"·"} appendValue={appendValue} />
                    <KeyboardButton className="col-start-9 row-start-3 h-8 w-8 rounded-sm" value={""} label={<ArrowBigLeft className="mx-auto" />} />
                    <KeyboardButton className="col-start-10 row-start-3 h-8 w-8 rounded-sm" value={""} label={<ArrowBigRight className="mx-auto" />} />

                    <div className="w-full col-span-2 col-start-1 row-start-4 h-8" onClick={() => changeView("text")}><KeyboardButton className="w-full rounded-sm h-8" value={""} label={"ABC"} /></div>
                    <KeyboardButton className="col-start-3 row-start-4 h-8 w-8 rounded-sm" value={","} label={","} appendValue={appendValue} />
                    <KeyboardButton className="h-8 col-span-4 col-start-4 row-start-4 rounded-sm" value={"\u00A0"} label={"space"} appendValue={appendValue} />
                    <KeyboardButton className="h-8 rounded-sm col-span-2 col-start-8 row-start-4" value={"\n"} appendValue={appendValue} label={"Return"} />
                    <div className="col-start-10 row-start-4" onClick={() => backspace()}><KeyboardButton className="h-8 w-8 rounded-sm" value={""} label={<Delete className="mx-auto" />} /></div>
                </div>
            }

        </div >
    )
}

export default VirtualKeyBoard