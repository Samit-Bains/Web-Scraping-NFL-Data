const request = require('request');
const cheerio = require('cheerio');
//fs is a node module required to write to a file
//fs stands for file system
const fs = require('fs');
const writeStream = fs.createWriteStream('preWeek1.csv');

writeStream.write(`Date, AwayTeamRecord, AwayTeamName, AwayTeamScore, HomeTeamRecord, HomeTeamName, HomeTeamScore \n`);

request('http://www.nfl.com/scores/2018/PRE1', (error, response, html) => {
    if(!error && response.statusCode == 200){
        const $ = cheerio.load(html);

        //Inside replace function is a regular expression to get rid of extra white space in between titles
        //Since this will go into a CSV we will use a regular expression to remove the comma from the date and replace it with a space
        $('.new-score-box-wrapper').each((i, el) => {
            const date = $(el)
                .find('.date')
                .text()
                .replace(/,/, '');
            const AteamRecord = $(el)
                .find('.away-team')
                .children()
                .find('.team-record')
                .text()
                .replace(/\s\s+/g, '');
            const AteamName = $(el)
                .find('.away-team')
                .children()
                .find('.team-name')
                .text();
            const AteamScore = $(el)
                .find('.away-team')
                .children()
                .find('.total-score')
                .text();
            const HteamRecord = $(el)
                .find('.home-team')
                .children()
                .find('.team-record')
                .text()
                .replace(/\s\s+/g, '');
            const HteamName = $(el)
                .find('.home-team')
                .children()
                .find('.team-name')
                .text();
            const HteamScore = $(el)
                .find('.home-team')
                .children()
                .find('.total-score')
                .text();

            writeStream.write(`${date}, ${AteamRecord}, ${AteamName} , ${AteamScore}, ${HteamRecord}, ${HteamName}, ${HteamScore} \n`);
        });








        // $('.away-team').each((i, el) => {
        //     const AteamRecord = $(el)
        //         .find('.team-record')
        //         .text()
        //         .replace(/\s\s+/g, '');
        //     const AteamName = $(el)
        //         .find('.team-name')
        //         .text()
        //     const AteamScore = $(el)
        //         .find('.total-score')
        //         .text()
                
        //     writeStream.write(`${AteamRecord} \n, ${AteamName} \n, ${AteamScore} \n,`);
        // });

        // $('.home-team').each((i, el) => {
        //     const HteamRecord = $(el)
        //         .find('.team-record')
        //         .text()
        //         .replace(/\s\s+/g, '');
        //     const HteamName = $(el)
        //         .find('.team-name')
        //         .text()
        //     const HteamScore = $(el)
        //         .find('.total-score')
        //         .text()
                
        //     writeStream.write(`${HteamRecord} \n, ${HteamName} \n, ${HteamScore} \n`);
        // });

        console.log('Scraping Done . . . ');
    }
});