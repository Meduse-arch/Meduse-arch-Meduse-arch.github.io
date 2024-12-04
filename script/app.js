document.addEventListener('DOMContentLoaded', () => {
  const serversContainer = document.getElementById('servers');
  const channelsContainer = document.getElementById('channels');
  const contentContainer = document.getElementById('content');

  // Function to load the home view
  function loadHome() {
    // Clear channels and content
    channelsContainer.innerHTML = '';
    contentContainer.innerHTML = '';

    // Populate home content
    const homeTitle = document.createElement('h2');
    homeTitle.textContent = 'Bienvenue !';
    const homeDescription = document.createElement('p');
    homeDescription.textContent = 'Bienvenue sur mon portfolio ! Celui-ci ressemble a discord. Chaque serveur a gauche représente différente information. Le serveur le plus haut et le bouton home et vous ramènera ici.';
    contentContainer.appendChild(homeTitle);
    contentContainer.appendChild(homeDescription);
  }

  // Add a "Home" server button
  function addHomeServer() {
    const homeButton = document.createElement('div');
    homeButton.classList.add('server-logo');
    homeButton.title = 'Home';

    // Home button styling (using an emoji as an icon for simplicity)
    homeButton.innerHTML = `<img src="src/image/home.png" alt="Home" style="width: 100%; height: auto;">`;


    // Click event for the Home button
    homeButton.addEventListener('click', loadHome);

    // Add the Home button to the servers container
    serversContainer.prepend(homeButton);
  }

  // Load JSON data
  axios.get('src/json/data.json')
    .then(response => {
      const data = response.data;

      // Add the Home button
      addHomeServer();

      // Populate servers
      data.servers.forEach(server => {
        const serverElement = document.createElement('div');
        serverElement.classList.add('server-logo');

        // Create an image element for the server logo
        const logo = document.createElement('img');
        logo.src = server.logo;
        logo.alt = server.name;
        logo.title = server.name;

        serverElement.appendChild(logo);

        // Add click event to load server
        serverElement.addEventListener('click', () => loadServer(server));
        serversContainer.appendChild(serverElement);
      });
    })
    .catch(error => {
      console.error('Error loading JSON data:', error);
    });

  function loadServer(server) {
    // Clear channels and content
    channelsContainer.innerHTML = '';
    contentContainer.innerHTML = '';

    // Populate channels
    const title = document.createElement('h2');
    title.textContent = server.name;
    channelsContainer.appendChild(title);

    const channelsList = document.createElement('ul');
    server.channels.forEach(channel => {
      const channelElement = document.createElement('li');
      channelElement.textContent = channel.name;
      channelElement.addEventListener('click', () => loadChannel(channel));
      channelsList.appendChild(channelElement);
    });
    channelsContainer.appendChild(channelsList);
  }

  function loadChannel(channel) {
    // Ajouter le titre du canal
    contentContainer.innerHTML = `<h2>${channel.name}</h2>`;

    // Créer une liste pour le contenu
    const contentList = document.createElement('ul');

    // Parcourir les messages dans l'objet `content`
    Object.keys(channel.content).forEach((key, index) => {
        const messageItem = document.createElement('li');
        // Utiliser innerHTML pour interpréter les balises HTML
        messageItem.innerHTML = channel.content[key];
        contentList.appendChild(messageItem);

        // Ajouter deux sauts de ligne après chaque message sauf le dernier
        if (index < Object.keys(channel.content).length - 1) {
            contentList.appendChild(document.createElement('br'));
            contentList.appendChild(document.createElement('br'));
        }
    });

    // Ajouter la liste au conteneur
    contentContainer.appendChild(contentList);
}




  // Load the default Home view on page load
  loadHome();
});

function rickRoll(event) {
  event.preventDefault(); // Empêche la navigation par défaut

  // Affiche le GIF de Rick Astley
  const rickRollContainer = document.createElement('div');
  rickRollContainer.style.position = 'fixed';
  rickRollContainer.style.top = '50%';
  rickRollContainer.style.left = '50%';
  rickRollContainer.style.transform = 'translate(-50%, -50%)';
  rickRollContainer.style.zIndex = '9999';
  rickRollContainer.style.backgroundColor = '#000';
  rickRollContainer.style.padding = '10px';
  rickRollContainer.style.borderRadius = '8px';

  const rickRollGif = document.createElement('img');
  rickRollGif.src = 'src/image/fun/rick.gif'; // Chemin local vers le GIF
  rickRollGif.alt = 'Rick Roll';
  rickRollGif.style.width = '100%';
  rickRollGif.style.maxWidth = '500px';
  rickRollContainer.appendChild(rickRollGif);

  document.body.appendChild(rickRollContainer);

  // Joue la musique de Rick Astley
  const audio = new Audio('src/image/fun/roll.mp3'); // Chemin local vers l'audio
  audio.play();

  // Retire le GIF et arrête la musique après 5 secondes
  setTimeout(() => {
    document.body.removeChild(rickRollContainer);
    audio.pause();
  }, 5000);
}

function tea(response) {
  response.writeHead(418, { 'Content-Type': 'text/plain' });
  response.end("I'm a teapot");
}