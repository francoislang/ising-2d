## A — Objectif fonctionnel (v1)

### A.1 Objectif utilisateur

L’objectif de la version v1 est de permettre à l’utilisateur d’observer l’évolution dynamique d’un modèle d’Ising 2D en fonction de la température T et du champ magnétique externe h.

L’utilisateur peut :
- visualiser une grille bidimensionnelle de spins (+1 / −1),
- modifier en temps réel la température T et le champ magnétique h,
- observer l’impact de ces paramètres sur la configuration des spins, l’énergie et l’aimantation.

---

### A.2 Représentation visuelle

- Le système est représenté par une grille carrée de taille L × L.
- Chaque site contient un spin sᵢ ∈ {−1, +1}.
- L’orientation des spins est affichée par un code couleur.
- L’affichage est mis à jour à intervalles réguliers sous forme de snapshots.

L’affichage n’est pas synchronisé sur chaque tentative de flip de spin afin de préserver les performances.

---

### A.3 Dynamique temporelle

- La simulation repose sur une dynamique de Monte Carlo de type Metropolis.
- Le temps est discret.
- Un **step** correspond à une tentative de flip d’un spin choisi aléatoirement.
- Un **sweep** correspond à L × L steps.

Dans la version v1 :
- la simulation évolue en steps,
- les observables et l’affichage sont mis à jour toutes les N tentatives (snapshot).

---

### A.4 Paramètres contrôlés par l’utilisateur

Les paramètres suivants sont supportés dans la version v1 :

- Taille du système : L
- Température : T
- Champ magnétique externe : h
- Configuration initiale :
  - aléatoire,
  - tous les spins orientés vers le haut
- Conditions aux bords :
  - périodiques

Les paramètres peuvent être modifiés pendant l’exécution de la simulation.  
Les changements affectent la dynamique à partir de l’état courant du système.

---

### A.5 Observables affichées

#### Observables instantanées

Les observables suivantes sont calculées à partir de la configuration courante du système :

- Énergie totale : E(t)
- Aimantation totale : M(t)

Ces grandeurs sont mises à jour à chaque snapshot.

#### Observables statistiques (hors temps réel v1)

Les observables suivantes nécessitent des moyennes temporelles ou d’ensemble et ne sont pas calculées en temps réel dans la version v1 :

- Susceptibilité magnétique χ
- Énergie libre F

---

### A.6 Hors périmètre v1

Les éléments suivants sont identifiés mais exclus de la version initiale :

- Calcul précis de l’énergie libre
- Moyennes statistiques longues (susceptibilité, chaleur spécifique)
- Algorithmes de clusters (Wolff, Swendsen–Wang)
- Scan automatique en température
- Export ou relecture des trajectoires de simulation

---

## B — Modèle physique et numérique

Cette section décrit les hypothèses physiques, statistiques et numériques sous-jacentes à la simulation, indépendamment de toute considération d’implémentation technique.

---

### B.1 Modèle physique

La simulation implémente le modèle d’Ising bidimensionnel ferromagnétique défini par l’hamiltonien :

H(σ) = −J · Σ⟨i,j⟩ (sᵢ · sⱼ) − h · Σᵢ sᵢ

où :
- sᵢ ∈ {−1, +1} est le spin au site i,
- J > 0 est la constante de couplage (fixée à J = 1 dans la version v1),
- h est le champ magnétique externe,
- Σ⟨i,j⟩ désigne la somme sur les voisins les plus proches,
- des conditions aux bords périodiques sont imposées.

---

### B.2 Ensemble statistique

La simulation vise à échantillonner l’ensemble canonique à température T et champ h fixés.

Chaque configuration complète des spins σ constitue un micro-état du système et est associée à une probabilité de Boltzmann :

P(σ) = (1 / Z) · exp(−H(σ) / T)

avec :
- Z = Σσ exp(−H(σ) / T) la fonction de partition,
- β = 1 / T le facteur thermodynamique.

L’objectif de la simulation n’est pas de déterminer un unique état d’énergie minimale, mais de générer une succession de micro-états dont la fréquence de visite converge vers cette distribution.

---

### B.3 Dynamique Monte Carlo

L’évolution du système est décrite par une dynamique de Monte Carlo de type Metropolis-Hastings.

À chaque **step** :
1. un site du réseau est sélectionné aléatoirement,
2. un flip du spin est proposé,
3. la variation d’énergie ΔE associée au flip est calculée localement,
4. le flip est :
  - accepté systématiquement si ΔE ≤ 0,
  - accepté avec une probabilité exp(−ΔE / T) si ΔE > 0.

Cette règle garantit :
- l’ergodicité de la dynamique,
- le respect de l’équilibre détaillé,
- la convergence vers la distribution de Boltzmann.

Un **sweep** correspond à L × L steps, ce qui assure qu’en moyenne chaque spin a été tenté une fois.

---

### B.4 Temps Monte Carlo et interprétation physique

Le temps utilisé dans la simulation est un **temps Monte Carlo**, discret et sans correspondance directe avec le temps microscopique réel.

À paramètres T et h constants :
- le système continue d’évoluer,
- les micro-états fluctuent en permanence,
- seules les moyennes thermodynamiques sont stationnaires.

Les fluctuations observées dans la simulation sont l’expression numérique de l’agitation thermique à température finie.

---

### B.5 Calcul des observables

Les observables suivantes sont définies à partir d’un micro-état instantané σ(t) :

- Énergie totale :
  E(t) = H(σ(t))

- Aimantation totale :
  M(t) = Σᵢ sᵢ

Dans la version v1 :
- ces observables sont évaluées sur des snapshots de la dynamique,
- elles sont considérées comme des observables instantanées,
- aucune moyenne temporelle longue n’est effectuée pour l’affichage.

---

### B.6 Thermalisation et régime stationnaire

Après un changement de paramètres (température, champ, configuration initiale), le système traverse une phase transitoire de thermalisation.

Dans la version v1 :
- aucune détection automatique du régime stationnaire n’est implémentée,
- les premières configurations peuvent ne pas représenter l’ensemble canonique,
- la responsabilité de l’interprétation physique incombe à l’utilisateur.

Une gestion explicite de la thermalisation pourra être introduite dans une version ultérieure.

---

### B.7 Hypothèses et limitations (v1)

La version initiale repose sur les hypothèses suivantes :

- la dynamique Metropolis locale est suffisante pour illustrer le comportement qualitatif du modèle,
- les corrélations longues près de la transition de phase ne sont pas traitées de manière optimale,
- aucune accélération par algorithmes de clusters n’est utilisée,
- les observables nécessitant des fluctuations d’ordre supérieur (χ, C, F, S) sont volontairement exclues.

Ces choix privilégient la clarté conceptuelle et l’interactivité à la précision numérique avancée.

## C — Unités fondamentales et conventions

Cette section définit les unités fondamentales utilisées dans la simulation.
Ces unités ne correspondent pas à des unités physiques au sens SI, mais à des
conventions numériques nécessaires pour structurer le calcul, l’évolution
temporelle et l’observation du système.

---

### C.1 Unité d’espace

L’espace est discrétisé sous la forme d’une grille carrée bidimensionnelle
de taille L × L.

- L’unité d’espace est un **site de la grille**.
- Chaque site (i, j) porte un spin s(i,j) ∈ { -1, +1 }.
- Les interactions sont limitées aux voisins les plus proches
  (haut, bas, gauche, droite).
- Des conditions aux bords périodiques sont imposées.

Il n’existe pas de sous-structure spatiale en dessous du site de grille
dans la version v1.

---

### C.2 Unité d’état

L’unité d’état du système est le **micro-état**.

Un micro-état correspond à la configuration complète de tous les spins
du système :

σ = { s(i,j) } pour 1 ≤ i ≤ L et 1 ≤ j ≤ L

Les grandeurs physiques globales (énergie, aimantation) sont définies
uniquement à partir de ce micro-état complet, et non à partir de spins
individuels.

---

### C.3 Unité de calcul

L’unité élémentaire de calcul est la **tentative de flip d’un spin**.

Lors d’un flip :
- un site (i, j) est sélectionné aléatoirement,
- le spin s(i,j) est proposé à l’inversion,
- la variation d’énergie locale ΔE est calculée à partir :
  - des spins voisins,
  - du champ magnétique externe h.

Cette opération est locale, incrémentale, et constitue la brique atomique
de la dynamique Monte Carlo.

---

### C.4 Unité de temps

Le temps utilisé dans la simulation est un **temps Monte Carlo**, défini
par convention.

- L’unité fondamentale de temps est le **sweep Monte Carlo**.
- Un sweep correspond à L × L tentatives de flip.

Autrement dit :

1 sweep = L² steps

Cette convention garantit qu’en moyenne chaque spin du système a été
sélectionné une fois par unité de temps.

Le temps Monte Carlo ne possède pas de correspondance directe avec le
temps physique réel.

---

### C.5 Unité d’observation

L’unité d’observation est le **snapshot**.

Un snapshot correspond à :
- un micro-état observé,
- à un instant Monte Carlo donné,
- accompagné des observables globales associées.

Les observables instantanées incluent notamment :
- l’énergie totale E
- l’aimantation totale M

Les snapshots sont produits à une fréquence plus faible que celle des flips
ou des sweeps afin de préserver les performances et d’éviter une surcharge
d’affichage.

L’observation constitue une étape distincte du calcul et représente
l’interface entre la dynamique numérique et l’utilisateur.

---

### C.6 Séparation des échelles

Les unités définissent plusieurs échelles distinctes :

- échelle microscopique : flip de spin
- échelle dynamique : sweep Monte Carlo
- échelle d’observation : snapshot

Cette séparation permet :
- une évolution continue du système,
- une observation discrète et contrôlée,
- une interprétation cohérente des observables affichées.

---

### C.7 Conséquences pour la conception

Les choix d’unités impliquent que :

- la dynamique du système est continue en temps Monte Carlo,
- l’affichage ne reflète qu’un sous-échantillonnage de cette dynamique,
- les observables instantanées sont définies sur des micro-états complets,
- toute moyenne statistique nécessite une accumulation sur plusieurs snapshots.

Ces conventions constituent des invariants conceptuels pour la version v1
du projet.

## D — Architecture logique et répartition des responsabilités

Cette section décrit l’architecture logique du projet, c’est-à-dire la
répartition des responsabilités entre les différents composants du système.
Elle ne détaille pas l’implémentation technique, mais précise **qui fait quoi,
où, et à quel rythme**.

L’architecture est conçue pour :
- garantir de bonnes performances de calcul,
- préserver la fluidité de l’interface utilisateur,
- assurer la scalabilité côté client,
- maintenir une séparation claire entre calcul, orchestration et affichage.

---

### D.1 Principe général

La simulation est exécutée entièrement **côté client** et repose sur une
séparation stricte entre :

1. le **moteur de calcul**,
2. l’**orchestration de la simulation**,
3. l’**interface utilisateur et l’affichage**.

Chaque couche correspond à un rôle bien défini et communique avec les autres
via des interfaces explicites.

---

### D.2 Moteur de calcul (Rust)

Le moteur de calcul est responsable de la dynamique physique du modèle.

Responsabilités :
- stockage de l’état du système (configuration des spins),
- exécution de la dynamique Monte Carlo (Metropolis),
- calcul des variations d’énergie locales,
- mise à jour de l’énergie totale et de l’aimantation,
- exécution continue des sweeps Monte Carlo.

Le moteur est implémenté en **Rust** pour les raisons suivantes :
- contrôle explicite de la mémoire,
- performances élevées sur les boucles intensives,
- absence de garbage collector,
- robustesse et sûreté du modèle de concurrence.

Le moteur ne connaît ni l’interface utilisateur, ni le rythme d’affichage.
Il se contente de faire évoluer l’état physique du système.

---

### D.3 WebAssembly (WASM)

Le moteur Rust est compilé en **WebAssembly** afin d’être exécuté dans
l’environnement navigateur.

Rôle de WebAssembly :
- permettre l’exécution de code Rust côté client,
- fournir des performances proches du natif,
- exposer une interface contrôlée vers le moteur de calcul.

WebAssembly n’est pas une couche logique supplémentaire, mais un **support
d’exécution** permettant au moteur Rust de fonctionner dans le contexte web.

---

### D.4 Orchestration de la simulation (Web Worker)

L’orchestration de la simulation est assurée par un **Web Worker**.

Responsabilités :
- lancer et arrêter la simulation,
- déclencher l’exécution des sweeps,
- transmettre les paramètres (T, h, L, etc.) au moteur,
- récupérer périodiquement des snapshots,
- communiquer avec le thread principal sans le bloquer.

L’utilisation d’un Web Worker permet :
- d’exécuter les calculs lourds hors du thread principal,
- de préserver la réactivité de l’interface utilisateur,
- d’éviter toute saturation du navigateur.

La communication entre le Worker et le thread principal se fait par passage
de messages structurés.

---

### D.5 Interface utilisateur et affichage (Nuxt + TypeScript)

L’interface utilisateur est responsable de l’interaction et de la visualisation.

Responsabilités :
- affichage de la grille de spins,
- affichage des observables (E, M),
- gestion des contrôles utilisateur (curseurs T et h),
- réception et rendu des snapshots,
- typage et validation des données échangées.

Le front est implémenté avec :
- **Nuxt** pour la structure applicative et le rendu,
- **TypeScript** pour garantir la cohérence des types et des données échangées.

L’interface ne déclenche aucun calcul physique directement.
Elle agit uniquement comme **consommatrice de snapshots** et **émettrice de commandes**.

---

### D.6 Flux de données et de contrôle

Le flux logique de la simulation est le suivant :

1. l’utilisateur modifie un paramètre (T, h, initialisation),
2. l’interface envoie la commande au Web Worker,
3. le Worker transmet les paramètres au moteur Rust,
4. le moteur exécute les sweeps Monte Carlo en continu,
5. à intervalles réguliers, un snapshot est produit,
6. le snapshot est envoyé au Worker puis à l’interface,
7. l’interface met à jour l’affichage.

Ce découplage garantit que :
- le calcul n’est jamais bloqué par l’affichage,
- l’affichage reste fluide indépendamment de la charge de calcul,
- chaque composant conserve une responsabilité unique.

---

### D.7 Scalabilité et choix client-side

Le choix d’exécuter la simulation côté client permet :
- d’éviter toute charge serveur liée au calcul,
- de rendre la simulation scalable par nature,
- d’adapter automatiquement la charge au matériel de l’utilisateur.

Chaque utilisateur exécute sa propre instance de simulation, sans contention
de ressources partagées.

---

### D.8 Invariants architecturaux (v1)

Dans la version v1, les invariants suivants sont imposés :

- le moteur de calcul ne dépend pas de l’interface utilisateur,
- l’interface ne déclenche pas de calculs physiques,
- toute communication passe par des messages explicites,
- le calcul est exécuté hors du thread principal,
- l’observation est découplée de la dynamique interne.

Ces invariants structurent l’architecture et facilitent l’évolution du projet
vers des versions ultérieures.

## E — Critères de validation de la version v1

Cette section définit les critères permettant de considérer la version v1 du
projet comme fonctionnelle, stable et conforme aux objectifs définis dans les
sections précédentes.

La version v1 est validée lorsque l’ensemble des critères suivants est satisfait.

---

### E.1 Expérience utilisateur

- L’interface utilisateur est fluide et réactive.
- Les interactions avec les contrôles (température, champ magnétique,
  taille du système) n’entraînent pas de blocage de l’interface.
- L’évolution du système est perceptible visuellement sans artefacts majeurs.

---

### E.2 Simulation du modèle d’Ising

- Le système simule un modèle d’Ising bidimensionnel avec conditions aux bords
  périodiques.
- La dynamique suit une règle de type Metropolis.
- La configuration des spins évolue de manière continue à température finie.
- À température élevée, les spins apparaissent désordonnés.
- À basse température et champ non nul, une aimantation globale est observée.

---

### E.3 Paramètres interactifs

Les paramètres suivants peuvent être modifiés par l’utilisateur :

- Température T
- Champ magnétique externe h
- Taille de la grille L

Les changements de paramètres :
- sont pris en compte sans rechargement de l’application,
- affectent la dynamique à partir de l’état courant du système,
- n’entraînent pas d’erreur ou d’état incohérent.

---

### E.4 Observables affichées

Les observables suivantes sont affichées en temps quasi réel :

- Énergie totale en fonction du temps Monte Carlo : E(t)
- Aimantation totale en fonction du temps Monte Carlo : M(t)

Les courbes :
- se mettent à jour à partir des snapshots,
- reflètent qualitativement le comportement attendu du modèle,
- ne nécessitent pas de moyennes statistiques longues.

---

### E.5 Robustesse et communication entre composants

- Le moteur de calcul (Rust/WASM) fonctionne correctement dans un Web Worker.
- La communication entre :
  - l’interface utilisateur,
  - le Web Worker,
  - le moteur de calcul
    est fonctionnelle et stable.
- Aucun calcul lourd n’est exécuté sur le thread principal.
- Les messages échangés sont correctement typés et interprétés.

---

### E.6 Limites acceptées pour la v1

Les limitations suivantes sont acceptées pour la version v1 :

- les performances dépendent du matériel de l’utilisateur,
- aucune garantie de convergence statistique précise n’est fournie,
- les observables sont interprétées qualitativement,
- aucune persistance ou export des données n’est implémenté.

Ces limites n’empêchent pas la validation de la version v1 tant que les
critères précédents sont respectés.