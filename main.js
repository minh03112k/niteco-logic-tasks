function debounce(fn, delay) {
  let timer = null;
  let beforeInput = "";

  return function () {
    let context = this;
    let args = arguments;

    let input = document.getElementById("search");

    clearTimeout(timer);
    timer = setTimeout(function () {
      if (beforeInput !== input.value) {
        fn.call(context, input.value);
      } else {
        console.log("keywords no change");
      }
      beforeInput = input.value;
    }, delay);
  };
}

function fetchUsers() {
  fetch("./data.json").then((res) => res.json());
}

fetchUsers();

function search(keywords) {
  let resultPanel = document.getElementById("result");
  setTimeout(function () {
    resultPanel.innerHTML = `The result of keywords: ${keywords}`;
  }, 200);
}

let inputEle = document.getElementById("search");
inputEle.addEventListener("input", debounce(search, 3000));
