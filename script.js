// Charger le fichier JSON central
fetch("relations.json")
  .then(response => response.json())
  .then(data => {
    // Construire une map des relations
    const relationMap = {};
    data.forEach(([p1, p2]) => {
      if (!relationMap[p1]) relationMap[p1] = [];
      if (!relationMap[p2]) relationMap[p2] = [];
      relationMap[p1].push(p2);
      relationMap[p2].push(p1); // ajoute automatiquement l’autre sens
    });

    // Récupérer le paramètre "name" dans l’URL (ex: index.html?name=A)
    const params = new URLSearchParams(window.location.search);
    const name = params.get("name");

    if (name && relationMap[name]) {
      const list = relationMap[name];
      document.getElementById("relations").innerHTML =
        `<h2>Relations de ${name}</h2><ul>` +
        list.map(l => `<li>${l}</li>`).join("") +
        "</ul>";
    } else {
      document.getElementById("relations").innerHTML =
        "<p>Choisissez une personne via ?name=Nom dans l’URL.</p>";
    }
  })
  .catch(err => {
    console.error("Erreur de chargement du JSON", err);
  });
