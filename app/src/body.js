import logo from './logo.png';
import profile_logo from './profile_logo.png'
import './main.css';
import Intro from './introducing';
import Inside from './inside';

var isLogin = false;

function App() {
  return (
    <>
      <div className='main'>
        <header className="main_header">
          <div className='logo-main'>
            <img className="logo" src={logo} alt="logo" />
          </div>

          {isLogin ?
            <div className="profile_logo">
              <img className="profile_icon" src={profile_logo} alt="profile" />
            </div> :
            <div className='header-ask'>
              <div className='header-login'>
                Login
              </div>
              <div className='header-signup'>
                Sign UP
              </div>
            </div>
          }
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
