const tagBtn = document.getElementById("add-tag-btn");
const tagSelect = document.getElementById("tags");
const tagList = document.getElementById("tag-list");
const imageForm = document.getElementById("upload-form-id");
const image = document.getElementById("img-id");
const tags = [];

//TODO ADD REMOVE BUTTON IN TAG BUTTON

const addToTagList = () => {
    const tag = tagSelect.value;
    const pElement = document.createElement("p");
    pElement.id = tag;
    pElement.className = "tag";
    pElement.textContent = tag;
    const existAlready = document.getElementById(tag);
    if (!existAlready) {
        tagList.appendChild(pElement);
        tags.push(tag);
    };
};

imageForm.addEventListener("submit", async (e) => {  //  TODO:SEPARATE INTO FUNCTIONS
    e.preventDefault();
    try {
        const request = await fetch("/api/auth/me");
        if (!request.ok) throw new Error("No autenticado");
        const userdata = await request.json();
        const formData = new FormData();
        formData.append("imagen", image.files[0]);
        formData.append("tags", JSON.stringify(tags));
        formData.append("user_id", userdata.id);
        formData.append("description", null);
        const uploadImgRequest = await fetch("/api/img/upload", {
            method: "POST",
            body: formData,
        })
        if (!uploadImgRequest.ok) {
            throw new Error("No se pudo subir la imagen");
        }
        showImgSuccess();
    } catch (error) {
        console.error(error);
    }

});

tagBtn.addEventListener("click", () => {
    addToTagList();
});

window.addEventListener("unload", () => {
    tags = [];
});