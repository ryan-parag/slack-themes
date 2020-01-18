import styled from 'styled-components';

// Flexbox container
const Container = styled.div`
    width: 100%;
    max-width: 1440px;
    margin: auto;
    padding: 8vh 1.6rem 10rem;
    display: flex;
	align-items: flex-start;
	@media screen and (max-width: 992px) {
	    flex-direction: column;
	}
`;

export default Container;
