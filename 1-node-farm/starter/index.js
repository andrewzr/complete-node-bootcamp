const fs = require('fs');
const http = require('http');
const url = require('url');

// Blocking, synchronous way
// const textIn = fs.readFileSync('./txt/input.txt', 'utf8');
// console.log(textIn);
// const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOut);
// console.log('output.txt written');

// Non-blocking, asynchronous way
// fs.readFile('./txt/start.txt', 'utf8', (err, data) =>{
//     fs.readFile(`./txt/${data}.txt`, 'utf8', (err, text) =>{
//         console.log(text);
//         fs.readFile('./txt/append.txt', 'utf8', (err, text2) =>{
//             console.log(text2);
//             fs.writeFile('./txt/final.txt', `${text}\n${text2}`, 'utf8', err =>{
//                 console.log('final.txt written')
//             });
//         });
//     });
// });
// console.log('This gets written first!');

// Server
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf8');
const dataObj = JSON.parse(data);

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf8');

const replaceTemplate = ((temp, product) => {
    let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = output.replaceAll(`{%IMAGE%}`, product.image);
    output = output.replaceAll(`{%PRICE%}`, product.price);
    output = output.replaceAll(`{%FROM%}`, product.from);
    output = output.replaceAll(`{%NUTRIENTS%}`, product.nutrients);
    output = output.replaceAll(`{%QUANTITY%}`, product.quantity);
    output = output.replaceAll(`{%DESCRIPTION%}`, product.description);
    output = output.replaceAll(`{%ID%}`, product.id);
    if(!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
    return output;
});

const server = http.createServer((req, res) =>{
    
    const baseURL = `http://${req.headers.host}`;
    const requestURL = new URL(req.url, baseURL);
    
    const pathName = requestURL.pathname;
    const query = requestURL.searchParams.get('id');

    // Overview page
    if(pathName === '/' || pathName === '/overview') {
        res.writeHead(200, {'Content-Type': 'text/html'});
        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
        res.end(output);
    
    // Product page
    } else if (pathName === '/product') {
        res.writeHead(200, {'Content-Type': 'text/html'});
        const product = dataObj[query];
        const output = replaceTemplate(tempProduct, product);
        res.end(output);
    
    // API
    } else if (pathName === '/api') {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end('API');

    // Not found
    } else {
        res.writeHead(404, 'Page not found!', {
            'Content-Type': 'text/html',
            'my-own-header': 'hello world'
        });
        res.end('<h1>Error 404: Page not found!</h1>');
    }
});

server.listen(8000, '127.0.0.1', () =>{
    console.log('listening to requests on port 8000');
});