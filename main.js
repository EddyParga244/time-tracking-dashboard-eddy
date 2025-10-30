// Example of loading and parsing static JSON data
fetch('./data.json')
    .then(response => response.json())
    .then(data => {
        // Use the 'data' object to populate your UI
        console.log(data);
    })
    .catch(error => console.error('Error loading data:', error));

let index;
for(index in data){
    let p = document.createElement("p");
}