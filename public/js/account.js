// change user first name
let firstNameRecords = document.getElementById("first_name");

firstNameRecords.addEventListener("click", editName);

function editName(e) {
  // add a listener for clicking on the field to change email
  // span's text
  let spanText = e.target.innerHTML;
  // span's parent (td)
  let parent = e.target.parentNode;
  // create a new input, and add a key listener to it
  let input = document.createElement("input");
  input.value = spanText;
  input.addEventListener("keyup", function (e) {
    let s = null;
    let v = null;
    // pressed enter
    if (e.which == 13) {
      v = input.value;
      let newSpan = document.createElement("span");
      // have to wire an event listener to the new element
      newSpan.addEventListener("click", editName);
      newSpan.innerHTML = v;
      parent.innerHTML = "";
      parent.appendChild(newSpan);

      let dataToSend = {
        id: parent.parentNode.querySelector("#id").innerHTML,
        name: v,
      };

      // now send
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        if (this.readyState == XMLHttpRequest.DONE) {
          // 200 means everthing worked
          if (xhr.status === 200) {
            document.getElementById("status").innerHTML = "Record updated.";
            //   getCustomers();
          } else {
            // not a 200, could be anything (404, 500, etc.)
          }
        } else {}
      };
      xhr.open("POST", "/update-firstName");
      xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.send("id=" + dataToSend.id + "&name=" + dataToSend.name);
    }
  });
  parent.innerHTML = "";
  parent.appendChild(input);
}

//Change user last name
let lastNameRecords = document.getElementById("last_name");

lastNameRecords.addEventListener("click", editlastName);

function editlastName(e) {
  document.getElementById("status").innerHTML = "";

  // add a listener for clicking on the field to change email
  // span's text
  let spanText = e.target.innerHTML;
  // span's parent (td)
  let parent = e.target.parentNode;
  // create a new input, and add a key listener to it
  let input = document.createElement("input");
  input.value = spanText;
  input.addEventListener("keyup", function (e) {
    let s = null;
    let v = null;
    // pressed enter
    if (e.which == 13) {
      v = input.value;
      let newSpan = document.createElement("span");
      // have to wire an event listener to the new element
      newSpan.addEventListener("click", editlastName);
      newSpan.innerHTML = v;
      parent.innerHTML = "";
      parent.appendChild(newSpan);

      let dataToSend = {
        id: parent.parentNode.querySelector("#id").innerHTML,
        lastName: v,
      };

      // now send
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        if (this.readyState == XMLHttpRequest.DONE) {
          // 200 means everthing worked
          if (xhr.status === 200) {
            document.getElementById("status").innerHTML = "Record updated.";
            //   getCustomers();
          }
        }
        xhr.open("POST", "/update-lastName");
        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        xhr.setRequestHeader(
          "Content-Type",
          "application/x-www-form-urlencoded"
        );
        xhr.send("id=" + dataToSend.id + "&lastName=" + dataToSend.lastName);
      };
    }
  });
  parent.innerHTML = "";
  parent.appendChild(input);
}

// change user email
let emailRecords = document.getElementById("email");

emailRecords.addEventListener("click", editEmail);

function editEmail(e) {
  document.getElementById("status").innerHTML = "";

  // add a listener for clicking on the field to change email
  // span's text
  let spanText = e.target.innerHTML;
  // span's parent (td)
  let parent = e.target.parentNode;
  // create a new input, and add a key listener to it
  let input = document.createElement("input");
  input.value = spanText;
  input.addEventListener("keyup", function (e) {
    let s = null;
    let v = null;
    // pressed enter
    if (e.which == 13) {
      v = input.value;
      let newSpan = document.createElement("span");
      // have to wire an event listener to the new element
      newSpan.addEventListener("click", editEmail);
      newSpan.innerHTML = v;
      parent.innerHTML = "";
      parent.appendChild(newSpan);

      let dataToSend = {
        id: parent.parentNode.querySelector("#id").innerHTML,
        email: v,
      };

      // now send
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        if (this.readyState == XMLHttpRequest.DONE) {
          // 200 means everthing worked
          if (xhr.status === 200) {
            document.getElementById("status").innerHTML = "Record updated.";
            //   getCustomers();
          }
        }
        xhr.open("POST", "/update-email");
        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        xhr.setRequestHeader(
          "Content-Type",
          "application/x-www-form-urlencoded"
        );
        xhr.send("id=" + dataToSend.id + "&email=" + dataToSend.email);
      };
    }
  });
  parent.innerHTML = "";
  parent.appendChild(input);
}

// change user password
let passwordRecords = document.getElementById("password");

passwordRecords.addEventListener("click", editPassword);

function editPassword(e) {
  document.getElementById("status").innerHTML = "";

  // add a listener for clicking on the field to change email
  // span's text
  let spanText = e.target.innerHTML;
  // span's parent (td)
  let parent = e.target.parentNode;
  // create a new input, and add a key listener to it
  let input = document.createElement("input");
  input.value = spanText;
  input.addEventListener("keyup", function (e) {
    let s = null;
    let v = null;
    // pressed enter
    if (e.which == 13) {
      v = input.value;
      let newSpan = document.createElement("span");
      // have to wire an event listener to the new element
      newSpan.addEventListener("click", editPassword);
      newSpan.innerHTML = v;
      parent.innerHTML = "";
      parent.appendChild(newSpan);

      let dataToSend = {
        id: parent.parentNode.querySelector("#id").innerHTML,
        password: v,
      };

      // now send
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        if (this.readyState == XMLHttpRequest.DONE) {
          // 200 means everthing worked
          if (xhr.status === 200) {
            document.getElementById("status").innerHTML = "Record updated.";
            //   getCustomers();
          }
        }
        xhr.open("POST", "/update-password");
        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        xhr.setRequestHeader(
          "Content-Type",
          "application/x-www-form-urlencoded"
        );
        xhr.send("id=" + dataToSend.id + "&password=" + dataToSend.password);
      };
    }
  });
  parent.innerHTML = "";
  parent.appendChild(input);
}

const radioButtons = document.querySelectorAll('input[name="profilePic"]');
let profilePicVal;
document.getElementById("submit").addEventListener("click", function (e) {
  e.preventDefault();
  document.getElementById("status").innerHTML = "Record updated.";
  for (const radioButton of radioButtons) {
    if (radioButton.checked) {
      profilePicVal = radioButton.value;
      break;
    }
  }

  let parent = e.target.parentNode;
  let v = "/img/" + profilePicVal;
  let dataToSend = {
    id: parent.parentNode.querySelector("#id").innerHTML,
    profilePic: v,
  };

  // now send
  const xhr = new XMLHttpRequest();
  xhr.onload = function () {
    if (this.readyState == XMLHttpRequest.DONE) {
      // 200 means everthing worked
      if (xhr.status === 200) {
        document.getElementById("status").innerHTML = "Record updated.";
        //   getCustomers();
      } else {
        // not a 200, could be anything (404, 500, etc.)
      }
    } else {}
  };
  xhr.open("POST", "/update-profilePic");
  xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send("id=" + dataToSend.id + "&profilePic=" + dataToSend.profilePic);
});

document.getElementById("dropLogo").addEventListener("click", () => {
  window.location.assign("/");
});

document.getElementById("account").addEventListener("click", () => {
  window.location.assign("/account");
});

document.getElementById("history").addEventListener("click", () => {
  window.location.assign("/cartHistory");
});

document.getElementById("about").addEventListener("click", () => {
  window.location.assign("/about");
});

document.getElementById("contact").addEventListener("click", () => {
  window.location.assign("/contactus");
});

document.getElementById("faq").addEventListener("click", () => {
  window.location.assign("/faq");
});