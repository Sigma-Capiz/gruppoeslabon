let routeName;
let news = [];
let newsDiv, newsRecentDiv;
const blog = document.querySelector('#news');
window.onload = function () {
    // set active nav-item
    var mainRoute = window.location.pathname.split('/')[1];
    routeName = mainRoute.split('.')[0];
    setTimeout(() => {
      let navItem = document.querySelector(`[data-route="${routeName}"]`);
  
      if (navItem) {
        navItem.classList.add('active');
      }
  
      // set featured blog
      newsDiv = document.getElementById('featured-blog');
      newsRecentDiv = document.getElementById('recent-posts');
      if (newsDiv || newsRecentDiv) {
        const url = '/assets/files/news.json';
        fetch(url)
          .then((blob) => blob.json())
          .then((data) => news.push(...data));
      }
    }, 250);
  };

  function displayData() {
    if (newsDiv) {
      if (routeName === 'index') {
        news = news.slice(0, 1);
      }
      const html = news
        .sort((next, prev) => {
          let prevDate = new Date(prev.dateCreated);
          let nextDate = new Date(next.dateCreated);
          return prevDate - nextDate;
        })
        .map((data) => {
          return `
            <article class="entry">
              <div class="entry-img">
                <img src="${data.img}" alt="" class="img-fluid" />
              </div>
  
              <h2 class="entry-title">
                <a href="/news/news-detail.html" data-slug="${data.slug}" onclick="setNewsSlug(this)"
                  >${data.title}</a
                >
              </h2>
  
              <div class="entry-meta">
                <ul>
                  <li class="d-flex align-items-center">
                    <i class="bi bi-person"></i>
                    <a href="/news/news-detail.html" data-slug="${data.slug}" onclick="setNewsSlug(this)">${data.author}</a>
                  </li>
                  <li class="d-flex align-items-center">
                    <i class="bi bi-clock"></i>
                    <a href="/news/news-detail.html" data-slug="${data.slug}" onclick="setNewsSlug(this)"
                      ><time datetime="2020-01-01">${data.dateCreated}</time></a
                    >
                  </li>
              </div>
  
              <div class="entry-content">
                <p>
                ${Object.values(data.content)
                  .map((d) => `<p align="justify">${d}`)
                  .join('</p>')}
                </p>
                <div class="read-more">
                  <a href="/news/news-detail.html" data-slug="${
                    data.slug
                  }" onclick="setNewsSlug(this)">Read More</a>
                </div>
              </div>
            </article>
          `;
        })
        .join('');
      newsDiv.innerHTML = html;
    }
  
    if (newsRecentDiv) {
      console.log('news', news);
      const recentData = news
        .sort((next, prev) => {
          let prevDate = new Date(prev.dateCreated);
          let nextDate = new Date(next.dateCreated);
          return prevDate - nextDate;
        })
        .map((data) => {
          return `
          <div class="post-item clearfix">
            <img src="${data.img}" alt="" class="img-fluid" />
            <h4>
              <a href="/news/news-detail.html" data-slug="${data.slug}" onclick="setNewsSlug(this)">
                ${data.title}
              </a>
            </h4>
            <time datetime="${data.dateCreated}">${data.dateCreated}</time>
          </div>
          `;
        })
        .join('');
      newsRecentDiv.innerHTML = recentData;
    }
  }
  
  function setNewsSlug(e) {
    slug = e.getAttribute('data-slug');
    console.log('slug', slug);
    localStorage.setItem('blog-slug', slug);
  }
  
  function resolveAfter2Seconds() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('resolved');
      }, 2000);
    });
  }
  
  async function asyncCall() {
    console.log('calling main news');
    const result = await resolveAfter2Seconds();
    console.log(result);
    displayData();
    // expected output: "resolved"
  }
  
  asyncCall();