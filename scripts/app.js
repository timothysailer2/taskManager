//example of changing the logic execution
function hello()
{
    console.log("Hello World");
}

function init ()
{
    
    console.log("app initialized");
}

//force my logic to run html and css first - once completed this will execute
window.onload = init;
