//! requirement 

//! you must name the excel file: Tweets
//! and the name of the main page must be: page

const fs = require('fs')
const XLSX = require('xlsx')
const jsontoxml = require('jsontoxml')


const workBook = XLSX.readFile('test.xlsx')
const workBook2 = XLSX.readFile('test4.xlsx')
// console.log(workBook);
const worksheets = {};
var counter = 0;
for (const sheetName of workBook.SheetNames) {
    // const row =(XLSX.utils.sheet_to_json(workBook.Sheets[sheetName])).page[counter].Tweet + '';
    // if (row.includes('انا')) {
    //     console.log('fawfiwsuhfwisoefhuesihuf');
    //     console.log(row);
    // } else {
        worksheets[sheetName] = XLSX.utils.sheet_to_json(workBook.Sheets[sheetName])
    // }
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
console.log(worksheets.page[0]);
 delete worksheets.page[0]
 console.log(worksheets.page[0]);
jsontoxml({
    worksheets: JSON.parse(JSON.stringify(Object.values(worksheets))).map(worksheet => worksheet.map(data => {
        if(!data){
            console.log('no data');
            return
        }
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


// worksheets.page.push({
//     "Tweet": "new",
//     "Likes": 727,
//     "Retweets": 727,
//     "Account": "new",
//     "Date": "2021-12-30",
//     "Hashtag": "test"
// })


console.log(worksheets.page[0]);


// update the xslx files
//! the filter will not work if there is a data in the file sheet , the header are requirement for range 
XLSX.utils.sheet_add_json(workBook2.Sheets["page"], worksheets.page)
XLSX.writeFile(workBook2, "test4.xlsx")