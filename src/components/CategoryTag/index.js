import React from 'react';
import styled from 'styled-components';

const Tag = styled.div`
  background: ${({ theme }) => theme.subtle};
  border: 
  border-radius: 0.5rem;
  display: inline-block;
  font-size: 0.95rem;
  padding: 0.5rem 1rem;
`;

const CategoryTag = (props) => {
	const category = props.category
	const categoryName = category.name

	return (
		<div key={categoryName}>
			<Tag>{categoryName}</Tag>
		</div>
	);
};

export default CategoryTag;