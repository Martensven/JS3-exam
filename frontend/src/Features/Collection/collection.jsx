import './collection.css';
import { client } from '../../sanityClient';
import { useState, useEffect } from 'react';

export const Collection = () => {
    const [recipes, setRecipes] = useState(null);
    useEffect(() => {
        client.fetch(
            `*[_type == 'recipe' && _id == '18ce8632-5279-402e-981e-5d1d47ed7234']{
            title,
            image {asset->
            {url}
            },
            categories[]->{
                title
            },
            description,
            timeToCook
        }`
        )
        .then((data) => setRecipes(data[0]))
        .catch(console.error);
    }, []);

    if (!recipes) return <h3>Laddar...</h3>

    return (
    <main>
        <h1>Frukost</h1>
        
        <div className='card-container'>
            <img className='card-img' src={recipes.image.asset.url} alt={recipes.title} />
            <div className='card-txtbox'>
                <h1 className='card-title'>{recipes.title}</h1>
                <h2 className='card-desc'>{recipes.description}</h2>
                <h2 className='card-timer'>Tillagningstid: {recipes.timeToCook} min</h2>
                <h2 className='card-etc'>Hello</h2>
                <div className='card-right'>
                    <h2 className='card-rating'>⭐⭐⭐⭐⭐</h2>
                </div>
            </div>
        </div>
    </main>
)
}