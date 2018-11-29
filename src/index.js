const baseUrl = "http://localhost:3000/hogs";

const hogContainer = document.querySelector("#hog-container");
const hogForm = document.querySelector("#hog-form");



const createHog = (hogForm) => {
    return e => {
        e.preventDefault();
        saveHog(getHogObj(hogForm));
    }
}

const saveHog = (hogObj) => {
    fetch(baseUrl, {
        method: "POST",
        headers: {"Content-type" : "application/json"},
        body: JSON.stringify(hogObj)
    }).then(showHogs);
}

const getHogObj = (hogForm) => {
    return {
        name: hogForm.name.value,
        specialty: hogForm.specialty.value,
        "highest medal achieved": hogForm.medal.value,
        "weight as a ratio of hog to LG - 24.7 Cu. Ft. French Door Refrigerator with Thru-the-Door Ice and Water": hogForm.weight.value,
        image: hogForm.img.value,
        greased: hogForm.greased.checked
    }
}

const deleteHogEvent = (hog) => {
    return e => {
         fetch(`${baseUrl}/${hog.id}`, {
        method: "DELETE",
        headers: {"Content-type" : "application/json"},
        body: JSON.stringify(hog)
    }).then(showHogs);
    }
}

const updateHog = (hog) => {
    fetch(`${baseUrl}/${hog.id}`, {
        method: "PATCH",
        headers: {"Content-type" : "application/json"},
        body: JSON.stringify({greased: hog.greased})
    }).then(showHogs);
}

hogForm.addEventListener("submit", createHog(hogForm));

const fetchHogs = () => fetch(baseUrl).then(resp => resp.json());


const appendHog = (hog) => {
    const div = document.createElement("div");
    div.className = "hog-card";
    div.innerHTML = `<img src="${hog.image}">
                    <h2>${hog.name}</h2>
                    <h3>Speciality: ${hog.specialty}</h3>
                    <h3>Highest Medal: ${hog["highest medal achieved"]}</h3>`
    div.appendChild(makeCheckbox(hog));
    div.appendChild(document.createElement("br"));
    div.appendChild(makeDeleteBtn(hog));
    hogContainer.appendChild(div);
}

const makeDeleteBtn = (hog) => {
    const btn = document.createElement("button");
    btn.innerText = "Delete";
    btn.addEventListener("click", deleteHogEvent(hog));
    return btn;
}

const makeCheckbox = (hog) => {
    const span = document.createElement("span");
    span.innerText = "greased: ";
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = "greased";
    checkbox.value = "greased";
    hog.greased ? checkbox.checked = true : checkbox.checked = false;
    checkbox.addEventListener("change", () => {
        hog.greased = !hog.greased;
        updateHog(hog);
    })
    span.appendChild(checkbox);
    return span;
}

const appendHogs = (hogs) => {
    hogContainer.innerHTML = "";
    hogs.forEach(appendHog);
}


const showHogs = () => {
    fetchHogs().then(appendHogs);
}

showHogs();