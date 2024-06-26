module.exports = ((temp, product) => {
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