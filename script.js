const text = document.querySelector('.text');

text.innerHTML =  text.textContent.replace(/\S/g, '<span>$&</span>');

text.addEventListener('mouseover', function () {
    if (event.target.tagName != 'SPAN') return;
    event.target.classList.add('active')
})
