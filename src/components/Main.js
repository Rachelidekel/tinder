import userEvent from "@testing-library/user-event";
import React from "react";
//import pen from "../images/Vector_pen.svg";
//import plus from "../images/Vector_plus.svg";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Main({
 
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="persons__locations">
        <div className="persons__locations-filter" >
          <table className="persons__locations-table">
          <tr>
            <tr>Name</tr>
            <tr>BirthDate</tr>
            <tr>Phone</tr>
            <tr>picture</tr>
            <tr>Distance</tr>
            </tr> 
            <tr>
              <td>{currentUser.fullName}</td>
              <td>{currentUser.birthDate}</td>
              <td>{currentUser.phone}</td>
              <td>{currentUser.profilePicture}</td>
              <td>{currentUser.location}</td>
            </tr>
        </table>
        </div>
      </section>
    </main>
  );
}

export default Main;
