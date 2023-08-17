import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css'; // optional for styling
import 'tippy.js/themes/light.css';

import {animateFill} from 'tippy.js';
import 'tippy.js/dist/backdrop.css';
import 'tippy.js/animations/shift-away.css';


tippy('.team-member', {
    theme: 'teamMember',
    placement: 'bottom',
    interactive: true,
    animateFill: true,
    inertia: true,
    // plugins: [animateFill],    

    // Tippy API function for dynamic content
    content(reference) {
        const id = reference.getAttribute('data-template');
        const template = document.getElementById(id);
        return template.innerHTML;
      },
      allowHTML: true,

  });


