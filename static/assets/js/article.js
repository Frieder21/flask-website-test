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
                        const md = window.markdownit({

                        });
                        const html = md.render(text);
                        articleContainer.innerHTML = html;
                        container.appendChild(articleContainer);

                        for (let i = 0; i < document.getElementsByClassName("language-music-abc").length; i++) {
                            var abc = String(document.getElementsByClassName("language-music-abc")[i].innerText.replace(/\r?\n/g, " \n "));
                            ABCJS.renderAbc(e=document.getElementsByClassName("language-music-abc")[i].parentElement, t=abc);
                        }
                        for (let i = 0; i < document.getElementsByClassName("language-song").length; i++) {
                            var song = String(document.getElementsByClassName("language-song")[i].innerText.replace(/\r?\n/g, " \n "));
                            MDCHORDSJS.renderChord(element=document.getElementsByClassName("language-song")[i].parentElement, mdText=song);
                        }
                    });
            } else {
                // If the article was not found, display an error message
                articleContainer.innerHTML =
                    "Error: Article not found. Please check the name, number, or ID and try again. or return to <a href='/'>main page</a>";
                container.appendChild(articleContainer);
            }
        });
}

// Call the fetchAndRenderArticle() function when the page is completely loaded
window.onload = function() {
    // Get the article name from the URL query string
    const urlParams = new URLSearchParams(window.location.search);
    const articleName = urlParams.get('article');

    // Set the document title to the article name
    document.title = `frieda-univers: ${articleName}`;

    // Set the h2 element in the nav to the article name
    const nav = document.querySelector('nav h2');
    nav.textContent = articleName;

    // Fetch and render the article with the specified name
    fetchAndRenderArticle(articleName);


};