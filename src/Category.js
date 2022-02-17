import react, { useState } from "react";

const Categories = ({ categories }) => {
  const [value, setValue] = useState(0);
  return (
    <div className="categories">
      {categories.map((category, index) => {
        return (
          <button key={index}
            onClick={() => setValue(index)}
            className={`category ${index === value && "active"}`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
};

export default Categories;
