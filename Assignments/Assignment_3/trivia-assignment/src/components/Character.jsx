import Image from "next/image";

export default async function Character(params) {

    let response = await fetch('https://rickandmortyapi.com/api/character/' + params.id);
    let data = await response.json();

    return (
        <>
            <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
                {data.name}
            </h1>
            <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
                {data.species}
            </p>
            <Image
                src={data.image}
                alt={data.name}
                width={400}
                height={100}
                priority
            />
        </>
    )
}