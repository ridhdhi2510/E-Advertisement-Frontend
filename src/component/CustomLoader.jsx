import React from "react";
import styled from "styled-components";

const CustomLoader = () => {
    return (
        <StyledWrapper>
            <div className="loading-wave">
                <div className="loading-bar" />
                <div className="loading-bar" />
                <div className="loading-bar" />
                <div className="loading-bar" />
            </div>
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.3); /* 🔹 Semi-transparent overlay */
  backdrop-filter: blur(5px); /* 🔹 Blur effect */
  z-index: 9999; /* Keeps loader on top */

  .loading-wave {
    width: 150px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: flex-end;
  }

  .loading-bar {
    width: 10px;
    height: 5px;
    margin: 0 3px;
    background-color: #3498db;
    border-radius: 3px;
    animation: loading-wave-animation 1s ease-in-out infinite;
  }

  .loading-bar:nth-child(2) {
    animation-delay: 0.1s;
  }

  .loading-bar:nth-child(3) {
    animation-delay: 0.2s;
  }

  .loading-bar:nth-child(4) {
    animation-delay: 0.3s;
  }

  @keyframes loading-wave-animation {
    0% {
      height: 5px;
    }
    50% {
      height: 25px;
    }
    100% {
      height: 5px;
    }
  }
`;

export default CustomLoader;