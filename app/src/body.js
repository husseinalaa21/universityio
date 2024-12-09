import logo from './logo.png';
import profile_logo from './profile_logo.png'
import './main.css';
import Intro from './introducing';
import Inside from './inside';

var isLogin = false;

function App() {
  return (
    <>
      <div className='note'> Lunching Soon! </div>
      <div className='main'>
        <header className="main_header">
          <img className="logo" src={logo} alt="logo" />
          <div className="profile_logo">
            <img className="profile_icon" src={profile_logo} alt="profile" />
          </div>
        </header>

        {/* THE BODY (HOME OR LOGIN OR INSIDE) */}
        <div className='body'>
          {isLogin ? <Inside /> : <Intro />}
        </div>
        {/* END THE BODY */}

        {/* END */}
        <div className='end'>
          <section className="modern-footer">
            <div className="container">
              <h2>Step Into Your Future with University IO</h2>
              <p>Take the leap today. Sign up and start your journey to success.</p>
              <a href="#signup" className="btn-primary">Sign Up</a>
              <p>&copy; 2025 University IO. All Rights Reserved.</p>
              <p>Powered by AI Tool</p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default App;
