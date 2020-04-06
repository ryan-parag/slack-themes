import styled from 'styled-components';
import theme from '../../theme';

// Button with ripple animation
const Button = styled.button`
    background: ${props => props.bg ? props.bg : 'transparent'};
    border: 1px solid currentColor;
    color: ${props => props.color ? props.color : theme.neutral.grey3};
    border-radius: 0.4rem;
    padding: 0.8rem 1.6rem;
    cursor: pointer;
    box-shadow: 0px 2px 4px 1px rgba(0,0,0, .14);
    text-align: center;
    display: inline-block;
    font-size: 1.6rem;
    -webkit-appearance: none;
    -moz-appearance: none;
    transition: all 120ms ease-out 0s;
    &:hover {
        background: ${({ theme }) => theme.hoverBg};
		color: ${({ theme }) => theme.hoverText};
		box-shadow: 0px 8px 10px 1px rgba(0,0,0, .14), 0px 3px 14px 2px rgba(0,0,0, .12);
    }

    &:active {
        transform: scale(.97);
		box-shadow: 0;
		background: ${theme.neutral.grey8};
    }
`;

export const ButtonBlock = styled(Button)`
    display: block;
    width: 100%;
`;

export default Button;
