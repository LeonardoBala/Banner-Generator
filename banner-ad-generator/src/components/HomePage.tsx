// Home page
import React, { CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    // Set body overflow to hidden when the component mounts
    document.body.style.overflow = 'hidden';

    // Clean up when the component unmounts
    return () => {
      document.body.style.overflow = 'visible';
    };
  }, []);

  // Handle button click to navigate to generate page
  const handleButtonClick = () => {
    navigate('/generate');
  };

  const containerStyle: CSSProperties = {
    background: `url('/background-app.jpg')`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const buttonStyle: CSSProperties = {
    padding: '20px 40px',
    fontSize: '20px',
    borderRadius: '15px',
    color: '#fff',
    fontWeight: 'bold',
    backgroundColor: '#769FCD',
    border: 'none',
    cursor: 'pointer',
    marginBottom: '20px',
  };

  const footerStyle: CSSProperties = {
    fontSize: '16px',
    color: '#fff',
  };

  // Return
  return (
    <div style={containerStyle}>
      <button style={buttonStyle} onClick={handleButtonClick}>
        Enter
      </button>
      <div style={footerStyle}>
        Made by Leonardo Bala &copy;
      </div>
    </div>
  );
};

export default HomePage;
