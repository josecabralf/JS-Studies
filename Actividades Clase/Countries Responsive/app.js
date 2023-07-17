fetch('https://restcountries.com/v2/all')
    .then(response => response.json())
    .then(data => {
        const banderas = document.getElementById('banderas');
        data.forEach(country => {
            const tr = document.createElement('tr');
            const tdCountry = document.createElement('td');
            const tdFlag = document.createElement('td');
            const imgFlag = document.createElement('img');
            tdCountry.innerText = country.name;
            imgFlag.setAttribute('src', country.flag);
            imgFlag.setAttribute('alt', country.name);
            imgFlag.setAttribute('width', 50);
            tdFlag.appendChild(imgFlag);
            tr.appendChild(tdCountry);
            tr.appendChild(tdFlag);
            banderas.appendChild(tr);
        });
    })
.catch(error => console.error(error));