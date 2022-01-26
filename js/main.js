const d = document,

    $pet = d.querySelector(".pet"),
    $template = d.getElementById("template-pet").content,
    $fragment = d.createDocumentFragment(),
    $loader = d.querySelector(".contact-form-loader"),
    $response = d.querySelector(".contact-form-response");

d.addEventListener("keypress", async e => {
    if (e.target.matches("#search")) {

        if (e.key === "Enter") {

            try {
                $loader.classList.remove("none");
                // $pet.innerHTML = `<img class ="loader" src = "./assets/img/rings.svg" alt="Cargando .... " >`;
                let mascota = e.target.value.toLowerCase();
                API = `https://dog.ceo/api/breed/${mascota}/images/random`,
                    res = await fetch(API),
                    json = await res.json();

                if (!res.ok) throw { status: res.status, statusText: res.statusText }

                if (json.length === 0) {

                    $pet.innerHTML = `<h2>No existen resultados para el criterio de busqueda : <mark>${query}</mark></h2>`;

                } else {
                    $loader.classList.add("none");
                    $template.querySelector("img").src = json.message,
                        $template.querySelector("img").alt = "nombre",
                        $template.querySelector("img").classList.add("img");

                    let $clone = d.importNode($template, true);
                    $fragment.appendChild($clone);
                }
                $pet.innerHTML = "";

                $pet.appendChild($fragment);


            } catch (error) {
                $loader.classList.add("none");
                let msg = error.statusText || `No existen criterios para la busqueda${e.target.value}`;
                $pet.innerHTML = `<p>${msg}</p>`;
                setTimeout(() => {
                    $pet.innerHTML = "";
                }, 3000);

            }
        }
    }
})