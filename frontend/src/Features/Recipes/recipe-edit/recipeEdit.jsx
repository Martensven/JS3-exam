import './style.css';
import { useState, useEffect } from "react";
import { client } from '../../../sanityClient';
import { useParams, useNavigate } from 'react-router';

export const RecipesEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState(null);
    const [allCategories, setAllCategories] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [timeToCook, setTimeToCook] = useState(0);
    const [portions, setPortions] = useState(0);
    const [ingredients, setIngredients] = useState([]);
    const [instructions, setInstructions] = useState([]);
    const [selectedCategoryTitles, setSelectedCategoryTitles] = useState([]);
    const [imageUrl, setImageUrl] = useState("");
    const [newImageFile, setNewImageFile] = useState(null);
    const [newIngredient, setNewIngredient] = useState("");
    const [newInstruction, setNewInstruction] = useState("");

    useEffect(() => {
        if (!id) return;

        const fetchData = async () => {
            try {
                const [recipeData, categories] = await Promise.all([
                    client.fetch(`*[_type == "recipe" && _id == $id][0]{
                        title,
                        image {asset->{url, _id}},
                        categories[]->{_id, title},
                        description,
                        timeToCook,
                        portions,
                        ingredients[],
                        instructions[],
                        _id
                    }`,
                        { id: id }
                    ),

                    client.fetch(`*[_type == 'category']{_id, title}`)
                ]);

                const recipe = recipeData;
                setRecipe(recipe);
                setTitle(recipe.title);
                setDescription(recipe.description);
                setTimeToCook(recipe.timeToCook);
                setPortions(recipe.portions);
                setIngredients(recipe.ingredients || []);
                setInstructions(recipe.instructions || []);
                setSelectedCategoryTitles(recipe.categories.map(c => c.title));
                setImageUrl(recipe.image?.asset?.url || "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png?20210521171500");
                setAllCategories(categories);
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, [id]);

    const handleCategoryToggle = (title) => {
        setSelectedCategoryTitles((prev) =>
            prev.includes(title)
                ? prev.filter(t => t !== title)
                : [...prev, title]
        );
    };

    const updatedCategories = selectedCategoryTitles.map(title => {
        const match = allCategories.find(category => category.title === title);
        return match ? {
            _key: match._id,
            _type: 'reference',
            _ref: match._id
        } : null;
    }).filter(Boolean);

    const handleAddIngredient = () => {
        if (newIngredient.trim()) {
            setIngredients([...ingredients, newIngredient]);
            setNewIngredient("");
        }
    };

    const handleRemoveIngredient = (index) => {
        setIngredients(ingredients.filter((_, i) => i !== index));
    };

    const handleAddInstruction = () => {
        if (newInstruction.trim()) {
            setInstructions([...instructions, newInstruction]);
            setNewInstruction("");

        }
    };

    const handleRemoveInstruction = (index) => {
        setInstructions(instructions.filter((_, i) => i !== index));
    };

    const handleImageUpload = async () => {
        if (!newImageFile) {
            // Om det redan finns en bild, skapa korrekt referens
            if (recipe?.image?.asset?._id) {
                return {
                    _type: 'image',
                    asset: {
                        _type: 'reference',
                        _ref: recipe.image.asset._id,
                    }
                };
            }

            // Ingen gammal bild? Kanske returnera null eller en placeholder
            return null;
        }

        try {
            const asset = await client.assets.upload('image', newImageFile);
            return {
                _type: 'image',
                asset: {
                    _type: 'reference',
                    _ref: asset._id,
                }
            };
        } catch (err) {
            console.error("Bilduppladdning misslyckades", err);
            alert("Kunde inte ladda upp bilden.");
            return null;
        }
    };


    const handleSave = async () => {
        const imageObj = await handleImageUpload();
        if (!imageObj) {
            alert("Kunde inte spara recept utan bild.");
            return;
        }

        client.patch(recipe._id)
            .set({
                title,
                description,
                timeToCook,
                portions,
                ingredients,
                instructions,
                image: imageObj,
                categories: updatedCategories
            })
            .commit()
            .then(() => {
                console.log("Ändringar sparade!");
                navigate(`/JS3-exam/recipes/${recipe._id}`);
            })
            .catch((err) => {
                console.error(err);
                alert("Fel vid sparande.");
            });
    };

    if (!recipe) return <h3>Laddar...</h3>;

    return (
        <main className="recipeMain">
            <h1>Redigera recept</h1>

            <label>Titel</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />

            <label>Beskrivning</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} />

            <label>Bild</label>
            <img src={imageUrl} alt="Receptbild" className="recipeImg" />
            <input
                type="file"
                onChange={(e) => {
                    const file = e.target.files[0];
                    setNewImageFile(file);
                    if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                            setImageUrl(reader.result);
                        };
                        reader.readAsDataURL(file);
                    }
                }}
            />

            <label>Kategorier</label>
            <ul className="categories">
                {allCategories.map((category) => (
                    <li key={category._id}>
                        <label>
                            <input
                                type="checkbox"
                                checked={selectedCategoryTitles.includes(category.title)}
                                onChange={() => handleCategoryToggle(category.title)}
                            />
                            {category.title}
                        </label>
                    </li>
                ))}
            </ul>

            <div className='detailsContainer'>
                <label>Tid (min)</label>
                <input type="number" value={timeToCook} onChange={(e) => setTimeToCook(parseInt(e.target.value))} />

                <label>Portioner</label>
                <input type="number" value={portions} onChange={(e) => setPortions(parseInt(e.target.value))} />
            </div>

            <section className='listContainer'>
                <div className="ingredientContainer">
                    <h3>Ingredienser</h3>
                    <ul>
                        {ingredients.map((ingredient, index) => (
                            <li key={index}>
                                <input
                                    type="text"
                                    value={ingredient}
                                    onChange={(e) => {
                                        const updated = [...ingredients];
                                        updated[index] = e.target.value;
                                        setIngredients(updated);
                                    }}
                                />
                                <button onClick={() => handleRemoveIngredient(index)}>❌</button>
                            </li>
                        ))}
                    </ul>

                    <input
                        type="text"
                        placeholder="Ny ingrediens"
                        value={newIngredient}
                        onChange={(e) => setNewIngredient(e.target.value)}
                    />
                    <button onClick={handleAddIngredient}>➕ Lägg till</button>
                </div>


                <div className="instructionsContainer">
                    <h3>Instruktioner</h3>
                    <ul>
                        {instructions.map((instruction, index) => (
                            <li key={index}>
                                <input
                                    type="text"
                                    value={instruction}
                                    onChange={(e) => {
                                        const updated = [...instructions];
                                        updated[index] = e.target.value;
                                        setInstructions(updated);
                                    }}
                                />
                                <button onClick={() => handleRemoveInstruction(index)}>❌</button>
                            </li>
                        ))}
                    </ul>

                    <input
                        type="text"
                        placeholder="Ny instruktion"
                        value={newInstruction}
                        onChange={(e) => setNewinstruction(e.target.value)}
                    />
                    <button onClick={handleAddInstruction}>➕ Lägg till</button>
                </div>
            </section>

            <button onClick={handleSave} className="saveBtn">💾 Spara ändringar</button>
        </main>
    );
};
