import React from "react";
import trush from "../../images/trash_icon.svg"
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Main({ onDelete
 
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
              <td><img className="persons_locations-delete" src={trush} alt="icon of trush bin" onDelete={onDelete}/></td>
            </tr>
        </table>
        </div>
      </section>
    </main>
  );
}

export default Main;
