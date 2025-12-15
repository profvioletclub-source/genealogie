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
      // Page individuelle → afficher les relations en cards
      const list = parenteMap[name] || [];
      const container = document.createElement("div");
      container.id = "cards-container";

      list.forEach(person => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `<h3>${person}</h3>`;
        card.onclick = () => {
          window.location.href = `index.html?name=${person}`;
        };
        container.appendChild(card);
      });

      document.body.innerHTML = `
        <header><h1>Réseau de parenté</h1></header>
        <main>
          <h2>Parentés de ${name}</h2>
        </main>
        <p style="text-align:center"><a href="index.html">← Retour à l’index</a></p>
      `;
      document.querySelector("main").appendChild(container);

    } else {
      // Index général → afficher toutes les personnes en cards
      const container = document.getElementById("cards-container");
      Object.keys(parenteMap).forEach(person => {
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
