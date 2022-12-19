//! requirement 

//! you must name the excel file: Tweets
//! and the name of the main page must be: page

const fs = require('fs')
const XLSX = require('xlsx')
const jsontoxml = require('jsontoxml')


const workBook = XLSX.readFile('test.xlsx')
// console.log(workBook);
const worksheets ={};
for(const sheetName of workBook.SheetNames){
    worksheets[sheetName]=XLSX.utils.sheet_to_json(workBook.Sheets[sheetName])
}

// console.log(JSON.stringify(workSheet.page[0].Tweet));
console.log(worksheets.page[0].Tweet);
const testFilter = worksheets.page[0].Tweet+'';


if(testFilter.includes('انا')){
    console.log('true');
}


 jsontoxml({
    worksheets: JSON.parse(JSON.stringify(Object.values(worksheets))).map(worksheet => worksheet.map(data => {
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


worksheets.page.push({
    "Tweet":"new",
    "Likes":727,
    "Retweets":727,
    "Account":"new",
    "Date":"2021-12-30",
    "Hashtag":"test"
})






// update the xslx files
XLSX.utils.sheet_add_json(workBook.Sheets["page"],worksheets.page)
XLSX.writeFile(workBook,"test.xlsx")