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
        <option id="op1" value="alfaAToZ">Alfabetisk ordning (A - Ö)</option>
        <option id="op2" value="alfaZToA">Alfabetisk ordning (Ö - A)</option>
        <option id="op3" value="highest">Högst betyg</option>
        <option id="op4" value="lowest">Lägst betyg</option>
        <option id="op5" value="timeCookingLong">Längst tillagningstid</option>
        <option id="op6" value="timeCookingShort">Kortast tillagningstid</option>
      </select>
    </div>
  );
};

export default SortDropdown;
