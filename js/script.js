'use strict'

{
  const templates = {
    articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
    articleTag: Handlebars.compile(document.querySelector('#template-article-tag').innerHTML),
    articleAuthor: Handlebars.compile(document.querySelector('#template-article-author').innerHTML),
    tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
    authorCloudLink: Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML)
  }

  /*document.getElementById('test-button').addEventListener('click', function(){
      const links = document.querySelectorAll('.titles a');
      console.log('links:', links);
    });*/

  const titleClickHandler = function (event) {

    event.preventDefault();

    const clickedElement = this;
    // console.log('Link was clicked!', event);

    /* [DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');

    for (let activeLink of activeLinks) {
      activeLink.classList.remove('active');
    }

    /* [DONE] add class 'active' to the clicked link */
    clickedElement.classList.add('active');
    // console.log('clickedElement', clickedElement);

    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('article.active');

    for (let activeArticle of activeArticles) {
      activeArticle.classList.remove('active');
    }
    /* [DONE] get 'href' attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute('href');
    // console.log('articleSelector: ', articleSelector);

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector);
    // console.log('targetArticle: ', targetArticle);

    /* [DONE] add class 'active' to the correct article */
    targetArticle.classList.add('active');
    // console.log(' add class active to the correct article', targetArticle);

  }

  const optArticleSelector = '.post';
  const optTitleSelector = '.post-title';
  const optTitleListSelector = '.titles';
  const optArticleTagsSelector = '.post-tags .list';
  const optTagsListSelector = '.tags.list';
  const optArticleAuthorSelector = '.post-author';
  const optCloudClassCount = '5';
  const optCloudClassPreix = 'tag-size-';
  const optAuthorsListSelector = '.authors';


  function generateTitleLinks(customSelector = '') {
    // console.log('funkcja została wywołana', customSelector);

    /* remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);

    titleList.innerHTML = '';
    // console.log('remove content of titleList', titleList);

    /* for each article */
    let html = '';

    const articles = document.querySelectorAll(optArticleSelector + customSelector);

    for (let article of articles) {
      // console.log(articles);

      /* get the article id */
      const articleId = article.getAttribute('id');
      // console.log('get the article id', articleId);

      /* find all the articles and save them to variable: articles */

      /* find the title element */
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
      // console.log(articleTitle);

      /* get the title from the title element */

      /* create HTML of the link */
      const linkHTMLData = { id: articleId, title: articleTitle };
      const linkHTML = templates.articleLink(linkHTMLData);

      /* insert link into titleList */
      titleList.insertAdjacentHTML('afterbegin', linkHTML);

      html = html + linkHTML;
    }

    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');

    for (let link of links) {
      link.addEventListener('click', titleClickHandler);
    }
  }



  function calculateTagsParams(tags) {
    const params = {
      min: 9999999,
      max: 0,
    };

    for (let tag in tags) {
      console.log(tag + ' is used ' + tags[tag] + ' times');


      if (tags[tag] > params.max) {
        params.max = tags[tag];
      }
      if (tags[tag] < params.min) {
        params.min = tags[tag];
      }
    }
    return params;
  }



  function calculateTagClass(count, params) {
    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
    return optCloudClassPreix + classNumber;
  }

  function generateTags() {

    /* [NEW] create a new variable allTags with an empty array */
    let allTags = {};

    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);

    /* START LOOP: for every article: */
    for (let article of articles) {

      /* find tags wrapper */
      const tagsWrapper = article.querySelector(optArticleTagsSelector);

      /* make html variable with empty string */
      let html = '';

      /* get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');

      /* split tags into array */
      const articleTagsArray = articleTags.split(' ');
      //console.log(articleTagsArray);

      /* START LOOP: for each tag */
      for (let tag of articleTagsArray) {

        /* generate HTML of the link */
        //const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';// w allTags jest numerek do tagów
        const linkHTMLData = {tag};
        const linkHTML = templates.articleTag(linkHTMLData);

        /* add generated code to html variable */
        html = html + linkHTML;

        /* [NEW] check if this link is NOT already in allTags */
        if (!allTags[tag]) {

          /* [NEW] add tag to allTags object */
          allTags[tag] = 1;
        } else {
          allTags[tag]++;

        }

        console.log(allTags[tag]);
        /* END LOOP: for each tag */
      }
      /* insert HTML of all the links into the tags wrapper */
      tagsWrapper.innerHTML = html;

    }/* END LOOP: for every article: */

    /* [NEW] find list of tags in right column */ // wzorowac sie przy chmurze autorów
    const tagList = document.querySelector(optTagsListSelector);

    /* [NEW] add html from allTags to tagList */

    //tagList.innerHTML = allTags.join(' ');

    const tagsParams = calculateTagsParams(allTags);
    console.log('tagsParams:', tagsParams);

    /* [NEW] create variable for all links HTML code */
    // let allTagsHTML = '';
    const allTagsData = { tags: [] };


    /* [NEW] START LOOP: for each tag in allTags: */
    for (let tag in allTags) {

      /* [NEW] generate code of a link and add it to allTagsHTML */

      //const tagLinkHTML = '<li><a class="' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '">' + tag + ' (' + allTags[tag] + ') ' + '</a>' + ' </li> ';
      const tagLinkHTML = calculateTagClass(allTags[tag], tagsParams);
      console.log('tagLinkHTML:', tagLinkHTML);

      allTagsData.tags.push({

        tag: tag,

        count: allTags[tag],

        className: calculateTagClass(allTags[tag], tagsParams)
      });
      console.log('tagLinkHTML', tagLinkHTML);
      //allTagsHTML = allTagsHTML + tagLinkHTML;
    }
    /* [NEW] END LOOP: for each tag in allTags: */

    /*[NEW] add HTML from allTagsHTML to tagList */
    // tagList.innerHTML = allTagsHTML;
    tagList.innerHTML = templates.tagCloudLink(allTagsData);
  }



  // Generate Tag Click Handler

  const tagClickHandler = function (event) {
    /* prevent default action for this event */
    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;

    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');

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
  function calculateAuthorsParams(authors) {
    const params = {
      min: 1,
      max: 5,
    };
    for (let author in authors) {
      params.max = Math.max(authors[author], params.max);
      params.min = Math.min(authors[author], params.min);
    }
    return params;
  }


  function calculateAuthorClass(count, params) {   //nie wykorzystuje tej funkcji
    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor(percentage * (optAuthorClassCount - 1) + 1);
    return optAuthorClassPrefix + classNumber;
  }

  function generateAuthors() {
    // Generate authors list
    let allAuthors = {};

    /* [DONE] find all articles */
    const articles = document.querySelectorAll(optArticleSelector);

    /* START LOOP: for every article: */
    for (let article of articles) {

      /* [DONE] find tags wrapper */
      const authorsList = article.querySelector(optArticleAuthorSelector);

      /* [DONE] make html variable with empty string */
      let html = '';

      /* [DONE] get author from data-author attribute */
      const articleAuthor = article.getAttribute('data-author');
      // console.log(articleAutors);
      const linkAuthorData = {author: articleAuthor},
      authorHTML = templates.articleAuthor(linkAuthorData);
      html = html + authorHTML;
      
      /* [DONE] generate HTML of the link */
      //const linkHTML = '<span> by </span><a href="#-author' + articleAuthor + '"><span>' + articleAuthor + '</span></a>';
      // console.log(tagLinkHTML);
      /* [DONE] add generated code to html variable */
      
      if (!allAuthors[articleAuthor]) {
        allAuthors[articleAuthor] = 1;
      } else {
        allAuthors[articleAuthor]++;
      }
      /* [DONE] insert HTML of all the links into the tags wrapper */
      authorsList.innerHTML = html;
      /* END LOOP: for every article: */
    }
    const authorsList = document.querySelector(optAuthorsListSelector);
    const authorsParams = calculateAuthorsParams(allAuthors);
    console.log('authorsParams:', authorsParams);

    /* [NEW] create variable for all links HTML code */
    //let allAuthorsHTML = '';
    let allAuthorsHTML = { allAuthors: [] };

    /* [NEW] START LOOP: for each tag in allAuthors: */
    for (let author in allAuthors) {

      /* [NEW] generate code of a link and add it to allAuthorsHTML */
      /*const authorsLinkHTML = '<li><a href="#-author' + author + '">' + author + ' (' + (allAuthors[author]) + ')</a></li>';
      console.log('authorsLinkHTML', authorsLinkHTML);
      allAuthorsHTML += authorsLinkHTML */               // tutaj jest coś nie tak
      allAuthorsHTML.allAuthors.push({
        author: author,
        count: allAuthors[author]
      });
    }

    /* [NEW] END LOOP: for each tag in allAuthors: */

    /*[NEW] add HTML from allAuthorsHTML to authorsList */
    //authorsList.innerHTML = allAuthorsHTML;
    authorsList.innerHTML = templates.authorCloudLink(allAuthorsHTML);
  }

  const authorClickHandler = function (event) {
    /* [DONE] prevent default action for this event */
    event.preventDefault();

    /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    //console.log('Autor Tag was clicked!!!');

    /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    //console.log(href);

    /* [DONE] make a new constant "tag" and extract tag from the "href" constant */
    const author = href.replace('#author-', '');

    /* [DONE] find all author links with class active */
    const authorLinks = document.querySelectorAll('a.active[href^="#author-"]');

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
    generateTitleLinks('[data-author="' + author + '"]');
  }

  function addClickListenersToAuthors() {
    /* [DONE] find all links to tags */
    const allLinksToAuthors = document.querySelectorAll('a[href^="#author-"]');

    /* START LOOP: for each link */
    for (let link of allLinksToAuthors) {

      /* [DONE] add authorClickHandler as event listener for that link */
      link.addEventListener('click', authorClickHandler);
    }

    /* END LOOP: for each link */
  }

  generateTitleLinks();
  calculateTagsParams();
  generateTags();
  addClickListenersToTags();
  calculateAuthorsParams();
  generateAuthors();
  addClickListenersToAuthors();

}

