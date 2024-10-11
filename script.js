const API= `https://jhtgnvxxtcyogorozive.supabase.co/rest/v1/movie_rental`

const token= `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpodGdudnh4dGN5b2dvcm96aXZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg0MzU4NjIsImV4cCI6MjA0NDAxMTg2Mn0.O8nw_GS332iP89quZbi0YZkbEdRrnBYkHd2E4gLy3D8`

getMovies()
async function getMovies(){

        let response= await fetch(API,{
            method : `GET`,
            headers : {
                'apikey' : token,
                'Authorization' : token
            }
        })
        let data= await response.json()
        renderTable(data)
}


function renderTable(data){

        tableLayout= `<tr>
            <th>ID</th>
            <th>Title</th>
            <th>Genre</th>
            <th>Release Year</th>
            <th>Rent</th>  
        </tr>`

    for(let i = 0; i < data.length; i++){

        tableLayout+= `<tr>
            <td>${data[i].id}</td>
            <td>${data[i].title}</td>
            <td>${data[i].genre}</td>
            <td>${data[i].releaseYear}</td>
            <td>${data[i].Rent}</td>
        </tr>`

    }
    movieTable.innerHTML= tableLayout
}

async function postMovie(){
    event.preventDefault()

        let title= inputTitle.value
        let genre= inputGenre.value
        let releaseYear= inputYear.value
        let Rent= inputAvailability.value

        let movieData= {
            title,
            genre,
            releaseYear,
            Rent
        }
        console.log(movieData)
        let response= await fetch(API,{
            method : 'POST',
            headers : {
                'apikey' : token,
                'Authorization' : token,
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(movieData)
        })


        if(response.status >= 200 && response.status <=299){
            getMovies()
            console.log("Your movie has been added")

        }else{
            console.log("Your movie was not added")
            console.log(response.statusText)
        }

}