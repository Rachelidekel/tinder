import { useState } from "react";
import { Link } from "react-router-dom";

function Login({ onLogIn, getLocation }) {
  const [fullName, setFullName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [phone, setPhone] = useState("");
  const [profilePicture, setProfilePicture] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const userData = {
      fullName,
    };
    onLogIn(userData);
    setBirthDate(true);
    setPhone(true);
    setProfilePicture(true);
    getLocation();
  }

  return (
    <div className="auth__wrapper">
      <h3 className="auth__title">Log in</h3>
      <form className="auth__form" onSubmit={handleSubmit}>
        <p>
          <label>Full Name</label>
          <input
            type="name"
            name="name"
            className="auth__input"
            id="auth__name"
            value={fullName || ""}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </p>

        <button className="auth__button" type="submit">
          Log in
        </button>
        <Link className="auth__link" to="/signup">
          Not a member yet? Sign up here!
        </Link>
      </form>
    </div>
  );
}

export default Login;
