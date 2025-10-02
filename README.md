# Todo List - Next.js + Tailwind CSS

Un projet **Todo List** développé avec **Next.js** et **Tailwind CSS**.  
Cette application permet de gérer des tâches de manière simple et rapide.

---

## 🚀 Fonctionnalités

- Ajouter des tâches
- Supprimer des tâches
- Marquer une tâche comme terminée
- Stockage des tâches dans un fichier JSON (backend simplifié)
- Interface moderne et responsive grâce à Tailwind CSS

---

## 🛠 Technologies utilisées

- [Next.js](https://nextjs.org/) - Framework React pour le SSR et SSG
- [React](https://reactjs.org/) - Bibliothèque UI
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS utilitaire
- [uuid](https://www.npmjs.com/package/uuid) - Pour générer des IDs uniques
- JSON pour le stockage local simple des tâches

---

## 💻 Installation

1. Cloner le repo :

```bash
git clone https://github.com/olajidesmithjunior-dot/todo-list.git
cd todo-list
````

2. Installer les dépendances :

```bash
npm install
```

3. Lancer le projet en développement :

```bash
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) dans le navigateur.

---

## 📂 Structure du projet

```
├── app/                 # Pages et routes App Router
├── components/          # Composants réutilisables (ex: TodoItem, Breadcrumb)
├── data/                # Stockage JSON des tâches
├── public/              # Assets (images, icônes)
├── styles/              # CSS global et Tailwind
├── package.json         # Dépendances et scripts
```

---

## 🔧 Personnalisation

* Modifier le fichier `data/tasks.json` pour précharger des tâches.
* Personnaliser Tailwind dans `tailwind.config.js` si besoin.

---

## 📈 Déploiement

Ce projet peut être déployé facilement sur **Vercel** :

```bash
vercel deploy
```

---

## 🤝 Contribution

Les contributions sont les bienvenues !
Forkez le repo et créez une **pull request** pour proposer vos améliorations.

---

## 📄 Licence

Ce projet est sous licence MIT.

```
