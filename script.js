// Charger le fichier JSON central
fetch("parentes.json")
  .then(response => response.json())
  .then(data => {
    // Construire une map des relations
    const parenteMap = {};
    data.forEach(([p1, p2]) => {
      if (!parenteMap[p1]) parenteMap[p1] = [];
      if (!parenteMap[p2]) parenteMap[p2] = [];
      parenteMap[p1].push(p2);
      parenteMap[p2].push(p1); // ajoute automatiquement l’autre sens
    });

    // Récupérer le paramètre "name" dans l’URL (ex: index.html?name=A)
    const params = new URLSearchParams(window.location.search);
    const name = params.get("name");

    if (name) {
      // Afficher la page individuelle
      const list = relationMap[name] || [];
      document.body.innerHTML = `
        <header><h1>Réseau de parenté</h1></header>
        <main>
          <h2>Parentés de ${name}</h2>
          <ul>
            ${list.map(l => `<li>${l}</li>`).join("")}
          </ul>
          <p><a href="index.html">← Retour à l’index</a></p>
        </main>
      `;
    } else {
      // Afficher l’index avec des cards
      const container = document.getElementById("cards-container");
      Object.keys(relationMap).forEach(person => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `<h3>${person}</h3>`;
        card.onclick = () => {
          window.location.href = `index.html?name=${person}`;
        };
        container.appendChild(card);
      });
    }
  })
  .catch(err => {
    console.error("Erreur de chargement du JSON", err);
  });
