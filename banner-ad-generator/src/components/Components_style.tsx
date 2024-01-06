// Styled-Components used for the add banner generator
import styled from 'styled-components';
import { SketchPicker } from 'react-color';

// Main container
export const Container = styled.div`
  background: url('/background-app.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-text: center;
  height: 100vh;
`;

// App container
export const AppContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  align-text: center;
`;

// Left and Right columns
export const LeftColumn = styled.div`
  width:50%;

`;

export const RightColumn = styled.div` 
  width 50%;
  margin: auto;
  display: block;
`;

// Loading image
export const LoadingImage = styled.img`
  width: 200px;
  height: 200px;
  margin: auto;
  display: block;
`;

// Styles for the prompt
export const PromptContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #769fcd;
  margin-top: 20px;
`;

// Input prompt
export const PromptInput = styled.input`
  background: #d6e6f2;
  color: #769fcd;
  width: 300px;
  height: 40px;
  font-size: 16px;
  padding: 8px;
  margin-bottom: 10px;
  border-radius: 15px;
  border: 1px solid #769fcd;
`;

// Template selector
export const TemplateSelect = styled.select`
  background: #d6e6f2;
  color: #769fcd;
  width: 150px;
  height: 40px;
  font-size: 16px;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #769fcd;
  border-radius: 15px;
`;

// Color picker styles
export const ColorPickersContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  margin-top: 10px;
`;

export const ColorPickerSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  label {
    margin-bottom: 5px;
  }
`;

export const StyledSketchPicker = styled(SketchPicker)`
  .sketch-picker {
    width: 90% !important; 
  }
`;

// Generate button
export const GenerateButton = styled.button`
  background: #d6e6f2;
  color: #769fcd;
  border-radius: 15px;
  padding: 10px 15px;
  cursor: pointer;
  border: 1px solid #769fcd;
  margin-top: 10px;
`;

// Manual editor for the text
export const ManualEditContainer = styled.div`
  margin-top: 20px;
  padding: 10px;
  color: #769fcd;
  text-align: center;

  label {
    display: block;
    text-align: center;
    margin-bottom: 5px;
  }

  input {
    margin-bottom: 10px;
    width: 100%;
    border: 1px solid #769fcd;
    border-radius: 8px;
  }

  button {
    background: #d6e6f2;
    color: #769FCD;
    padding: 8px 12px;
    cursor: pointer;
    border: 1px solid #769fcd;
    border-radius: 15px;
  }
`;

// Styles used for answer
// Container
export const StyledAnswerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  text-align: center;
  width: 100%; 
  border: 1px solid #ccc;
  height: auto;
  margin: auto;
  border-radius: 8px;
`;

// Title
export const StyledTitle = styled.p`
  font-size: 25px;
  text-align: center;
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  color: ${(props) => props.color || 'black'};
`;

// Image
export const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: relative;
  border-radius: 8px;
`;

// Cta button
export const StyledButton = styled.button`
  width: 150px;
  height: 50px;
  background-color: white;
  color: ${(props) => props.color || 'black'};
  position: absolute;
  bottom: 10%;
  left: 50%;
  border-radius: 25px;
  transform: translateX(-50%);
  font-size: 15px;
`;

