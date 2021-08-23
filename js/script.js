'use strict'

/*document.getElementById('test-button').addEventListener('click', function(){
    const links = document.querySelectorAll('.titles a');
    console.log('links:', links);
  });*/

  const titleClickHandler = function(event){
    
    event.preventDefault();
    
    const  clickedElement = this;
    console.log('Link was clicked!', event);
  
    /* [DONE] remove class 'active' from all article links  */
    
    const activeLinks = document.querySelectorAll('.titles a.active');

    for(let activeLink of activeLinks){
      activeLink.classList.remove('active');
    }

    /* [DONE] add class 'active' to the clicked link */
    
    clickedElement.classList.add('active');
        console.log('clickedElement', clickedElement);
  
    /* [DONE] remove class 'active' from all articles */
    
    const activeArticles = document.querySelectorAll('article.active');

    for(let activeArticle of activeArticles){
        activeArticle.classList.remove('active');
    }
    /* [DONE] get 'href' attribute from the clicked link */
    
    const articleSelector = clickedElement.getAttribute('href');
        console.log('articleSelector: ' , articleSelector);
    
    /* [DONE] find the correct article using the selector (value of 'href' attribute) */
    
    const targetArticle = document.querySelector(articleSelector);
        console.log('targetArticle: ', targetArticle);
    
    /* [DONE] add class 'active' to the correct article */
    
    targetArticle.classList.add('active');
        console.log(' add class active to the correct article', targetArticle);

  }

  const optArticleSelector = '.post';
  const optTitleSelector = '.post-title';
  const optTitleListSelector = '.titles';
  const optArticleTagsSelector = '.post-tags .list';
  const optTagsListSelector = '.tags.list';
  const optArticleAuthorSelector ='.post-author';
  const optTagsListSelector = '.tags.list';
  
function generateTitleLinks(customSelector = '') {
  console.log('funkcja została wywołana', customSelector);

  /* remove contents of titleList */

  const titleList = document.querySelector(optTitleListSelector);
      
  titleList.innerHTML = '';
      console.log('remove content of titleList' , titleList);

  /* for each article */
  
  let html = '';

  const articles = document.querySelectorAll(optArticleSelector + customSelector);

  for(let article of articles){
    console.log(articles);
      
    /* get the article id */
      
    const articleId = article.getAttribute('id');
          console.log('get the article id', articleId);
        
    /* find all the articles and save them to variable: articles */

    /* find the title element */

    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
        console.log(articleTitle);
    
    /* get the title from the title element */

    /* create HTML of the link */
    
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
        console.log(linkHTML);
    
    /* insert link into titleList */
    
    titleList.insertAdjacentHTML('afterbegin', linkHTML);
    
    html = html + linkHTML;
    console.log(html);

    }
       
  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');
      console.log('links: ', links); 

  for(let link of links){
      link.addEventListener('click', titleClickHandler);
  }
}

    generateTitleLinks();

function generateTags(){
/* [NEW] create a new variable allTags with an empty array */
  let allTags = [];

  /* find all articles */

  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */

  for(let article of articles){

  /* find tags wrapper */

  const tagsWrapper = article.querySelector(optArticleTagsSelector);

  /* make html variable with empty string */
  
  let html = '';
  
  /* get tags from data-tags attribute */

  const articleTags = article.getAttribute('data-tags');

  /* split tags into array */
  
  const articleTagsArray = articleTags.split(' ');
    console.log(articleTagsArray);

      /* START LOOP: for each tag */
  
  for(let tag of articleTagsArray){
    console.log(tag);
      
  /* generate HTML of the link */
      
    const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
    console.log(linkHTML);
      
  /* add generated code to html variable */
          
    html = html + linkHTML;
    console.log(html);
  /* [NEW] check if this link is NOT already in allTags */
    
    if(allTags.indexOf(linkHTML) == -1){
      
  /* [NEW] add generated code to allTags array */
    
    allTags.push(linkHTML);

  }/* END LOOP: for each tag */

  /* insert HTML of all the links into the tags wrapper */

  }/* END LOOP: for every article: */
  
  /* [NEW] find list of tags in right column */
  
  const tagList = document.querySelector('.tags');

  /* [NEW] add html from allTags to tagList */
  
  tagList.innerHTML = allTags.join(' ');
}
      
generateTags();

// Generate Tag Click Handler

const tagClickHandler = function (event) {
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log('Tag was clicked!!!');

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log(href);

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');

  /* find all tag links with class active */
  const tagLinks = document.querySelectorAll('a.active[href^="#tag-"]');

  /* START LOOP: for each active tag link */

  /* remove class active */
  for (let tagLink of tagLinks) {
    tagLink.classList.remove('active');
  }

  /* END LOOP: for each active tag link */

  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagLinksHref = document.querySelectorAll('a[href="' + href + '"]');

  /* START LOOP: for each found tag link */

  /* add class active */
  for (let tagLinkHref of tagLinksHref) {
    tagLinkHref.classList.add('active');
  }

  /* END LOOP: for each found tag link */

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
  /* find all links to tags */
  const allLinksToTags = document.querySelectorAll('a[href^="#tag-"]');

  /* START LOOP: for each link */
  for (let link of allLinksToTags) {

    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler);
  }
/* END LOOP: for each link */
}

function generateAuthors() {
  /* [DONE] find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */
  for (let article of articles) {

    /* [DONE] find tags wrapper */
    const titleList = article.querySelector(optArticleAuthorSelector);

    /* [DONE] make html variable with empty string */
    let html = '';

    /* [DONE] get author from data-author attribute */
    const authorTags = article.getAttribute('data-author');
    // console.log(articleAutors);

    /* [DONE] generate HTML of the link */
    const authorLinkHTML = '<span>by </span><a href="#-author' + authorTags + '"><span>' + authorTags + '</span></a>';
    // console.log(tagLinkHTML);

    /* [DONE] add generated code to html variable */
    html += authorLinkHTML;

    /* [DONE] insert HTML of all the links into the tags wrapper */
    titleList.innerHTML = titleList.innerHTML + authorLinkHTML;

    /* END LOOP: for every article: */
  }
}

const authorClickHandler = function (event) {
  /* [DONE] prevent default action for this event */
  event.preventDefault();

  /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log('Autor Tag was clicked!!!');

  /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log(href);

  /* [DONE] make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#-author', '');

  /* [DONE] find all author links with class active */
  const authorLinks = document.querySelectorAll('a.active[href^="#-author"]');

  /* START LOOP: for each active author link */

  /* [DONE] remove class active */
  for (let authorLink of authorLinks) {
    authorLink.classList.remove('active');
  }

  /* END LOOP: for each active author link */

  /* [DONE] find all tag links with "href" attribute equal to the "href" constant */
  const authorLinksHref = document.querySelectorAll('a[href="' + href + '"]');

  /* START LOOP: for each found author link */

  /* [DONE] add class active */
  for (let authorLinkHref of authorLinksHref) {
    authorLinkHref.classList.add('active');
  }

  /* END LOOP: for each found author link */

  /* [DONE] execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + tag + '"]');
}

function addClickListenersToAuthors() {
  /* [DONE] find all links to tags */
  const allLinksToAuthors = document.querySelectorAll('a[href^="#-author"]');

  /* START LOOP: for each link */
  for (let link of allLinksToAuthors) {

    /* [DONE] add authorClickHandler as event listener for that link */
    link.addEventListener('click', authorClickHandler);
  }

  /* END LOOP: for each link */
}

generateTitleLinks();
generateTags();
addClickListenersToTags();
generateAuthors();
addClickListenersToAuthors();
}
