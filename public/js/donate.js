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

   // GET TO THE SERVER
   document.querySelector("#dropLogo").addEventListener("click", function (e) {
    e.preventDefault;
    window.location.replace("/");
  });

  document.querySelector("#submit").addEventListener("click", function (e) {

    e.preventDefault();
    let amount = document.getElementById("amount").value;
    let queryString = "amount=" + amount;

    ajaxPOST(
      "/donate",
      function (data) {
        if (data) {
          let dataParsed = JSON.parse(data);
          if (dataParsed.status == "fail") {
            document.getElementById("errorMsg").innerHTML = dataParsed.msg;
            setTimeout(function () {
              document.getElementById("errorMsg").innerHTML = "";
            }, 1500);
          } else {
            window.location.replace("/donatePayment");
          }
        }
      },
      queryString
    );
  });
  document.getElementById("home").addEventListener("click", function (e) {
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
});

function ready(callback) {
  if (document.readyState != "loading") {
    callback();
  } else {
    document.addEventListener("DOMContentLoaded", callback);
  }
}