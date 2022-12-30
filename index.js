// async and await method to get IP_Address
//  async function getIP(){
//     let response = await fetch('https://api.ipify.org?format=json')
//     let IPAddress = await response.json();
//     console.log(IPAddress.ip);
// }
fetch('https://api.ipify.org?format=json')
    .then(response => {
        return response.json()
    })
    .then(data => {
        let IPElement = document.getElementById('IP');
        IPElement.textContent = data.ip;
        window.localStorage.setItem('IP', data.ip);
    })
function getDetails(IPAddress) {
    const url = `https://ipinfo.io/${IPAddress}/json?token=83d4dd58b9b64b `;
    fetch(url)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
            let location = data.loc;
            let locArray = location.split(",")
            const user = {
                location: data.loc,
                organisation: data.org,
                post: data.postal,
                region: data.region,
                timezone: data.timezone,
                latitude: locArray[0],
                longitude: locArray[1],
                city: data.city
            }
            window.localStorage.setItem('data', JSON.stringify(user));
        })
}

function renderUI() {
    let UI = document.getElementById('locationDetails');
    UI.style.display = "flex";
    let user = window.localStorage.getItem('data');
    let data = JSON.parse(user);
    //document.getElementById('lat').textContent = data.latitude;
    document.getElementById('long').textContent = data.longitude;
    document.getElementById('city').textContent = data.city;
    document.getElementById('region').textContent = data.region;
    document.getElementById('organisation').textContent = data.organisation;
    let lat = data.latitude;
    let long = data.longitude;
    let div = document.getElementById('map');
    let map = `<iframe src="https://maps.google.com/maps?q=${lat}, ${long}&z=15&output=embed" width="1200" height="400" frameborder="0" style="border:0"></iframe>`
    div.insertAdjacentHTML('afterbegin',map);
}

function getpostOfficeDetails(){
    let user= JSON.parse(window.localStorage.getItem('data'));
    let  pincode = user.post;
    document.getElementById('time').textContent=user.timezone;
    document.getElementById('pin').textContent=user.post
    console.log(pincode);
    fetch(`https://api.postalpincode.in/pincode/${pincode}`)
      .then(response =>{
        return response.json();
      })
         .then (data =>{
            let postOffice = data["0"].PostOffice;
            console.log(postOffice);
            const message = data["0"].Message;
            document.getElementById('message').textContent=message;
            postOffice.map((post)=>{
                
                    let result =`<div id="result">
                    <div id="office">
                    <span>Name:</span>
                    <span id="name">${post.Name}</span>
                    </div>
                    <div id="office">
                        <span>Branch Type:</span>
                        <span id="branch">${post.BranchType}</span>
                    </div>
                    <div id="office">
                        <span>Delivery Status:</span>
                        <span id="delivery">${post.DeliveryStatus}</span>
                        </div>
                    <div id="office">
                        <span>District:</span>
                        <span id="district">${post.District}</span>
                     </div>
                    <div id="office">
                        <span>Division:</span>
                        <span id="division">${post.Division}</span>
                    </div>
                    </div>` 
                let div = document.getElementById('postOfficeDetails');
                div.insertAdjacentHTML('beforeend',result);
                })
                // const input = document.querySelector('input');
                // input.addEventListener('change',(e)=>{
                //     let value = e.target.value;
                //     document.getElementById('postOfficeDetails').innerHTML='';
                //     let office = postOffice.filter((post)=>{
                //       return (value===post.Name || value===post.BranchType)
                //       console.log(office);
                // });
                // }) could not complete filter function so i commented it.
                  

         })
}

function getcurrentTime(){
    let user= JSON.parse(window.localStorage.getItem('data'));
    let time = user.timezone;
    let datetime = new Date().toLocaleString("en-US", { timeZone: `${time}` });
    document.getElementById('date').textContent=datetime;
   console.log(datetime);
}


function getData() {
    let fetchbtn = document.getElementById('btn')
    fetchbtn.style.display = "none";
    let IPAddress = window.localStorage.getItem('IP');
    getDetails(IPAddress);
    renderUI();
    getpostOfficeDetails();
    getcurrentTime();
}

// const input = document.querySelector('input');
// input.addEventListener('change',(e)=>{
//     filter;
// });




