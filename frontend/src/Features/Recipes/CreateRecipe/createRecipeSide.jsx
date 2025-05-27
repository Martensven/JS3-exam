import client from "../../../sanityClient";
import "./createRecipeSide.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

export const CreateRecipeSide = () => {
  const navigate = useNavigate();

  const [allCategories, setAllCategories] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [timeToCook, setTimeToCook] = useState("");
  const [portions, setPortions] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const [selectedCategoryTitles, setSelectedCategoryTitles] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [newImageFile, setNewImageFile] = useState(null);
  const [newIngredient, setNewIngredient] = useState("");
  const [newInstruction, setNewInstruction] = useState("");

  useEffect(() => {
    client.fetch(`*[_type == 'category'] {_id, title}`).then(setAllCategories);
  }, []);

  const handleCategoryToggle = (title) => {
    setSelectedCategoryTitles((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  };

  const updatedCategories = selectedCategoryTitles
    .map((title) => {
      const match = allCategories.find((category) => category.title === title);
      return match
        ? {
            _key: match._id,
            _type: "reference",
            _ref: match._id,
          }
        : null;
    })
    .filter(Boolean);

  const handleRemoveIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleAddIngredient = () => {
    if (newIngredient.trim()) {
      setIngredients([...ingredients, newIngredient]);
      setNewIngredient("");
    }
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
    if (!newImageFile) return null;

    try {
      const asset = await client.assets.upload("image", newImageFile);
      return {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: asset._id,
        },
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

    try {
      const newRecipe = {
        _type: "recipe",
        title,
        description,
        timeToCook,
        portions,
        ingredients,
        instructions,
        image: imageObj,
        categories: updatedCategories,
      };

      const result = await client.create(newRecipe);
      console.log("Recept sparat!", result);
      navigate(`/JS3-exam/recipes/${result._id}`);
    } catch (err) {
      console.error(err);
      alert("Kunde inte spara recept.");
    }
  };

  return (
    <>
      <main className="createRecipeContainer">
        <section className="textContainer">
          <h1>Här kan du skapa och lägga upp ett eget recept!</h1>
          <p>Följ bara anvisningarna nedan.</p>
        </section>

        <article className="Inputfields">
          <label>Titel</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label>Beskrivning</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <label>Bild</label>
          {imageUrl && (
            <img src={imageUrl} alt="Förhandsvisning" className="recipeImg" />
          )}
          <input
            className="uploadImgContainer"
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

          <div className="detailsContainer">
            <label>Tid (min)</label>
            <input
              type="number"
              value={timeToCook}
              onChange={(e) => {
                const val = e.target.value;
                setTimeToCook(val === "" ? "" : parseInt(val))
              }}
            />

            <label>Portioner</label>

            <input
              type="number"
              value={portions}
              onChange={(e) => {
                const val = e.target.value;
                setPortions(val === "" ? "" : parseInt(val));
              }}
            />
          </div>

          <section className="listContainer">
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
                    <button
                      className="removeButton"
                      onClick={() => handleRemoveIngredient(index)}
                    >
                      ❌
                    </button>
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
                    <button
                      className="removeButton"
                      onClick={() => handleRemoveInstruction(index)}
                    >
                      ❌
                    </button>
                  </li>
                ))}
              </ul>

              <input
                type="text"
                placeholder="Ny instruktion"
                value={newInstruction}
                onChange={(e) => setNewInstruction(e.target.value)}
              />
              <button onClick={handleAddInstruction}>➕ Lägg till</button>
            </div>
          </section>

          <button onClick={handleSave} className="saveBtn">
            💾 Spara recept
          </button>
        </article>
      </main>
    </>
  );
};
