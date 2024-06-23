// Création d'un ensemble pour suivre les membres salués aujourd'hui
const greetedMembersToday = new Set();

// Fonction pour gérer la commande !piscine
async function handlePiscineCommand(message) {
    try {
        // Ajoute un rôle spécifique à l'utilisateur
        await message.member.roles.add('1207072732978618399');
        // Répond à l'utilisateur avec un message de confirmation
        await message.reply('Bravo ! Tu peux dorénavant barboter librement sur la totalité du serveur !');
    } catch (error) {
        // Logge une erreur en cas de problème
        console.error("Erreur lors de l'exécution de la commande !piscine:", error);
    }
}

// Fonction pour gérer les salutations quotidiennes
async function handleDailyGreetings(message) {
    // Vérifie si l'utilisateur a déjà été salué aujourd'hui
    if (!greetedMembersToday.has(message.author.id)) {
        // Ajoute l'utilisateur à l'ensemble des membres salués
        greetedMembersToday.add(message.author.id);
        // Envoie un message de salutation dans un canal spécifique
        await sendMessage(message.client, '1207071388305854578', `Bonjour ${message.author}! C'est super de te revoir parmi nous.\nQue vas-tu apprendre aujourd'hui ?\nDu Shell ? Du C ? Ou voyager avec un peu de computer-science ?`);
    }
}

// Fonction auxiliaire pour envoyer des messages dans les canaux
async function sendMessage(client, channelId, message) {
    try {
        // Récupère le canal par son ID
        const channel = await client.channels.fetch(channelId);
        // Envoie le message dans le canal
        await channel.send(message);
    } catch (error) {
        // Logge une erreur en cas de problème
        console.error(`Erreur lors de l'envoi du message dans le canal ${channelId}:`, error);
    }
}

// Exportation des fonctions pour les utiliser dans d'autres fichiers
module.exports = {
    handlePiscineCommand,
    handleDailyGreetings,
    sendMessage
};
