"use strict";

[1, 2, 3].forEach(function (x) {
  return showItWorks();
});

function showItWorks() {
  document.getElementById("javascript-status").innerHTML = "JavaScript transpilation works!";
}