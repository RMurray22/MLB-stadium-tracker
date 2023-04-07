const favoriteTeam = document.getElementById("favorite-team");
const stadiumsEl = document.getElementById("stadium-container");
const id = favoriteTeam.getAttribute("data-userID");
const getUserGames = async () => {
  try{
    const response = await fetch(`../../api/games/${id}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      },          
    });
  } catch(err) {
    console.error(err);
  }
}
const userGames = getUserGames();


const newFormHandler = async (event) => {
    event.preventDefault();
  
    if (favoriteTeam) {

      const favorite_team = favoriteTeam.value;
      const response = await fetch(`../../api/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ favorite_team }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to update profile');
      }
    }
  };

  const stadiumSelectHandler = async (event) => {
    event.preventDefault();
    const element = event.target;
    if (element.matches(".btn")) {
      const stadiumID = element.getAttribute("id");
      const selected = element.getAttribute("data-selected");
      if(selected == "true"){
        // switch to not selected, remove from game table
        element.setAttribute("data-selected", "false");
        element.setAttribute("class", "btn btn-light");
        const response = await fetch(`../../api/games/${id}`, {
          method: 'DELETE',
          body: JSON.stringify({ stadiumID }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
      } else {
        // switch to selected, add to game table
        element.setAttribute("data-selected", "true");
        element.setAttribute("class", "btn btn-dark");
        const response = await fetch(`../../api/games/${id}`, {
          method: 'POST',
          body: JSON.stringify({ stadiumID }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }
    }
  }

  
window.onload = async function() {
  let favoriteSel = document.getElementById("favorite-team");
  console.log(favoriteSel);
  fetch("../../api/teams")
    .then((response) => response.json())
    .then((data) => { 
      for (let x in data) {
        favoriteSel.options[favoriteSel.options.length] = new Option(`${data[x].location} ${data[x].name}`, data[x].id);
      }
    }).then(fetch("../../api/stadiums")
    .then((response) => response.json())
    .then((data) => {
      for (let stadium in data) {
        let newButton = document.createElement("button");
        newButton.setAttribute("class", "btn btn-light");
        newButton.setAttribute("id", data[stadium].id);
        for (let i in userGames) {
          if( userGames[i].stadium == data[stadium].id) {
            newButton.setAttribute("data-selected", "true");
            break;
          }
          newButton.setAttribute("data-selected", "false");
        }        
        newButton.textContent = `${data[stadium].name} : ${data[stadium].city}, ${data[stadium].state}`
        stadiumsEl.append(newButton);
        stadiumsEl.append(document.createElement("br"));
      }
    }));
    document
    .querySelector('.update-profile-form')
    .addEventListener('submit', newFormHandler);

    document
    .querySelector('#stadium-container')
    .addEventListener("click", stadiumSelectHandler);
}