import { useState } from "react";
import { Link } from "react-router-dom";

function Register({ onRegister }) {
  const [fullName, setFullName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [phone, setPhone] = useState("");
  const [profilePicture, setProfilePicture] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const userData = {
      fullName,
      birthDate,
      phone,
      profilePicture,
    };
    onRegister(userData);
  }

  return (
    <div className="auth__wrapper">
      <h3 className="auth__title">Sign up</h3>
      <form className="auth__form" onSubmit={handleSubmit}>
        <p>
        <label>
          Full Name
          </label>
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
        <p>
        <label>
          Birth Date
          </label>
        <input
          type="date"
          name="date"
          className="auth__input"
          id="auth__birthdate"
          value={birthDate || ""}
          onChange={(e) => setBirthDate(e.target.value)}
          minLength="2"
          maxLength="30"
          required
        />
        </p>
        <p>
        <label>
          Phone
          </label>
        <input
          type="phone"
          name="phone"
          className="auth__input"
          id="auth__phone"
          value={phone || ""}
          onChange={(e) => setPhone(e.target.value)}
          minLength="2"
          maxLength="30"
          required
        />
        </p>
        <p>
        <label>
        Picture
        </label>
        <input
          type="picture"
          name="picture"
          className="auth__input"
          id="auth__picture"
          value={profilePicture || ""}
          onChange={(e) => setProfilePicture(e.target.value)}
          minLength="2"
          maxLength="50"
          required
        />
        </p>
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
