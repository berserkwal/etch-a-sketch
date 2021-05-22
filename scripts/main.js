let viewportHeight = window.innerHeight / 100 + "px";
document.documentElement.style.setProperty("--vh", viewportHeight);

window.addEventListener("resize", () => {
	viewportHeight = window.innerHeight / 100 + "px";
	document.documentElement.style.setProperty("--vh", viewportHeight);
});

const canvas = document.querySelector(".canvas");
const brushButton = document.querySelector(".toolbar-button.brush");
const eraserButton = document.querySelector(".toolbar-button.eraser");
const clearButton = document.querySelector(".toolbar-button.clear");
const resizeButton = document.querySelector(".toolbar-button.resize");
const colorPicker = document.querySelector(".toolbar-button.color-picker");

// let method = brush;
let color = "black";
let dimension = 12;

let isDrawable = false;

resize(dimension);

colorPicker.addEventListener("change", (e) => {
	color = e.target.value;
});

brushButton.addEventListener("click", () => {
	// brush();
	color = colorPicker.value;
	brushButton.classList.add("selected");
	eraserButton.classList.remove("selected");
});

eraserButton.addEventListener("click", () => {
	// eraser();
	color = "white";
	// method = eraser;
	eraserButton.classList.add("selected");
	brushButton.classList.remove("selected");
});

clearButton.addEventListener("click", () => {
	removePixels();
	generateGrid();
});

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
}

function pixelEvents() {
	const pixels = document.querySelectorAll(".pixel");
	pixels.forEach((pixel) => pixel.addEventListener("mousemove", draw));
}

canvas.addEventListener("click", () => {
	isDrawable = !isDrawable;
	const pixels = document.querySelectorAll(".pixel");
	if (isDrawable) pixelEvents();
	else pixels.forEach((pixel) => pixel.removeEventListener("mousemove", draw));
});
