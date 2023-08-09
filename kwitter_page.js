//YOUR FIREBASE LINKS
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
user_name = localStorage.getItem("username_key");
room_name = localStorage.getItem("room_key");
document.getElementById("welcome").innerHTML = "Welcome " + user_name + " to " + room_name;
function getData() {
      firebase.database().ref("/" + room_name).on('value', function (snapshot) {
            document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key; childData = childSnapshot.val(); if (childKey != "purpose") {
                        firebase_subfolder_id = childKey;
                        message_data = childData;
                        db_name=message_data["name"];
                        db_message=message_data["message"];
                        db_like=message_data["like"];
                        name_tag='<h4>'+db_name+'<img src="tick.png" class="user_tick"> </h4>';
                        message_tag='<h4 class="message_h4">'+db_message+'</h4>';
                        button_start_Tag='<button id="'+firebase_subfolder_id+'" class="btn btn-warning" onclick="liked(this.id)" value="'+db_like+'">';
                        button_end_Tag='<span class="glyphicon glyphicon-thumbs-up"> like :'+db_like+'</span> </button> <hr>';
                        row=name_tag+message_tag+button_start_Tag+button_end_Tag;
                        document.getElementById("output").innerHTML+=row;
                  
                  }
            });
      });
}
getData();
function logout() {
      localStorage.removeItem("username_key");
      localStorage.removeItem("room_key");
      window.location = "index.html";
}
function send_message() {
      text_msg = document.getElementById("msg").value;
      firebase.database().ref(room_name).push({
            name: user_name,
            message: text_msg,
            like: 0
      });
      document.getElementById("msg").value = "";
}
function liked(sub_id) {
      likes=document.getElementById(sub_id).value;
      likes=Number(likes)+1;
      firebase.database().ref(room_name).child(sub_id).update({
            like:likes
      });
}