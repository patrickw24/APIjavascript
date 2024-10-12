const API = `https://jhtgnvxxtcyogorozive.supabase.co/rest/v1/movie_rental`;

const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpodGdudnh4dGN5b2dvcm96aXZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg0MzU4NjIsImV4cCI6MjA0NDAxMTg2Mn0.O8nw_GS332iP89quZbi0YZkbEdRrnBYkHd2E4gLy3D8`;

let modal = new bootstrap.Modal(document.getElementById("movieModal"));

getMovies();
async function getMovies() {
  let response = await fetch(API, {
    method: `GET`,
    headers: {
      apikey: token,
      Authorization: token,
    },
  });
  let data = await response.json();
  renderTable(data);
}

function renderTable(data) {
  tableLayout = `<tr>
            <th>ID</th>
            <th>Title</th>
            <th>Genre</th>
            <th>Release Year</th>
            <th>Rent</th>  
            <th>Edit</th>
            <th>Delete</th>
        </tr>`;

  for (let i = 0; i < data.length; i++) {
    tableLayout += `<tr>
            <td>${data[i].id}</td>
            <td>${data[i].title}</td>
            <td>${data[i].genre}</td>
            <td>${data[i].releaseYear}</td>
            <td>${data[i].Rent}</td>
            <td><button onclick="showModal(${data[i].id})" class="btn btn-warning"> Edit </button> </td>
            <td><button onclick="deleteMovie(${data[i].id})" class="btn btn-danger"> Delete </button> </td>
        </tr>`;
  }
  movieTable.innerHTML = tableLayout;
}

async function postMovie() {
  event.preventDefault();
    
  let title = inputTitle.value;
  let genre = inputGenre.value;
  let releaseYear = inputYear.value;
  let Rent = inputAvailability.value;

  let movieData = {
    title,
    genre,
    releaseYear,
    Rent,
  };
  console.log(movieData);
  let response = await fetch(API, {
    method: "POST",
    headers: {
      apikey: token,
      Authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(movieData),
  });

  if (response.ok) {
    getMovies();
    console.log("Your movie has been added");
    
    inputTitle.value= ""
    inputGenre.value= ""
    inputYear.value= ""
    inputAvailability.value= ""

  } else {
    console.log("Your movie was not added");
    console.log(response.statusText);
  }
}

async function showModal(id) {
  let url = `${API}?id=eq.${id}`;

  let response = await fetch(url, {
    method: "GET",
    headers: {
      apikey: token,
      Authorization: token,
      "Content-Type": "application/json",
    },
  });
  modal.show();

  if (response.status >= 200 && response.status <= 299) {
    let data = await response.json();
    inputID.value= data[0].id;
    inputTitle2.value = data[0].title;
    inputGenre2.value = data[0].genre;
    inputYear2.value = data[0].releaseYear;
    inputAvailability2.value = data[0].Rent;
  } else {
    console.log(response.statusText);
    console.log("Unable to Fetch");
  }
}

async function patchMovie() {
  let id = parseFloat(inputID.value);
  let title = inputTitle2.value;
  let genre = inputGenre2.value;
  let releaseYear = inputYear2.value;
  let Rent = inputAvailability2.value;

  let url = `${API}?id=eq.${id}`;

  let movieData = {
    title,
    genre,
    releaseYear,
    Rent,
  };

  let response = await fetch(url, {
    method: "PATCH",
    headers: {
      'apikey': token,
      'Authorization': token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(movieData),
  });
  console.log(response);
  if (response.status >= 200 && response.status <= 299) {
    console.log("Your movie has updated");
    getMovies();
    modal.hide();
  } else {
    console.log("Your movie was not updated");
    let responseBody = await response.json();
    console.log(responseBody);
  }
}


async function deleteMovie(id){


    

        let url = `${API}?id=eq.${id}`

        let response = await fetch(url, {
            method: 'DELETE',
            headers: {
              'apikey': token,
              'Authorization': token,
            },
          })

          if (response.status >= 200 && response.status <= 299) {
            console.log("Your movie has been deleted");
            getMovies();
            modal.hide();
          } else {
            console.log("Your movie was not deleted");
            let responseBody = await response.json();
            console.log(responseBody);
          }

}
