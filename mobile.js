const navButtons = document.querySelectorAll('.mobile-button');
const sections = document.querySelectorAll('#deck-area, #game-area, #leaderboard-area');

const sectionMap = {
  'left': 'deck-area',       // Button 'left' opens the Deck
  'center': 'game-area',     // Button 'center' opens the Game
  'right': 'leaderboard-area'// Button 'right' opens the Leaderboard
};

function showSection(targetName) {
  sections.forEach(section => {
      section.style.display = 'none';
  });

  const idToShow = sectionMap[targetName]; 
  const targetElement = document.getElementById(idToShow);

  if (targetElement) {
      targetElement.style.display = 'block';
  }

  navButtons.forEach(btn => {
    const isActive = btn.dataset.target === targetName;
    btn.disabled = isActive;
  });
}

navButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const target = e.currentTarget.dataset.target;
        showSection(target);
    });
});

if (window.innerWidth <= 430) {
    showSection('center'); 
}