
var firebaseConfig = {
      apiKey: "AIzaSyCTF7rHB6csz1Vn-V1jKezcSmNP_SMGrOQ",
      authDomain: "kwitter-8290d.firebaseapp.com",
      databaseURL: "https://kwitter-8290d-default-rtdb.firebaseio.com",
      projectId: "kwitter-8290d",
      storageBucket: "kwitter-8290d.appspot.com",
      messagingSenderId: "600113659076",
      appId: "1:600113659076:web:4e9d85c6dc94b8e3e01d91"
};

firebase.initializeApp(firebaseConfig);
user_name =localStorage.getItem("username_key");
document.getElementById("user_name").innerHTML="welcome "+user_name+"! ! !";
function getData() {
      firebase.database().ref("/").on('value', function (snapshot) {
            document.getElementById("output").innerHTML = ""; 
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  MAINnames = childKey;
                  console.log(MAINnames);
                  
                  div_Tag='<div id="'+MAINnames+'" onclick="Redirection(this.id)" class="room_name">'+MAINnames+'</div> <hr>';
                  document.getElementById("output").innerHTML+=div_Tag;

            });
      });
}
getData();
function addRoom() {
      rooMName = document.getElementById("room_name").value;
      firebase.database().ref("/").child(rooMName).update({
            purpose: "Room created"
      });
      localStorage.setItem("room_key", rooMName);
      window.location = "kwitter_page.html"
}
function Redirection(room_id) {
      localStorage.setItem("room_key",room_id);
      window.location="kwitter_page.html";
}
function logout() {
      localStorage.removeItem("username_key");
      localStorage.removeItem("room_key");
      window.location="index.html";
}
