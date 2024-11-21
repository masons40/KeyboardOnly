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
                toast.error("Invalid message");
                setInputText('')
            },
        );
        setLoading(false)
    }

    const changeView = async (view: "text" | "numbers" | "alt") => {
        setMobileKeyboard(view)
    }

    return (
        <div className="space-y-4 w-full md:p-2 p-0 mx-auto">
            <div className="flex-wrap flex items-center justify-center space-x-2 w-5/6 mx-auto">
                <div>
                    <h1 className="text-right text-sm text-muted-foreground mr-2">{inputText.length}/300 Character Limit</h1>
                    <InputBox text={inputText} pos={cursorPos} className="h-36" />
                </div>
                <Button onClick={async () => {
                    await saveMessage();
                    if (setOpen) setOpen(false);
                }
                } disabled={inputText.replace(/\s/g, "") === "" || loading} className="mt-2 bg-button text-white dark:hover:bg-button/70 hover:bg-button/90">
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
                <KeyboardButton className="row-start-2 w-12 h-12 xl:w-16 xl:h-16 rounded-md" value={"q"} capsOn={caps} altOn={alt} appendValue={appendValue} label={"q"} diacritics={["ʠ"]} />
                <KeyboardButton className="row-start-2 w-12 h-12 xl:w-16 xl:h-16 rounded-md" value={"w"} capsOn={caps} altOn={alt} appendValue={appendValue} label={"w"} diacritics={[
                    "ẃ", "ŵ", "ẅ", "ẁ", "ʍ",
                ]} diacriticCaptials={["Ẃ",  // W with ACUTE
                    "Ŵ",  // W with CIRCUMFLEX
                    "Ẅ",  // W with DIAERESIS
                    "Ẁ",  // W with GRAVE
                    "ʬ"   // BILABIAL PERCUSSIVE
                ]} />
                < KeyboardButton className="row-start-2 w-12 h-12 xl:w-16 xl:h-16 rounded-md" value={"e"} capsOn={caps} altOn={alt} appendValue={appendValue} label={"e"} diacritics={
                    [
                        "é",  // lowercase E with ACUTE
                        "ĕ",  // lowercase E with BREVE
                        "ě",  // lowercase E with CARON
                        "ê",  // lowercase E with CIRCUMFLEX
                        "ế",  // lowercase E with CIRCUMFLEX and ACUTE
                        "ệ",  // lowercase E with CIRCUMFLEX and DOT BELOW
                        "ề",  // lowercase E with CIRCUMFLEX and GRAVE
                        "ể",  // lowercase E with CIRCUMFLEX and HOOK ABOVE
                        "ễ",  // lowercase E with CIRCUMFLEX and TILDE
                        "ë",  // lowercase E with DIAERESIS
                        "ė",  // lowercase E with DOT ABOVE
                        "ẹ",  // lowercase E with DOT BELOW
                        "è",  // lowercase E with GRAVE
                        "ẻ",  // lowercase E with HOOK ABOVE
                        "ē",  // lowercase E with MACRON
                        "ę",  // lowercase E with OGONEK
                        "ẽ",  // lowercase E with TILDE
                    ]} diacriticCaptials={[
                        "É", // E with ACUTE
                        "Ĕ", // E with BREVE
                        "Ě", // E with CARON
                        "Ê", // E with CIRCUMFLEX
                        "Ế", // E with CIRCUMFLEX and ACUTE
                        "Ệ", // E with CIRCUMFLEX and DOT BELOW
                        "Ề", // E with CIRCUMFLEX and GRAVE
                        "Ể", // E with CIRCUMFLEX and HOOK ABOVE
                        "Ễ", // E with CIRCUMFLEX and TILDE
                        "Ë", // E with DIAERESIS
                        "Ė", // E with DOT ABOVE
                        "Ẹ", // E with DOT BELOW
                        "È", // E with GRAVE
                        "Ẻ", // E with HOOK ABOVE
                        "Ē", // E with MACRON
                        "Ę", // E with OGONEK
                        "Ẽ", // E with TILDE
                        "Ɛ", // OPEN E
                        "Ə"
                    ]} />
                <KeyboardButton className="row-start-2 w-12 h-12 xl:w-16 xl:h-16 rounded-md" value={"r"} capsOn={caps} altOn={alt} appendValue={appendValue} label={"r"} diacritics={[
                    "ŕ", "ř", "ŗ", "ṙ", "ṛ", "ṝ", "ɾ", "ṟ", "ɼ", "ɽ", "ɿ", "ɹ", "ɻ", "ɺ",
                ]} diacriticCaptials={["Ŕ",  // R with ACUTE
                    "Ř",  // R with CARON
                    "Ŗ",  // R with CEDILLA
                    "Ṙ",  // R with DOT ABOVE
                    "Ṛ",  // R with DOT BELOW
                    "Ṝ",  // R with DOT BELOW and MACRON
                    "Ṟ",  // R with LINE BELOW
                    "ʁ"   // SMALL CAPITAL INVERTED R
                ]} />
                <KeyboardButton className="row-start-2 w-12 h-12 xl:w-16 xl:h-16 rounded-md" value={"t"} capsOn={caps} altOn={alt} appendValue={appendValue} label={"t"} diacritics={[
                    "ť", "ţ", "ṱ", "ț", "ẗ", "ṭ", "ṯ", "ʈ", "ŧ", "ʨ", "ʧ", "þ", "ð", "ʦ", "ʇ",
                ]} diacriticCaptials={["Ť",  // T with CARON
                    "Ţ",  // T with CEDILLA
                    "Ṱ",  // T with CIRCUMFLEX BELOW
                    "Ț",  // T with COMMA BELOW
                    "Ṭ",  // T with DOT BELOW
                    "Ṯ",  // T with LINE BELOW
                    "Ŧ",  // T with STROKE
                    "Þ",  // THORN
                    "Ð"   // ETH
                ]} />
                <KeyboardButton className="row-start-2 w-12 h-12 xl:w-16 xl:h-16 rounded-md" value={"y"} capsOn={caps} altOn={alt} appendValue={appendValue} label={"y"} diacritics={[
                    "ý", "ŷ", "ÿ", "ẏ", "ỵ", "ỳ", "ƴ", "ỷ", "ȳ", "ỹ", "ʎ",
                ]} diacriticCaptials={[
                    "Ý",  // Y with ACUTE
                    "Ŷ",  // Y with CIRCUMFLEX
                    "Ÿ",  // Y with DIAERESIS
                    "Ẏ",  // Y with DOT ABOVE
                    "Ỵ",  // Y with DOT BELOW
                    "Ỳ",  // Y with GRAVE
                    "Ƴ",  // Y with HOOK
                    "Ỷ",  // Y with HOOK ABOVE
                    "Ȳ",  // Y with MACRON
                    "Ỹ"   // Y with TILDE
                ]} />
                <KeyboardButton className="row-start-2 w-12 h-12 xl:w-16 xl:h-16 rounded-md" value={"u"} capsOn={caps} altOn={alt} appendValue={appendValue} label={"u"} diacritics={[
                    "ʉ", "ú", "ŭ", "ǔ", "û", "ü", "ǘ", "ǚ", "ǜ", "ǖ", "ụ", "ű", "ù", "ủ", "ư", "ứ", "ự", "ừ", "ử", "ữ", "ū", "ų", "ů", "ũ", "ʊ",
                ]} diacriticCaptials={["Ú",  // U with ACUTE
                    "Ŭ",  // U with BREVE
                    "Ǔ",  // U with CARON
                    "Û",  // U with CIRCUMFLEX
                    "Ü",  // U with DIAERESIS
                    "Ǘ",  // U with DIAERESIS and ACUTE
                    "Ǚ",  // U with DIAERESIS and CARON
                    "Ǜ",  // U with DIAERESIS and GRAVE
                    "Ǖ",  // U with DIAERESIS and MACRON
                    "Ụ",  // U with DOT BELOW
                    "Ű",  // U with DOUBLE ACUTE
                    "Ù",  // U with GRAVE
                    "Ủ",  // U with HOOK ABOVE
                    "Ư",  // U with HORN
                    "Ứ",  // U with HORN and ACUTE
                    "Ự",  // U with HORN and DOT BELOW
                    "Ừ",  // U with HORN and GRAVE
                    "Ử",  // U with HORN and HOOK ABOVE
                    "Ữ",  // U with HORN and TILDE
                    "Ū",  // U with MACRON
                    "Ų",  // U with OGONEK
                    "Ů",  // U with RING ABOVE
                    "Ũ"   // U with TILDE
                ]} />
                <KeyboardButton className="row-start-2 w-12 h-12 xl:w-16 xl:h-16 rounded-md" value={"i"} capsOn={caps} altOn={alt} appendValue={appendValue} label={"i"} diacritics={[
                    "í", "ĭ", "ǐ", "î", "ï", "ị", "ì", "ỉ", "ī", "į", "ɨ", "ĩ", "ɩ", "ı", "ĳ", "ɟ",
                ]} diacriticCaptials={[
                    "Í",  // I with ACUTE
                    "Ĭ",  // I with BREVE
                    "Ǐ",  // I with CARON
                    "Î",  // I with CIRCUMFLEX
                    "Ï",  // I with DIAERESIS
                    "İ",  // I with DOT ABOVE
                    "Ị",  // I with DOT BELOW
                    "Ì",  // I with GRAVE
                    "Ỉ",  // I with HOOK ABOVE
                    "Ī",  // I with MACRON
                    "Į",  // I with OGONEK
                    "Ĩ",  // I with TILDE
                    "Ĳ"   // CAPITAL LIGATURE IJ
                ]} />
                <KeyboardButton className="row-start-2 w-12 h-12 xl:w-16 xl:h-16 rounded-md" value={"o"} capsOn={caps} altOn={alt} appendValue={appendValue} label={"o"} diacritics={[
                    "ó", "ŏ", "ǒ", "ô", "ố", "ộ", "ồ", "ổ", "ỗ", "ö", "ọ", "ő", "ò", "ỏ", "ơ", "ớ", "ợ", "ờ", "ở", "ỡ", "ō", "ǫ", "ø", "ǿ", "õ",
                ]} diacriticCaptials={["Ó",  // O with ACUTE
                    "Ŏ",  // O with BREVE
                    "Ǒ",  // O with CARON
                    "Ô",  // O with CIRCUMFLEX
                    "Ố",  // O with CIRCUMFLEX and ACUTE
                    "Ộ",  // O with CIRCUMFLEX and DOT BELOW
                    "Ồ",  // O with CIRCUMFLEX and GRAVE
                    "Ổ",  // O with CIRCUMFLEX and HOOK ABOVE
                    "Ỗ",  // O with CIRCUMFLEX and TILDE
                    "Ö",  // O with DIAERESIS
                    "Ọ",  // O with DOT BELOW
                    "Ő",  // O with DOUBLE ACUTE
                    "Ò",  // O with GRAVE
                    "Ỏ",  // O with HOOK ABOVE
                    "Ơ",  // O with HORN
                    "Ớ",  // O with HORN and ACUTE
                    "Ợ",  // O with HORN and DOT BELOW
                    "Ờ",  // O with HORN and GRAVE
                    "Ở",  // O with HORN and HOOK ABOVE
                    "Ỡ",  // O with HORN and TILDE
                    "Ō",  // O with MACRON
                    "Ɵ",  // O with MIDDLE TILDE
                    "Ǫ",  // O with OGONEK
                    "Ø",  // O with STROKE
                    "Ǿ",  // O with STROKE and ACUTE
                    "Õ",  // O with TILDE
                    "Œ",  // CAPITAL LIGATURE OE
                    "ɶ"   // SMALL CAPITAL OE
                ]} />
                <KeyboardButton className="row-start-2 w-12 h-12 xl:w-16 xl:h-16 rounded-md" value={"p"} capsOn={caps} altOn={alt} appendValue={appendValue} label={"p"} diacritics={[
                    "ɸ",
                ]} diacriticCaptials={["Þ", "þ"]} />
                <KeyboardButton className="row-start-2 w-12 h-12 xl:w-16 xl:h-16 rounded-md" value={"["} alt={'{'} capsOn={caps} altOn={alt} appendValue={appendValue} label={"["} />
                <KeyboardButton className="row-start-2 w-12 h-12 xl:w-16 xl:h-16 rounded-md" value={"]"} alt={'}'} capsOn={caps} altOn={alt} appendValue={appendValue} label={"]"} />

                <div className="col-start-1 row-start-3 " onClick={() => setCaps(!caps)}><KeyboardButton className="w-12 h-12 xl:w-16 xl:h-16 rounded-md" value={""} caps capsOn={caps} label={"Caps"} /></div>
                <KeyboardButton className="col-start-2 row-start-3 w-12 h-12 xl:w-16 xl:h-16 rounded-md" diacritics={[
                    "á", // A with ACUTE
                    "ă", // A with BREVE
                    "ắ", // A with BREVE and ACUTE
                    "ặ", // A with BREVE and DOT BELOW
                    "ằ", // A with BREVE and GRAVE
                    "ẳ", // A with BREVE and HOOK ABOVE
                    "ẵ", // A with BREVE and TILDE
                    "ǎ", // A with CARON
                    "â", // A with CIRCUMFLEX
                    "ấ", // A with CIRCUMFLEX and ACUTE
                    "ậ", // A with CIRCUMFLEX and DOT BELOW
                    "ầ", // A with CIRCUMFLEX and GRAVE
                    "ẩ", // A with CIRCUMFLEX and HOOK ABOVE
                    "ẫ", // A with CIRCUMFLEX and TILDE
                    "ä", // A with DIAERESIS
                    "ạ", // A with DOT BELOW
                    "à", // A with GRAVE
                    "ả", // A with HOOK ABOVE
                    "ā", // A with MACRON
                    "ą", // A with OGONEK
                    "å", // A with RING ABOVE
                    "ǻ", // A with RING ABOVE and ACUTE
                    "ã", // A with TILDE
                    "æ", // AE ligature
                    "ǽ", // AE with ACUTE
                    "ɑ", // ALPHA
                    "ɐ", // TURNED A
                    "ɒ"  // TURNED ALPHA
                ]} diacriticCaptials={[
                    "Á", // A with ACUTE
                    "Ă", // A with BREVE
                    "Ắ", // A with BREVE and ACUTE
                    "Ặ", // A with BREVE and DOT BELOW
                    "Ằ", // A with BREVE and GRAVE
                    "Ẳ", // A with BREVE and HOOK ABOVE
                    "Ẵ", // A with BREVE and TILDE
                    "Ǎ", // A with CARON
                    "Â", // A with CIRCUMFLEX
                    "Ấ", // A with CIRCUMFLEX and ACUTE
                    "Ậ", // A with CIRCUMFLEX and DOT BELOW
                    "Ầ", // A with CIRCUMFLEX and GRAVE
                    "Ẩ", // A with CIRCUMFLEX and HOOK ABOVE
                    "Ẫ", // A with CIRCUMFLEX and TILDE
                    "Ä", // A with DIAERESIS
                    "Ạ", // A with DOT BELOW
                    "À", // A with GRAVE
                    "Ả", // A with HOOK ABOVE
                    "Ā", // A with MACRON
                    "Ą", // A with OGONEK
                    "Å", // A with RING ABOVE
                    "Ǻ", // A with RING ABOVE and ACUTE
                    "Ã", // A with TILDE
                    "Æ", // AE
                    "Ǽ"  // AE with ACUTE
                ]} value={"a"} capsOn={caps} altOn={alt} appendValue={appendValue} label={"a"} />
                <KeyboardButton className="col-start-3 row-start-3 w-12 h-12 xl:w-16 xl:h-16 rounded-md" diacritics={["ś", "š", "ş", "ŝ", "ș", "ṡ", "ṣ", "ʂ", "ſ", "ʃ", "ʆ", "ß", "ʅ",]} value={"s"} capsOn={caps} altOn={alt} appendValue={appendValue} label={"s"} diacriticCaptials={["Ś",  // S with ACUTE
                    "Š",  // S with CARON
                    "Ş",  // S with CEDILLA
                    "Ŝ",  // S with CIRCUMFLEX
                    "Ș",  // S with COMMA BELOW
                    "Ṡ",  // S with DOT ABOVE
                    "Ṣ",  // S with DOT BELOW
                    "ẞ"   // SHARP S
                ]} />
                <KeyboardButton className="col-start-4 row-start-3 w-12 h-12 xl:w-16 xl:h-16 rounded-md" value={"d"} capsOn={caps} altOn={alt} appendValue={appendValue} label={"d"} diacritics={[
                    "ď",  // lowercase D with CARON
                    "ḓ",  // lowercase D with CIRCUMFLEX BELOW
                    "ḍ",  // lowercase D with DOT BELOW
                    "ɗ",  // lowercase D with HOOK
                    "ḏ",  // lowercase D with LINE BELOW
                    "đ",  // lowercase D with STROKE
                    "ɖ",  // lowercase D with TAIL
                    "ʤ",  // lowercase DEZH DIGRAPH
                    "ǳ",  // lowercase DZ
                    "ʣ",  // lowercase DZ DIGRAPH
                    "ʥ",  // lowercase DZ DIGRAPH with CURL
                    "ǆ",  // lowercase DZ with CARO
                    "ð"
                ]} diacriticCaptials={["Ď", // D with CARON
                    "Ḓ", // D with CIRCUMFLEX BELOW
                    "Ḍ", // D with DOT BELOW
                    "Ɗ", // D with HOOK
                    "Ḏ", // D with LINE BELOW
                    "ǲ", // D with SMALL LETTER Z
                    "ǅ", // D with SMALL LETTER Z with CARON
                    "Đ", // D with STROKE
                    "Ð", // ETH
                    "Ǳ", // DZ
                    "Ǆ"]} />
                <KeyboardButton className="col-start-5 row-start-3 w-12 h-12 xl:w-16 xl:h-16 rounded-md" value={"f"} capsOn={caps} altOn={alt} appendValue={appendValue} label={"f"} diacritics={[
                    "ƒ",  // lowercase F with HOOK
                    "ſ",  // lowercase LONG S
                    "ʩ",  // lowercase FENG DIGRAPH
                    "ﬁ",  // LATIN SMALL LIGATURE FI
                    "ﬂ",  // LATIN SMALL LIGATURE FL
                ]} diacriticCaptials={["Ƒ"]} />
                <KeyboardButton className="col-start-6 row-start-3 w-12 h-12 xl:w-16 xl:h-16 rounded-md" value={"g"} capsOn={caps} altOn={alt} appendValue={appendValue} label={"g"} diacritics={[
                    "ǵ",  // lowercase G with ACUTE
                    "ğ",  // lowercase G with BREVE
                    "ǧ",  // lowercase G with CARON
                    "ģ",  // lowercase G with CEDILLA
                    "ĝ",  // lowercase G with CIRCUMFLEX
                    "ġ",  // lowercase G with DOT ABOVE
                    "ɠ",  // lowercase G with HOOK
                    "ḡ",  // lowercase G with MACRON
                    "ɡ",  // lowercase SCRIPT G
                    "ɣ"   // lowercase GAMMA
                ]} diacriticCaptials={[
                    "Ǵ",  // G with ACUTE
                    "Ğ",  // G with BREVE
                    "Ǧ",  // G with CARON
                    "Ģ",  // G with CEDILLA
                    "Ĝ",  // G with CIRCUMFLEX
                    "Ġ",  // G with DOT ABOVE
                    "Ḡ",  // G with MACRON
                    "ʛ"   // Small CAPITAL G with HOOK
                ]} />
                <KeyboardButton className="col-start-7 row-start-3 w-12 h-12 xl:w-16 xl:h-16 rounded-md" value={"h"} capsOn={caps} altOn={alt} appendValue={appendValue} label={"h"} diacritics={[
                    "ḫ",  // lowercase H with BREVE BELOW
                    "ĥ",  // lowercase H with CIRCUMFLEX
                    "ḥ",  // lowercase H with DOT BELOW
                    "ɦ",  // lowercase H with HOOK
                    "ẖ",  // lowercase H with LINE BELOW
                    "ħ",  // lowercase H with STROKE
                    "ɧ",  // lowercase HENG with HOOK
                    "ɥ",  // lowercase TURNED H
                    "ʮ",  // lowercase TURNED H with FISHHOOK
                    "ʯ"   // lowercase TURNED H with FISHHOOK and TAIL
                ]} diacriticCaptials={[
                    "Ḫ",  // H with BREVE BELOW
                    "Ĥ",  // H with CIRCUMFLEX
                    "Ḥ",  // H with DOT BELOW
                    "Ħ"   // H with STROKE
                ]} />
                <KeyboardButton className="col-start-8 row-start-3 w-12 h-12 xl:w-16 xl:h-16 rounded-md" value={"j"} capsOn={caps} altOn={alt} appendValue={appendValue} label={"j"} diacritics={[
                    "ǰ", "ĵ", "ʝ", "ȷ", "ɟ", "ʄ",
                ]} diacriticCaptials={["Ĵ"]} />
                <KeyboardButton className="col-start-9 row-start-3 w-12 h-12 xl:w-16 xl:h-16 rounded-md" value={"k"} capsOn={caps} altOn={alt} appendValue={appendValue} label={"k"} diacritics={[
                    "ķ", "ḳ", "ƙ", "ḵ", "ĸ", "ʞ",
                ]} diacriticCaptials={["Ķ",  // K with CEDILLA
                    "Ḳ",  // K with DOT BELOW
                    "Ƙ",  // K with HOOK
                    "Ḵ"   // K with LINE BELOW
                ]} />
                <KeyboardButton className="col-start-10 row-start-3 w-12 h-12 xl:w-16 xl:h-16 rounded-md" value={"l"} capsOn={caps} altOn={alt} appendValue={appendValue} label={"l"} diacritics={[
                    "ĺ", "ƚ", "ɬ", "ľ", "ļ", "ḽ", "ḷ", "ḹ", "ḻ", "ŀ", "ɫ", "ɭ", "ł", "ƛ", "ɮ", "ǉ", "ʪ", "ʫ"
                ]} diacriticCaptials={["Ĺ",  // L with ACUTE
                    "Ƚ",  // L with BAR
                    "Ľ",  // L with CARON
                    "Ļ",  // L with CEDILLA
                    "Ḽ",  // L with CIRCUMFLEX BELOW
                    "Ḷ",  // L with DOT BELOW
                    "Ḹ",  // L with DOT BELOW and MACRON
                    "Ḻ",  // L with LINE BELOW
                    "Ŀ",  // L with MIDDLE DOT
                    "ǈ",  // L with SMALL LETTER J
                    "Ł",  // L with STROKE
                    "Ǉ"   // LJ
                ]} />
                <KeyboardButton className="col-start-11 row-start-3 w-12 h-12 xl:w-16 xl:h-16 rounded-md" value={";"} alt={':'} capsOn={caps} altOn={alt} appendValue={appendValue} label={";"} />
                <KeyboardButton className="col-span-2 col-start-12 row-start-3 h-12 xl:h-16 rounded-md" value={"\n"} appendValue={appendValue} label={"Enter"} />

                <KeyboardButton className="col-start-1 row-start-4 w-12 h-12 xl:w-16 xl:h-16 rounded-md" value={"\\"} alt={'|'} capsOn={caps} altOn={alt} appendValue={appendValue} label={"\\"} />
                <KeyboardButton className="col-start-2 row-start-4 w-12 h-12 xl:w-16 xl:h-16 rounded-md" value={"z"} capsOn={caps} altOn={alt} appendValue={appendValue} label={"z"} diacritics={[
                    "ź", "ž", "ʑ", "ż", "ẓ", "ẕ", "ʐ", "ƶ"
                ]} diacriticCaptials={[
                    "Ź",  // Z with ACUTE
                    "Ž",  // Z with CARON
                    "Ż",  // Z with DOT ABOVE
                    "Ẓ",  // Z with DOT BELOW
                    "Ẕ",  // Z with LINE BELOW
                    "Ƶ"   // Z with STROKE
                ]} />
                <KeyboardButton className="col-start-3 row-start-4 w-12 h-12 xl:w-16 xl:h-16 rounded-md" value={"x"} capsOn={caps} altOn={alt} appendValue={appendValue} label={"x"} />
                <KeyboardButton className="col-start-4 row-start-4 w-12 h-12 xl:w-16 xl:h-16 rounded-md" value={"c"} capsOn={caps} altOn={alt} appendValue={appendValue} label={"c"} diacritics={[
                    "ć",  // lowercase C with ACUTE
                    "č",  // lowercase C with CARON
                    "ç",  // lowercase C with CEDILLA
                    "ĉ",  // lowercase C with CIRCUMFLEX
                    "ɕ",  // lowercase C with CURL
                    "ċ"   // lowercase C with DOT ABOVE
                ]} diacriticCaptials={["Ć", // C with ACUTE
                    "Č", // C with CARON
                    "Ç", // C with CEDILLA
                    "Ĉ", // C with CIRCUMFLEX
                    "Ċ"]} />
                <KeyboardButton className="col-start-5 row-start-4 w-12 h-12 xl:w-16 xl:h-16 rounded-md" value={"v"} capsOn={caps} altOn={alt} appendValue={appendValue} label={"v"} diacritics={[
                    "ʋ", "ʌ",
                ]} />
                <KeyboardButton className="col-start-6 row-start-4 w-12 h-12 xl:w-16 xl:h-16 rounded-md" value={"b"} capsOn={caps} altOn={alt} appendValue={appendValue} label={"b"} diacritics={["ḅ",  // lowercase B with DOT BELOW
                    "ɓ",  // lowercase B with HOOK
                    "ß"   // lowercase SHARP S
                ]} diacriticCaptials={["Ḅ", // B with DOT BELOW
                    "Ɓ"  // B with HOOK
                ]} />
                <KeyboardButton className="col-start-7 row-start-4 w-12 h-12 xl:w-16 xl:h-16 rounded-md" value={"n"} capsOn={caps} altOn={alt} appendValue={appendValue} label={"n"} diacritics={[
                    "ŉ", "ń", "ň", "ņ", "ṋ", "ṅ", "ṇ", "ǹ", "ɲ", "ṉ", "ɳ", "ñ", "ǌ", "ŋ",
                ]} diacriticCaptials={["Ń",  // N with ACUTE
                    "Ň",  // N with CARON
                    "Ņ",  // N with CEDILLA
                    "Ṋ",  // N with CIRCUMFLEX BELOW
                    "Ṅ",  // N with DOT ABOVE
                    "Ṇ",  // N with DOT BELOW
                    "Ǹ",  // N with GRAVE
                    "Ɲ",  // N with LEFT HOOK
                    "Ṉ",  // N with LINE BELOW
                    "ǋ",  // N with SMALL LETTER J
                    "Ñ",  // N with TILDE
                    "Ǌ"   // NJ
                ]} />
                <KeyboardButton className="col-start-8 row-start-4 w-12 h-12 xl:w-16 xl:h-16 rounded-md" value={"m"} capsOn={caps} altOn={alt} appendValue={appendValue} label={"m"} diacritics={[
                    "ḿ", "ṁ", "ṃ", "ɱ", "ɯ", "ɰ",
                ]} diacriticCaptials={["Ḿ",  // M with ACUTE
                    "Ṁ",  // M with DOT ABOVE
                    "Ṃ"   // M with DOT BELOW
                ]} />
                < KeyboardButton className="row-start-4 w-12 h-12 xl:w-16 xl:h-16 rounded-md" value={","} alt={'<'} altOn={alt} appendValue={appendValue} label={","} />
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
                    <KeyboardButton className={"h-8 w-8 rounded-sm "} capsOn={caps} value={"q"} label={"q"} appendValue={appendValue} diacritics={["ʠ"]} />
                    <KeyboardButton className={"h-8 w-8 rounded-sm"} capsOn={caps} value={"w"} label={"w"} appendValue={appendValue} diacritics={[
                        "ẃ", "ŵ", "ẅ", "ẁ", "ʍ",
                    ]} diacriticCaptials={["Ẃ",  // W with ACUTE
                        "Ŵ",  // W with CIRCUMFLEX
                        "Ẅ",  // W with DIAERESIS
                        "Ẁ",  // W with GRAVE
                        "ʬ"   // BILABIAL PERCUSSIVE
                    ]} />
                    <KeyboardButton className={"h-8 w-8 rounded-sm"} capsOn={caps} value={"e"} label={"e"} appendValue={appendValue} diacritics={
                        [
                            "é",  // lowercase E with ACUTE
                            "ĕ",  // lowercase E with BREVE
                            "ě",  // lowercase E with CARON
                            "ê",  // lowercase E with CIRCUMFLEX
                            "ế",  // lowercase E with CIRCUMFLEX and ACUTE
                            "ệ",  // lowercase E with CIRCUMFLEX and DOT BELOW
                            "ề",  // lowercase E with CIRCUMFLEX and GRAVE
                            "ể",  // lowercase E with CIRCUMFLEX and HOOK ABOVE
                            "ễ",  // lowercase E with CIRCUMFLEX and TILDE
                            "ë",  // lowercase E with DIAERESIS
                            "ė",  // lowercase E with DOT ABOVE
                            "ẹ",  // lowercase E with DOT BELOW
                            "è",  // lowercase E with GRAVE
                            "ẻ",  // lowercase E with HOOK ABOVE
                            "ē",  // lowercase E with MACRON
                            "ę",  // lowercase E with OGONEK
                            "ẽ",  // lowercase E with TILDE
                        ]} diacriticCaptials={[
                            "É", // E with ACUTE
                            "Ĕ", // E with BREVE
                            "Ě", // E with CARON
                            "Ê", // E with CIRCUMFLEX
                            "Ế", // E with CIRCUMFLEX and ACUTE
                            "Ệ", // E with CIRCUMFLEX and DOT BELOW
                            "Ề", // E with CIRCUMFLEX and GRAVE
                            "Ể", // E with CIRCUMFLEX and HOOK ABOVE
                            "Ễ", // E with CIRCUMFLEX and TILDE
                            "Ë", // E with DIAERESIS
                            "Ė", // E with DOT ABOVE
                            "Ẹ", // E with DOT BELOW
                            "È", // E with GRAVE
                            "Ẻ", // E with HOOK ABOVE
                            "Ē", // E with MACRON
                            "Ę", // E with OGONEK
                            "Ẽ", // E with TILDE
                            "Ɛ", // OPEN E
                            "Ə"
                        ]} />
                    <KeyboardButton className={"h-8 w-8 rounded-sm"} capsOn={caps} value={"r"} label={"r"} appendValue={appendValue} diacritics={[
                        "ŕ", "ř", "ŗ", "ṙ", "ṛ", "ṝ", "ɾ", "ṟ", "ɼ", "ɽ", "ɿ", "ɹ", "ɻ", "ɺ",
                    ]} diacriticCaptials={["Ŕ",  // R with ACUTE
                        "Ř",  // R with CARON
                        "Ŗ",  // R with CEDILLA
                        "Ṙ",  // R with DOT ABOVE
                        "Ṛ",  // R with DOT BELOW
                        "Ṝ",  // R with DOT BELOW and MACRON
                        "Ṟ",  // R with LINE BELOW
                        "ʁ"   // SMALL CAPITAL INVERTED R
                    ]} />
                    <KeyboardButton className={"h-8 w-8 rounded-sm"} capsOn={caps} value={"t"} label={"t"} appendValue={appendValue} diacritics={[
                        "ť", "ţ", "ṱ", "ț", "ẗ", "ṭ", "ṯ", "ʈ", "ŧ", "ʨ", "ʧ", "þ", "ð", "ʦ", "ʇ",
                    ]} diacriticCaptials={["Ť",  // T with CARON
                        "Ţ",  // T with CEDILLA
                        "Ṱ",  // T with CIRCUMFLEX BELOW
                        "Ț",  // T with COMMA BELOW
                        "Ṭ",  // T with DOT BELOW
                        "Ṯ",  // T with LINE BELOW
                        "Ŧ",  // T with STROKE
                        "Þ",  // THORN
                        "Ð"   // ETH
                    ]} />
                    <KeyboardButton className={"h-8 w-8 rounded-sm"} capsOn={caps} value={"y"} label={"y"} appendValue={appendValue} diacritics={[
                        "ý", "ŷ", "ÿ", "ẏ", "ỵ", "ỳ", "ƴ", "ỷ", "ȳ", "ỹ", "ʎ",
                    ]} diacriticCaptials={[
                        "Ý",  // Y with ACUTE
                        "Ŷ",  // Y with CIRCUMFLEX
                        "Ÿ",  // Y with DIAERESIS
                        "Ẏ",  // Y with DOT ABOVE
                        "Ỵ",  // Y with DOT BELOW
                        "Ỳ",  // Y with GRAVE
                        "Ƴ",  // Y with HOOK
                        "Ỷ",  // Y with HOOK ABOVE
                        "Ȳ",  // Y with MACRON
                        "Ỹ"   // Y with TILDE
                    ]} />
                    <KeyboardButton className={"h-8 w-8 rounded-sm"} capsOn={caps} value={"u"} label={"u"} appendValue={appendValue} diacritics={[
                        "ʉ", "ú", "ŭ", "ǔ", "û", "ü", "ǘ", "ǚ", "ǜ", "ǖ", "ụ", "ű", "ù", "ủ", "ư", "ứ", "ự", "ừ", "ử", "ữ", "ū", "ų", "ů", "ũ", "ʊ",
                    ]} diacriticCaptials={["Ú",  // U with ACUTE
                        "Ŭ",  // U with BREVE
                        "Ǔ",  // U with CARON
                        "Û",  // U with CIRCUMFLEX
                        "Ü",  // U with DIAERESIS
                        "Ǘ",  // U with DIAERESIS and ACUTE
                        "Ǚ",  // U with DIAERESIS and CARON
                        "Ǜ",  // U with DIAERESIS and GRAVE
                        "Ǖ",  // U with DIAERESIS and MACRON
                        "Ụ",  // U with DOT BELOW
                        "Ű",  // U with DOUBLE ACUTE
                        "Ù",  // U with GRAVE
                        "Ủ",  // U with HOOK ABOVE
                        "Ư",  // U with HORN
                        "Ứ",  // U with HORN and ACUTE
                        "Ự",  // U with HORN and DOT BELOW
                        "Ừ",  // U with HORN and GRAVE
                        "Ử",  // U with HORN and HOOK ABOVE
                        "Ữ",  // U with HORN and TILDE
                        "Ū",  // U with MACRON
                        "Ų",  // U with OGONEK
                        "Ů",  // U with RING ABOVE
                        "Ũ"   // U with TILDE
                    ]} />
                    <KeyboardButton className={"h-8 w-8 rounded-sm"} capsOn={caps} value={"i"} label={"i"} appendValue={appendValue} diacritics={[
                        "í", "ĭ", "ǐ", "î", "ï", "ị", "ì", "ỉ", "ī", "į", "ɨ", "ĩ", "ɩ", "ı", "ĳ", "ɟ",
                    ]} diacriticCaptials={[
                        "Í",  // I with ACUTE
                        "Ĭ",  // I with BREVE
                        "Ǐ",  // I with CARON
                        "Î",  // I with CIRCUMFLEX
                        "Ï",  // I with DIAERESIS
                        "İ",  // I with DOT ABOVE
                        "Ị",  // I with DOT BELOW
                        "Ì",  // I with GRAVE
                        "Ỉ",  // I with HOOK ABOVE
                        "Ī",  // I with MACRON
                        "Į",  // I with OGONEK
                        "Ĩ",  // I with TILDE
                        "Ĳ"   // CAPITAL LIGATURE IJ
                    ]} />
                    <KeyboardButton className={"h-8 w-8 rounded-sm"} capsOn={caps} value={"o"} label={"o"} appendValue={appendValue} diacritics={[
                        "ó", "ŏ", "ǒ", "ô", "ố", "ộ", "ồ", "ổ", "ỗ", "ö", "ọ", "ő", "ò", "ỏ", "ơ", "ớ", "ợ", "ờ", "ở", "ỡ", "ō", "ǫ", "ø", "ǿ", "õ",
                    ]} diacriticCaptials={["Ó",  // O with ACUTE
                        "Ŏ",  // O with BREVE
                        "Ǒ",  // O with CARON
                        "Ô",  // O with CIRCUMFLEX
                        "Ố",  // O with CIRCUMFLEX and ACUTE
                        "Ộ",  // O with CIRCUMFLEX and DOT BELOW
                        "Ồ",  // O with CIRCUMFLEX and GRAVE
                        "Ổ",  // O with CIRCUMFLEX and HOOK ABOVE
                        "Ỗ",  // O with CIRCUMFLEX and TILDE
                        "Ö",  // O with DIAERESIS
                        "Ọ",  // O with DOT BELOW
                        "Ő",  // O with DOUBLE ACUTE
                        "Ò",  // O with GRAVE
                        "Ỏ",  // O with HOOK ABOVE
                        "Ơ",  // O with HORN
                        "Ớ",  // O with HORN and ACUTE
                        "Ợ",  // O with HORN and DOT BELOW
                        "Ờ",  // O with HORN and GRAVE
                        "Ở",  // O with HORN and HOOK ABOVE
                        "Ỡ",  // O with HORN and TILDE
                        "Ō",  // O with MACRON
                        "Ɵ",  // O with MIDDLE TILDE
                        "Ǫ",  // O with OGONEK
                        "Ø",  // O with STROKE
                        "Ǿ",  // O with STROKE and ACUTE
                        "Õ",  // O with TILDE
                        "Œ",  // CAPITAL LIGATURE OE
                        "ɶ"   // SMALL CAPITAL OE
                    ]} />
                    <KeyboardButton className={"h-8 w-8 rounded-sm"} capsOn={caps} value={"p"} label={"p"} appendValue={appendValue} diacritics={[
                        "ɸ",
                    ]} diacriticCaptials={["Þ", "þ"]} />

                    <KeyboardButton className="col-start-1 row-start-2 h-8 w-8 rounded-sm" capsOn={caps} value={"a"} label={"a"} appendValue={appendValue} diacritics={[
                        "á", // A with ACUTE
                        "ă", // A with BREVE
                        "ắ", // A with BREVE and ACUTE
                        "ặ", // A with BREVE and DOT BELOW
                        "ằ", // A with BREVE and GRAVE
                        "ẳ", // A with BREVE and HOOK ABOVE
                        "ẵ", // A with BREVE and TILDE
                        "ǎ", // A with CARON
                        "â", // A with CIRCUMFLEX
                        "ấ", // A with CIRCUMFLEX and ACUTE
                        "ậ", // A with CIRCUMFLEX and DOT BELOW
                        "ầ", // A with CIRCUMFLEX and GRAVE
                        "ẩ", // A with CIRCUMFLEX and HOOK ABOVE
                        "ẫ", // A with CIRCUMFLEX and TILDE
                        "ä", // A with DIAERESIS
                        "ạ", // A with DOT BELOW
                        "à", // A with GRAVE
                        "ả", // A with HOOK ABOVE
                        "ā", // A with MACRON
                        "ą", // A with OGONEK
                        "å", // A with RING ABOVE
                        "ǻ", // A with RING ABOVE and ACUTE
                        "ã", // A with TILDE
                        "æ", // AE ligature
                        "ǽ", // AE with ACUTE
                        "ɑ", // ALPHA
                        "ɐ", // TURNED A
                        "ɒ"  // TURNED ALPHA
                    ]} diacriticCaptials={[
                        "Á", // A with ACUTE
                        "Ă", // A with BREVE
                        "Ắ", // A with BREVE and ACUTE
                        "Ặ", // A with BREVE and DOT BELOW
                        "Ằ", // A with BREVE and GRAVE
                        "Ẳ", // A with BREVE and HOOK ABOVE
                        "Ẵ", // A with BREVE and TILDE
                        "Ǎ", // A with CARON
                        "Â", // A with CIRCUMFLEX
                        "Ấ", // A with CIRCUMFLEX and ACUTE
                        "Ậ", // A with CIRCUMFLEX and DOT BELOW
                        "Ầ", // A with CIRCUMFLEX and GRAVE
                        "Ẩ", // A with CIRCUMFLEX and HOOK ABOVE
                        "Ẫ", // A with CIRCUMFLEX and TILDE
                        "Ä", // A with DIAERESIS
                        "Ạ", // A with DOT BELOW
                        "À", // A with GRAVE
                        "Ả", // A with HOOK ABOVE
                        "Ā", // A with MACRON
                        "Ą", // A with OGONEK
                        "Å", // A with RING ABOVE
                        "Ǻ", // A with RING ABOVE and ACUTE
                        "Ã", // A with TILDE
                        "Æ", // AE
                        "Ǽ"  // AE with ACUTE
                    ]} />
                    <KeyboardButton className="col-start-2 row-start-2 h-8 w-8 rounded-sm" capsOn={caps} value={"s"} label={"s"} appendValue={appendValue} diacritics={["ś", "š", "ş", "ŝ", "ș", "ṡ", "ṣ", "ʂ", "ſ", "ʃ", "ʆ", "ß", "ʅ",]} diacriticCaptials={["Ś",  // S with ACUTE
                        "Š",  // S with CARON
                        "Ş",  // S with CEDILLA
                        "Ŝ",  // S with CIRCUMFLEX
                        "Ș",  // S with COMMA BELOW
                        "Ṡ",  // S with DOT ABOVE
                        "Ṣ",  // S with DOT BELOW
                        "ẞ"   // SHARP S
                    ]} />
                    <KeyboardButton className="col-start-3 row-start-2 h-8 w-8 rounded-sm" capsOn={caps} value={"d"} label={"d"} appendValue={appendValue} diacritics={[
                        "ď",  // lowercase D with CARON
                        "ḓ",  // lowercase D with CIRCUMFLEX BELOW
                        "ḍ",  // lowercase D with DOT BELOW
                        "ɗ",  // lowercase D with HOOK
                        "ḏ",  // lowercase D with LINE BELOW
                        "đ",  // lowercase D with STROKE
                        "ɖ",  // lowercase D with TAIL
                        "ʤ",  // lowercase DEZH DIGRAPH
                        "ǳ",  // lowercase DZ
                        "ʣ",  // lowercase DZ DIGRAPH
                        "ʥ",  // lowercase DZ DIGRAPH with CURL
                        "ǆ",  // lowercase DZ with CARO
                        "ð"
                    ]} diacriticCaptials={["Ď", // D with CARON
                        "Ḓ", // D with CIRCUMFLEX BELOW
                        "Ḍ", // D with DOT BELOW
                        "Ɗ", // D with HOOK
                        "Ḏ", // D with LINE BELOW
                        "ǲ", // D with SMALL LETTER Z
                        "ǅ", // D with SMALL LETTER Z with CARON
                        "Đ", // D with STROKE
                        "Ð", // ETH
                        "Ǳ", // DZ
                        "Ǆ"]} />
                    <KeyboardButton className="col-start-4 row-start-2 h-8 w-8 rounded-sm" capsOn={caps} value={"f"} label={"f"} appendValue={appendValue} diacritics={[
                        "ƒ",  // lowercase F with HOOK
                        "ſ",  // lowercase LONG S
                        "ʩ",  // lowercase FENG DIGRAPH
                        "ﬁ",  // LATIN SMALL LIGATURE FI
                        "ﬂ",  // LATIN SMALL LIGATURE FL
                    ]} diacriticCaptials={["Ƒ"]} />
                    <KeyboardButton className="col-start-5 row-start-2 h-8 w-8 rounded-sm" capsOn={caps} value={"g"} label={"g"} appendValue={appendValue} diacritics={[
                        "ǵ",  // lowercase G with ACUTE
                        "ğ",  // lowercase G with BREVE
                        "ǧ",  // lowercase G with CARON
                        "ģ",  // lowercase G with CEDILLA
                        "ĝ",  // lowercase G with CIRCUMFLEX
                        "ġ",  // lowercase G with DOT ABOVE
                        "ɠ",  // lowercase G with HOOK
                        "ḡ",  // lowercase G with MACRON
                        "ɡ",  // lowercase SCRIPT G
                        "ɣ"   // lowercase GAMMA
                    ]} diacriticCaptials={[
                        "Ǵ",  // G with ACUTE
                        "Ğ",  // G with BREVE
                        "Ǧ",  // G with CARON
                        "Ģ",  // G with CEDILLA
                        "Ĝ",  // G with CIRCUMFLEX
                        "Ġ",  // G with DOT ABOVE
                        "Ḡ",  // G with MACRON
                        "ʛ"   // Small CAPITAL G with HOOK
                    ]} />
                    <KeyboardButton className="col-start-6 row-start-2 h-8 w-8 rounded-sm" capsOn={caps} value={"h"} label={"h"} appendValue={appendValue} diacritics={[
                        "ḫ",  // lowercase H with BREVE BELOW
                        "ĥ",  // lowercase H with CIRCUMFLEX
                        "ḥ",  // lowercase H with DOT BELOW
                        "ɦ",  // lowercase H with HOOK
                        "ẖ",  // lowercase H with LINE BELOW
                        "ħ",  // lowercase H with STROKE
                        "ɧ",  // lowercase HENG with HOOK
                        "ɥ",  // lowercase TURNED H
                        "ʮ",  // lowercase TURNED H with FISHHOOK
                        "ʯ"   // lowercase TURNED H with FISHHOOK and TAIL
                    ]} diacriticCaptials={[
                        "Ḫ",  // H with BREVE BELOW
                        "Ĥ",  // H with CIRCUMFLEX
                        "Ḥ",  // H with DOT BELOW
                        "Ħ"   // H with STROKE
                    ]} />
                    <KeyboardButton className="col-start-7 row-start-2 h-8 w-8 rounded-sm" capsOn={caps} value={"j"} label={"j"} appendValue={appendValue} diacritics={[
                        "ǰ", "ĵ", "ʝ", "ȷ", "ɟ", "ʄ",
                    ]} diacriticCaptials={["Ĵ"]} />
                    <KeyboardButton className="col-start-8 row-start-2 h-8 w-8 rounded-sm" capsOn={caps} value={"k"} label={"k"} appendValue={appendValue} diacritics={[
                        "ķ", "ḳ", "ƙ", "ḵ", "ĸ", "ʞ",
                    ]} diacriticCaptials={["Ķ",  // K with CEDILLA
                        "Ḳ",  // K with DOT BELOW
                        "Ƙ",  // K with HOOK
                        "Ḵ"   // K with LINE BELOW
                    ]} />
                    <KeyboardButton className="col-start-9 row-start-2 h-8 w-8 rounded-sm" capsOn={caps} value={"l"} label={"l"} appendValue={appendValue} diacritics={[
                        "ĺ", "ƚ", "ɬ", "ľ", "ļ", "ḽ", "ḷ", "ḹ", "ḻ", "ŀ", "ɫ", "ɭ", "ł", "ƛ", "ɮ", "ǉ", "ʪ", "ʫ"
                    ]} diacriticCaptials={["Ĺ",  // L with ACUTE
                        "Ƚ",  // L with BAR
                        "Ľ",  // L with CARON
                        "Ļ",  // L with CEDILLA
                        "Ḽ",  // L with CIRCUMFLEX BELOW
                        "Ḷ",  // L with DOT BELOW
                        "Ḹ",  // L with DOT BELOW and MACRON
                        "Ḻ",  // L with LINE BELOW
                        "Ŀ",  // L with MIDDLE DOT
                        "ǈ",  // L with SMALL LETTER J
                        "Ł",  // L with STROKE
                        "Ǉ"   // LJ
                    ]} />
                    <KeyboardButton className="col-start-10 row-start-2 h-8 w-8 rounded-sm" value={"@"} label={"@"} appendValue={appendValue} />

                    <div className="col-start-1 row-start-3" onClick={() => setCaps(!caps)}><KeyboardButton className="h-8 w-8 rounded-sm" caps capsOn={caps} value={""} label={<ArrowBigUpDash className="mx-auto" />} /></div>
                    <KeyboardButton className="col-start-2 row-start-3 h-8 w-8 rounded-sm" capsOn={caps} value={"z"} label={"z"} appendValue={appendValue} diacritics={[
                        "ź", "ž", "ʑ", "ż", "ẓ", "ẕ", "ʐ", "ƶ"
                    ]} diacriticCaptials={[
                        "Ź",  // Z with ACUTE
                        "Ž",  // Z with CARON
                        "Ż",  // Z with DOT ABOVE
                        "Ẓ",  // Z with DOT BELOW
                        "Ẕ",  // Z with LINE BELOW
                        "Ƶ"   // Z with STROKE
                    ]} />
                    <KeyboardButton className="col-start-3 row-start-3 h-8 w-8 rounded-sm" capsOn={caps} value={"x"} label={"x"} appendValue={appendValue} />
                    <KeyboardButton className="col-start-4 row-start-3 h-8 w-8 rounded-sm" capsOn={caps} value={"c"} label={"c"} appendValue={appendValue} diacritics={[
                        "ć",  // lowercase C with ACUTE
                        "č",  // lowercase C with CARON
                        "ç",  // lowercase C with CEDILLA
                        "ĉ",  // lowercase C with CIRCUMFLEX
                        "ɕ",  // lowercase C with CURL
                        "ċ"   // lowercase C with DOT ABOVE
                    ]} diacriticCaptials={["Ć", // C with ACUTE
                        "Č", // C with CARON
                        "Ç", // C with CEDILLA
                        "Ĉ", // C with CIRCUMFLEX
                        "Ċ"]} />
                    <KeyboardButton className="col-start-5 row-start-3 h-8 w-8 rounded-sm" capsOn={caps} value={"v"} label={"v"} appendValue={appendValue} diacritics={[
                        "ʋ", "ʌ",
                    ]} />
                    <KeyboardButton className="col-start-6 row-start-3 h-8 w-8 rounded-sm" capsOn={caps} value={"b"} label={"b"} appendValue={appendValue} diacritics={["ḅ",  // lowercase B with DOT BELOW
                        "ɓ",  // lowercase B with HOOK
                        "ß"   // lowercase SHARP S
                    ]} diacriticCaptials={["Ḅ", // B with DOT BELOW
                        "Ɓ"  // B with HOOK
                    ]} />
                    <KeyboardButton className="col-start-7 row-start-3 h-8 w-8 rounded-sm" capsOn={caps} value={"n"} label={"n"} appendValue={appendValue} diacritics={[
                        "ŉ", "ń", "ň", "ņ", "ṋ", "ṅ", "ṇ", "ǹ", "ɲ", "ṉ", "ɳ", "ñ", "ǌ", "ŋ",
                    ]} diacriticCaptials={["Ń",  // N with ACUTE
                        "Ň",  // N with CARON
                        "Ņ",  // N with CEDILLA
                        "Ṋ",  // N with CIRCUMFLEX BELOW
                        "Ṅ",  // N with DOT ABOVE
                        "Ṇ",  // N with DOT BELOW
                        "Ǹ",  // N with GRAVE
                        "Ɲ",  // N with LEFT HOOK
                        "Ṉ",  // N with LINE BELOW
                        "ǋ",  // N with SMALL LETTER J
                        "Ñ",  // N with TILDE
                        "Ǌ"   // NJ
                    ]} />
                    <KeyboardButton className="col-start-8 row-start-3 h-8 w-8 rounded-sm" capsOn={caps} value={"m"} label={"m"} appendValue={appendValue} diacritics={[
                        "ḿ", "ṁ", "ṃ", "ɱ", "ɯ", "ɰ",
                    ]} diacriticCaptials={["Ḿ",  // M with ACUTE
                        "Ṁ",  // M with DOT ABOVE
                        "Ṃ"   // M with DOT BELOW
                    ]} />
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