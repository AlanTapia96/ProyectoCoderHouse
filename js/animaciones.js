$(document).ready(function () {
    $('#titulo-principal').html(`<h1 id="titulo-principal" class="position-relative text-center">
                                    Argenshop<br>
                                    Tienda de camisetas de fútbol
                                </h1>`);
    

    
    $('#div-welcome').animate({top: '1.5em'},1300);

    gsap.from('#titulo-principal',{
        y: -300,
    });

    gsap.to('#titulo-principal',{
        duration: 2,
        y: 0,
        ease: 'back'
    })



});


