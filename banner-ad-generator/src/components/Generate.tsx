// Import React and necessary libraries
import React, { useState } from 'react';
import openAi from 'openai'; 
import * as Styled from './Components_style'; 
import { SketchPicker } from 'react-color'; 
import { StyledSketchPicker } from './Components_style'; 

// Create an instance of the openai object with API key
const openai = new openAi({
  apiKey: "API-Key",
  dangerouslyAllowBrowser: true
});

// Define the properties for the Answer component
interface AnswerProps {
  answer: string;
  imageUrl?: string;
  ctaText?: string;
  textColor: string;
  ctaColor: string;
}

// Answer component receives answer, imageUrl, ctaText, and dimensions as props
const Answer: React.FC<AnswerProps & { dimensions: { width: string; height: string } }> = ({ answer, imageUrl, ctaText, dimensions, textColor, ctaColor }) => {
  // Clean up answer and ctatext by trimming and removing trailing dots
  const cleanedAnswer = answer.trim().replace(/\.+$/, '');
  const cleanedCtaText = ctaText ? ctaText.trim().replace(/\.+$/, '') : '';

  return (
    <Styled.StyledAnswerContainer style={dimensions}>
      {imageUrl && <Styled.StyledImage src={imageUrl} alt="Generated Image" />}
      <Styled.StyledTitle color={textColor}>{cleanedAnswer}</Styled.StyledTitle>
      <Styled.StyledButton color={ctaColor}>{cleanedCtaText}</Styled.StyledButton>
    </Styled.StyledAnswerContainer>
  );
};

// Main component
const App = () => {
  // State variables 
  const [prompt, setPrompt] = useState('');
  const [generatedAnswer, setGeneratedAnswer] = useState('');
  const [generatedImageUrl, setGeneratedImageUrl] = useState('');
  const [generatedCtaText, setGeneratedCtaText] = useState('');
  const [editedText, setEditedText] = useState('');
  const [editedCtaText, setEditedCtaText] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('Instagram');
  const [loading, setLoading] = useState(false);

  // Color for the elements
  const [textColor, setTextColor] = useState<string>('#000000');
  const [ctaColor, setCtaColor] = useState<string>('#3498db');

  // Color
  const handleTextColorChange = (color: { hex: string }) => {
    setTextColor(color.hex);
  };
  
  const handleCtaColorChange = (color: { hex: string }) => {
    setCtaColor(color.hex);
  };

  // Function to handle the generation of answer, image, and CTA text
  const handleGenerateAnswer = async () => {
    try {
      setLoading(true);

      // Check if prompt is not empty
      if (prompt.trim() !== '') {
        // Use OpenAI API to generate text answer
        const responseText = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: `Generate a short and explicit title made of from one to 4 word, that is the name of the ad based on the prompt: ${prompt} without double quotes` },
          ],
          temperature: 0.8,
          max_tokens: 50,
          top_p: 1,
        });

        // Process and set the generated text answer
        if (
          responseText &&
          responseText.choices &&
          responseText.choices[0] &&
          responseText.choices[0].message &&
          responseText.choices[0].message.content
        ) {
          const generatedText = responseText.choices[0].message.content.trim();
          setGeneratedAnswer(generatedText);
        } else {
          console.error('Error generating text answer');
        }

        // Use opeai API to generate the image
        const responseImage = await openai.images.generate({
          prompt: `Generate a realistic image that visually represents the theme "${prompt}". Avoid including any text in the image. Focus on specific details related to the prompt, making it authentic and truthfulm`,
          n: 1,
          size: getImageSize(selectedTemplate) || undefined,
        });

        // Process and set the generated image URL
        if (
          responseImage &&
          responseImage.data &&
          responseImage.data[0] &&
          responseImage.data[0].url
        ) {
          const generatedImageUrl = responseImage.data[0].url;
          setGeneratedImageUrl(generatedImageUrl);
        } else {
          console.error('Error generating image');
        }

        // Use Openai API to generate CTA text
        const responseCtaText = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: `Generate a Call to Action within 3 words: ${prompt}  without double quotes` },
          ],
          temperature: 0.2,
          max_tokens: 50,
          top_p: 1,
        });

        // Process and set the generated CTA text
        if (
          responseCtaText &&
          responseCtaText.choices &&
          responseCtaText.choices[0] &&
          responseCtaText.choices[0].message &&
          responseCtaText.choices[0].message.content
        ) {
          const generatedCtaText = responseCtaText.choices[0].message.content.trim();
          setGeneratedCtaText(generatedCtaText);
        } else {
          console.error('Error generating CTA text');
        }
      } else {
        console.error('Error generating answer: Prompt is empty');
      }
    } catch (error) {
      console.error('Error generating answer:', (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  // Function to get image size based on the selected template
  const getImageSize = (template: string): "256x256" | "512x512" | "1024x1024" | null => {
    switch (template) {
      case 'Instagram':
        return '256x256';
      case 'Twitter':
        return '512x512';
      case 'Story':
        return '1024x1024';
      default:
        return null;
    }
  };

  // Function to get dimensions for images based on the selected template
  const getDimensions = (template: string) => {
    switch (template) {
      case 'Instagram':
        return { width: '400px', height: '550px' };
      case 'Twitter':
        return { width: '700px', height: '250' };
      case 'Story':
        return { width: '420px', height: '550px' };
      default:
        return { width: '500px', height: '500px' };
    }
  };

  // Function to manually update generated content
  const handleManualUpdate = () => {
    setGeneratedAnswer(editedText);
    setGeneratedCtaText(editedCtaText);
  };

  // Render the main application
  return (
    <Styled.Container>
      <Styled.AppContainer>
        <Styled.LeftColumn>
          {loading ? (
            <Styled.LoadingImage src="/loding.gif"/>
          ) : (
            generatedAnswer && (
            <Answer
              answer={generatedAnswer}
              imageUrl={generatedImageUrl}
              ctaText={generatedCtaText}
              dimensions={getDimensions(selectedTemplate)}
              textColor={textColor}
              ctaColor={ctaColor}
            />
            )
          )}
        </Styled.LeftColumn>
        <Styled.RightColumn>
          <Styled.PromptContainer>
            <Styled.PromptInput
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter your prompt"
            />
            <Styled.TemplateSelect
              value={selectedTemplate}
              onChange={(e) => setSelectedTemplate(e.target.value)}
            >
              <option value="Instagram">Instagram Post</option>
              <option value="Twitter">Twitter Header</option>
              <option value="Story">Story</option>
            </Styled.TemplateSelect>
            <Styled.ColorPickersContainer>
              <Styled.ColorPickerSection>
                <label>Text Color</label>
                <Styled.StyledSketchPicker color={textColor} onChange={handleTextColorChange} />
              </Styled.ColorPickerSection>
              <Styled.ColorPickerSection>
                <label>CTA Button Color</label>
                <StyledSketchPicker color={ctaColor} onChange={handleCtaColorChange} />
              </Styled.ColorPickerSection>
            </Styled.ColorPickersContainer>
            <Styled.GenerateButton onClick={handleGenerateAnswer}>Generate Answer</Styled.GenerateButton>
          </Styled.PromptContainer>
          <Styled.ManualEditContainer>
            <label>Edit Text</label>
            <input
              type="text"
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
            />
            <label>Edit CTA Text</label>
            <input
              type="text"
              value={editedCtaText}
              onChange={(e) => setEditedCtaText(e.target.value)}
            />
            <button onClick={handleManualUpdate}>Apply Changes</button>
          </Styled.ManualEditContainer>
        </Styled.RightColumn>
      </Styled.AppContainer>
    </Styled.Container>
  );
};

export default App;
