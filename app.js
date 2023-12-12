//Base de données

//Setup des librairies
//Créer la BDD
const request = indexedDB.open("list_reservation");
let db;
request.onupgradeneeded = function () {
    const db = request.result;
    const store = db.createObjectStore("reserv", { keyPath: "id", autoIncrement: true });
    const nameIndex = store.createIndex("by_name", "name");
    const dateIndex = store.createIndex("by_date", "date");
    const timeIndex = store.createIndex("by_time", "time");
    const etatIndex = store.createIndex("by_etat", "etat");
    store.put({ name: "John", date: "2024-12-09", time: "08:00" });
    store.put({ name: "Frank", date: "2024-12-09", time: "13:30" });
    store.put({ name: "Bill", date: "2024-12-09", time: "20:30" });
};

function afficherDonnee(clePrimaire) { //Va afficher dans une balsie HTML la valeur souhaité selon la clé primiare entré (Possiblement réutilisé pour la fonctionnalité "Liste Réservations")
    const request = indexedDB.open("list_reservation");

    request.onsuccess = function () {
        const db = request.result;
        const transaction = db.transaction("reserv", "readonly");
        const store = transaction.objectStore("reserv");

        // Ouvrir une requête pour obtenir l'élément par clé primaire
        const getRequest = store.get(clePrimaire);

        getRequest.onsuccess = function (event) {
            const result = event.target.result;

            if (result) {
                // Vérifier si la balise HTML avec l'id "id1" existe
                let resultat = document.getElementById("id1");

                // Si elle n'existe pas, la créer dynamiquement
                if (!resultat) {
                    resultat = document.createElement("div");
                    resultat.id = "id1";
                    document.body.appendChild(resultat);
                }

                // Mettre à jour le contenu de la balise HTML
                resultat.innerHTML = `${result.date}`;
            } else {
                console.error("Aucun enregistrement trouvé pour la clé primaire : ", clePrimaire);
            }
        };

        getRequest.onerror = function (event) {
            console.error("Erreur lors de la récupération de l'élément : ", event.target.error);
        };
    };
};

function AffichageDispo() { //Fonction pour la fonctionnalité "Affichage Disponibilités"
    const dateSelectionnee = document.getElementById("date_res").value;
    const request = indexedDB.open("list_reservation");

    //Mettre toutes les créneaux en mode Ouvert par défault
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

    function updateCreneau(heure) {
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
                // Afficher les créneaux horaires dans la console
                //console.log(`Créneau Horaires - Date: ${cursor.value.date}, Heure: ${cursor.value.time}`);

                //Utiliser un switch pour comparer la valeur du créneau de la BDD pour assoicer chaque valeur à sa case de la table correspondant.
                var creneau;
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
                // Passer à l'élément suivant
                cursor.continue();
            };
        };

        requete.onerror = function (event) {
            console.error("Erreur lors de la récupération des créneaux horaires : ", event.target.error);
        };
    };
};


function ajouterDonnee() {
    const request = indexedDB.open("list_reservation");
    const nom = document.getElementById("name").value;
    const date = document.getElementById("date").value;
    const heure = document.getElementById("hour").value.trim();

    // Liste des valeurs acceptées
    var valeursAcceptees = ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00"];
    const confirmForm = confirm(`Voici les détails de la réservation en cours.\nNom: ${nom}\nDate: ${date}\nCréneau: ${heure}\nEst-ce donc correct ?`);
    // Vérifie si la valeur saisie est parmi les valeurs acceptées
    if (valeursAcceptees.includes(heure)) {
        if (confirmForm == true) {
            request.onsuccess = function () {
                const db = request.result;
                const transaction = db.transaction("reserv", "readwrite");
                const store = transaction.objectStore("reserv");
                const nouvelElement = { name: `${nom}`, date: `${date}`, time: `${heure}` };

                const ajoutRequest = store.put(nouvelElement);
                console.log("Le prompt a marché");

                ajoutRequest.onsuccess = function () {
                    console.log("Élément ajouté avec succès à la base de données");
                };
                ajoutRequest.onerror = function () {
                    console.error("Erreur lors de l'ajout de l'élément à la base de données");
                };
            };
        } else {
            const annulationConfirm = confirm("Voulez-vous confirmer l'annulation de la réservation ?");
            if (annulationConfirm) {
                location.reload();
            }
        };
    } else {
        alert("Le créneau entré est invalide");
    };
    request.onerror = function (event) {
        console.error("Erreur lors de l'ouverture de la base de données");
    };
};

function ListeReserv(reservations) {
    const table = document.getElementById('reservation-table');

    // Supprimer les lignes existantes sauf la première (header)
    while (table.rows.length > 1) {
        table.deleteRow(1);
    };

    // Ajouter les nouvelles données
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
        optionsCell.querySelector('.annulation-link').addEventListener('click', function() {
            supprimerEnregistrement(reservation.id);
        });
    }
};

function getAllReservations() {
    const request = indexedDB.open("list_reservation");

    request.onsuccess = function () {
        const db = request.result;

        if (db) {
            const transaction = db.transaction("reserv", "readonly");
            const store = transaction.objectStore("reserv");
            const getAllRequest = store.getAll();

            getAllRequest.onsuccess = function () {
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

// Appel initial pour récupérer toutes les réservations et les afficher
if (window.location.pathname.endsWith("liste_reserv.html")) {
    getAllReservations();
}

function filtrerReservations() {
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
                    if (matchesCriteria(reservation, selectedOption, searchInput)) {
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
                        optionsCell.querySelector('.annulation-link').addEventListener('click', function() {
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

function matchesCriteria(reservation, selectedOption, searchInput) {
    const valueToCheck = reservation[selectedOption];

    // Vérifier si la propriété existe avant d'accéder à toString
    if (valueToCheck !== undefined && valueToCheck !== null) {
        const valueAsString = valueToCheck.toString().toLowerCase();
        return valueAsString.includes(searchInput);
    }

    return false;
};


function supprimerEnregistrement(id) {
    const confirmation = confirm("Voulez-vous vraiment supprimer cet enregistrement ?");
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
                // Actualisez la liste des réservations sur la page si nécessaire.
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
