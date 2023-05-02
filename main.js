// Seleccionar los botones
const getDataButton = document.getElementById("getData");
const resetDataButton = document.getElementById("resetData");

// Seleccionar el contenedor
const dataContainer = document.getElementById("dataContainer");

// Manejar el evento click del botón de obtener datos
getDataButton.addEventListener("click", async () => {
try {
// Hacer la petición GET a la API usando Axios
const response = await axios.get("https://tbridge-mongoose-bp-production.up.railway.app/posts/getInfo");
// Mostrar los datos en el contenedor
const data = response.data;
const cardDeck = document.createElement("div");
cardDeck.classList.add("d-flex", "flex-row");
data.forEach((item) => {
  const card = document.createElement("div");
  card.classList.add("card", "w-55", "mx-2", "my-2", "flex-fill");
  const imgpath = item.img.replace("uploads","https://tbridge-mongoose-bp-production.up.railway.app/")
  console.log(imgpath)
  card.innerHTML = `
    <div class="card-body m-1">
      <h5 class="card-title">${item.title}</h5>
      <p class="card-text">${item.body}</p>
      <p class="card-text">Escrito por: <b>${item.userId.username}</b></p>
      <img src="${imgpath}" class="card-img-top custom-img-size" alt="Imagen">
    </div>
  `;
  // Agregar bucle para comentarios
  if (item.commentIds.length > 0) {
    const commentsText = document.createElement("p");
    commentsText.classList.add("card-text");
    commentsText.innerHTML = "<b>Comentarios:</b>";
    card.querySelector(".card-body").appendChild(commentsText);
  }
  item.commentIds.forEach((comment) => {
    const commentText = document.createElement("p");
    commentText.classList.add("card-text");
    commentText.innerHTML = `${comment.body} - Escrito por: <b>${comment.userId.username}</b>`;
    card.querySelector(".card-body").appendChild(commentText);
  });
  cardDeck.appendChild(card);
});

// Verificar si el contenedor ya tiene elementos hijos
if (dataContainer.hasChildNodes()) {
  dataContainer.innerHTML = "";
}

// Agregar las tarjetas al contenedor
dataContainer.appendChild(cardDeck);

// Mostrar el botón de resetear datos
resetDataButton.style.display = "block";

// Ocultar el botón de obtener datos
getDataButton.style.display = "none";

// Mostrar el contenedor de datos
dataContainer.style.display = "block";
} catch (error) {
  console.error(error);
  }
  });
  
  // Manejar el evento click del botón de resetear datos
  resetDataButton.addEventListener("click", () => {
  // Ocultar el botón de resetear datos
  resetDataButton.style.display = "none";
  
  // Mostrar el botón de obtener datos
  getDataButton.style.display = "block";
  
  // Ocultar el contenedor de datos
  dataContainer.style.display = "none";
  
  // Limpiar el contenido del contenedor de datos
  dataContainer.innerHTML = "";
  });