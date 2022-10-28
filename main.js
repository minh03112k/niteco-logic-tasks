function debounce(func, wait, immediate) {
    var timeout;

    return function executedFunction() {
        var context = this;
        var args = arguments;

        var later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };

        var callNow = immediate && !timeout;

        clearTimeout(timeout);

        timeout = setTimeout(later, wait);

        if (callNow) func.apply(context, args);
    };
}

var data = [];
var resultPanel = document.getElementById("result");
var inputEle = document.getElementById("search");

function fetchUsers() {
    fetch("./data.json").then((res) => {
        return res.json();
    }).then(res => {
        data = res
    });
}

fetchUsers();

function search() {
    let keywords = inputEle.value;
    let resultArray = data.filter(ele => ele.name.toLowerCase().includes(keywords))
    resultPanel.innerHTML = `The result for keywords:${inputEle.value}` + '<br>' + `${JSON.stringify(resultArray)}`;
}

inputEle.addEventListener("input", debounce(search, 3000));