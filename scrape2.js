const request = require('request');
const cheerio = require('cheerio');
//fs is a node module required to write to a file
//fs stands for file system
const fs = require('fs');
const writeStream = fs.createWriteStream('post.csv');

//Write Headers
//Note inside this function those are not commas. They are back ticks
writeStream.write(`Title,Link,Date \n`);

request('http://codedemos.com/sampleblog/', (error, response, html) => {
    if(!error && response.statusCode == 200){
        const $ = cheerio.load(html);

        //Inside replace function is a regular expression to get rid of extra white space in between titles
        //Since this will go into a CSV we will use a regular expression to remove the comma from the date and replace it with a space
        $('.post-preview').each((i, el) => {
            const title = $(el)
                .find('.post-title')
                .text()
                .replace(/\s\s+/g, ''); 
            const link = $(el)
                .find('a')
                .attr('href');
            const date = $(el)
                .find('.post-date')
                .text()
                .replace(/,/, '');

            //Write Row to CSV
            writeStream.write(`${title}, ${link}, ${date} \n`);
        });

        console.log('Scraping Done . . . ');
    }
});