import "./SortDropDown.css";
const SortDropdown = ({ sortOrder, setSortOrder }) => {
  //Tar emot sortOrder och setSortOrder som props
  return (
    <div className="sort-dropdown">
      <label htmlFor="sort-select"></label>

      <select
        id="sort-select"
        value={sortOrder} //Sätter värdet på select till det aktuella sortOrder
        onChange={(e) => setSortOrder(e.target.value)} //Anropar setSortOrder med det valda värdet
      >
        <option value="placeholder" disabled> 
          Sortera efter
        </option>
        <option value="alfaAToZ">Alfabetisk ordning (A - Ö)</option>
        <option value="alfaZToA">Alfabetisk ordning (Ö - A)</option>
        <option value="highest">Högst betyg</option>
        <option value="lowest">Lägst betyg</option>
        <option value="timeCookingLong">Längst tillagningstid</option>
        <option value="timeCookingShort">Kortast tillagningstid</option>
      </select>
    </div>
  );
};

export default SortDropdown;
