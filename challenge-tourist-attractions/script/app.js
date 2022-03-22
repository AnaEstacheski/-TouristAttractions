document.addEventListener("DOMContentLoaded", function () {
    const list = [];

    const form = document.querySelector(".tourist-spot-form");
    const imageInput = document.querySelector(".tourist-spot-image-input");
    const titleInput = document.querySelector(".tourist-spot-title-input");
    const descriptionInput = document.querySelector(".tourist-spot-description-input");
    const newSpots = document.querySelector(".new-tourist-spots-wrapper");
    const preview = document.querySelector(".tourist-spot-image-preview");
    const imageSpan = document.querySelector(".tourist-spot-image-span");

    form.addEventListener("submit", addSpotToList);

    imageInput.addEventListener("change", function () {
        const reader = new FileReader();
        reader.onload = function () {
            sessionStorage.setItem("imageURL", reader.result);
            preview.src = reader.result;
        }
        reader.readAsDataURL(imageInput.files[0]);

        imageSpan.style.display = "none";
    });
        
    function addSpotToList(event) {
        event.preventDefault();

        const spotImage = sessionStorage.getItem("imageURL");
        const spotTitle = event.target["spot-title"].value;
        const spotDescription = event.target["spot-description"].value;


        if (spotImage !== "" && spotTitle !== "" && spotDescription !== "") {
            const spot = {
                image: spotImage,
                title: spotTitle,
                description: spotDescription,
            };

            list.push(spot);
            renderListSpots();
            resetInputs();
        }
    }

    function renderListSpots() {
        let spotsStructure = "";

        list.forEach(function (spot) {
            spotsStructure += `
                <div class="tourist-spot">
                    <img class="tourist-spot-image" src="${spot.image}" alt="">
                    <div class="tourist-spot-text">
                        <h2 class="tourist-spot-title">${spot.title}</h2>
                        <p class="tourist-spot-description">
                        ${spot.description}
                        </p>
                    </div>
                </div>
                `;
        });
        newSpots.innerHTML = spotsStructure;
    }

    function resetInputs() {
        imageSpan.style.display = "inline-block";
        preview.src = "";
        imageInput.value = "";
        titleInput.value = "";
        descriptionInput.value = "";
    }
});
