import styled  from "styled-components";


export const CategoryTitle = styled.h2`
  font-size: 38px;
  margin-bottom: 25px;
  text-align: center;
`;

export const CategoryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 400px));
  column-gap: 20px;
  row-gap: 50px;
  justify-content: center;
`;
