const toggleBulletinIcon = document.getElementById('toggleBulletinIcon');
const bulletinBoard = document.getElementById('bulletinBoard');

toggleBulletinIcon.addEventListener('click', () => {
  bulletinBoard.classList.toggle('active');
});