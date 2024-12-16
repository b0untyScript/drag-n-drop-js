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