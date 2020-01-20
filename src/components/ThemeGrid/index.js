import styled from 'styled-components';

const ThemeGrid = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 4.8rem;
  grid-row-gap: 4.8rem;
  @media screen and (max-width: 700px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

export default ThemeGrid;