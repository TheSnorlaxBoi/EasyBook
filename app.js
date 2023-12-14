//Création et initialisation de la BDD - Est lancé uniquement quand la base de données n'existe pas (suppression)
const request = indexedDB.open("list_reservation");
let db;
request.onupgradeneeded = function () {
    const db = request.result;
    const store = db.createObjectStore("reserv", { keyPath: "id", autoIncrement: true });
    const nameIndex = store.createIndex("by_name", "name");
    const dateIndex = store.createIndex("by_date", "date");
    const timeIndex = store.createIndex("by_time", "time");
    const etatIndex = store.createIndex("by_etat", "etat");

    //Réservations insérés à l'initialisation de la BDD, purement pour des raisons de tests. Réservations avec différentes valeurs ppur tester les filtres de la Liste des réservations
    
    //Note : Je n'ai pas réussi à changer le format de la date dans la BDD, mes excuses. Le format dans les pages HTML sont MM/DD/YYYY tandis que la BDD a le format international : YYYY-MM-DD
    store.put({ name: "John", date: "2023-12-09", time: "08:00" });
    store.put({ name: "Frank", date: "2023-10-08", time: "13:30" });
    store.put({ name: "Marc", date: "2024-01-19", time: "20:30" });
    store.put({ name: "Sarah", date: "2022-01-25", time: "09:30" });
    store.put({ name: "Jimmy", date: "2020-12-09", time: "11:00" });
    store.put({ name: "Robby", date: "2020-12-09", time: "15:00" });
    store.put({ name: "Ben", date: "2021-12-08", time: "18:30" });
    store.put({ name: "Jake", date: "2010-02-07", time: "20:00" });
    store.put({ name: "Kyle", date: "2020-03-18", time: "14:30" });
    store.put({ name: "Eugene", date: "2020-12-22", time: "08:30" });
    store.put({ name: "Jonah", date: "2021-04-04", time: "16:30" });
    store.put({ name: "Matthew", date: "2022-06-10", time: "17:00" });
    store.put({ name: "Julian", date: "2023-07-03", time: "11:30" });
    store.put({ name: "Herbert", date: "2023-10-20", time: "19:30" });
    store.put({ name: "Thomas", date: "2020-03-22", time: "20:00" });
    store.put({ name: "Tony", date: "2023-01-12", time: "20:30" });
    store.put({ name: "Musa", date: "2023-11-15", time: "14:30" });
    store.put({ name: "Sienna", date: "2020-03-29", time: "25:00" });
    store.put({ name: "Jack", date: "2023-12-13", time: "12:30" });
    store.put({ name: "Zack", date: "2021-12-14", time: "18:00" });
    store.put({ name: "Dale", date: "2023-03-14", time: "20:00" });
};

function AffichageDispo() { //Fonction pour la fonctionnalité "Affichage Disponibilités"
    const dateSelectionnee = document.getElementById("date_res").value;
    const request = indexedDB.open("list_reservation");
    if (dateSelectionnee != "") { // Vérifie qu'une date a bien été inséré dans le champ "date"
        //Tous les crénaux acceptés
        var ids = ["id_8", "id_8:30", "id_9", "id_9:30", "id_10", "id_10:30", "id_11", "id_11:30", "id_12", "id_12:30", "id_13", "id_13:30", "id_14", "id_14:30", "id_15", "id_15:30", "id_16", "id_16:30", "id_17", "id_17:30", "id_18", "id_18:30", "id_19", "id_19:30", "id_20"];

        for (var i = 0; i < ids.length; i++) {
            var defcreneau = document.getElementById(ids[i]);

            // Vérifie si l'élément existe avant de le manipuler
            if (defcreneau) {
                defcreneau.innerHTML = "Ouvert";
                if (defcreneau.classList.contains('etatFerme')) { //Regarde si l'élément était dans l'état Fermé aupararavat et suprime la classe fermé si tel est le cas
                    defcreneau.classList.remove('etatFerme');
                };
                defcreneau.classList.add('etatOuvert');
            };
        };

        function updateCreneau(heure) { //Permet de mettre en état Fermé l'état d'un crénau, 
            var creneau = document.getElementById("id_" + heure);

            if (creneau) {
                creneau.innerHTML = "Fermé";
                creneau.classList.remove('etatOuvert');
                creneau.classList.add('etatFerme');
            }
        }

        request.onsuccess = function () {
            const db = request.result;
            const transaction = db.transaction("reserv", "readonly");
            const store = transaction.objectStore("reserv");
            const dateIndex = store.index("by_date");

            const requete = dateIndex.openCursor(IDBKeyRange.only(dateSelectionnee));

            requete.onsuccess = function (event) {
                const cursor = event.target.result;

                if (cursor) {
                    //Utiliser un switch pour comparer la valeur du créneau de la BDD afin d'associer chaque valeur à sa case de la table correspondant.
                    switch (cursor.value.time) {
                        case "08:00":
                            updateCreneau("8");
                            break;

                        case "08:30":
                            updateCreneau("8:30");
                            break;

                        case "09:00":
                            updateCreneau("9");
                            break;

                        case "09:30":
                            updateCreneau("9:30");
                            break;

                        case "10:00":
                            updateCreneau("10");
                            break;

                        case "10:30":
                            updateCreneau("10:30");
                            break;

                        case "11:00":
                            updateCreneau("11");
                            break;

                        case "11:30":
                            updateCreneau("11:30");
                            break;

                        case "12:00":
                            updateCreneau("12");
                            break;

                        case "12:30":
                            updateCreneau("12:30");
                            break;

                        case "13:00":
                            updateCreneau("13");
                            break;

                        case "13:30":
                            updateCreneau("13:30");
                            break;

                        case "14:00":
                            updateCreneau("14");
                            break;

                        case "14:30":
                            updateCreneau("14:30");
                            break;

                        case "15:00":
                            updateCreneau("15");
                            break;

                        case "15:30":
                            updateCreneau("15:30");
                            break;

                        case "16:00":
                            updateCreneau("16");
                            break;

                        case "16:30":
                            updateCreneau("16:30");
                            break;

                        case "17:00":
                            updateCreneau("17");
                            break;

                        case "17:30":
                            updateCreneau("17:30");
                            break;

                        case "18:00":
                            updateCreneau("18");
                            break;

                        case "18:30":
                            updateCreneau("18:30");
                            break;

                        case "19:00":
                            updateCreneau("19");
                            break;

                        case "19:30":
                            updateCreneau("19:30");
                            break;

                        case "20:00":
                            updateCreneau("20");
                            break;
                    };
                    cursor.continue(); // Passer à l'élément suivant
                };
            };

            requete.onerror = function (event) {
                console.error("Erreur lors de la récupération des créneaux horaires : ", event.target.error);
            };
        };
    } else {
        alert("Aucune date n'a été inséré");
    };
};

function ajouterDonnee() { //Fonction pour le Formulaire de réservation, permet d'ajouter une réservation dans la base de données
    const request = indexedDB.open("list_reservation");
    const nom = document.getElementById("name").value;
    const date = document.getElementById("date").value;
    const heure = document.getElementById("hour").value.trim();

    if (!/\d/.test(nom)) { //Vérifie que le nom ne contienne pas de nombres
        // Liste des valeurs acceptées
        var valeursAcceptees = ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00"];
        // Affiche un prompt pour la confirmation de la réservation avec les détails.
        const confirmForm = confirm(`Voici les détails de la réservation en cours.\nNom: ${nom}\nDate: ${date}\nCréneau: ${heure}\nEst-ce donc correct ?`);
        // Vérifie si la valeur saisie est parmi les valeurs acceptées, et la confirmation a été accepté.
        if (valeursAcceptees.includes(heure)) {
            if (confirmForm) {
                request.onsuccess = function () {
                    const db = request.result;
                    const transaction = db.transaction("reserv", "readwrite");
                    const store = transaction.objectStore("reserv");
                    const nouvelElement = { name: `${nom}`, date: `${date}`, time: `${heure}` };

                    const ajoutRequest = store.put(nouvelElement); //L'enregistrement est donc ajouté à la base de données
                };
            } else {
                const annulationConfirm = confirm("Voulez-vous confirmer l'annulation de la réservation ?"); //Prompt pour la confirmation de l'annulation de la réservation, rechargera la page si la confirmation est validée.
                if (annulationConfirm) {
                    location.reload();
                };
            };
        } else {
            alert("Le créneau entré est invalide");
        };
        request.onerror = function (event) {
            console.error("Erreur lors de l'ouverture de la base de données");
        };
    } else {
        alert("Tentative de réservation annulé : Le nom ne doit pas contneir de numéros");
    };
};

function ListeReserv(reservations) { //Sous-Fonction pour la Liste des Réservations, prend les enregistrements (réservations) et crée une ligne dans la table pour chaque enregistrement
    const table = document.getElementById('reservation-table');

    // Supprime les lignes existantes sauf la première (header)
    while (table.rows.length > 1) {
        table.deleteRow(1);
    };

    // Ajouter les nouvelles données et créer une nouvelle ligne dans la table pour chaque réservation précédemment enregistré.
    for (const reservation of reservations) {
        const row = table.insertRow(-1);
        const idCell = row.insertCell(0);
        const nameCell = row.insertCell(1);
        const dateCell = row.insertCell(2);
        const timeCell = row.insertCell(3);
        const optionsCell = row.insertCell(4);

        idCell.textContent = reservation.id;
        nameCell.textContent = reservation.name;
        dateCell.textContent = reservation.date;
        timeCell.textContent = reservation.time;
        optionsCell.innerHTML = '<button class="annulation-link">Annulation</button>';
        optionsCell.querySelector('.annulation-link').addEventListener('click', function () {
            supprimerEnregistrement(reservation.id);
        });
    }
};

function getAllReservations() { //Fonction utilisé dans la Liste des Réservations, affichera toutes les réservations enregistré dans la base de données
    const request = indexedDB.open("list_reservation");

    request.onsuccess = function () {
        const db = request.result;

        if (db) { //Check si la base de données existe
            const transaction = db.transaction("reserv", "readonly");
            const store = transaction.objectStore("reserv");
            const getAllRequest = store.getAll();

            getAllRequest.onsuccess = function () { //Va lancer la requete pour tous les enregistrements
                const reservations = getAllRequest.result;
                ListeReserv(reservations);
            };

            getAllRequest.onerror = function () {
                console.error("Erreur lors de la récupération des réservations depuis la base de données");
            };
        } else {
            console.error("La base de données n'a pas pu être ouverte avec succès.");
        }
    };

    request.onerror = function (event) {
        console.error("Erreur lors de l'ouverture de la base de données");
    };
}

// Appel initial pour récupérer toutes les réservations et les afficher lors du chargement de la page
if (window.location.pathname.endsWith("liste_reserv.html")) {
    getAllReservations();
}

function filtrerReservations() { //Fonction pour les filtres de recherches dans la Liste des Réservations
    const selectElement = document.getElementById('data-search');
    const searchInput = document.getElementById('reserv-search').value.toLowerCase();
    const table = document.getElementById('reservation-table');

    const selectedOption = selectElement.value;

    const request = indexedDB.open("list_reservation");

    request.onsuccess = function () {
        const db = request.result;

        if (db) {
            const transaction = db.transaction("reserv", "readonly");
            const store = transaction.objectStore("reserv");
            const getAllRequest = store.getAll();

            getAllRequest.onsuccess = function () {
                const reservations = getAllRequest.result;

                // Supprimer les lignes existantes sauf la première (header)
                while (table.rows.length > 1) {
                    table.deleteRow(1);
                }

                // Ajouter les nouvelles données filtrées
                for (const reservation of reservations) {
                    if (matchesCriteria(reservation, selectedOption, searchInput)) { //Vérifie et revoie les données correspondant au filtre sélectionné et le contenu rentré dans une nouvelle ligne de tableau
                        const row = table.insertRow(-1);
                        const idCell = row.insertCell(0);
                        const nameCell = row.insertCell(1);
                        const dateCell = row.insertCell(2);
                        const timeCell = row.insertCell(3);
                        const optionsCell = row.insertCell(4);

                        idCell.textContent = reservation.id;
                        nameCell.textContent = reservation.name;
                        dateCell.textContent = reservation.date;
                        timeCell.textContent = reservation.time;
                        optionsCell.innerHTML = '<button class="annulation-link">Annulation</button>';
                        optionsCell.querySelector('.annulation-link').addEventListener('click', function () {
                            supprimerEnregistrement(reservation.id);
                        });
                    }
                }
            };

            getAllRequest.onerror = function () {
                console.error("Erreur lors de la récupération des réservations depuis la base de données");
            };
        } else {
            console.error("La base de données n'a pas pu être ouverte avec succès.");
        }
    };

    request.onerror = function (event) {
        console.error("Erreur lors de l'ouverture de la base de données");
    };
}

function matchesCriteria(reservation, selectedOption, searchInput) { //Sous-Fonction pour les filtres de recherches
    const valueToCheck = reservation[selectedOption];

    // Vérifier si la propriété existe avant d'accéder à toString
    if (valueToCheck !== undefined && valueToCheck !== null) {
        const valueAsString = valueToCheck.toString().toLowerCase();
        return valueAsString.includes(searchInput);
    }

    return false;
};

function supprimerEnregistrement(id) { //Fonction pour la suppression d'une réservation
    const confirmation = confirm("Voulez-vous vraiment supprimer cet enregistrement ?"); //Pop-up de confirmation pour l'action de suppression
    if (confirmation) {
        const request = indexedDB.open("list_reservation");

        request.onsuccess = function () {
            const db = request.result;
            const transaction = db.transaction("reserv", "readwrite");
            const store = transaction.objectStore("reserv");

            const suppressionRequest = store.delete(id);

            suppressionRequest.onsuccess = function () {
                console.log("Enregistrement supprimé avec succès de la base de données");
                location.reload();
                alert("La réservation à bien été supprimé.")
            };

            suppressionRequest.onerror = function () {
                console.error("Erreur lors de la suppression de l'enregistrement de la base de données");
            };
        };

        request.onerror = function (event) {
            console.error("Erreur lors de l'ouverture de la base de données");
        };
    };
};