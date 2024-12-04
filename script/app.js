document.addEventListener('DOMContentLoaded', () => {
  const serversContainer = document.getElementById('servers');
  const channelsContainer = document.getElementById('channels');
  const contentContainer = document.getElementById('content');

  // Charge et affiche l'accueil
  function loadHome() {
    channelsContainer.innerHTML = '';
    contentContainer.innerHTML = '';

    const homeTitle = document.createElement('h2');
    homeTitle.textContent = 'Bienvenue !';
    const homeDescription = document.createElement('p');
    homeDescription.textContent = 'Bienvenue sur mon portfolio ! Celui-ci ressemble a discord. Chaque serveur a gauche représente différente information. Le serveur le plus haut et le bouton home et vous ramènera ici.';
    contentContainer.appendChild(homeTitle);
    contentContainer.appendChild(homeDescription);
  }

  // Ajoute un bouton "Home" au conteneur des serveurs
  function addHomeServer() {
    const homeButton = document.createElement('div');
    homeButton.classList.add('server-logo');
    homeButton.title = 'Home';
    homeButton.innerHTML = `<img src="src/image/home.png" alt="Home" style="width: 100%; height: auto;">`;
    homeButton.addEventListener('click', loadHome);
    serversContainer.prepend(homeButton);
  }

  // Charge les serveurs depuis le fichier JSON
  axios.get('src/json/data.json')
    .then(response => {
      const data = response.data;
      addHomeServer();
      data.servers.forEach(server => {
        const serverElement = document.createElement('div');
        serverElement.classList.add('server-logo');
        const logo = document.createElement('img');
        logo.src = server.logo;
        logo.alt = server.name;
        logo.title = server.name;
        serverElement.appendChild(logo);
        serverElement.addEventListener('click', () => loadServer(server));
        serversContainer.appendChild(serverElement);
      });
    })
    .catch(error => {
      console.error('Error loading JSON data:', error);
    });

  // Charge et affiche les informations d'un serveur
  function loadServer(server) {
    channelsContainer.innerHTML = '';
    contentContainer.innerHTML = '';

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

  // Charge et affiche le contenu d'un canal
  function loadChannel(channel) {
    contentContainer.innerHTML = `<h2>${channel.name}</h2>`;
    const contentList = document.createElement('ul');
    Object.keys(channel.content).forEach((key, index) => {
      const messageItem = document.createElement('li');
      messageItem.innerHTML = channel.content[key];
      contentList.appendChild(messageItem);
      if (index < Object.keys(channel.content).length - 1) {
        contentList.appendChild(document.createElement('br'));
        contentList.appendChild(document.createElement('br'));
      }
    });
    contentContainer.appendChild(contentList);
  }

  // Affiche l'accueil au chargement initial
  loadHome();
});

// Affiche une Rick Roll avec son et animation
function rickRoll(event) {
  event.preventDefault();
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
  rickRollGif.src = 'src/image/fun/rick.gif';
  rickRollGif.alt = 'Rick Roll';
  rickRollGif.style.width = '100%';
  rickRollGif.style.maxWidth = '500px';
  rickRollContainer.appendChild(rickRollGif);

  document.body.appendChild(rickRollContainer);

  const audio = new Audio('src/image/fun/roll.mp3');
  audio.play();

  setTimeout(() => {
    document.body.removeChild(rickRollContainer);
    audio.pause();
  }, 5000);
}

// Affiche une page d'erreur 418 avec animation et son
function tea(event) {
  event.preventDefault();
  document.body.innerHTML = '';
  const error418Container = document.createElement('div');
  error418Container.style.textAlign = 'center';
  error418Container.style.height = '100vh';
  error418Container.style.display = 'flex';
  error418Container.style.flexDirection = 'column';
  error418Container.style.justifyContent = 'center';
  error418Container.style.alignItems = 'center';

  const errorTitle = document.createElement('h1');
  errorTitle.textContent = "Erreur 418  - Je ne peux pas faire de café, je suis une théière ! ☕";
  errorTitle.style.fontSize = '3rem';
  errorTitle.style.marginBottom = '20px';
  error418Container.appendChild(errorTitle);

  const teaGif = document.createElement('img');
  teaGif.src = 'src/image/fun/tea.gif';
  teaGif.alt = 'Erreur 418 - Théière';
  teaGif.style.maxWidth = '300px';
  teaGif.style.borderRadius = '10px';
  error418Container.appendChild(teaGif);

  const errorMessage = document.createElement('p');
  errorMessage.textContent = "Vous serez redirigé à l'accueil dans 5 secondes.";
  errorMessage.style.fontSize = '1.2rem';
  errorMessage.style.marginTop = '10px';
  error418Container.appendChild(errorMessage);

  document.body.appendChild(error418Container);

  const audio = new Audio('src/image/fun/coffee.mp3');
  audio.play();

  setTimeout(() => {
    location.reload();
  }, 5000);
}
