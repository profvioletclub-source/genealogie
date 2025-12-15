// Charger le fichier JSON central
fetch("parentes.json")
  .then(response => parente.json())
  .then(data => {
    // Construire une map des relations
    const relationMap = {};
    data.forEach(([p1, p2]) => {
      if (!parenteMap[p1]) parenteMap[p1] = [];
      if (!parenteMap[p2]) parenteMap[p2] = [];
      parenteMap[p1].push(p2);
      parenteMap[p2].push(p1); // ajoute automatiquement l’autre sens
    });

    // Récupérer le paramètre "name" dans l’URL (ex: index.html?name=A)
    const params = new URLSearchParams(window.location.search);
    const name = params.get("name");

    if (name && parenteMap[name]) {
      const list = parenteMap[name];
      document.getElementById("parentes").innerHTML =
        `<h2>Parentés de ${name}</h2><ul>` +
        list.map(l => `<li>${l}</li>`).join("") +
        "</ul>";
    } else {
      document.getElementById("parentes").innerHTML =
        "<p>Choisissez une personne via ?name=Nom dans l’URL.</p>";
    }
  })
  .catch(err => {
    console.error("Erreur de chargement du JSON", err);
  });
