//clicks accordion after clicking button

var button = document.getElementById('click-on-me');
button.addEventListener('click', clicksButton)

function clicksButton() {
    var accordion = document.getElementById('chck2');
    accordion.click()

}

