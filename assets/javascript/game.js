let money = 0;
let writtenLines = 0;
let project = new Project();
const stageElement = document.getElementById('stage');
const moneyElement = document.getElementById('money');
const office = document.getElementById('office');
const writtenLinesElement = document.getElementById('project-progress');
const employees = document.querySelector('#office > .employees');
const menu = document.querySelector('#menus');
const buttons = document.getElementsByClassName('developer__button');
const mainDeveloper = developers.find(developer => developer.id === 'main-guy');
const developersElement = document.getElementById('developers__menu');

window.onload = function startGame() {
  mainDeveloper.levelUp(1);
  office.addEventListener("click", click);
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", improveDeveloper);
    buttons[i].parentElement.parentElement.firstElementChild.firstElementChild.addEventListener("click", showDeveloper);
  }
  stageElement.innerHTML= "You are in the stage "+stage;
  outsourcedWork();
  updateMoney();
  updateDeveloper(mainDeveloper);
};

function outsourcedWork() {
  developers.forEach(developer => {
    if(developer.level > 0 && developer !== mainDeveloper) {
      writtenLines += developer.performance();
    }
  });
  updatePerformance();
  setTimeout(outsourcedWork, 1000);
}

function updateMoney() {
  moneyElement.innerHTML = '$'+money
}

function updatePerformance() {
  writtenLinesElement.innerHTML = "You have written " + writtenLines + " lines of code!";
  if (writtenLines >= project.linesOfCode) {
    writtenLines = 0;
    givePayment(project.payment);
    stage++;
    project = new Project;
    stageElement.innerHTML = "You are in the stage: "+stage;
  }
}

function givePayment(value) {
  money += value;
  updateMoney();
}

function improveDeveloper(event) {
  let developer_id = event.target.parentNode.parentNode.id;
  let developer = developers.find(developer => developer.id === developer_id);
  let price = developer.price();
  if(money >= price) {
    money = money - price;
    updateMoney();
    developer.levelUp(1);
    updateDeveloper(developer);
    if(developer.level === 1){
      employees.innerHTML += '<img alt="' + developer.name + '" class="developer" src="assets/images/employees/' + developer.id + '.png">'
    }
  }
}

function updateDeveloper(developer) {
  let developerElement = document.getElementById(developer.id);
  let developerPosition = developers.indexOf(developer);
  let developerAttributes = developerElement.childNodes[3];
  developerElement.childNodes[1].classList = 'developer__icon';
  developerAttributes.childNodes[1].classList = 'developer__attribute';
  developerAttributes.childNodes[3].innerHTML = 'Level: ' + developer.level;
  developerAttributes.childNodes[3].classList = 'developer__attribute';
  developerAttributes.childNodes[5].innerHTML = 'Lines/Click: ' + developer.performance();
  developerAttributes.childNodes[5].classList = 'developer__attribute';
  developerAttributes.childNodes[7].innerHTML = 'Price: ' + developer.price() + '$';
  developerAttributes.childNodes[7].classList = 'developer__attribute';
  developerAttributes.childNodes[9].innerHTML = 'Improve skills';
  if(developersElement.lastElementChild === developerElement && developerPosition < developers.length-1){
    addNewMenuDeveloper(developers[developerPosition+1]);
  }
}

function click() {
  writtenLines = writtenLines + mainDeveloper.performance();
  updatePerformance();
}

function addNewMenuDeveloper(developer) {
  developersElement.insertAdjacentHTML( "beforeend", "<div id="+ developer.id +" class=\"developer__menu\">\n" +
    "        <div class=\"developer__icon--inactive\">\n" +
    "          <img alt="+ developer.name +" class=\"developer\" src=\"assets/images/employees/"+developer.id+".png\">\n" +
    "        </div>\n" +
    "        <div class=\"developer__attributes\">\n" +
    "          <p class=\"developer__attribute--inactive\">Name: "+ developer.name +"</p>\n" +
    "          <p class=\"developer__attribute--inactive\">Level: "+ developer.level +"</p>\n" +
    "          <p class=\"developer__attribute--inactive\">Lines/Click: 0</p>\n" +
    "          <p class=\"developer__attribute--inactive\">Price: "+ developer.price() +"$</p>\n" +
    "          <button class=\"developer__button\" >Hire this developer</button>\n" +
    "        </div>\n" +
    "      </div>");
  developersElement.lastElementChild.lastElementChild.lastElementChild.addEventListener("click", improveDeveloper);
  developersElement.lastElementChild.firstElementChild.lastElementChild.addEventListener("click", showDeveloper)
}

function showDeveloper() {
  //show a modal with the dev information
}