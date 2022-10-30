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
        <p>${book.name}</p>
        <p>${book.email}</p>
        <p>${book.isbn}</p> 
        </div>
        `;
                })
                .join("");
            document.querySelector("#app").insertAdjacentHTML("afterbegin", html);
        })
        .catch(error => {
            console.log(error);
        });
}

fetchData()