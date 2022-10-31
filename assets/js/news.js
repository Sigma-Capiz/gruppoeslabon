const url = '/assets/files/news.json';
let servicesContent = [];
let slug;
const entryDiv = document.getElementById('entry-single');
slug = localStorage.getItem('blog-slug');
console.log(slug);
fetch(url)
  .then((blob) => blob.json())
  .then((data) => servicesContent.push(...data));

function displayBlog() {
  console.log('servicesContent', servicesContent);
  const html = servicesContent
    .filter((data) => data.slug === slug)
    .map((data) => {
      var x = document.querySelectorAll('.page-title');
      for (var i = 0; i < x.length; i++) {
        x[i].innerHTML = data.title;
      }
      return `
            <article class="entry entry-single">
                <div class="entry-img">
                    <a href="${data.pdf}">
                    <img
                    src="${data.img}"
                    alt=""
                    class="img-fluid"
                    />
                    </a>
                </div>

                <a href="${data.pdf}"><h2 class="entry-title">${data.title}</h2></a> <h5>(Click on the image to view publication)</h5>

                <div class="entry-meta">
                    <ul>
                    <li class="d-flex align-items-center">
                        <i class="bi bi-person"></i>
                        ${data.author}
                    </li>
                    <li class="d-flex align-items-center">
                        <i class="bi bi-clock"></i>
                        <time datetime="2020-01-01">${data.dateCreated}</time>
                    </li>
                    </ul>
                </div>
                <div class="entry-content">
                ${Object.values(data.content)
                  .map((d) => `<p align="justify">${d}`)
                  .join('</p>')}
                </div>

                <div class="entry-footer">
                    <i class="bi bi-tags"></i>
                    <ul class="tags">
                    ${Object.values(data.categories)
                      .map((d) => `<li>${d}`)
                      .join('</li>')}
                    </ul>
                </div>
                </article>
            </div>
            `;
    })
    .join('');
  console.log('html', html);
  entryDiv.innerHTML = html;
}

function resolveAfter2Seconds() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('resolved');
    }, 2000);
  });
}

async function asyncCall() {
  console.log('calling news');
  const result = await resolveAfter2Seconds();
  console.log(result);
  displayBlog();
  // expected output: "resolved"
}

asyncCall();
