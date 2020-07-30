import React from 'react';
import SlickSlider from 'react-slick';
import styled from 'styled-components';

function SampleArrow(props) {
  const {
    className, style, onClickHandler, categoryColor,
  } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', background: categoryColor }}
      onClick={onClickHandler}
    />
  );
}

const Container = styled.ul`
padding: 0;
margin: 0;
.slick-prev,
.slick-next {
    z-index: 50;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 30px;
    height: 30px;
    transform: initial;
    padding-top:2px;

    &:before {
        font-size: 30px;
    }
}

    .slick-prev{
        left:0;
    }

    .slick-next{
        right:16px;
    }

    .slick-list{
        overflow:inherit;
    }

`;

export const SliderItem = styled.li`
margin-right: 16px;
img {
    margin: 16px;
    width:298px;
    height:197px;
    object-fit: cover;
}
`;

const Slider = ({ categoryColor, children }) => (
  <Container>
    <SlickSlider {...{
      dots: false,
      infinite: true,
      speed: 300,
      variableWidth: true,
      adaptiveHeight: true,
      centerMode: true,
      nextArrow: <SampleArrow categoryColor={categoryColor} />,
      prevArrow: <SampleArrow categoryColor={categoryColor} />,
    }}
    >
      {children}
    </SlickSlider>

  </Container>
);

export default Slider;
