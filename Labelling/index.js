//! requirement 

//! you must name the excel file: Tweets
//! and the name of the main page must be: page

//! Import section 
const XLSX = require('xlsx')
const jsontoxml = require('jsontoxml')


var matchCounter = 0;
var counter = 0;
const relatedTweets=[]
//! files
const tweetsFileName = 'test'
const emptyFileName = 'emptyExcelFile'
const workBook = XLSX.readFile(`${tweetsFileName}.xlsx`)
const workBook2 = XLSX.readFile(`${emptyFileName}.xlsx`)//for range 
const workBook3 = XLSX.readFile('label.xlsx')//for range 
const worksheets = {}; //will store the data in object format
const labelSheets = {}; //will store the data in object format

//!filtration keyword 
const filtrationKeywords = 'انتهت' //? the keyword for filtering 

//Reading data from workBook and store it in sheetName as json
for (const sheetName of workBook.SheetNames) {
    worksheets[sheetName] = XLSX.utils.sheet_to_json(workBook.Sheets[sheetName])
}
for (const sheetName of workBook3.SheetNames) {
    labelSheets[sheetName] = XLSX.utils.sheet_to_json(workBook3.Sheets[sheetName])
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

        delete worksheets.page[counter]["Likes"]
        delete worksheets.page[counter]["Retweets"]
        delete worksheets.page[counter]["Account"]
        delete worksheets.page[counter]["Date"]
        Object.assign( worksheets.page[counter], {الغذاء: "hola"});
        Object.assign( worksheets.page[counter], {state: "1"});
        console.log(worksheets.page[counter]);
        relatedTweets.push(worksheets.page[counter])
        delete worksheets.page[counter]// if matched clear the tweet
        return true // to increase the counter for next object
    }
    return false // return false and store the data
}

// worksheets.page.push({
//     "": "",
//     "test": 727,
//     "hi": 727,
// })
// console.log(relatedTweets);

// update the xslx files
//! the filter will not work if there is a data in the file sheet that you will write in , 
//! just empty file or you can add headers , it`s optional BTW   
XLSX.utils.sheet_add_json(workBook2.Sheets["page"], worksheets.page)
XLSX.writeFile(workBook2, "testrow.xlsx")



labelSheets.page.push(...relatedTweets)
console.log(labelSheets.page);
XLSX.utils.sheet_add_json(workBook3.Sheets["page"], labelSheets.page)
XLSX.writeFile(workBook3, "TestlabelSheets.xlsx")



console.log('matchCounter: ',matchCounter);
console.log('Done');

