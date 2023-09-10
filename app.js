let groups = document.querySelector("[data-groups]");
let list = [...groups.querySelectorAll("li")];
let tableArea = document.querySelector(".center");
let groupSelected = document.querySelector(".logo h2");

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
  groupSelected.textContent = `" ${group.groupe} "`;
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
      tableArea.innerHTML = data;
      tableArea.classList.remove("blur");
    });
}
