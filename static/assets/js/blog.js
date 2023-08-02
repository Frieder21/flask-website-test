function fetchAndRenderBlog(name) {
    fetch("/static/blog/blog.json")
        .then(response => response.json())
        .then(data => {
            let blog;
            for (let i = 0; i < data.length; i++) {
                if (
                    data[i].name === name
                ) {
                    blog = data[i];
                    break;
                }
            }
            if (blog) {
                fetch("/static/blog/" + blog.dict + "/article.json")
                    .then(response => response.json())
                    .then(async articles => {
                        console.log(articles.length);
                        for (let i = articles.length-1; -1 < i; i--) {
                            const articleResponse = await fetch(`/static/blog/${blog.dict}/${articles[i].url}`);
                            const markdown = await articleResponse.text();
                            const converter = new showdown.Converter({tables: true});
                            const html = converter.makeHtml(markdown);
                            const container = document.getElementById("content");
                            const articleContainer = document.createElement("div");
                            articleContainer.innerHTML = html;
                            container.appendChild(articleContainer);
                        }
                    });
            }else {
                const container = document.getElementById("content");
                const articleContainer = document.createElement("div");
                articleContainer.innerHTML =
                    "Error: Blog not found. Please check the name. return to <a href='/'>main page</a>";
                container.appendChild(articleContainer);
            }
        }
    );
}


// Call the fetchAndRenderArticle() function when the page is completely loaded
window.onload = function() {
    // Get the article name from the URL query string
    const urlParams = new URLSearchParams(window.location.search);
    const blogName = urlParams.get('blog');

    // Set the document title to the article name
    document.title = `frieda-univers: ${blogName}`;

    // Set the h2 element in the nav to the article name
    const nav = document.querySelector('nav h2');
    nav.textContent = blogName;

    // Fetch and render the article with the specified name

    fetchAndRenderBlog(blogName);


};