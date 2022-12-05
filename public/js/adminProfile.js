function ajaxPOST(url, callback, data) {
  /*
   * - Keys method of the object class returns an array of all of the keys for an object
   * - The map method of the array type returns a new array with the values of the old array
   *   and allows a callback function to perform an action on each key
   *   The join method of the arra type accepts an array and creates a string based on the values
   *   of the array, using '&' we are specifying the delimiter
   * - The encodeURIComponent function escapes a string so that non-valid characters are replaced
   *   for a URL (e.g., space character, ampersand, less than symbol, etc.)
   *
   *
   * References:
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent
   */
  let params =
    typeof data == "string" ?
    data :
    Object.keys(data)
    .map(function (k) {
      return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
    })
    .join("&");

  const xhr = new XMLHttpRequest();
  xhr.onload = function () {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
      callback(this.responseText);
    }
  };
  xhr.open("POST", url);
  xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send(params);
}

function getUsers() {
  const xhr = new XMLHttpRequest();
  xhr.onload = function () {
    if (this.readyState == XMLHttpRequest.DONE) {
      // 200 means everthing worked
      if (xhr.status === 200) {
        let data = JSON.parse(this.responseText);
        if (data.status == "success") {
          let str = `        <tr>
<th class="id_header"><span>ID</span></th>
<th class="userName_header"><span>Username</span></th>
<th class="firstName_header"><span>First Name</span></th>
<th class="lastName_header"><span>Last Name</span></th>
<th class="email_header"><span>Email</span></th>
<th class="password_header"><span>Password</span></th>
<th class="isAdmin_header"><span>is Admin</span></th>
</tr>`;

          for (let i = 0; i < data.rows.length; i++) {
            let row = data.rows[i];
            str +=
              "<tr><td class='id'>" +
              row.identity +
              "</td><td class='userName'><span>" +
              row.user_name +
              "</span></td><td class='firstName'><span>" +
              row.first_name +
              "</span></td><td class='lastName'><span>" +
              row.last_name +
              "</span>" +
              "</td><td class='email'><span>" +
              row.email +
              "</span>" +
              "</td><td class='password'><span>" +
              row.password +
              "</span></td><td class='isAdmin'><span class='adminSpan'>" +
              row.is_admin +
              "</span></tr>";
          }
          document.getElementById("customers").innerHTML = str;

          // select all spans under the email class of td elements
          let emailRecords = document.querySelectorAll(
            "td[class='email'] span"
          );
          for (let j = 0; j < emailRecords.length; j++) {
            emailRecords[j].addEventListener("click", editEmail);
          }

          // select all spans under the userName class of td elements
          let userNameRecords = document.querySelectorAll(
            "td[class='userName'] span"
          );
          for (let j = 0; j < userNameRecords.length; j++) {
            userNameRecords[j].addEventListener("click", editUserName);
          }

          // select all spans under the firstName class of td elements
          let firstNameRecords = document.querySelectorAll(
            "td[class='firstName'] span"
          );
          for (let j = 0; j < firstNameRecords.length; j++) {
            firstNameRecords[j].addEventListener("click", editFirstName);
          }

          // select all spans under the lastName class of td elements
          let lastNameRecords = document.querySelectorAll(
            "td[class='lastName'] span"
          );
          for (let j = 0; j < lastNameRecords.length; j++) {
            lastNameRecords[j].addEventListener("click", editLastName);
          }

          // select all spans under the password class of td elements
          let passwordRecords = document.querySelectorAll(
            "td[class='password'] span"
          );
          for (let j = 0; j < passwordRecords.length; j++) {
            passwordRecords[j].addEventListener("click", editPassword);
          }

          // select all spans under the isAdmin class of td elements
          let isAdminRecords = document.querySelectorAll(
            "td[class='isAdmin'] span"
          );
          for (let j = 0; j < isAdminRecords.length; j++) {
            isAdminRecords[j].addEventListener("click", editIsAdmin);
          }
        } else {

        }
      } else {
        // not a 200, could be anything (404, 500, etc.)
      }
    } else {}
  };
  xhr.open("GET", "/get-allUsers");
  xhr.send();
}

getUsers();

//admin change email
function editEmail(e) {
  // gets rid of messages
  document.getElementById("message").innerHTML = "";
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
      // if admin puts a value without the @
      if (v.includes("@")) {
        v = input.value;
      } else {
        v = input.value;
        document.getElementById("message").innerHTML = "Not a valid input.";
      }
      let newSpan = document.createElement("span");
      // have to wire an event listener to the new element
      newSpan.addEventListener("click", editEmail);
      newSpan.innerHTML = v;
      parent.innerHTML = "";
      parent.appendChild(newSpan);
      let dataToSend = {
        id: parent.parentNode.querySelector(".id").innerHTML,
        email: v,
      };

      // now send
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        if (this.readyState == XMLHttpRequest.DONE) {
          // 200 means everthing worked
          if (xhr.status === 200) {
            // if valid input for isAdmin is made, "record updated" message will show up
            if (
              document.getElementById("message").innerHTML ==
              "Not a valid input."
            ) {
              document.getElementById("status").innerHTML = "";
            } else {
              document.getElementById("status").innerHTML = "Record updated.";
            }
          } else {
            // not a 200, could be anything (404, 500, etc.)
          }
        } else {}
      };
      xhr.open("POST", "/admin-update-email");
      xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.send("id=" + dataToSend.id + "&email=" + dataToSend.email);
    }
  });
  parent.innerHTML = "";
  parent.appendChild(input);
}

//admin change user name
function editUserName(e) {
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
      newSpan.addEventListener("click", editUserName);
      newSpan.innerHTML = v;
      parent.innerHTML = "";
      parent.appendChild(newSpan);
      let dataToSend = {
        id: parent.parentNode.querySelector(".id").innerHTML,
        userName: v,
      };

      // now send
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        if (this.readyState == XMLHttpRequest.DONE) {
          // 200 means everthing worked
          if (xhr.status === 200) {
            document.getElementById("status").innerHTML = "Record updated.";
            // getCustomers();
          } else {
            // not a 200, could be anything (404, 500, etc.)
          }
        } else {}
      };
      xhr.open("POST", "/admin-update-username");
      xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.send("id=" + dataToSend.id + "&userName=" + dataToSend.userName);
    }
  });
  parent.innerHTML = "";
  parent.appendChild(input);
}

//admin change first name
function editFirstName(e) {
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
      newSpan.addEventListener("click", editFirstName);
      newSpan.innerHTML = v;
      parent.innerHTML = "";
      parent.appendChild(newSpan);
      let dataToSend = {
        id: parent.parentNode.querySelector(".id").innerHTML,
        firstName: v,
      };

      // now send
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        if (this.readyState == XMLHttpRequest.DONE) {
          // 200 means everthing worked
          if (xhr.status === 200) {
            document.getElementById("status").innerHTML = "Record updated.";
            // getCustomers();
          } else {
            // not a 200, could be anything (404, 500, etc.)
          }
        } else {}
      };
      xhr.open("POST", "/admin-update-firstname");
      xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.send("id=" + dataToSend.id + "&firstName=" + dataToSend.firstName);
    }
  });
  parent.innerHTML = "";
  parent.appendChild(input);
}

//admin change last name
function editLastName(e) {
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
      newSpan.addEventListener("click", editLastName);
      newSpan.innerHTML = v;
      parent.innerHTML = "";
      parent.appendChild(newSpan);
      let dataToSend = {
        id: parent.parentNode.querySelector(".id").innerHTML,
        lastName: v,
      };

      // now send
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        if (this.readyState == XMLHttpRequest.DONE) {
          // 200 means everthing worked
          if (xhr.status === 200) {
            document.getElementById("status").innerHTML = "Record updated.";
            // getCustomers();
          } else {
            // not a 200, could be anything (404, 500, etc.)
          }
        } else {}
      };
      xhr.open("POST", "/admin-update-lastname");
      xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.send("id=" + dataToSend.id + "&lastName=" + dataToSend.lastName);
    }
  });
  parent.innerHTML = "";
  parent.appendChild(input);
}

//admin change password
function editPassword(e) {
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
        id: parent.parentNode.querySelector(".id").innerHTML,
        password: v,
      };

      // now send
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        if (this.readyState == XMLHttpRequest.DONE) {
          // 200 means everthing worked
          if (xhr.status === 200) {
            document.getElementById("status").innerHTML = "Record updated.";
            // getCustomers();
          } else {
            // not a 200, could be anything (404, 500, etc.)
          }
        } else {}
      };
      xhr.open("POST", "/admin-update-password");
      xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.send("id=" + dataToSend.id + "&password=" + dataToSend.password);
    }
  });
  parent.innerHTML = "";
  parent.appendChild(input);
}

//admin change is admin status
function editIsAdmin(e) {
  // gets rid of messages
  document.getElementById("message").innerHTML = "";
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
      // if admin puts a value other than 1 or 0, make it 0
      if (v == "" || (v != 1 && v != 0)) {
        v = 0;
        document.getElementById("message").innerHTML = "Not a valid input.";
      }

      let newSpan = document.createElement("span");
      // have to wire an event listener to the new element
      newSpan.addEventListener("click", editIsAdmin);
      newSpan.innerHTML = v;
      parent.innerHTML = "";
      parent.appendChild(newSpan);
      let dataToSend = {
        id: parent.parentNode.querySelector(".id").innerHTML,
        isAdmin: v,
      };

      // now send
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        if (this.readyState == XMLHttpRequest.DONE) {
          // 200 means everthing worked
          if (xhr.status === 200) {
            // if valid input for isAdmin is made, "record updated" message will show up
            if (
              document.getElementById("message").innerHTML ==
              "Not a valid input."
            ) {
              document.getElementById("status").innerHTML = "";
            } else {
              document.getElementById("status").innerHTML = "Record updated.";
            }

            // getCustomers();
          } else {
            // not a 200, could be anything (404, 500, etc.)
          }
        } else {}
      };
      xhr.open("POST", "/admin-update-isAdmin");
      xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.send("id=" + dataToSend.id + "&isAdmin=" + dataToSend.isAdmin);
    }
  });
  parent.innerHTML = "";
  parent.appendChild(input);
}

//check if email value is good
let correctEmail = true;

let emailVal = document.getElementById("add-email").value;

document.getElementById("add-email").addEventListener("change", () => {
  if (emailVal.includes("@")) {
    document.getElementById("add-email").style.color = "black";
    document.getElementById("message").innerHTML = "";
    emailVal = document.getElementById("add-email").value;
    correctEmail = true;
  } else {
    document.getElementById("add-email").style.color = "red";
    document.getElementById("message").innerHTML = "Not a valid input.";
    correctEmail = false;
  }
});

document
  .getElementById("add-email")
  .addEventListener("click", () => {
    document.getElementById("message").innerHTML = "";
  });


// adding a user -----------------------------------------------------------------------------
const radioButtons = document.querySelectorAll('input[name="admin"]');
let isAdminVal;
document.getElementById("submit").addEventListener("click", function (e) {
  e.preventDefault();
  for (const radioButton of radioButtons) {
    if (radioButton.checked) {
      isAdminVal = radioButton.value;
      break;
    }
  }

  let formData = {
    userName: document.getElementById("add-userName").value,
    firstName: document.getElementById("add-FirstName").value,
    lastName: document.getElementById("add-lastName").value,
    email: document.getElementById("add-email").value,
    password: document.getElementById("add-password").value,
    isAdmin: isAdminVal,
  };
  document.getElementById("add-userName").value = "";
  document.getElementById("add-FirstName").value = "";
  document.getElementById("add-lastName").value = "";
  document.getElementById("add-email").value = "";
  document.getElementById("add-password").value = "";
  document.getElementById("add-isAdmin").value = "";

  const xhr = new XMLHttpRequest();
  xhr.onload = function () {
    if (this.readyState == XMLHttpRequest.DONE) {
      // 200 means everthing worked
      if (xhr.status === 200) {
        if (
          document.getElementById("message").innerHTML == "Not a valid input."
        ) {
          document.getElementById("status").innerHTML = "";
        } else {
          document.getElementById("status").innerHTML = "DB updated.";
          document.getElementById("message").innerHTML = "";
        }

        getUsers();
      } else {
        // not a 200, could be anything (404, 500, etc.)
      }
    } else {}
  };
  xhr.open("POST", "/add-user");
  xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send(
    "userName=" +
    formData.userName +
    "&firstName=" +
    formData.firstName +
    "&lastName=" +
    formData.lastName +
    "&email=" +
    formData.email +
    "&password=" +
    formData.password +
    "&isAdmin=" +
    formData.isAdmin +
    "&profilePic=" +
    formData.profilePic
  );
});

//delete a user ------------------------------------------------------------------------------

document.getElementById("delete").addEventListener("click", function (e) {
  e.preventDefault();

  // document.getElementById("formList").addEventListener("submit", validate);

  let formData = {
    idNumber: document.getElementById("idToDelete").value,
  };
  document.getElementById("idToDelete").value = "";
  document.getElementById("message").innerHTML = "";

  ajaxPOST(
    "/delete-user",
    function (data) {
      if (data) {
        let dataParsed = JSON.parse(data);
        if (dataParsed.status == "fail") {
          document.getElementById("status").innerHTML = dataParsed.msg;
          setTimeout(function () {
            document.getElementById("status").innerHTML = "";
          }, 1500);
        } else {
          document.getElementById("status").innerHTML = dataParsed.msg;
          getUsers();
        }
      }
    },
    formData
  );
});


document.getElementById("about").addEventListener("click", () => {
  window.location.assign("/about");
});

document.getElementById("contact").addEventListener("click", () => {
  window.location.assign("/contactUs");
});

document.getElementById("faq").addEventListener("click", () => {
  window.location.assign("/faq");
});

document.getElementById("packageStatus").addEventListener("click", () => {
  window.location.assign("/updatePackageStatus");
});
