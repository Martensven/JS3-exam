import './style.css'

export const RecipeCard = () => {
    return (
        <>
            <main className='recipeCardMain'>
                <article className='recipeCard' >
                    <h3 className='cardTitle'>Namn på recept</h3>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Big_Mac_hamburger.jpg/640px-Big_Mac_hamburger.jpg" alt="" className='cardImg' />
                    <p className='cardDesc'></p>
                    <p>Betyg: *****</p>
                </article>

                <article className='recipeCard' >
                    <h3 className='cardTitle'>Namn på recept</h3>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Big_Mac_hamburger.jpg/640px-Big_Mac_hamburger.jpg" alt="" className='cardImg' />
                    <p className='cardDesc'></p>
                    <p>Betyg: *****</p>
                </article>

                <article className='recipeCard' >
                    <h3 className='cardTitle'>Namn på recept</h3>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Big_Mac_hamburger.jpg/640px-Big_Mac_hamburger.jpg" alt="" className='cardImg' />
                    <p className='cardDesc'></p>
                    <p>Betyg: *****</p>
                </article>
            </main>
        </>
    )
}