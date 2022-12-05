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


function getCartHistory() {
  const xhr = new XMLHttpRequest();
  xhr.onload = function () {
    if (this.readyState == XMLHttpRequest.DONE) {
      // 200 means everthing worked
      if (xhr.status === 200) {
        let data = JSON.parse(this.responseText);
        if (data.status == "success") {
          let str = `        <tr>
<th class="userName_header"><span>Package ID</span></th>
<th class="firstName_header"><span>Date</span></th>
<th class="email_header"><span>Purchased</span></th>
</tr>`;

          for (let i = 0; i < data.rows.length; i++) {
            let row = data.rows[i];
            str +=
              "<tr><td class='userName'><span>" +
              row.packageID +
              "</span></td><td class='firstName'><span>" +
              row.postdate.slice(0, 10) +
              " " +
              row.postdate.slice(12, 19) +
              "</span>" +
              "</td><td class='email'><span>" +
              (row.purchased ? "Yes" : "No") +
              "</span></tr>";
          }
          document.getElementById("packages").innerHTML = str;
        } else {}
      } else {
        // not a 200, could be anything (404, 500, etc.)

      }
    } else {

    }
  };
  xhr.open("GET", "/get-packages");
  xhr.send();
}
getCartHistory();

function getDonateHistory() {
  const xhr = new XMLHttpRequest();
  xhr.onload = function () {
    if (this.readyState == XMLHttpRequest.DONE) {
      // 200 means everthing worked
      if (xhr.status === 200) {
        let data = JSON.parse(this.responseText);
        if (data.status == "success") {
          let str = `        <tr>
<th class="userName_header"><span>Donate ID</span></th>
<th class="firstName_header"><span>Date</span></th>
<th class="lastName_header"><span>Amount</span></th>
</tr>`;

          for (let i = 0; i < data.rows.length; i++) {
            let row = data.rows[i];

            str +=
              "<tr><td class='userName'><span>" +
              row.donateID +
              "</span></td><td class='firstName'><span>" +
              row.postdate.slice(0, 10) +
              " " +
              row.postdate.slice(12, 19) +
              "</span></td><td class='lastName'><span>$" +
              row.amount +
              "</span>" +
              "</td></tr>";
          }

          document.getElementById("donation").innerHTML = str;
        } else {

        }
      } else {
        // not a 200, could be anything (404, 500, etc.)

      }
    } else {

    }
  };
  xhr.open("GET", "/get-donation");
  xhr.send();
}
getDonateHistory();
