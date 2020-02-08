window.onerror = function (message, url, line, col, errorObj) {
    console.log(message);
    // const endURL = 'https://logs.malangsofware.com/create/istock';
    // fetch(endURL, {
    //     method: 'POST',
    //     data: new FormData().append('data', JSON.stringify({message, url, line, col, stack: errorObj.stack}))
    // })
    // // .then(function (res) {return res.json();} )
    // // .then(function () {console.log()})
    // .catch(console.log);
}