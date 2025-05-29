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

  // this code is almost the same as the edit recipe code.
  // Fetching the category data from sanity server using the QROC syntax.
  useEffect(() => {
    client.fetch(`*[_type == 'category'] {_id, title}`).then(setAllCategories);
  }, []);

  // Handle category from server by getting data and put in new data while creating recipe.
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
  // function for the remove and also add feature of ingredient. Making it able to send new or delete inputs
  const handleRemoveIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleAddIngredient = () => {
    if (newIngredient.trim()) {
      setIngredients([...ingredients, newIngredient]);
      setNewIngredient("");
    }
  };
  // Function for Instruction for a recipe. Same as the ingredient function
  const handleAddInstruction = () => {
    if (newInstruction.trim()) {
      setInstructions([...instructions, newInstruction]);
      setNewInstruction("");
    }
  };

  const handleRemoveInstruction = (index) => {
    setInstructions(instructions.filter((_, i) => i !== index));
  };

  // Function for uploading a picture for the recipe
  const handleImageUpload = async () => {
    if (!newImageFile) return null; // If not a image then it will not show a image

    try {
      const asset = await client.assets.upload("image", newImageFile); // If it is a successful upload it connects it to the recipe data
      return {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: asset._id,
        },
      };
    } catch (err) {
      //error message return if the uplaod don't work
      console.error("Bilduppladdning misslyckades", err);
      alert("Kunde inte ladda upp bilden.");
      return null;
    }
  };

  const handleSave = async () => {
    const imageObj = await handleImageUpload();

    if (!imageObj) {
      // If user not add a mg to the recipe. An error will pop up as an alert
      alert("Kunde inte spara recept utan bild.");
      return;
    }

    try {
      // Function will add all data into recipes on sanity server.
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

      const result = await client.create(newRecipe); // saves and create the recipe
      console.log("Recept sparat!", result);
      navigate(`/JS3-exam/recipes/${result._id}`); // Recipe get a ID
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
            id="titleLabel" //For testing in cypress
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label>Beskrivning</label>
          <textarea
            id="decsriptionLabel" //For testing in cypress
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
              id="timeToCook" //Testing in cypress
              type="number"
              value={timeToCook}
              onChange={(e) => {
                const val = e.target.value;
                setTimeToCook(val === "" ? "" : parseInt(val));
              }}
            />

            <label>Portioner</label>

            <input // Input value for the cook time. Fecthing the portion function to make user be able to set new value.
              id="setPortions" //Testning i cypress
              type="number"
              value={portions}
              onChange={(e) => {
                const val = e.target.value;
                setPortions(val === "" ? "" : parseInt(val));
              }}
            />
          </div>

          {/* Returns inputs and buttons making it possible to add and remove both ingredients and instructions. */}
          <section className="listContainer">
            <div className="ingredientContainer">
              <h3>Ingredienser</h3>
              <ul>
                {ingredients.map(
                  (
                    ingredient,
                    index // Function for the input field for ingredients. Updates when user add text.
                  ) => (
                    <li key={index} id="ingredientLi">
                      <input
                        type="text"
                        value={ingredient}
                        onChange={(e) => {
                          // cbase function making it possible to hange value on input field from start value to updated one.
                          const updated = [...ingredients];
                          updated[index] = e.target.value;
                          setIngredients(updated);
                        }}
                      />
                      <button // Remove button function with onClick that handle the handleRemoveIngredient function created higher up in code.
                        className="removeButton"
                        onClick={() => handleRemoveIngredient(index)}
                      >
                        ❌
                      </button>
                    </li>
                  )
                )}
              </ul>

              <input // Handle the new ingredient input and changes the value from start value to the nes one when clicking the #addBtn.
                id="ingredientInput" //Testing i cypress
                type="text"
                placeholder="Ny ingrediens"
                value={newIngredient}
                onChange={(e) => setNewIngredient(e.target.value)}
              />
              <button id="addBtn" onClick={handleAddIngredient}>
                ➕ Lägg till
              </button>
            </div>
            {/* this section works like the add ingredient feature. */}
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
                id="doThisInput" //Testing i cypress
                type="text"
                placeholder="Ny instruktion"
                value={newInstruction}
                onChange={(e) => setNewInstruction(e.target.value)}
              />
              <button id="addDoThisBtn" onClick={handleAddInstruction}>
                ➕ Lägg till
              </button>
            </div>
          </section>
          {/* Save button that cuses the save function when being clicked */}
          <button id="saveRecipeBtn" onClick={handleSave} className="saveBtn">
            💾 Spara recept
          </button>
        </article>
      </main>
    </>
  );
};
