const accessKey = "V8XgXcPgfiJgByvNkTn8pxgqCFDMk1vgJxR5Jg2kFUM";

const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMoreBtn = document.getElementById("show-more-btn");

let keyword = "";
let page = 1;

async function searchImages() {
    keyword = searchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;
    const response = await fetch(url);
    const data = await response.json(); // Await the JSON parsing


    // if (page === 1) {
    //     searchResult.innerHTML = ""
    // }


    if (page === 1) {
        while (searchResult.firstChild) {
            searchResult.removeChild(searchResult.firstChild);
        }
    }
    
// console.log(response)

    console.log(data);

    const results = data.results;
    if (results) { // Check if results is defined
        results.map((result) => {
            const image = document.createElement("img");
            image.src = result.urls.small;
            const imageLink = document.createElement("a");
            imageLink.href = result.links.html;
            imageLink.target = "_blank";

            imageLink.appendChild(image);
            searchResult.appendChild(imageLink);
        })

        showMoreBtn.style.display = "block";
        ;
    } else {
        console.error("No results found.");
    }
}

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    searchImages();
});


showMoreBtn.addEventListener("click", () => {
    page++;
    searchImages();
})