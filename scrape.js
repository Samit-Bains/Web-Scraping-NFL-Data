const request = require('request');
const cheerio = require('cheerio');

request('http://codedemos.com/sampleblog/', (error, response, html) => {
    if(!error && response.statusCode == 200){
        const $ = cheerio.load(html);

        const siteHeading = $('.site-heading');

        // console.log(siteHeading.html());
        // console.log(siteHeading.text());

        //This will find text in site-heading div with h1 tags
        // const output = siteHeading.find('h1').text();

        //Outout will be same as above. Finds children of site-heading div
        // const output = siteHeading.children('h1').text();

        //This will outpute the text that is after the h1
        // const output = siteHeading.children('h1').next().text();

        //We get text from the h1 and child
        // const output = siteHeading.children('h1').parent().text();

        // console.log(output);


        //How to loop through lists
        //each is a jquery function, where i is index and el is just a name we give it
        $('.nav-item a').each((i, el) => {
            const item = $(el).text();
            const link = $(el).attr('href');

            console.log(item);
            console.log(link);
        });
    }
});