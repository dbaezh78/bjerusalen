function toggleChapters(bookElement) {
    const chapters = bookElement.querySelector('.chapters');
    
    // Oculta todos los capítulos abiertos
    document.querySelectorAll('.chapters').forEach(chapterDiv => {
        if (chapterDiv !== chapters) {
            chapterDiv.style.display = 'none';
        }
    });
    
    // Alterna la visibilidad del capítulo del libro seleccionado
    if (chapters.style.display === 'none' || chapters.style.display === '') {
        chapters.style.display = 'block';
    } else {
        chapters.style.display = 'none';
    }
}

function loadChapterContent(filePath) {
    fetch(filePath)
        .then(response => response.text())
        .then(data => {
            document.getElementById('chapter-content').innerText = data;
        })
        .catch(error => console.error('Error al cargar el contenido del capítulo:', error));
}
