var Crawler = require('../Crawler'),
    crawler = Crawler.Crawler(),
    domain = "wiringschematics.net",

    // Archive.org URL patterns
    // TODO: How to get this starting point given just the domain
    startUrl = 'https://web.archive.org/web/20120627105817/http://' + domain + '/',
    archivePattern = "^https:\/\/web\.archive\.org\/web\/\\d+\/http:\/\/" + domain + "\/",
    pagePattern = new RegExp(archivePattern),
    maxDate = '20121231',
    minDate = '20120101';

crawler
    .startUrl(startUrl)
    .follow(function(link) {
        var isArchive = pagePattern.test(link),
            dateMatches;

        if (isArchive) {
            dateMatches = /(\d{6})\d+/.exec(link);
            isArchive = (dateMatches[1] <= maxDate) && (dateMatches[1] >= minDate);
        }
        return isArchive;
    })
    .on('link.internal', function(link) {
        //console.log("[INTER] " + link.href)
    })
    .on('link.error', function(link) {
        console.log("[-" + link.statusCode + "-] " + link.href);

        // TODO: Create a sitemap.xml from this
        console.log(sitemap);
    });
