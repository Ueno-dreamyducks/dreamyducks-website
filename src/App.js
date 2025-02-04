import './App.css';
import './themeColor.css';
import githubIcon from './images/github-mark.svg';

function App() {
  return (
    <div className="App">
      <div className='Top-banner'>
        <h1>dreamyducks</h1>
      </div>
      <div className='Top-banner-links'>
        <div className='top-banner-link-container' onClick={() => { window.location.href = 'https://github.com/Ueno-dreamyducks'; }}>
          <div style={{display: "flex", widows: "100%"}} className='padding-horizontal-16'>
            <img src={githubIcon} alt='Github icon' style={{objectFit: "contain"}} />
            <div>
              <h1>Visit our Github</h1>
              <p>View our open codes</p>
            </div>
          </div>

        </div>
      </div>
      <header className="App-header">

      </header>
      <div className='Homepage'>
        <div className='padding-16'>
          <h1 className='no-margin'>aa</h1>
        </div>
      </div>
    </div>
  );
}

export default App;
