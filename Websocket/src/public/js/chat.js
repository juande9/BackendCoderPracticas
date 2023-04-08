const socket = io()

const form = document.getElementById("form")
const msgContainer = document.getElementById("messages")

form.addEventListener("submit", function (e) {
    e.preventDefault()
    let name = document.getElementById("name").value
    let message = document.getElementById("message").value

    socket.emit("chat", { name, message })

})

socket.on("chat", data => {
    let messages = []

    messages.push({ ...data })

    messages.forEach(msg => {
        msgContainer.innerHTML += `${msg.name}: ${msg.message}<br>`
    });

})