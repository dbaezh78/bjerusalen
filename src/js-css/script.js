document.addEventListener('DOMContentLoaded', () => {
    // Inicializa la página aquí si es necesario
    loadSection('');
});

async function loadSection(section) {
    const sectionTitle = document.getElementById('section-title');
    const booksList = document.getElementById('books');
    const chapterTitle = document.getElementById('chapter-title');
    const versesList = document.getElementById('verses');

    sectionTitle.textContent = '';
    booksList.innerHTML = '';
    chapterTitle.textContent = '';
    versesList.innerHTML = '';

    if (section === '') {
        sectionTitle.textContent = 'La Biblia';
        booksList.innerHTML = `
            <li><a href="#" onclick="loadSection('historicos'); return false;">Históricos</a></li>
            <li><a href="#" onclick="loadSection('profeticos'); return false;">Proféticos</a></li>
            <li><a href="#" onclick="loadSection('cartas'); return false;">Cartas</a></li>
            <li><a href="#" onclick="loadSection('evangelicos'); return false;">Evangélicos</a></li>
        `;
    } else {
        sectionTitle.textContent = section.charAt(0).toUpperCase() + section.slice(1);
        // Aquí podrías listar los libros disponibles en cada sección
        // Suponiendo que cada libro es una carpeta, puedes añadir los nombres de los libros manualmente
        if (section === 'historicos') {
            booksList.innerHTML = `
                <li><a href="#" onclick="loadChapter('src/historicos/genesis', 'gn1'); return false;">Génesis, Capítulo 1</a></li>
                <li><a href="#" onclick="loadChapter('src/historicos/genesis', 'gn2'); return false;">Génesis, Capítulo 2</a></li>
                <!-- Añade más enlaces según sea necesario -->
            `;
        } else if (section === 'profeticos') {
            booksList.innerHTML = `
                <li><a href="#" onclick="loadChapter('src/profeticos/libro2', 'capitulo1'); return false;">Libro 2, Capítulo 1</a></li>
                <li><a href="#" onclick="loadChapter('src/profeticos/libro2', 'capitulo2'); return false;">Libro 2, Capítulo 2</a></li>
                <!-- Añade más enlaces según sea necesario -->
            `;
        } else if (section === 'cartas') {
            booksList.innerHTML = `
                <li><a href="#" onclick="loadChapter('src/cartas/libro3', 'capitulo1'); return false;">Libro 3, Capítulo 1</a></li>
                <li><a href="#" onclick="loadChapter('src/cartas/libro3', 'capitulo2'); return false;">Libro 3, Capítulo 2</a></li>
                <!-- Añade más enlaces según sea necesario -->
            `;
        } else if (section === 'evangelicos') {
            booksList.innerHTML = `
                <li><a href="#" onclick="loadChapter('src/evangelicos/libro4', 'capitulo1'); return false;">Libro 4, Capítulo 1</a></li>
                <li><a href="#" onclick="loadChapter('src/evangelicos/libro4', 'capitulo2'); return false;">Libro 4, Capítulo 2</a></li>
                <!-- Añade más enlaces según sea necesario -->
            `;
        }
    }
}

async function loadChapter(path, chapter) {
    try {
        const response = await fetch(`${path}/${chapter}.txt`);
        if (!response.ok) {
            throw new Error('Capítulo no encontrado');
        }
        const text = await response.text();
        displayChapter(path.split('/').pop(), chapter, text);
    } catch (error) {
        console.error('Error cargando el capítulo:', error);
        document.getElementById('chapter-title').textContent = 'Error cargando el capítulo';
        document.getElementById('verses').innerHTML = '';
    }
}

function displayChapter(book, chapter, text) {
    const chapterTitle = `${book.charAt(0).toUpperCase() + book.slice(1)} - Capítulo ${chapter.replace(/[^0-9]/g, '')}`;
    document.getElementById('chapter-title').textContent = chapterTitle;

    const verses = text.split('\n');
    const versesList = document.getElementById('verses');
    versesList.innerHTML = ''; // Limpia los versículos anteriores

    verses.forEach((verse, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${index + 1}. ${verse}`;
        versesList.appendChild(listItem);
    });
}
