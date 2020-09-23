import React from 'react';
import styled from 'styled-components';
import CategoryTag from '../CategoryTag';

const TagContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	padding: 0.5rem 1rem 1rem;
`;

const CategoryContainer = (props) => {
	
	return (
		<TagContainer>
			<CategoryTag key={category.name} />
		</TagContainer>
	)
}

export default CategoryContainer;