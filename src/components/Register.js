import { useState } from "react";
import { Link } from "react-router-dom";

function Register({ onRegister }) {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [profilePicture, setProfilePicture] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const userData = {
      fullName,
      phone,
      profilePicture,
    };
    onRegister(userData);
  }

  return (
    <div className="auth__wrapper">
      <h3 className="auth__title">Sign up</h3>
      <form className="auth__form" onSubmit={handleSubmit}>
        <input
          type="name"
          name="name"
          className="auth__input"
          id="auth__name"
          value={fullName || ""}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="FullName"
          required
        />
        <input
          type="phone"
          name="phone"
          className="auth__input"
          id="auth__phone"
          value={phone || ""}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone"
          minLength="2"
          maxLength="30"
          required
        />
         <input
          type="picture"
          name="picture"
          className="auth__input"
          id="auth__picture"
          value={picture || ""}
          onChange={(e) => setProfilePicture(e.target.value)}
          placeholder="Picture"
          minLength="2"
          maxLength="50"
          required
        />
        <button className="auth__button" type="submit">
          Sign up
        </button>
        <Link className="auth__link" to="/signin">
          Already a member? Log in here!
        </Link>
      </form>
    </div>
  );
}

export default Register;
