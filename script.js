let newX = 0, newY = 0, startX = 0, startY = 0;

const card = document.querySelector(".card")

card.addEventListener("mousedown", mouseDown);

function mouseDown(event) {
    startX = event.clientX;
    startY = event.clientY;

    document.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseup', mouseUp);
}

function mouseMove(event) {
    newX = startX - event.clientX;
    newY = startY - event.clientY;

    startX = event.clientX;
    startY = event.clientY;

    card.style.top = (card.offsetTop - newY) + "px";
    card.style.left = (card.offsetLeft - newX) + "px";

    // console.log({ newX, newY });
    // console.log({ startX, startY });

}

function mouseUp(event) {
    document.removeEventListener("mousemove", mouseMove);
}


// notes with drag n drop

let color = document.querySelector(".color");
let createBtn = document.querySelector(".createBtn");
let list = document.querySelector(".list");

createBtn.onclick = () => {
    let newNote = document.createElement("div");
    newNote.classList.add("note");
    newNote.innerHTML = `
        <span class="close">x</span>
        <textarea
        placeholder="Write Content..."
        rows="10" cols="30"></textarea>
        `;
    newNote.style.borderColor = color.value;
    list.appendChild(newNote);
};

document.addEventListener("click", (params) => {
    if (params.target.classList.contains("close")) {
        params.target.parentNode.remove();
    }
});

let cursor = {
    x: null,
    y: null
};
let note = {
    dom: null,
    x: null,
    y: null
};

document.addEventListener("mousedown", (params) => {
    if (params.target.classList.contains("note")) {
        cursor = {
            x: params.clientX,
            y: params.clientY
        }
        note = {
            dom: params.target,
            x: params.target.getBoundingClientRect().left,
            y: params.target.getBoundingClientRect().top
        };
        console.table(cursor);
    }
});

document.addEventListener("mousemove", (params) => {
    if (note.dom == null) return;
    let currentCursor = {
        x: params.clientX,
        y: params.clientY
    };
    let distance = {
        x: currentCursor.x - cursor.x,
        y: currentCursor.y - cursor.y
    };
    note.dom.style.left = (note.x + distance.x) + "px";
    note.dom.style.top = (note.y + distance.y) + "px";
    note.dom.style.cursor = "grab";
});

document.addEventListener("mouseup", () => {
    if (note.dom == null) return;
    note.dom.style.cursor = "auto";
    note.dom = null;
});