import Link from "next/link";

export default function Character(params) {
    
    return (
        <Link href={"/characters/" + params.id}>{params.name}</Link>
    )
}