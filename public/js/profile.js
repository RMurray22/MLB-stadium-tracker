const newFormHandler = async (event) => {
    event.preventDefault();
  
    //const name = document.querySelector('#stadium-name').value.trim();
    const favoriteTeam = document.getElementById("favorite-team");
  
    if (favoriteTeam) {
      const id = favoriteTeam.getAttribute("data-userID");
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
  
//   const delButtonHandler = async (event) => {
//     if (event.target.hasAttribute('data-id')) {
//       const id = event.target.getAttribute('data-id');
  
//       const response = await fetch(`/api/projects/${id}`, {
//         method: 'DELETE',
//       });
  
//       if (response.ok) {
//         document.location.replace('/profile');
//       } else {
//         alert('Failed to delete stadium');
//       }
//     }
//   };
  

  
//   document
//     .querySelector('.stadium-list')
//     .addEventListener('click', delButtonHandler);





window.onload = function() {
  let favoriteSel = document.getElementById("favorite-team");
  console.log(favoriteSel);
  fetch("../../api/teams")
    .then((response) => response.json())
    .then((data) => { 
      for (let x in data) {
        favoriteSel.options[favoriteSel.options.length] = new Option(`${data[x].location} ${data[x].name}`, data[x].id);
      }
    });

    document
    .querySelector('.update-profile-form')
    .addEventListener('submit', newFormHandler);
}