// dynamic viewport height that I use to fix 100vh pages across devices

let viewportHeight = window.innerHeight / 100 + "px";
document.documentElement.style.setProperty("--vh", viewportHeight);

window.addEventListener("resize", () => {
	viewportHeight = window.innerHeight / 100 + "px";
	document.documentElement.style.setProperty("--vh", viewportHeight);
});

//variable declarations below

const canvas = document.querySelector(".canvas");
const brushButton = document.querySelector(".toolbar-button.brush");
const eraserButton = document.querySelector(".toolbar-button.eraser");
const clearButton = document.querySelector(".toolbar-button.clear");
const resizeButton = document.querySelector(".toolbar-button.resize");
const colorPicker = document.querySelector(".toolbar-button.color-picker");
const modalOverlay = document.querySelector(".resize-modal");
const modalCloseButton = document.querySelector("#close-modal");
const gridSizeRange = document.querySelector(".size-selection");
const gridSizeSubmit = document.querySelector(".selection");
const gridDim = document.querySelectorAll(".grid-size>span");

let color = "black";
let dimension = 8;

let isDrawable = false;

resize(dimension);

// functions below

function resize(newDimension) {
	removePixels();
	dimension = newDimension;
	generateGrid();
}

function generateGrid() {
	canvas.style.setProperty(
		"grid-template",
		`repeat(${dimension}, 1fr) / repeat(${dimension}, 1fr)`
	);
	numberPixel = Math.pow(dimension, 2);
	for (let i = 0; i < numberPixel; i++) {
		const pixel = document.createElement("div");
		pixel.classList.add("pixel");
		pixel.setAttribute("draggable", "false");
		// pixelEvents();
		canvas.appendChild(pixel);
	}
}

function draw(e) {
	e.target.style.backgroundColor = color;
}

function removePixels() {
	const pixelArray = Array.from(document.querySelectorAll(".pixel"));
	pixelArray.forEach((node) => {
		node.remove();
	});

	isDrawable = false;
}

function setPixelEvents() {
	const pixels = document.querySelectorAll(".pixel");
	pixels.forEach((pixel) => pixel.addEventListener("mousemove", draw));
}

function openModal() {
	modalOverlay.classList.remove("no-visibility");
	resizeButton.classList.add("selected");
}
function closeModal() {
	modalOverlay.classList.add("no-visibility");
	resizeButton.classList.remove("selected");
	gridSizeRange.value = dimension;
	gridDim.forEach((item) => {
		item.innerText = dimension;
	});
}

function brush() {
	color = colorPicker.value;
	brushButton.classList.add("selected");
	eraserButton.classList.remove("selected");
}

function erase() {
	color = "white";
	eraserButton.classList.add("selected");
	brushButton.classList.remove("selected");
}

// event-listeners below

gridSizeRange.addEventListener("input", () => {
	gridDim.forEach((item) => {
		item.innerText = gridSizeRange.value;
	});
});

gridSizeSubmit.addEventListener("click", () => {
	dimension = gridSizeRange.value;
	closeModal();
	resize(dimension);
});

modalCloseButton.addEventListener("click", closeModal);

canvas.addEventListener("click", () => {
	isDrawable = !isDrawable;
	const pixels = document.querySelectorAll(".pixel");
	if (isDrawable) setPixelEvents();
	else pixels.forEach((pixel) => pixel.removeEventListener("mousemove", draw));
});

colorPicker.addEventListener("change", (e) => {
	color = e.target.value;
});

brushButton.addEventListener("click", brush);

eraserButton.addEventListener("click", erase);

resizeButton.addEventListener("click", openModal);

clearButton.addEventListener("click", () => {
	removePixels();
	generateGrid();
});

window.addEventListener("keydown", (e) => {
	switch (e.code) {
		case "KeyB":
			brush();
			break;
		case "KeyE":
			erase();
			break;
		case "KeyC":
			removePixels();
			generateGrid();
			break;
		case "KeyR":
			openModal();
			break;
	}
});
