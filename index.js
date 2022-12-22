//! requirement 

//! you must name the excel file: Tweets
//! and the name of the main page must be: page

//! Import section 
const XLSX = require('xlsx')
const jsontoxml = require('jsontoxml')


var matchCounter = 0;
var counter = 0;

//! files
const tweetsFileName = 'Tweets'
const emptyFileName = 'emptyExcelFile'
const workBook = XLSX.readFile(`${tweetsFileName}.xlsx`)
const workBook2 = XLSX.readFile(`${emptyFileName}.xlsx`)//for range 
const worksheets = {}; //will store the data in object format

//!filtration keyword 
const filtrationKeywords = 'اعلان' //? the keyword for filtering 

//Reading data from workBook and store it in sheetName as json
for (const sheetName of workBook.SheetNames) {
    worksheets[sheetName] = XLSX.utils.sheet_to_json(workBook.Sheets[sheetName])
}


var counter = 0;
jsontoxml({
    worksheets: JSON.parse(JSON.stringify(Object.values(worksheets)))
    .map(worksheet => worksheet.map(data => {
        if (!data) {
            counter++// increase counter for next object
            return
        }
        if(filtrationViaKeyword(data)){
            matchCounter++ // to count the matched tweets
            counter++ // increase counter for next object
            return
        }

        counter++// increase counter for next object
        for (property in data) {
            const newPropertyName = property.replace(/\s/g, "");
            if (property !== newPropertyName) {
                Object.defineProperty(data, newPropertyName,
                    Object.getOwnPropertyDescriptor(data, property));
                delete data[property];
            }
        }
        return data;
    }))
}, {})
function filtrationViaKeyword(tweeth){
    const tweet = tweeth.Tweet + ""// convert to String to use includes method
    if (tweet.includes( filtrationKeywords )) { // search for keyword
        delete worksheets.page[counter]// if matched clear the tweet
        return true // to increase the counter for next object
    }
    return false // return false and store the data
}
// worksheets.page.push({
//     "Tweet": "new",
//     "Likes": 727,
//     "Retweets": 727,
//     "Account": "new",
//     "Date": "2021-12-30",
//     "Hashtag": "test"
// })


// update the xslx files
//! the filter will not work if there is a data in the file sheet that you will write in , 
//! just empty file or you can add headers , it`s optional BTW   
XLSX.utils.sheet_add_json(workBook2.Sheets["page"], worksheets.page)
XLSX.writeFile(workBook2, "filteredTweets.xlsx")
console.log('matchCounter: ',matchCounter);
console.log('Done');

