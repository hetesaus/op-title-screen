// TODO add more title screens
// TODO minimize title screens file size

// VARIABLES
const imageCount = 215;

// ELEMENTS
const image = document.getElementById('image');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');
const randomButton = document.getElementById('randomButton');
const imageIndex = document.getElementById('imageIndex');
const imageTotal = document.getElementById('imageTotal');

// MOUNT
let currentIndex = parseInt(getQueryParam('episode')) || getRandom();
if (currentIndex < 1 || currentIndex > imageCount) {
    currentIndex = getRandom();
}
showImage(currentIndex, false);
imageTotal.textContent = ` / ${imageCount}`;

// METHODS
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

function setQueryParam(param, value) {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set(param, value);
    window.history.replaceState({}, '', `${window.location.pathname}?${urlParams.toString()}`);
}

function showImage(index, updateQuery = true) {
    image.src = `Images/Screenshot_${index}.png`;
	imageIndex.textContent = `${index} / ${imageCount}`;
    updateImageIndex(index);
	updateButtonState(index);
	
	if(updateQuery) {
		setQueryParam('episode', index);
	}
}

function updateImageIndex(index) {
    imageIndex.textContent = `${index}`;
}

function updateButtonState(index) {
    prevButton.disabled = index === 1;
    nextButton.disabled = index === imageCount;
}

function getRandom() {
	return Math.floor(Math.random() * imageCount) + 1;
}

// BINDINGS
prevButton.addEventListener('click', () => {
    if (currentIndex > 1) {
        currentIndex--;
        showImage(currentIndex);
    }
});

randomButton.addEventListener('click', () => {
	currentIndex = getRandom();
    showImage(currentIndex);
});

nextButton.addEventListener('click', () => {
    if (currentIndex < imageCount) {
        currentIndex++;
        showImage(currentIndex);
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
        if (currentIndex > 1) {
            currentIndex--;
            showImage(currentIndex);
        }
    } else if (event.key === 'ArrowRight') {
        if (currentIndex < imageCount) {
            currentIndex++;
            showImage(currentIndex);
        }
    }
});