console.log("client side js is loaded");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", e => {
 e.preventDefault();
 const location = search.value;
 messageOne.textContent = "Loading...";
 messageTwo.textContent = "";
 console.log("e", location);
 fetch(`http://localhost:3000/weather?address=${location}`)
  .then(res => res.json())
  .then(res => {
   if (res.error) {
    console.log(res.error);
    messageOne.textContent = res.error;
   } else {
    messageOne.textContent = res.location;
    messageTwo.textContent = res.forecast;
    console.log(res.location);
    console.log(res.forecast);
   }
  });
});
