let body = document.body;

let groups = document.querySelector("[data-groups]");
let list = [...groups.querySelectorAll("li")];
let tableArea = document.querySelector(".center");
let groupSelected = document.querySelector(".logo h2");

let toggle = document.querySelector(".toggle");
let themeIcon = document.querySelector(".fa-solid");

var themes = JSON.parse(localStorage.getItem("themes")) || {};

setTheme();
renderTheme();

function setTheme() {
  body.classList.add(`${themes["theme"]}`);
}

function renderTheme() {
  if (themes["theme"] == "light") {
    body.classList.add("light");
    body.classList.remove("dark");
    themeIcon.classList.remove("fa-moon");
    themeIcon.classList.add("fa-sun");
  } else {
    body.classList.add("dark");
    body.classList.remove("light");
    themeIcon.classList.add("fa-moon");
    themeIcon.classList.remove("fa-sun");
  }
}

toggle.addEventListener("click", () => {
  if (themes["theme"] == "light") {
    themes["theme"] = "dark";
    localStorage.setItem("themes", JSON.stringify(themes));
    renderTheme();
  } else {
    themes["theme"] = "light";
    localStorage.setItem("themes", JSON.stringify(themes));
    renderTheme();
  }
});

window.addEventListener("load", () => {
  let defaultGroup = { groupe: "DEVOWFS203" };

  list.forEach((item) => {
    if (item.id == defaultGroup.groupe) {
      item.classList.add("active");
    }
  });

  getSchedule(defaultGroup);
});

list.forEach((item) => {
  item.addEventListener("click", (e) => {
    let target = e.target;

    if (target.classList.contains("active")) {
      return;
    }

    list.forEach((item) => {
      item.classList.remove("active");
    });

    target.classList.add("active");
    let groupID = target.id.trim();

    let group = { groupe: groupID };
    getSchedule(group);
  });
});

function getSchedule(group) {
  groupSelected.textContent = ` ${group.groupe} `;
  tableArea.classList.add("blur");
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(group),
  };
  fetch("api.php", options)
    .then((res) => {
      return res.text();
    })
    .then((data) => {
      tableArea.innerHTML = "";
      console.log(data);
      // tableArea.innerHTML = data;
      tableArea.querySelectorAll("td").forEach((td) => {
        if (td.textContent != "-") {
          td.classList.add("check");
        } else {
          td.textContent = "";
        }
      });
      tableArea.innerHTML = replace(data, translationMap);
      tableArea.classList.remove("blur");
    });
}

const translationMap = {
  "Jour/Horaire": "Day/Time",
  LUNDI: "MONDAY",
  MARDI: "TUESDAY",
  MERCREDI: "WEDNESDAY",
  JEUDI: "THURSDAY",
  VENDREDI: "FRIDAY",
  SAMEDI: "SATURDAY",
  "08h30mn-11h00mn": "8:30 AM - 11:00 AM",
  "11h00mn-13h30mn": "11:00 AM - 1:30 PM",
  "13h30mn-16h00mn": "1:30 PM - 4:00 PM",
  "16h00mn-18h30mn": "4:00 PM - 6:30 PM",
  SALLE: "ROOM",
};

function replace(htmlText, translationMap) {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = htmlText;

  const textNodes = tempDiv.querySelectorAll("*");

  textNodes.forEach((node) => {
    const originalText = node.textContent.trim();
    const translatedText = translationMap[originalText];
    if (translatedText) {
      node.textContent = translatedText;
    }
  });

  return tempDiv.innerHTML;
}
