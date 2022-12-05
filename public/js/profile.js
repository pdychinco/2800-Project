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
  document
    .querySelector("#donateButton")
    .addEventListener("click", function (e) {
      e.preventDefault;
      window.location.replace("/donate");
    });

  // GET TO THE SERVER
  document.querySelector("#account").addEventListener("click", function (e) {
    e.preventDefault;
    window.location.replace("/account");
  });
  document.querySelector("#packageButton").addEventListener("click", () => {
    ajaxPOST("/create-cart", function (data) {
      if (data) {
        let dataParsed = JSON.parse(data);
        if (dataParsed.status == "fail") {
          document.getElementById("errorMsg").innerHTML = dataParsed.msg;
          setTimeout(() => {
            document.getElementById("errorMsg").innerHTML = "";
          }, 1500);
        } else {
          window.location.assign("/package")
        }
      }
    }, "");

  })

  //for easter egg to drop dropLogo
let v = "";

let Ds = document.querySelectorAll(".D");

Ds.forEach(d => {
  d.addEventListener("click", function clickD() {
    if (v == "") {
      v += "d";
    } else {
      v = "";
    }
    console.log(v);
  });
})

let Rs = document.querySelectorAll(".R");

Rs.forEach(r => {
  r.addEventListener("click", function clickR() {
    if (v == "d") {
      v += "r";
    } else {
      v = "";
    }
    console.log(v);
  });
})


let Os = document.querySelectorAll(".O");

Os.forEach(o => {
  o.addEventListener("click", function clickO() {
    if (v == "dr") {
      v += "o";
    } else {
      v = "";
    }
    console.log(v);
  });
})

P.onclick = function () {
  if (v == "dro") {
    let start = Date.now();

    let timer = setInterval(function () {
      let timePassed = Date.now() - start;


      document.getElementById("dropLogo").style.top = timePassed / 5 + 'px';

      onFinish();

      if (timePassed > 4000) {
        clearInterval(timer)
      }

    }, 20);
    v = "";
    console.log(v);
  } else {
    v = "";
  }
}

function onFinish() {
  let start = Date.now();

  let timer = setInterval(function () {
    let timePassed = Date.now() - start;
    if (timePassed > 4000) {
      document.getElementById("dropLogo").style.display = "none";
    }
  })
}

  // GET TO THE SERVER
  document
    .querySelector("#notifButton")
    .addEventListener("click", function (e) {
      e.preventDefault;
      window.location.assign("/history");
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