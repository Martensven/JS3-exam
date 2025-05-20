import "./categories.css";
import { useState } from "react";
import { useEffect } from "react";
import client from "../../sanityClient.js";
import { Link } from "react-router-dom";

export const Categories = () => { //
  const [categories, setCategories] = useState([]); // State to hold categories

  useEffect(() => { // Fetch categories from Sanity on component mount
    const fetchCategories = async () => { 
      const query = `*[_type == "category"]{title}`; // Sanity query to fetch categories
      const fetchedCategories = await client.fetch(query); // Execute the query
      setCategories(fetchedCategories); // Update state with fetched categories
    };
    fetchCategories(); // Call the fetch function
  }, []); // Empty dependency array means this runs once on mount
  console.log(categories); // Log categories to console for debugging

  return (
    <main className="categoriesContainer"> 
      <section className="grid-container">
        {categories.map((category, index) => ( // Map over categories to create links
          <Link
            to={`/category/${encodeURIComponent(category.title)}`} // Create a link for each category
            key={index}
            className="grid-item"
          >
            {category.title}
          </Link>
        ))}
      </section>
    </main>
  );
};

export default Categories;
