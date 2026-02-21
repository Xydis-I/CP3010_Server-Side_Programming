import Link from "next/link";

export default function() {
    return (
        <div className="header">
            <Link href="/">Home</Link>
            <Link href="/characters">Characters</Link>
        </div>
    )
}