const favoriteTeam = document.getElementById("favorite-team");
const stadiumsEl = document.getElementById("stadium-container");
const id = favoriteTeam.getAttribute("data-userID");
const getUserGames = async () => {
  try{
    const response = await fetch(`../../api/games/user/${id}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      },          
    });
    return (response.json());
  } catch(err) {
    console.error(err);
  }
}
const getTeams = async () => {
  try{
    const response = await fetch(`../../api/teams`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      },          
    });
    return (response.json());
  } catch(err) {
    console.error(err);
  }
}
const getStadiums = async () => {
  try{
    const response = await fetch(`../../api/stadiums`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      },          
    });
    return (response.json());
  } catch(err) {
    console.error(err);
  }
}


const newFormHandler = async (event) => {
    event.preventDefault();
  
    if (favoriteTeam.value == 0) {
      return;
    } else {

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
        const response = await fetch(`../../api/games/user/${id}`, {
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
  const userGames = await getUserGames();
  const teams = await getTeams();
  const stadiums = await getStadiums();  
  for (let x in teams) {  // populate team list for favorite team selector
    favoriteSel.options[favoriteSel.options.length] = new Option(`${teams[x].location} ${teams[x].name}`, teams[x].id);
  }
  for (let y in stadiums) {  // create all stadium buttons
    let newButton = document.createElement("button");
    newButton.setAttribute("class", "btn btn-light");
    newButton.setAttribute("id", stadiums[y].id);
    newButton.setAttribute("data-selected", "false");
    for (let z in userGames) {  // cross-check games and mark stadiums already visited as selected
      if( userGames[z].stadium == stadiums[y].id) {
        newButton.setAttribute("data-selected", "true");
        newButton.setAttribute("class", "btn btn-dark");
      }
    }        
    newButton.textContent = `${stadiums[y].name} : ${stadiums[y].city}, ${stadiums[y].state}`
    stadiumsEl.append(newButton);
    stadiumsEl.append(document.createElement("br"));
  }
  
    document
    .querySelector('.update-profile-form')
    .addEventListener('submit', newFormHandler);

    document
    .querySelector('#stadium-container')
    .addEventListener("click", stadiumSelectHandler);
}