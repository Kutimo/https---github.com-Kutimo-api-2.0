function fetchData() {
    fetch('http://localhost:8000/api/users')
        .then(response => {
            if (!response.ok) {
                throw Error("ERROR");
            }
            return response.json();
        })
        .then(data => {
            const html = data.data
                .map(book => {
                    return `
        <div class="book">
        <h2>${book.name}</h2>
        <p>${book.email}</p>
        <p>${book.isbn}</p> 
        </div>
        `;
                })
                .join("");
            document.querySelector("#books").insertAdjacentHTML("afterbegin", html);
        })
        .catch(error => {
            console.log(error);
        });
}

fetchData()