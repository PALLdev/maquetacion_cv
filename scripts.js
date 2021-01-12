// funciones anonimas auto-ejecutables

// menu
((d) => {
    const $btnMenu = d.querySelector(".menu-btn"), $menu = d.querySelector(".menu");

    $btnMenu.addEventListener("click", e => {
        $btnMenu.firstElementChild.classList.toggle("none");
        $btnMenu.lastElementChild.classList.toggle("none");
        $menu.classList.toggle("is-active");
    });

    d.addEventListener("click", e => {
        if(!e.target.matches(".menu a")) return false; //evento no se activa si NO he hecho click en un link del menu
        // si he clickeado un link del menu
        $btnMenu.firstElementChild.classList.remove("none"); //quito el none al bars icon para mostrarlo
        $btnMenu.lastElementChild.classList.add("none"); // agrego el none para no mostrar la X
        $menu.classList.remove("is-active"); // quito el is-active para cerrar el menu
    })
})(document);

// formulario
((d) => {
    const $form = d.querySelector('.contact-form'),
        $loader = d.querySelector('.contact-form-loader'),
        $response = d.querySelector('.contact-form-response');
        
    $form.addEventListener('submit', e => {
        e.preventDefault();
        $loader.classList.remove('none');
        fetch('https://formsubmit.co/ajax/pblolara21@gmail.com', {
            method: 'POST',
            body: new FormData(e.target)
        }).then((res) => (res.ok ? res.json() : Promise.reject(res)))
        .then(json => {
            console.log(json);
            // objeto location te permite acceder a datos de la url (barra de direcciones), hash modifica la url (aqui agrego #gracias a la url)
            location.hash = '#gracias';
            $form.reset();
        }).catch(err => {
            console.log(err);
            let message = err.statusText || 'Hubo un error en el envio, intenta nuevamente.';
            $response.querySelector('h3').innerHTML = `Error ${err.status}: ${message}`;
        }).finally(() => {
            // quita el loader y cierra el modal sea la respuesta positiva o error
            $loader.classList.add('none');
            setTimeout(() => {
                location.hash = '#close';
            }, 3000);
        });
    })    
    
})(document)