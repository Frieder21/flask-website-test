// Fetches and renders the newest article
function fetchAndRenderArticle(nameOrNumberOrId) {
    const container = document.getElementById("content");
    const articleContainer = document.createElement("div");

    fetch("/static/articles/articles.json")
        .then(response => response.json())
        .then(data => {
            let article;

            // Search for the article by its name, number, or ID
            for (let i = 0; i < data.length; i++) {
                if (
                    data[i].name === nameOrNumberOrId ||
                    data[i].number === nameOrNumberOrId ||
                    data[i].id === nameOrNumberOrId
                ) {
                    article = data[i];
                    break;
                }
            }

            // If the article was found, render it
            if (article) {
                articleContainer.id = article.id;
                fetch("/static/articles/" + article.url)
                    .then(response => response.text())
                    .then(text => {
                        const converter = new showdown.Converter({tables: true});
                        const html = converter.makeHtml(text);
                        articleContainer.innerHTML = html;
                        container.appendChild(articleContainer);
                    });
            } else {
                // If the article was not found, display an error message
                articleContainer.innerHTML =
                    "Error: Article not found. Please check the name, number, or ID and try again.";
                container.appendChild(articleContainer);
            }
        });
}
async function fetchAndRenderMultipleArticles(nameOrNumberOrId_list) {
    for (let i = 0; i < nameOrNumberOrId_list.length; i++) {
        await fetchAndRenderArticle(nameOrNumberOrId_list[i]);
    }
}

// Call the fetchAndRenderArticle() function when the page is completely loaded
window.onload = function() {
    fetchAndRenderMultipleArticles([2, 3])
};