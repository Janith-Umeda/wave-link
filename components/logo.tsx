import Image from "next/image"
import Link from "next/link"

export function Logo() {
    return (
        <Link href="/" className="flex items-center space-x-2">
            <Image
                src="images/wavelink.svg"
                alt="WaveLink Logo"
                width={144}
                height={144}
                className="size-36"
            />
            {/* <span className="font-bold text-xl">WaveLink</span> */}
        </Link>
    )
}

