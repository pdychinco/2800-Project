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


  const buttonList = document.querySelectorAll(".add");
  for (let i = 0; i < buttonList.length; i++) {
    buttonList[i].addEventListener("click", () => {
      let itemID = i + 1;
      let quantityValue = document.getElementById(`quantityOf${itemID}`).value;
      let queryString = {
        "itemID": itemID,
        "quantity": quantityValue
      };
      ajaxPOST("/add-item", (data) => {
        if(data) {
          let parsedData = JSON.parse(data);
          if(parsedData.status == "fail") {
            document.getElementById("errorMsg").innerHTML = parsedData.msg;
            setTimeout(() => {
              document.getElementById("errorMsg").innerHTML = "";
            },2000);
          } else {
            buttonList[i].style.backgroundColor = '#d4b9f7';
            buttonList[i].value = 'Added to cart ✓';
            buttonList[i].setAttribute("disabled", "disabled");
          }
        }
      }, queryString);
    });
  }


  // GET TO THE SERVER
  document.querySelector("#dropLogo").addEventListener("click", function (e) {
    e.preventDefault;
    window.location.assign("/");
  });

  document.getElementById("account").addEventListener("click", function (e) {
    e.preventDefault;
    window.location.assign("/account");
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

  document.getElementById("cart").addEventListener("click", () => {
    window.location.assign("/cart");
  })
});

function ready(callback) {
  if (document.readyState != "loading") {
    callback();
  } else {
    document.addEventListener("DOMContentLoaded", callback);
  }
}