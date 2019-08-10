const fs = require('fs');

fs.readdir('../public/imagenes', function(err, files) {
    if (err) {
        throw err;
    }
    console.log(files)
    let html = `
    <!DOCTYPE html>
    <head>
        <meta charset="UTF-8">
        <!-- Latest compiled and minified CSS -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">              
        <title>
            big five
        </title>
    </head> 
    <body> 
    <h1> Estudio de personalidad de acuerdo al modelo de big five</h1>`
    files.forEach(imagen =>{
        html += `<img src='imagenes/${imagen}' > </br>`
    })
    html += `</body>    
    </html> `
    fs.writeFileSync('../public/resultado_R.html',html)

})