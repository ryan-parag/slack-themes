import styled from 'styled-components';

export const ContainerItem = styled.div`
  padding: 0 2.4rem;
  @media screen and (max-width: 992px) {
    padding: 0 1.6rem;
  }
`;

export const ContainerItemSmall = styled(ContainerItem)`
  width: 40%;
  position: sticky;
  top: 8vh;
  @media screen and (max-width: 992px) {
    width: 100%;
    position: relative;
    top: auto;
    margin-bottom: 4rem;
  }
`;

export const ContainerItemLarge = styled(ContainerItem)`
  width: 60%;
  @media screen and (max-width: 992px) {
    width: 100%;
  }
`;