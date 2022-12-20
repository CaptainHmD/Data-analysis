//! requirement 

//! you must name the excel file: Tweets
//! and the name of the main page must be: page

const fs = require('fs')
const XLSX = require('xlsx')
const jsontoxml = require('jsontoxml')
//! files
const tweetsFileName = 'test'
const emptyFileName = 'test2'
const workBook = XLSX.readFile(`${tweetsFileName}.xlsx`)
const workBook2 = XLSX.readFile(`${emptyFileName}.xlsx`)//for range 
const worksheets = {}; //will store the data in object format

//!filtration 
const filtrationKeywords = "new"


var counter = 0;
for (const sheetName of workBook.SheetNames) {
    worksheets[sheetName] = XLSX.utils.sheet_to_json(workBook.Sheets[sheetName])
}
// console.log(JSON.stringify(workSheet.page[0].Tweet));
// console.log(worksheets.page[2].Tweet);
// const testFilter = worksheets.page[0].Tweet + '';


// if (testFilter.includes('انا')) {
//     console.log('true');
// }


// const tweeth = worksheets.page[0].Tweet+''
// if(tweeth.includes('انا')){
//     delete worksheets.page[0]
//     console.log(worksheets.page[0]);
// }
// console.log(worksheets.page[0]);
// console.log(worksheets.page[0]);
// delete worksheets.page[0]
//  console.log(worksheets.page[0]);
var counter = 0;
jsontoxml({
    worksheets: JSON.parse(JSON.stringify(Object.values(worksheets))).map(worksheet => worksheet.map(data => {
        if (!data) {
            counter++// increase counter for next object
            return
        }
        if(filtrationViaKeyword(counter,data)){
            delete worksheets.page[counter]
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
function filtrationViaKeyword(currentCounter,tweeth){
    const tweet = tweeth.Tweet + ""// convert to String to use includes method
    if (tweet.includes( filtrationKeywords )) { // search for keyword
        delete worksheets.page[counter]// if matched clear the tweet
        return true
    }
    return false
}
// worksheets.page.push({
//     "Tweet": "new",
//     "Likes": 727,
//     "Retweets": 727,
//     "Account": "new",
//     "Date": "2021-12-30",
//     "Hashtag": "test"
// })


// console.log(worksheets.page[0]);


// update the xslx files
//! the filter will not work if there is a data in the file sheet that you will write in , just empty file or you can add headers , it`s optional BTW   
XLSX.utils.sheet_add_json(workBook2.Sheets["page"], worksheets.page)
XLSX.writeFile(workBook2, "test3.xlsx")



//TODO: update main file after filtering
//TODO: 