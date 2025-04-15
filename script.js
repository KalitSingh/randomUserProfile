let buttonclicked = document.getElementById("buttonclicked");
let cardsContainer = document.getElementById("cardsContainer");
let cardsSaveBtn = document.getElementById("cardsSaveBtn");
let newProfileBtn = document.getElementById("newProfileBtn");


function getItemsFromLocalStorage() {
    let userDataFromLocalStorage = localStorage.getItem("randomUserData");

    if (!userDataFromLocalStorage) return [];
    console.log(userDataFromLocalStorage + "lkjsdf");
    return JSON.parse(userDataFromLocalStorage);

} // getting data from local storage after being storing by getting it through fetch api 


// To delete saved Profile 
function onDeleteUserProfile(cardId) {
    let profileCard = document.getElementById(cardId);
    console.log(cardId);

    if (profileCard) {
        cardsContainer.removeChild(profileCard);
    }

    // cardsContainer.removeChild(profileCard);

    let localArray = getItemsFromLocalStorage(); // ye getItemsFromLocalStorage ke ander localStorage.getItem ek js local Array create karta hai or uspe hi saare kaam hote hai phir use localStorage me setItem karke set karna hota hai tabhi wo localStorage pe reflect hota hai ok. directly ham localStorage ke ander data update nhi kar sakte hai 
    let deletingProfileIndex = localArray.findIndex(function(eachUserDetails) {

        if (eachUserDetails.id === cardId) {
            console.log(eachUserDetails.id);
            return true;
        }

    });
    console.log(deletingProfileIndex);

    // deleting from localstorage directly also can be deleted using "localStorageArr" variable
    localArray.splice(deletingProfileIndex, 1);
    // localStorage.removeItem(deletingProfileIndex);  it will not work as it works only with key ok 

    localStorage.setItem("randomUserData", JSON.stringify(localArray)); // updating localstorage data 
    localStorageArr = localArray; // updating localStorageArr taki ye APi se aaya hua purana data hold n kare 
}

// Component of dynamic cards 
function userProfileCardsComponent(props) {

    let {
        id,
        name,
        age,
        gender,
        phone,
        email,
        pic
    } = props;

    let colDivId = id;

    let colDiv = document.createElement("div");
    colDiv.classList.add("col-12", "col-lg-6", "col-xl-4");
    colDiv.id = colDivId;
    cardsContainer.appendChild(colDiv);

    let profileMainContainer = document.createElement("div");
    profileMainContainer.classList.add("d-flex", "justify-content-center");
    colDiv.appendChild(profileMainContainer);

    let profileCardsContainer = document.createElement("div");
    profileCardsContainer.classList.add("profile-cards-container", "profile-cards-container-used-in-js", "mt-5");
    profileMainContainer.appendChild(profileCardsContainer);

    let profileCards = document.createElement("div");
    profileCards.classList.add("new-profile-cards");
    profileCardsContainer.appendChild(profileCards);

    let profilePicture = document.createElement("img");
    profilePicture.classList.add("profile-picture", "rounded-circle");
    profilePicture.src = pic;
    profilePicture.title = "Picture";
    profileCards.appendChild(profilePicture);

    let profileEmptyDetailsCard = document.createElement("div");
    profileCards.appendChild(profileEmptyDetailsCard);

    let aboutBtnEle = document.createElement("button");
    aboutBtnEle.classList.add("buttons", "btn", "btn-dark");
    aboutBtnEle.textContent = "About Me";
    profileEmptyDetailsCard.appendChild(aboutBtnEle);


    let profileDetailsCard = document.createElement("ul");
    profileDetailsCard.classList.add("profile-cards-details", "d-none");
    profileEmptyDetailsCard.appendChild(profileDetailsCard);
    aboutBtnEle.onclick = function() {
        profileDetailsCard.classList.toggle("d-none");
    };

    let ageEle = document.createElement("li");
    ageEle.textContent = `Age: ${age}`;
    profileDetailsCard.appendChild(ageEle);

    let GenderEle = document.createElement("li");
    GenderEle.textContent = `Gender: ${gender}`;
    profileDetailsCard.appendChild(GenderEle);

    let PhoneNEle = document.createElement("li");
    PhoneNEle.textContent = `Ph N: ${phone}`;
    profileDetailsCard.appendChild(PhoneNEle);

    let EmailEle = document.createElement("li");
    EmailEle.textContent = `Email: ${email}`;
    profileDetailsCard.appendChild(EmailEle);

    let nameAndButtonContainer = document.createElement("div");
    nameAndButtonContainer.classList.add("name-and-button-container");
    profileCardsContainer.appendChild(nameAndButtonContainer);

    let nameH1Ele = document.createElement("h1");
    nameH1Ele.classList.add("name", "mr-2");
    nameH1Ele.textContent = name;
    nameAndButtonContainer.appendChild(nameH1Ele);

    let DeleteBtnEle = document.createElement("button");
    DeleteBtnEle.classList.add("btn", "btn-success", "new-profile-btn");
    DeleteBtnEle.textContent = "Delete";
    nameAndButtonContainer.appendChild(DeleteBtnEle);
    DeleteBtnEle.onclick = function() {
        onDeleteUserProfile(colDivId);
    };

}
let fetchingApiToGetData; // here defining it, using function declaration so that can be used before it was defining
function topMostCardComponent(props) {

    let {
        id,
        name,
        age,
        gender,
        phone,
        email,
        pic
    } = props[0];

    let cardPicEle = document.getElementById("cardPic");
    let cardAgeEle = document.getElementById("cardAge");
    let cardGenderEle = document.getElementById("cardGender");
    let cardPhoneEle = document.getElementById("cardPhone");
    let cardEmailEle = document.getElementById("cardEmail");
    let cardNameEle = document.getElementById("cardName");

    cardPicEle.src = pic;
    cardAgeEle.textContent = age;
    cardGenderEle.textContent = gender;
    cardPhoneEle.textContent = phone;
    cardEmailEle.textContent = email;
    cardNameEle.textContent = name;

    // console.log(name);
}

let localStorageArr = getItemsFromLocalStorage(); // to append api response data result in the localStorage when user clickes save btn
let recentUserDetails = {}; // ye recent user ko socalstorage me store karne ke pahle ui me reflect kiya ja raha hai 
fetchingApiToGetData = function(noOfResults = 1) {

    let url = `https://randomuser.me/api?results=${noOfResults}`;
    let options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            // authorization: "Bearer <token>"
        }
    };

    fetch(url, options)
        .then(function(res) {
            // console.log(res.json());
            console.log(res.status);
            return res.json();
        })
        .then(function(data) {
            // console.log(data.results);
            let userDetails = data.results; // jo response aa raha hai usme data ke ander results ke ander user data available hai so console.log me check kara bahot important hai

            let filteredData = userDetails.map((eachObj) => {
                let filtereringData = {
                    id: `${eachObj.id.name} ${eachObj.id.value}`,
                    name: `${eachObj.name.title} ${eachObj.name.first} ${eachObj.name.last}`,
                    gender: eachObj.gender,
                    phone: eachObj.phone,
                    email: eachObj.email,
                    age: eachObj.dob.age,
                    pic: eachObj.picture.large
                }

                recentUserDetails = filtereringData;
                return filtereringData;
            });
            // console.log(dataInBulks);
            // console.log(localStorageArr);

            // console.log(filteredData);
            topMostCardComponent(filteredData);
        })
        .catch(err => console.log(err));
}; // fetching data from api function 

newProfileBtn.onclick = function() {
    fetchingApiToGetData();
    console.log(localStorageArr);
};

// adding eventlistener to save btn to save it in the localStorage 
cardsSaveBtn.addEventListener("click", function() {

    localStorageArr.push(recentUserDetails); // storing in the above created or array of abject that is equal to retriving data from local storage

    localStorage.setItem("randomUserData", JSON.stringify(localStorageArr));
    userProfileCardsComponent(recentUserDetails);
});

fetchingApiToGetData();

for (let eachItems of getItemsFromLocalStorage()) {
    userProfileCardsComponent(eachItems);
    // userProfileCardsComponent(eachItems);
}






//