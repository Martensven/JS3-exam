import "./style.css";
import './style.css'

export const createRecipeSide = () => {

    return (
        <>
            <main className="recipeMain">

                <h1 className="recipeName">Receptnamn</h1>

                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Big_Mac_hamburger.jpg/640px-Big_Mac_hamburger.jpg" alt="" className="recipeImg" />

                <ul className="categories">
                    <li className="category"><button>Dryck</button></li>
                    <li className="category"><button>Dryck</button></li>
                    <li className="category"><button>Dryck</button></li>
                    <li className="category"><button>Dryck</button></li>
                    <li className="category"><button>Dryck</button></li>
                </ul>
                <p className="recipeDesc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat maiores, ullam aperiam voluptatem obcaecati possimus molestias veritatis in perferendis error, minima atque vitae officiis similique nobis sunt perspiciatis nemo eaque.</p>


                <div className='detailsContainer'>
                    <div className='details'>
                        <p className='timeToCook'>⏲️30 min</p>
                        <p className="numberOfIngredients">🍌10</p>
                        <p className='numberOfPortions'>🍽️4</p>
                    </div>
                    <p className='recipeRating'>⭐⭐⭐⭐⭐</p>
                </div>


                <section className='listContainer'>
                    <div className="ingredientContainer">
                        <ul className="ingredients">
                            <li className="ingredient">Vatten 1 DL</li>
                            <li className="ingredient">Vatten 1 DL</li>
                            <li className="ingredient">Vatten 1 DL</li>
                            <li className="ingredient">Vatten 1 DL</li>
                            <li className="ingredient">Vatten 1 DL</li>
                            <li className="ingredient">Vatten 1 DL</li>
                            <li className="ingredient">Vatten 1 DL</li>
                            <li className="ingredient">Vatten 1 DL</li>
                            <li className="ingredient">Vatten 1 DL</li>
                            <li className="ingredient">Vatten 1 DL</li>
                        </ul>
                    </div>

                    <div className="instructionsContainer">
                        <ul className="instructions">
                            <li className="instruction">Gör så</li>
                            <li className="instruction">Gör så</li>
                            <li className="instruction">Gör så</li>
                            <li className="instruction">Gör så</li>
                            <li className="instruction">Gör så</li>
                            <li className="instruction">Gör så</li>
                            <li className="instruction">Gör så</li>
                            <li className="instruction">Gör så</li>
                            <li className="instruction">Gör så</li>
                            <li className="instruction">Gör så</li>
                        </ul>
                    </div>
                </section>


            </main>
        </>
    )
}