import styled from 'styled-components';

const ThemeGrid = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 8rem;
  grid-row-gap: 8rem;
  @media screen and (max-width: 700px) {
    grid-template-columns: 1fr;
    grid-row-gap: 4rem;
  }
`;

export default ThemeGrid;