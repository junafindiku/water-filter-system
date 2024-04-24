import "../css/Login.css";
import waterIcon from "../images/water.png"
export default function Login(){

  const togglePassVisibility = () => {
    let pass = document.getElementById("password");
    if(pass.type === 'password'){
      pass.type = "text";
    }else{
      pass.type = "password";
    }
  }
  return (
    <div className="login-container">
      <div className="login">
        <div className="sub-login">
          <div className="login-welcome">
            <div className="aqua-co flex flex-row justify-center items-center pb-12">
              <img src={waterIcon} alt="water-icon"/>
              <p className="text-white font-bold text-center">Aqua.Co</p>
            </div>
            <div className="horizontal-line">
            </div>
            <p className="text-lg text-white font-light">Welcome back!</p>
          </div>
        </div>
        <div className="login-form">
        <div className="login-elements gap-y-5 flex flex-col justify-center">
        <p className="text-lg font-bold">Log in</p>

          <input type="text" placeholder="Phone Number or Email"/>
          <input type="password" placeholder="Password" id="password"/>
          <div className="flex flex-row items-center">
          <input type="checkbox" onClick={togglePassVisibility}/>
          <p>Show password</p>
          </div>
          <button className="login-btn">Login</button>
        </div>
        </div>
      </div>
    </div>
  )
}