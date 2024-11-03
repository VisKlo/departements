const baseUrl = 'https://geo.api.gouv.fr'
const listRegion = document.querySelector('#region-select')
const listDepartement = document.querySelector('#departement-select')
const communeBtn = document.querySelector("#get-commune")
const listCommunes = document.querySelector("#list-communes")
const geoloc = document.querySelector("#get-geoloc")
const geolocTable = document.querySelector("#geolocation")

let selectedDepartement = null

fetch(`${baseUrl}/regions`).then(response => response.json()).then(response => {
    listRegion.innerHTML = `<option disabled selected>Choisissez une région</option>` + response.map(region => {
        return `<option value="${region.code}">${region.nom}</option>`
    })
})

listRegion.addEventListener('change', (e) => {
    const selectedRegion = e.target.value
    fetch(`${baseUrl}/regions/${selectedRegion}/departements`).then(response => response.json()).then(response => {
        listDepartement.innerHTML = `<option disabled selected>Choisissez un département</option>` + response.map(departement => {
            return `<option value="${departement.code}">${departement.nom}</option>`
        })
    })
})

listDepartement.addEventListener('change', (e) => {
    selectedDepartement = e.target.value
})

communeBtn.addEventListener('click', () => {
    fetch(`${baseUrl}/departements/${selectedDepartement}/communes`).then(response => response.json()).then(response => {
        response.sort((a, b) => b.population - a.population)
        listCommunes.innerHTML = `  <thead>
                                        <tr>
                                            <th>Nom de la commune</th>
                                            <th>Nombre d'habitants</th>
                                        </tr>
                                    </thead>
                                    <tbody>`
        + response.map(commune => {
            return `
                <tr>
                    <td>${commune.nom}</td>
                    <td>${commune.population}</td>
                </tr>`
        }).join('') + `</tbody>`
    })
})

geoloc.addEventListener('click', () => {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback)

    function successCallback(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        let map = L.map('map').setView([latitude, longitude], 13)
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map)
        L.marker([latitude, longitude]).addTo(map)
        fetch(`https://geo.api.gouv.fr/communes?lat=${latitude}&lon=${longitude}&fields=code,nom,codesPostaux,surface,population,centre,contour`).then(response => response.json()).then(response => {
            geolocation.innerHTML = `<thead>
                                        <tr>
                                            <th>Nom de la commune</th>
                                            <th>Nombre d'habitants</th>
                                            <th>Surface en hectares</th>
                                        </tr>
                                    </thead>
                                    <tbody>`
            + response.map(ville => {
                return `
                    <tr>
                        <td>${ville.nom}</td>
                        <td>${ville.population}</td>
                        <td>${ville.surface}</td>
                    </tr>`
            }).join('') + `</tbody>`

            const commune = response[0]
            L.geoJSON(commune.contour).addTo(map)
        })
    }

    function errorCallback(error) {
        console.error("Erreur de géolocalisation : ", error.message)
    }
})



