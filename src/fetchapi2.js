function searchCountry() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("travelTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1]; // Assuming the description is in the second column
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

let numRowsToShow = 2;
function toggleTable() {
    const table = document.getElementById('travelTable');
    const button = document.getElementById('toggleTableBtn');
    const rows = table.rows;
    
    for (let i = numRowsToShow; i < rows.length; i++) {
        rows[i].style.display = (rows[i].style.display === 'none') ? '' : 'none';
    }
    
    if (numRowsToShow === 2) {
        button.textContent = 'Show Less';
        button.scrollIntoView({ behavior: "smooth" });
        numRowsToShow = rows.length;
    } else {
        button.textContent = 'Show More';
        button.scrollIntoView({ behavior: "smooth" });
        numRowsToShow = 2;
    }
}

const menuToggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');

menuToggle.addEventListener('click', () => {
    menu.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

function showDropdown() {
    const input = document.getElementById('searchInput');
    const dropdown = document.getElementById('searchDropdown');
    const filter = input.value.toUpperCase();
    const items = document.querySelectorAll('#travelTable tbody tr');
    const suggestions = [];
    items.forEach(item => {
        const text = item.textContent || item.innerText;
        if (text.toUpperCase().indexOf(filter) > -1) {
            suggestions.push(`<a href="#">${text}</a>`);
        }
    });
    dropdown.innerHTML = suggestions.join('');
    if (filter) {
        dropdown.classList.add('show');
    } else {
        dropdown.classList.remove('show');
    }
}