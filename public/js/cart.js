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

  // GET TO THE SERVER
  document
    .querySelector("#proceedPayment")
    .addEventListener("click", () => {
      window.location.assign("/packagePayment");
      
    });

  document.getElementById("account").addEventListener("click", function (e) {
    e.preventDefault;
    window.location.replace("/account");
  });

  let notPushed = true;

  document.getElementById("deleteCart").addEventListener("click", function (e) {
    e.preventDefault;
    if (notPushed) {
      ajaxGET("/delete-cart", (data) => {
        if (data) {
          let dataParsed = JSON.parse(data);
          if (dataParsed.status == "fail") {}
        }
      });
      const deleted = document.querySelector('.container');
      deleted.style.gridTemplateColumns = "100%";
      deleted.style.gridTemplateRows = "100%";
      document.querySelector('.container').innerHTML = "";
      const text = document.createElement("p");
      let message = document.createTextNode("Cart has been deleted");
      text.appendChild(message);
      text.setAttribute("id", "message");
      text.setAttribute("class", "centertext")
      text.style.justifySelf = "stretch";
      text.style.gridColumn = "1";
      text.style.gridRow = "1";
      text.style.alignSelf = "center";
      text.style.fontSize = "20px";
      deleted.insertAdjacentElement("beforeend", text);
      notPushed = false;
      document.getElementById("deleteCart").style.visibility = "hidden";
      document.getElementById("proceedPayment").style.visibility = "hidden";
      document.getElementById("totalAmount").style.visibility = "hidden";
    }
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
});

function ready(callback) {
  if (document.readyState != "loading") {
    callback();
  } else {
    document.addEventListener("DOMContentLoaded", callback);
  }
}