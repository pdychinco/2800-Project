"use strict";
ready(function () {
  function ajaxGET(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        callback(this.responseText);
      }
    };
    xhr.open("GET", url);
    xhr.send();
  }

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



  document.getElementById("dropLogo").addEventListener("click", function (e) {
    e.preventDefault;
    window.location.assign("/");
  });

  document.getElementById("about").addEventListener("click", function (e) {
    e.preventDefault;
    window.location.assign("/about");
  });

  document.getElementById("contact").addEventListener("click", function (e) {
    e.preventDefault;
    window.location.assign("/contactus");
  });

  document.getElementById("faq").addEventListener("click", function (e) {
    e.preventDefault;
    window.location.assign("/faq");
  });

  document.getElementById("packageStatus").addEventListener("click", () => {
    window.location.assign("/updatePackageStatus");
  });

  const realFileButton = document.getElementById("fileInput");
  const customFileButton = document.getElementById("customButton");
  const customText = document.getElementById("customText");

  customFileButton.addEventListener("click", function () {
    realFileButton.click();
  });

  const uploadPhotoButton = document.getElementById("uploadPhoto");


  realFileButton.addEventListener("change", function () {
    if (realFileButton.value) {
      customText.innerHTML = realFileButton.value;
    } else {
      customText.innerHTML = "No file chosen";
    }
  });


  function getPackages() {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      if (this.readyState == XMLHttpRequest.DONE) {
        // 200 means everthing worked
        if (xhr.status === 200) {
          let data = JSON.parse(this.responseText);
          if (data.status == "success") {
            let str = `        <tr>
  <th class="packageID_header"><span>Package ID</span></th>
  <th class="userID_header"><span>User ID</span></th>
  <th class="date_header"><span>Date</span></th>
  <th class="isDelivered_header"><span>is Delivered</span></th>
  <th class="img_header"><span>Image</span></th>
  </tr>`;

            for (let i = 0; i < data.rows.length; i++) {
              let row = data.rows[i];

              str +=
                "<tr></td><td class='packageID'><span>" +
                row.packageID +
                "</span></td><td class='userID'><span>" +
                row.userID +
                "</span></td><td class='firstName'><span>" +
                row.postdate.slice(0, 10) +
                " " +
                row.postdate.slice(12, 19) +
                "</span></td><td class='isDelivered'><span>" +
                row.isDelivered +
                "</span></td><td class='image'><span>" +
                row.img +
                "</span>" +
                "</td></tr>";
            }

            document.getElementById("packageTable").innerHTML = str;
          } else {

          }
        } else {
          // not a 200, could be anything (404, 500, etc.)

        }
      } else {

      }
    };
    xhr.open("GET", "/get-packageStatus");
    xhr.send();
  }
  getPackages();

  // To update package database ------------------------------------------------------
  let v;

  const input = document.querySelector("#fileInput");
  input.onchange = (e) => {
    const [file] = e.target.files;
    //add /img/ to file name for pathing
    v = "/img/" + file.name;
  }

  document.getElementById("submit").addEventListener("click", () => {

    customText.innerHTML = "No file chosen";

    uploadPhotoButton.click();

    let dataToSend = {
      packageID: document.getElementById("packageIdInput").value,
      isDelivered: 1,
      img: v
    };

    console.log("dataToSend is " + dataToSend.img);

    document.getElementById("packageIdInput").value = "";
    document.getElementById("message").innerHTML = "";
    ajaxPOST(
      "/update-packages",
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
            setTimeout(function () {
              document.getElementById("status").innerHTML = "";
            }, 1500);
            getPackages();
          }
        }
      }, dataToSend);
  });
});



// -------------------------------------------------------------------------------------
function ready(callback) {
  if (document.readyState != "loading") {
    callback();
  } else {
    document.addEventListener("DOMContentLoaded", callback);
  }
}