import "./createRecipeSide.css";
import { useState } from "react";

export const CreateRecipeSide = () => {
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

    return (
        <>
        <main>
            <section>
                <h1>Här kan du skapa och lägga upp ett eget recept!</h1>
                <p>Följ bara anvisningarna nedan.</p>
            </section>
        </main>
           
        </>
    )
}