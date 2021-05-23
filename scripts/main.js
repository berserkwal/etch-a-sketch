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
const randomizeButton = document.querySelector(".toolbar-button.randomize");
const modalOverlay = document.querySelector(".resize-modal");
const modalCloseButton = document.querySelector("#close-modal");
const windowMaximizeButton = document.querySelector("#maximize-window");
const windowCloseButton = document.querySelector("#close-window");
const windowMinimizeButton = document.querySelector("#minimize-window");
const gridSizeRange = document.querySelector(".size-selection");
const gridSizeSubmit = document.querySelector(".selection");
const gridDim = document.querySelectorAll(".grid-size>span");
const appIcon = document.querySelector(".app-icon");
const appWindow = document.querySelector(".window");

let color = "black";
let dimension = 24;

let isDrawable = false;
let isRandom = false;

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
	if (isRandom)
		e.target.style.backgroundColor = `rgb(${Math.floor(
			Math.random() * 256
		)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)})`;
	else e.target.style.backgroundColor = color;
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
	pixels.forEach((pixel) => pixel.addEventListener("mouseover", draw));
}

function openModal() {
	modalOverlay.classList.remove("no-visibility");
	setTimeout(
		() =>
			document.querySelector(".card").classList.remove("no-visibility-window"),
		1
	);
	resizeButton.classList.add("selected");
}
function closeModal() {
	// modalOverlay.classList.add("no-visibility");
	resizeButton.classList.remove("selected");
	document.querySelector(".card").classList.add("no-visibility-window");
	setTimeout(() => modalOverlay.classList.add("no-visibility"), 400);
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
	isRandom = false;
	eraserButton.classList.add("selected");
	brushButton.classList.remove("selected");
	randomizeButton.classList.remove("selected");
}

function randomize() {
	if (randomizeButton.classList.contains("selected")) {
		isRandom = false;
		randomizeButton.classList.remove("selected");
	} else {
		isRandom = true;
		randomizeButton.classList.add("selected");
	}
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
	else pixels.forEach((pixel) => pixel.removeEventListener("mouseover", draw));
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
		case "KeyX":
			randomize();
			break;
	}
});

randomizeButton.addEventListener("click", randomize);

windowMaximizeButton.addEventListener("click", () => {
	appWindow.classList.toggle("maximized");
});

windowCloseButton.addEventListener("click", () => {
	appWindow.classList.add("no-visibility-window");
	document.querySelector(".background-blur").classList.add("no-visibility");
	removePixels();
	generateGrid(dimension);
	brush();
	isRandom = false;
	isDrawable = false;
});

windowMinimizeButton.addEventListener("click", () => {
	appWindow.classList.add("no-visibility-window");
	document.querySelector(".background-blur").classList.add("no-visibility");
});

appIcon.addEventListener("dblclick", () => {
	console.log("double click");
	document.querySelector(".background-blur").classList.remove("no-visibility");
	appWindow.classList.remove("no-visibility-window");
});
