import Reveal from 'reveal.js';
import RevealHighlight from 'reveal.js/plugin/highlight/highlight';


let deck = new Reveal({

    //theme for code slide style
    plugins: [ RevealHighlight ],

    backgroundTransition: 'slide',

    // The "normal" size of the presentation, aspect ratio will
    // be preserved when the presentation is scaled to fit different
    // resolutions. Can be specified using percentage units.
    width: 960,
    height: 700,

    // Factor of the display size that should remain empty around
    // the content
    margin: 0.04,

    // Bounds for smallest/largest possible scale to apply to content
    minScale: 0.2,
    maxScale: 2.0,

    //auto play the slides
    autoSlide: 5000,
    loop: true
})

deck.initialize();

