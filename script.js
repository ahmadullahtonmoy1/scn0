let contacts = JSON.parse(localStorage.getItem('contacts')) || [];

function addContact() {
    const name = document.getElementById('name').value;
    const number = document.getElementById('number').value;
    const address = document.getElementById('address').value;

    if (name && number) {
        const contact = { name, number, address };
        contacts.push(contact);
        saveContacts();
        clearInputs();
        displayContacts();
    }
}

function displayContacts() {
    const contactList = document.getElementById('contact-list');
    contactList.innerHTML = '';

    if (contacts.length === 0) {
        contactList.innerHTML = '<tr><td colspan="5">No contacts found.</td></tr>';
        return;
    }

    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        const row = document.createElement('tr');
        row.innerHTML = `<td>${i + 1}</td>
                         <td>${contact.name}</td>
                         <td>${contact.number}</td>
                         <td>${contact.address || ''}</td>
                         <td><button onclick="deleteContact(${i})">Delete</button></td>`;
        contactList.appendChild(row);
    }
}

function saveContacts() {
    localStorage.setItem('contacts', JSON.stringify(contacts));
}

function clearInputs() {
    document.getElementById('name').value = '';
    document.getElementById('number').value = '';
    document.getElementById('address').value = '';
}

function deleteContact(index) {
    contacts.splice(index, 1);
    saveContacts();
    displayContacts();
}

function searchContactNonRealtime() {
    const search = document.getElementById('search').value.toLowerCase();
    const searchResults = contacts.filter((contact) => {
        return (
            contact.name.toLowerCase().includes(search) ||
            contact.number.includes(search) ||
            (contact.address && contact.address.toLowerCase().includes(search))
        );
    });

    displaySearchResults(searchResults);
}

function displaySearchResults(results) {
    const searchResult = document.getElementById('search-result');
    searchResult.innerHTML = '';

    if (results.length === 0) {
        searchResult.innerHTML = '<p>No matching contacts found.</p>';
        return;
    }

    for (let contact of results) {
        const resultInfo = document.createElement('div');
        resultInfo.innerHTML = `<p><strong>Name:</strong> ${contact.name}, <strong>Number:</strong> ${contact.number}</p>`;
        if (contact.address) {
            resultInfo.innerHTML += `<p><strong>Address:</strong> ${contact.address}</p>`;
        }
        searchResult.appendChild(resultInfo);
    }
}

displayContacts();
