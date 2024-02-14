// Pour la Pause
let ispaused = false;

//Récupération des hightscores
let Hightscore = [0,0,0]
if (Sup.Storage.getJSON("Score") != null) // Uniquement si il y a déjà des hightscores enregistrés
{Hightscore = Sup.Storage.getJSON("Score");}

//variables Globale de BackgroundCreator
let IDBackgroundSol = 0;
let IDBackgroundObject = 0;
let PositionBacgroundSolX = -128;

//variables Globale du player
let VectorPY = 0;
let VectorPX = 0;

//le score + score de la prise acctuelle
let Score = 0;

let CatchScore = 0;

//Pour savoir dans quel mod on est
let Menu = 1;
let Timemod = 0;
let Lifemod = 0;

// couleur blanche et couleur foncé
let colorw = new Sup.Color(15987699);
let colorb = new Sup.Color(9539985);

//le temps
let Time = 61;

//le nombre de vies
let Life = 0;

// Pour la créatiion de poissons
let GORD = [-32,1312]

//son
 let  hit = new Sup.Audio.SoundPlayer("Sons/fishhit",8)
 let  tick = new Sup.Audio.SoundPlayer("Sons/tick",150)
 let  tack = new Sup.Audio.SoundPlayer("Sons/tack",150)

      