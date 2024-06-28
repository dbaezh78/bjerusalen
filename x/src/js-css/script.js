function toggleChapters(bookElement) {
    const chapters = bookElement.querySelector('.chapters');
    const allBooks = document.querySelectorAll('.book .chapters');

    allBooks.forEach(chapter => {
        if (chapter !== chapters) {
            chapter.style.display = 'none';
        }
    });

    chapters.style.display = chapters.style.display === 'block' ? 'none' : 'flex';
}

function loadChapterContent(filePath) {
    const contentDiv = document.getElementById('chapter-content');
    
    fetch(filePath)
        .then(response => response.text())
        .then(data => {
            contentDiv.textContent = data;
        })
        .catch(error => {
            contentDiv.textContent = 'Error cargando el capítulo';
            console.error('Error cargando el capítulo:', error);
        });
}
