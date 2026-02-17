import Character from "./character";

export default async function(params) {
    
    let response = await fetch('https://rickandmortyapi.com/api/character');
    let data = await response.json();
    let characters = data.results;
    // console.log(characters)

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
                <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
                    <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
                        Characters
                    </h1>

                    <ul>
                        {characters.map(character => (
                            <li key={character.id}>
                                <Character name={character.name} id={character.id}></Character>
                            </li>
                        ))}
                    </ul>
                </div>
            </main>
        </div>
    )
}