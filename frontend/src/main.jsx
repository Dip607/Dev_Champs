import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import AppContextProvider from './context/AppContext.jsx';
import Preloader from './components/Preloader.jsx'; // Import the preloader

const Root = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate an async operation, like fetching data or loading resources
    setTimeout(() => {
      setIsLoading(false); // Set isLoading to false after some time
    }, 2000); // Adjust the time as needed (2 seconds in this example)
  }, []);

  return (
    <>
      {isLoading ? (
        <Preloader /> // Show preloader while loading
      ) : (
        <BrowserRouter>
          <AppContextProvider>
            <App />
          </AppContextProvider>
        </BrowserRouter>
      )}
    </>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<Root />);
