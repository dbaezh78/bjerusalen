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
            <li><a href="#" onclick="loadSection('historicos')">Históricos</a></li>
            <li><a href="#" onclick="loadSection('profeticos')">Proféticos</a></li>
            <li><a href="#" onclick="loadSection('cartas')">Cartas</a></li>
            <li><a href="#" onclick="loadSection('evangelicos')">Evangélicos</a></li>
        `;
    } else {
        sectionTitle.textContent = section.charAt(0).toUpperCase() + section.slice(1);
        // Aquí podrías listar los libros disponibles en cada sección
        // Suponiendo que cada libro es una carpeta, puedes añadir los nombres de los libros manualmente
        if (section === 'historicos') {
            booksList.innerHTML = `
                <li><a href="#" onclick="loadChapter('historicos', 'libro1', 'capitulo1')">Libro 1, Capítulo 1</a></li>
                <li><a href="#" onclick="loadChapter('historicos', 'libro1', 'capitulo2')">Libro 1, Capítulo 2</a></li>
                <!-- Añade más enlaces según sea necesario -->
            `;
        } else if (section === 'profeticos') {
            booksList.innerHTML = `
                <li><a href="#" onclick="loadChapter('profeticos', 'libro2', 'capitulo1')">Libro 2, Capítulo 1</a></li>
                <li><a href="#" onclick="loadChapter('profeticos', 'libro2', 'capitulo2')">Libro 2, Capítulo 2</a></li>
                <!-- Añade más enlaces según sea necesario -->
            `;
        } else if (section === 'cartas') {
            booksList.innerHTML = `
                <li><a href="#" onclick="loadChapter('cartas', 'libro3', 'capitulo1')">Libro 3, Capítulo 1</a></li>
                <li><a href="#" onclick="loadChapter('cartas', 'libro3', 'capitulo2')">Libro 3, Capítulo 2</a></li>
                <!-- Añade más enlaces según sea necesario -->
            `;
        } else if (section === 'evangelicos') {
            booksList.innerHTML = `
                <li><a href="#" onclick="loadChapter('evangelicos', 'libro4', 'capitulo1')">Libro 4, Capítulo 1</a></li>
                <li><a href="#" onclick="loadChapter('evangelicos', 'libro4', 'capitulo2')">Libro 4, Capítulo 2</a></li>
                <!-- Añade más enlaces según sea necesario -->
            `;
        }
    }
}

async function loadChapter(category, book, chapter) {
    try {
        const response = await fetch(`${category}/${book}/${chapter}.txt`);
        if (!response.ok) {
            throw new Error('Capítulo no encontrado');
        }
        const text = await response.text();
        displayChapter(book, chapter, text);
    } catch (error) {
        console.error('Error cargando el capítulo:', error);
        document.getElementById('chapter-title').textContent = 'Error cargando el capítulo';
        document.getElementById('verses').innerHTML = '';
    }
}

function displayChapter(book, chapter, text) {
    const chapterTitle = `${book} - Capítulo ${chapter}`;
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
