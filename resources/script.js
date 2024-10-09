document.addEventListener('DOMContentLoaded', function () {
    const directoryToggle = document.querySelector('.directory-toggle');
    const directoryContainer = document.querySelector('.directory-container');
    const toggleIcon = document.querySelector('#toggle-icon');
    const articleDirectory = document.querySelector('.article-directory');
    const contentSelectors = ['.post-content', '.entry-content', '.article-content', '.markdown-body', '.content-body'];
    let isExpanded = false;

    // 初始状态，鼠标悬停提示为 "点击展开目录"
    directoryToggle.setAttribute('title', '展开目录');

    // 目录展开/收起动画
    directoryToggle.addEventListener('click', function () {
        isExpanded = !isExpanded;
        if (isExpanded) {
            directoryContainer.classList.add('directory-expanded');
            toggleIcon.setAttribute('data-icon', 'lets-icons:expand-right-double-light');
            directoryToggle.classList.add('moved-left');
            directoryToggle.setAttribute('title', '收起目录');  // 更新提示为 "点击收起目录"
        } else {
            directoryContainer.classList.remove('directory-expanded');
            toggleIcon.setAttribute('data-icon', 'lets-icons:expand-left-double-light');
            directoryToggle.classList.remove('moved-left');
            directoryToggle.setAttribute('title', '展开目录');  // 更新提示为 "点击展开目录"
        }
    });

    // 查找文章内容容器
    let content = null;
    for (let i = 0; i < contentSelectors.length; i++) {
        content = document.querySelector(contentSelectors[i]);
        if (content) break;
    }

    if (!content) {
        console.error("未能找到文章内容容器。");
        return;
    }

    // 生成目录
    const headings = content.querySelectorAll('h1, h2, h3, h4, h5, h6');
    if (headings.length === 0) {
        console.error("没有找到标题");
        return;
    }

    let tocHtml = '<ul>';
    let minLevel = 7;

    // 计算最小的标题层级
    headings.forEach((heading) => {
        const level = parseInt(heading.tagName.substring(1));
        if (level < minLevel) minLevel = level;
    });

    // 生成目录结构
    headings.forEach((heading, index) => {
        const level = parseInt(heading.tagName.substring(1));
        const indent = (level - minLevel) * 20;
        const anchor = `heading-${index}`;
        heading.id = anchor;
        tocHtml += `<li style="margin-left: ${indent}px;"><a href="#${anchor}" data-anchor="${anchor}">${heading.textContent}</a></li>`;
    });

    tocHtml += '</ul>';
    articleDirectory.innerHTML = tocHtml;

    // 点击目录跳转
    const tocLinks = document.querySelectorAll('.article-directory a');
    tocLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const targetId = event.target.getAttribute('data-anchor');
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 10,
                    behavior: 'smooth'
                });
                // 修改URL的hash值
                history.pushState(null, null, `#${targetId}`);
            }
        });
    });

    // 监听滚动并高亮当前标题
    window.addEventListener('scroll', function () {
        let currentHeadingId = null;
        const offset = window.innerHeight * 0.25;

        headings.forEach(function (heading) {
            const rect = heading.getBoundingClientRect();
            if (rect.top < offset && rect.bottom > 0) {
                currentHeadingId = heading.id;
            }
        });

        tocLinks.forEach(function (link) {
            if (link.getAttribute('data-anchor') === currentHeadingId) {
                link.classList.add('active');  // 高亮当前项
            } else {
                link.classList.remove('active');  // 移除高亮
            }
        });
    });
});

// 如果你用的是Joe主题请替换为以下内容（注释掉以上内容）：
// document.addEventListener('DOMContentLoaded', function () {
//     const directoryToggle = document.querySelector('.directory-toggle');
//     const directoryContainer = document.querySelector('.directory-container');
//     const toggleIcon = document.querySelector('#toggle-icon');
//     const articleDirectory = document.querySelector('.article-directory');
//     const contentSelector = '.joe_detail .joe_detail__article';  // 更加精确地选择文章正文部分
//     let isExpanded = false;

//     // 初始状态，鼠标悬停提示为 "点击展开目录"
//     directoryToggle.setAttribute('title', '点击展开目录');

//     // 目录展开/收起动画
//     directoryToggle.addEventListener('click', function () {
//         isExpanded = !isExpanded;
//         if (isExpanded) {
//             directoryContainer.classList.add('directory-expanded');
//             toggleIcon.setAttribute('data-icon', 'lets-icons:collapse-right-double-light');
//             directoryToggle.classList.add('moved-left');
//             directoryToggle.setAttribute('title', '点击收起目录');
//         } else {
//             directoryContainer.classList.remove('directory-expanded');
//             toggleIcon.setAttribute('data-icon', 'lets-icons:expand-left-double-light');
//             directoryToggle.classList.remove('moved-left');
//             directoryToggle.setAttribute('title', '点击展开目录');
//         }
//     });

//     // 查找文章内容容器，只查找 .joe_detail__article 内的标题
//     let content = document.querySelector(contentSelector);
//     if (!content) {
//         console.error("未能找到文章内容容器。");
//         return;
//     }

//     // 生成目录
//     const headings = content.querySelectorAll('h1, h2, h3, h4, h5, h6');
//     if (headings.length === 0) {
//         console.error("没有找到标题");
//         return;
//     }

//     let tocHtml = '<ul>';
//     let minLevel = 7;

//     // 计算最小的标题层级
//     headings.forEach((heading) => {
//         const level = parseInt(heading.tagName.substring(1));
//         if (level < minLevel) minLevel = level;
//     });

//     // 生成目录结构
//     headings.forEach((heading, index) => {
//         const level = parseInt(heading.tagName.substring(1));
//         const indent = (level - minLevel) * 20;
//         const anchor = `heading-${index}`;
//         heading.id = anchor;
//         tocHtml += `<li style="margin-left: ${indent}px;"><a href="#${anchor}" data-anchor="${anchor}">${heading.textContent}</a></li>`;
//     });

//     tocHtml += '</ul>';
//     articleDirectory.innerHTML = tocHtml;

//     // 点击目录跳转
//     const tocLinks = document.querySelectorAll('.article-directory a');
//     tocLinks.forEach(link => {
//         link.addEventListener('click', function (event) {
//             event.preventDefault();
//             const targetId = event.target.getAttribute('data-anchor');
//             const targetElement = document.getElementById(targetId);
//             if (targetElement) {
//                 window.scrollTo({
//                     top: targetElement.offsetTop - 10,
//                     behavior: 'smooth'
//                 });
//                 history.pushState(null, null, `#${targetId}`);
//             }
//         });
//     });

//     // 监听滚动并高亮当前标题
//     window.addEventListener('scroll', function () {
//         let currentHeadingId = null;
//         const offset = window.innerHeight * 0.25;

//         headings.forEach(function (heading) {
//             const rect = heading.getBoundingClientRect();
//             if (rect.top < offset && rect.bottom > 0) {
//                 currentHeadingId = heading.id;
//             }
//         });

//         tocLinks.forEach(function (link) {
//             if (link.getAttribute('data-anchor') === currentHeadingId) {
//                 link.classList.add('active');  // 高亮当前项
//             } else {
//                 link.classList.remove('active');  // 移除高亮
//             }
//         });
//     });
// });
