let moviesData = [];
let nameInput = document.getElementById("userName");
let emailInput = document.getElementById("userEmail");
let phoneInput = document.getElementById("userPhone");
let ageInput = document.getElementById("userAge");
let passwordInput = document.getElementById("password");
let rePasswordInput = document.getElementById("rePassword");

//get movies by category
let getMovies = async (category = "movie/now_playing") => {
    let moviesUrl = await fetch(`https://api.themoviedb.org/3/${category}?api_key=c4243a63b5d20b3ee19da1ce0e0ce33d&language=en-US&page=1`);
    let data = await moviesUrl.json();
    moviesData = data.results;
    // console.log(moviesData);
    displayMovies()
};
let displayMovies = () => {
    let temp = "";
    let title = "";
    for (let i = 0; i < moviesData.length; i++) {
        title = moviesData[i].title != undefined ? moviesData[i].title : moviesData[i].name;
        temp +=
            `<div class="col-sm-6 col-lg-4">
            <div class="item rounded position-relative overflow-hidden">
                <img src="https://image.tmdb.org/t/p/w500/${moviesData[i].poster_path}" alt="" class="w-100">
                <div class="overlay position-absolute d-flex justify-content-center flex-column h-100 w-100">
                    <h2>${title}</h2>
                    <p>${moviesData[i].overview}</p>
                    <p>rate: ${moviesData[i].vote_average}</p>
                    <p>${moviesData[i].release_date}</p>
                </div>
            </div>
        </div>`
    }
    document.getElementById("row").innerHTML = temp;
}
getMovies()

// list of links
let links = $(".link");
for (i = 0; i < links.length; i++) {
    links[i].addEventListener("click",(e)=> {
        let movieCategory = e.target.getAttribute("category");
        // console.log(movieCategory)
        getMovies(movieCategory)
    })
}

//search function
let search = (term)=> {
    let temp = "";
    let title = ""
    for (let i = 0; i < moviesData.length; i++) {
        title = moviesData[i].title != undefined ? moviesData[i].title : moviesData[i].name
        if (title.toLowerCase().includes(term.toLowerCase()) && (term != "")) {
            temp += `<div class="col-sm-6 col-lg-4">
            <div class="item rounded position-relative overflow-hidden">
                <img src="https://image.tmdb.org/t/p/w500/${moviesData[i].poster_path}" alt="" class="w-100">
                <div class="overlay position-absolute d-flex justify-content-center flex-column h-100 w-100">
                    <h2>${title}</h2>
                    <p>${moviesData[i].overview}</p>
                    <p>rate: ${moviesData[i].vote_average}</p>
                    <p>${moviesData[i].release_date}</p>
                </div>
            </div>
        </div>`
        }
    }
    document.getElementById("itemsSearched").innerHTML = temp;
}

//search in displayed movies
$("#displayedMovies").keyup( (e)=> {
    let term = e.target.value
    search(term);
})

//get all movies
let getAllMovies = async (searchWord) => {
    let moviesUrl = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=c4243a63b5d20b3ee19da1ce0e0ce33d&language=en-US&query=${searchWord}&page=1&include_adult=false`);
    let data = await moviesUrl.json();
    moviesData = data.results;
    // console.log(moviesData);
    displayMovies()
}
//search in all movies
$("#allMovies").keyup((e)=>{
    let searchedWord = e.target.value;
    getAllMovies(searchedWord)
})

//side menu
let outerWidth = $("#menu").outerWidth();
$("#menu").css({ "left": -outerWidth })
$("#toggleIcon").click(() => {
    let outerWidth = $("#menu").outerWidth();
    if ($("#toggleIcon i").hasClass("fa-bars")) {
        $(".sidebar").css({ "left": outerWidth })
        $("#menu").css({ "left": "0" })
        $("li").eq(0).animate({ opacity: "1", paddingTop: "20px" }, 900)
        $("li").eq(1).animate({ opacity: "1", paddingTop: "20px" }, 1000)
        $("li").eq(2).animate({ opacity: "1", paddingTop: "20px" }, 1100)
        $("li").eq(3).animate({ opacity: "1", paddingTop: "20px" }, 1200)
        $("li").eq(4).animate({ opacity: "1", paddingTop: "20px" }, 1300)
        $("li").eq(5).animate({ opacity: "1", paddingTop: "20px" }, 1400)
        $("#toggleIcon i").addClass("fa-times").removeClass("fa-bars")
    } else {
        $(".sidebar").css({ "left": "0" })
        $("#menu").css({ "left": -outerWidth })
        $("li").animate({ opacity: "0", paddingTop: "500px" }, 500)
        $("#toggleIcon i").addClass("fa-bars").removeClass("fa-times");
    }
})

// user name validation
let validateName = ()=> {
    let regex = /^([a-zA-z]+[0-9]*){1,}$/
    let alertName = document.getElementById("alertName");
    if(regex.test(nameInput.value)){alertName.style.display = "none"; return true;}
    else{alertName.style.display = "block"; return false;}
};
nameInput.addEventListener("keyup", validateName)

//email validation
let validateEmail= () => {
    let regex = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{2,3})(\]?)$/
    let alertEmail = document.getElementById("alertEmail");
    if(regex.test(emailInput.value)){alertEmail.style.display = "none"; return true;}
    else{alertEmail.style.display = "block"; return false;}
};
emailInput.addEventListener("keyup",validateEmail)

//phone number validation
let validatePhone =() => {
    let regex = /^(00201|\+201|01)[0-2,5]{1}[0-9]{8}$/
    let alertPhone = document.getElementById("alertPhone");
    if(regex.test(phoneInput.value)){alertPhone.style.display = "none"; return true;}
    else{alertPhone.style.display = "block"; return false;}
}
phoneInput.addEventListener("keyup",validatePhone );

// age validation
let validateAge = () => {
    let regex = /^([1-9][0-9]?|100)$/
    let alertAge = document.getElementById("alertAge");
    if(regex.test(ageInput.value)){alertAge.style.display = "none"; return true;}
    else{alertAge.style.display = "block"; return false;}
}
ageInput.addEventListener("keyup",validateAge )

// password validation
let validatePassword =() => {
    let regex = /^(?=.*[a-zA-Z])(?=.*[0-9])[0-9a-zA-z]{8,}$/
    let alertPassword = document.getElementById("alertPassword");
    if(regex.test(passwordInput.value)){alertPassword.style.display = "none"; return true;}
    else{alertPassword.style.display = "block"; return false;}
}
passwordInput.addEventListener("keyup",validatePassword)

// RePassword validation
let validateRePassword= () => {
    let alertRePassword = document.getElementById("alertRePassword");
    if(rePasswordInput.value == passwordInput.value){alertRePassword.style.display = "none"; return true;}
    else{alertRePassword.style.display = "block"; return false;}
}
rePasswordInput.addEventListener("keyup",validateRePassword )

//disable and enable button
document.getElementById("form").addEventListener("click", function(){
    document.getElementById("submit").disabled = (validateName()&&validateAge()&&validateEmail()&&validatePhone()&&validatePassword()&&validateRePassword())?false:true
})