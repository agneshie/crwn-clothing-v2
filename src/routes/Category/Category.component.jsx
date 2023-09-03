import { useContext, useEffect, useState, Fragment } from "react";

import { useParams } from "react-router-dom";

import { CategoriesContext } from "../../contexts/Categories.context";

import ProductCard from "../../components/ProductCard/ProductCard.component";

import { CategoryTitle, CategoryContainer } from "./Category.styles";


const Category = () => {
  const { category } = useParams();
  const { categoriesMap } = useContext(CategoriesContext);
  const [ products, setProducts ] = useState(categoriesMap[category]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [ category, categoriesMap ]);

  return(
    <Fragment>
      <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
      <CategoryContainer>
        {
          products && products.map((product) => {
            return(
              <ProductCard key={product.id} product={product} />
            )
          })
        }
      </CategoryContainer>
    </Fragment>
  );
}

export default Category;