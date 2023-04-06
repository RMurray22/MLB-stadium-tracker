const favoriteTeam = document.getElementById("favorite-team");
//const stadiums = document.getElementsByName("stadium");
const id = favoriteTeam.getAttribute("data-userID");


const newFormHandler = async (event) => {
    event.preventDefault();
  
    



    // for (let i = 0; i<stadiums.length; i++){
    //   if (stadiums[i].checked){
    //     const res = await fetch("../../api/games", {
    //       method: 'POST',
    //       body: JSON.stringify({ stadium: stadiums[i].id, user_id: id }),
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //     });
    //     if (res.ok) continue;
    //     else alert('Failed to save stadiums');
    //   }
    // }
    
    
    
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
  
window.onload = function() {
  let favoriteSpanEl = document.getElementById("fav-team");
  let favoriteTeam = document.getElementById("favorite-team");
  let favoriteSel = document.getElementById("favorite-team");
  let checkboxEL = document.getElementById("stadium-checkboxes");
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
      for (let x in data) {
        let stadium = document.createElement("input");
        let stadiumLabel = document.createElement("label");
        let br = document.createElement("br");
        stadium.setAttribute("type", "checkbox");
        stadium.setAttribute("value", data[x].name);
        stadium.setAttribute("id", data[x].id);
        stadium.setAttribute("name", "stadium");
        stadiumLabel.setAttribute("for", data[x].id);
        stadiumLabel.textContent = data[x].name;
        checkboxEL.append(stadium);
        checkboxEL.append(stadiumLabel);
        checkboxEL.append(br);
      }
    }));
    document
    .querySelector('.update-profile-form')
    .addEventListener('submit', newFormHandler);
}