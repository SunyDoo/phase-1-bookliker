document.addEventListener("DOMContentLoaded", ()=> {
    getAllBooks()
//fetch all books
    function getAllBooks(){
        fetch ('http://localhost:3000/books')
        .then (res=>res.json())
        .then(data=>data.forEach(bookObj=>renderOneBook(bookObj)))

    }
    function patchBook(e){
        return fetch (`http://localhost:3000/books/${e.target.id}`)
               .then (res=>(res.json()))
    }
    
//render one book to the DOM
    function renderOneBook(bookObj){
        const bookList = document.getElementById('list')
        const item = document.createElement('li')
        item.dataset.bookId = bookObj.id
        bookList.appendChild(item)
        item.textContent = bookObj.title
        item.addEventListener('click', displayBook)
//function that displays all of book properties under the div
        function displayBook(){
            const panel = document.getElementById('show-panel')
            panel.innerHTML = `
            <img src="${bookObj.img_url}"/>
            <h2>${bookObj.title}</h2>
            <h2>${bookObj.subtitle}</h2>
            <h3>${bookObj.author}</h3>
            <p> ${bookObj.description} Likes</p>
            <ul>
            ${bookObj.users.map(user=>`<li>${user.username}</li>`).join('')}
            </ul>
            <button id='${bookObj.id}'>Like ❤️</button>
            `
            panel.addEventListener('click', addLike)
            function addLike(e){                
                if (e.target.innerText == 'Like ❤️'){
                                                          
                    const id = e.target.id
                    patchBook(e).then (book=>{
                        const users = book.users
                        const body = { users: [...users, {"id": 1,"username":"pouros"}]}                        
                        changeLikes(id)
                        function changeLikes(id){
                            fetch (`http://localhost:3000/books/${id}`,{
                                method: 'PATCH',
                                headers:{
                                    "Content-Type": "application/json",
                                    Accept: "application/json"
                                },
                                body: JSON.stringify(body)
                            })
                            .then(res=>res.json())
                            .then(book=>console.log(book))
                        }
                        e.target.innerText = 'Unlike 💔'
                    })
                                        
                }
                // else if (e.target.innerText == 'Unlike 💔'){
                //     e.target.innerText = 'Like ❤️'
                // }
                
            }       
        }
    }


});



                // let newUser = {
                //     id: 1,
                //     username: "pouros"
                // }

//event listener for like button

//function that likes book and adds your user name to the list of people who like the book
//patch likes to server


            // const userList = bookObj.users.filter(item=>item.id).map(ele=>ele.username)
        // userList.forEach(item=>renderUser(item))
        // function renderUser(user){
        //     const userItem = document.createElement('ul')
        //     userItem.innerHTML = `<li>${user}</li>`
        //     panel.appendChild(userItem)
        //     }