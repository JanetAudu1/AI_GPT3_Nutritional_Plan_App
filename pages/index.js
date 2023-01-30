import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';

const Home = () => {
  const [userInputCondition, setUserInputCondition] = useState('');
  const [userInputCuisine, setUserInputCuisine] = useState('');
  const [apiOutput, setApiOutput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);

    console.log("Calling OpenApi...");
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({ userInputCondition, userInputCuisine }),
    });

    const data = await response.json();
    const { output } = data;
    console.log("OpenApi replied...", output.text)

    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  }

  const onUserConditionChanged = (event) => {
    console.log(event.target.value);
    setUserInputCondition(event.target.value);
  };
  const onUserCuisineChanged = (event) => {
      console.log(event.target.value);
      setUserInputCuisine(event.target.value);
  };

  return (
    <div className="root">
      <Head>
        <title>AI Nutritional Plan App</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>World's Best Nutritional Plan</h1>
          </div>
          <div className="header-subtitle">
            <h2>Powered by GPT3</h2>
          </div>
        </div>
        <div className="prompt-container">
          <textarea
            className='prompt-box'
            placeholder='type medical Condition...'
            value={userInputCondition}
            onChange={onUserConditionChanged}
          />
 	    <input type="text"

             className='prompt-box'
              placeholder='type Cuisine..'
              value={userInputCuisine}
              onChange={onUserCuisineChanged}
            />


          <div className="prompt-buttons">
            <a 
            className={isGenerating ? 'generate-button loading' : 'generate-button'} 
            onClick={callGenerateEndpoint}>
              <div className="generate">
                {isGenerating ? <span className="loader"></span> : <p>Generate</p>}
              </div>
            </a>
          </div>

          {apiOutput && (
            <div className="output">
              <div className="output-header-container">
                <div className="output-header">
                  <h3>Output</h3>
                </div>
              </div>
              <div className="output-content">
                <p>{apiOutput}</p>
                </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};

export default Home;
