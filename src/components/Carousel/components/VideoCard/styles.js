import styled from 'styled-components';

const VideoCardContainer = styled.button`
  border: 2px solid;
  border-radius: 4px;
  text-decoration: none;
  cursor: pointer;
  color: white;
  flex: 0 0 298px;
  width: 298px;
  min-height: 197px;
  background-image: ${({ url }) => `url(${url})`};
  background-size: cover;
  background-position: center;
  border-radius: 10px;
  position: relative;
  display: flex;
  align-items: flex-end;
  margin-top: 32px;
  padding: 16px;
  opacity: .8;

  transition: opacity .3s;
  &:hover,
  &:focus {
    opacity:1;
    width: 350px;
	height: 250px;
	
	transform: translateY(-26px);
  }
  
  &:not(:first-child) {
    margin-left: 20px;
  }
`;

export default VideoCardContainer;
