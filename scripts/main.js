let viewportHeight = window.innerHeight / 100 + "px";
document.documentElement.style.setProperty("--vh", viewportHeight);

window.addEventListener("resize", () => {
	viewportHeight = window.innerHeight / 100 + "px";
	document.documentElement.style.setProperty("--vh", viewportHeight);
});
