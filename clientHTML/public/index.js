const randomImgContainer = document.getElementById('random-container');
const input = document.getElementById("input-1");
const inputButton = document.getElementById("input-btn");




const fetchRandomImages = async () => {
    try {
        const data = await fetch(`${window.location.origin}/api/img`);

        if (!data.ok) {
            throw new Error("An error occurred while fetching the data");
        }
        const parseData = await data.json();
        return parseData;
    } catch (error) {
        console.error(error);
        return [];
    }
}

const showImages = async () => {
    const images = await fetchRandomImages();
    let html = "";
    images.forEach(image => {
        const { id, img_url } = image;
        html += `<div class=img-container><img id="${id}"src="${window.location.origin + img_url}" alt="cat number ${id}" class="img-shown"></div>`;
    });
    randomImgContainer.innerHTML = html;
};

showImages();


const fetchOneImage = async (id) => {
    try {
        const data = await fetch(`${window.location.origin}/api/img/${id}`);
        if (!data.ok) {
            throw new Error(`HTTP Error! Status: ${data.status}`);
        }
        const parseData = await data.json();
        return parseData;
    } catch (error) {
        console.error(error);
        return null;
    }
}


const showOneImage = (imgData) => {
    randomImgContainer.innerHTML = ""; // Limpiar contenido

    if (!imgData) {
        const errorMsg = document.createElement("h1");
        errorMsg.textContent = "No encontré tu imagen :(";
        randomImgContainer.appendChild(errorMsg);
        return;
    }

    const { id, url } = imgData;
    const div = document.createElement("div");
    div.className = "img-container";

    const img = document.createElement("img");
    img.id = id;
    img.src = url;
    img.alt = `cat number ${id}`;
    img.className = "img-shown";

    div.appendChild(img);
    randomImgContainer.appendChild(div);
};






inputButton.addEventListener("click", async () => {
    const inputValue = input.value.trim();

    if (!inputValue) {
        alert("Ingrese un id valido");
        return;
    }
    const ImgData = await fetchOneImage(inputValue);
    showOneImage(ImgData);
})