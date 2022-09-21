import "./categories.styles.scss";

const Categories = () => {
  const categories = [
    {
      id: 1,
      title: "Hats",
      imgUrl: "https://i.ibb.co/cvpntL1/hats.png",
    },
    {
      id: 1,
      title: "Jackets",
      imgUrl: "https://i.ibb.co/px2tCc3/jackets.png",
    },
    {
      id: 1,
      title: "Sneakers",
      imgUrl: "https://i.ibb.co/0jqHpnp/sneakers.png",
    },
    {
      id: 1,
      title: "Women",
      imgUrl: "https://i.ibb.co/GCCdy8t/Women.png",
    },
    {
      id: 1,
      title: "Men",
      imgUrl: "https://i.ibb.co/R70vBrQ/men.png",
    },
  ];

  return (
    <>
      <div className="categories">
        <div className="categories-container">
          {categories.map(({ title, id, imgUrl }) => (
            <div key={categories.id} className="category-container">
              <div className="background-image" style={{ backgroundImage: `url(${imgUrl})` }} />
              <div className="category-body-container">
                <h2>{title}</h2>
                <p>shop now</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Categories;
