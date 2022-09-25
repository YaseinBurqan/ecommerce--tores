import "./directory.styles.scss";
import Categories from "../categories/category-item.component";

const Directory = ({ categories }) => {
  return (
    <div className="directory-container">
      {categories.map((category) => (
        <Categories key={category.id} category={category} />
      ))}
    </div>
  );
};

export default Directory;
