function checkForURL(inputText) {
    let regex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    return regex.test(inputText);
}

export { checkForURL };
