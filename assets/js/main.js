/** Progressive enhancement; all content and navigation work without JavaScript. */
const externalLinks = document.querySelectorAll('a[href^="https://"]');
for (const link of externalLinks) {
    link.relList.add('noopener', 'noreferrer');
}
const languageNotice = document.querySelector('#language-notice');
const languageNoticeCopy = document.querySelector('#language-notice-copy');
const languageAction = document.querySelector('#language-action');
if (languageNotice && languageNoticeCopy && languageAction) {
    const originalMarkup = new Map(Array.from(document.querySelectorAll('[data-i18n]'), (element) => [element, element.innerHTML]));
    const contentUrl = new URL('assets/content/site.json', document.baseURI);
    const likelyChina = navigator.languages.some((language) => /^zh(?:-|$)/i.test(language))
        || Intl.DateTimeFormat().resolvedOptions().timeZone === 'Asia/Shanghai';
    fetch(contentUrl).then((response) => {
        if (!response.ok)
            throw new Error(`Could not load translations: ${response.status}`);
        return response.json();
    }).then((site) => {
        const translations = {
            role: site.zh.role,
            affiliation: site.zh.affiliation,
            'heading.about': site.zh.headings.about,
            'heading.interests': site.zh.headings.interests,
            'heading.industry': site.zh.headings.industry,
            'heading.academia': site.zh.headings.academia,
            'heading.news': site.zh.headings.news,
            'heading.publications': site.zh.headings.publications,
            'interests.introduction': site.zh.interests.introduction,
            footer: site.zh.footer,
        };
        site.zh.about.forEach((value, index) => { translations[`about.${index}`] = value; });
        site.zh.interests.themes.forEach((value, index) => { translations[`interests.theme.${index}`] = value; });
        site.zh.news.forEach((item, index) => {
            translations[`news.${index}`] = `<time>[${item.date}]</time> ${item.text}`;
        });
        site.zh.publicationVenues.forEach((value, index) => { translations[`publicationVenue.${index}`] = value; });
        const applyLanguage = (useChinese) => {
            document.documentElement.lang = useChinese ? 'zh' : 'en';
            for (const element of document.querySelectorAll('[data-i18n]')) {
                const key = element.dataset.i18n;
                if (!key)
                    continue;
                if (useChinese && translations[key] !== undefined) {
                    const value = translations[key];
                    element.innerHTML = value.replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, '<a href="$2" rel="noopener noreferrer">$1</a>').replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
                }
                else if (!useChinese)
                    element.innerHTML = originalMarkup.get(element) ?? element.innerHTML;
            }
            languageNoticeCopy.innerHTML = useChinese
                ? '<span lang="en">Would you like to view this page in English?</span> <span lang="zh">您希望查看到英文页面吗？</span>'
                : '<span lang="zh">您希望查看到中文页面吗？</span> <span lang="en">Would you like to view this page in Chinese?</span>';
        };
        if (likelyChina) {
            languageNotice.hidden = false;
            applyLanguage(false);
            languageAction.addEventListener('click', () => applyLanguage(document.documentElement.lang !== 'zh'));
        }
    }).catch((error) => console.error(error));
}
export {};
