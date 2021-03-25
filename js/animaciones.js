$(document).ready(function () {
    $('#titulo-principal').html(`<h1 id="titulo-principal" class="position-relative text-center">
                                    Argenshop<br>
                                    Tienda de camisetas de fútbol
                                </h1>`);
    

    
    $('#div-welcome').animate({top: '1.2em'},1300);

    gsap.from('#titulo-principal',{
        y: -300,
    });

    gsap.to('#titulo-principal',{
        duration: 2,
        y: -10,
        ease: 'back'
    })


    gsap.to("#choose", {
        scrollTrigger: ".box", // start the animation when ".box" enters the viewport (once)
        x: 0,
      });

});


