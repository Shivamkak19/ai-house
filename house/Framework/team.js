// This example uses JavaScript to add a smooth transition effect on hover
const teamMembers = document.querySelectorAll('.team-member');

teamMembers.forEach(member => {
    member.addEventListener('mouseenter', () => {
        member.classList.add('hovered');
    });

    member.addEventListener('mouseleave', () => {
        member.classList.remove('hovered');
    });
});