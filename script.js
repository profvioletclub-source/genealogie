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
      parenteMap[p2].push(p1);
    });

    // Récupérer le paramètre "name" dans l’URL
    const params = new URLSearchParams(window.location.search);
    const name = params.get("name");

    if (name) {
      // --- PAGE INDIVIDUELLE ---
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
      // --- INDEX GÉNÉRAL ---

      // 1) Cards principales
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

      // 2) ⭐⭐ ICI : cards sous le h2 "Listes des Généalogie" ⭐⭐
      const genealogyContainer = document.getElementById("genealogie-cards");

      Object.keys(parenteMap).forEach(person => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `<h3>${person}</h3>`;
        card.onclick = () => {
          window.location.href = `index.html?name=${person}`;
        };
        genealogyContainer.appendChild(card);
      });
    }
  })
  .catch(err => {
    console.error("Erreur de chargement du JSON", err);
  });
