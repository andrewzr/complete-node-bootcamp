const fs = require("fs");
const superagent = require("superagent");

const readFilePro = file => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if (err) reject("Could not READ file :(");
            resolve(data);
        });
    });
};

const writeFilePro = (file, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, data, err => {
            if (err) reject("Could not WRITE file T_T");
            resolve("success");
        });
    });
};

const getDocPic = async () => {
    try {
        const data = await readFilePro(`${__dirname}/dog.txt`);
        console.log(`Breed: ${data}`);
    
        const res1Pro = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        const res2Pro = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        const res3Pro = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        const resAll = await Promise.all([res1Pro, res2Pro, res3Pro]);
        const images = resAll.map(el => el.body.message);
        console.log(images);
            
        await writeFilePro('dog-img.txt', images.join("\n"));
        console.log("Random dog images saved to file!");
    } catch (err) {
        console.log(err);
        throw err;
    }
    return "2: DOGGO PICTURES READY!";
};

(async () => {
    try {
        console.log("1: Will get dog pics!");
        const x = await getDocPic();
        console.log(x);
        console.log("3: Done getting dog pics!");
    } catch (err) {
        console.log("Error in promise");
    }
})();

// console.log("1: Will get dog pics!");
// getDocPic().then(x  => {
//     console.log(x);
//     console.log("3: Done getting dog pics!");
// }).catch(err => {
//     console.log("Error in promise");
// });

// readFilePro(`${__dirname}/dog.txt`)
//     .then(data => {
//         console.log(`Breed: ${data}`);
//         return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
//     })
//     .then(res => {
//         console.log(res.body.message);
//         return writeFilePro('dog-img.txt', res.body.message);
//     })
//     .then(() => {
//         console.log("Random dog image saved to file!");
//     })
//     .catch(err => {
//         console.log(err);
//     });