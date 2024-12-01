document.querySelector('.accordion-button').addEventListener('click', function () {
    const content = document.querySelector('.accordion-content');
    content.style.maxHeight = content.style.maxHeight ? null : content.scrollHeight + 'px';
  });
  