// Appel du Menu au demarage du jeu
Menuini();

//Création des éléments visuels communs
   Sup.setTimeout(0,CameraCreator);
   Sup.setTimeout(1,BackgroundSeaCreator);
   Sup.setTimeout(1,BackgroundCreatorSol);
   Sup.setTimeout(1,BackgroundCreatorObject);
   Sup.setTimeout(1,FishCreator);
  




////== Création de la Caméra (pour voir son jeu blabla, la base) V
function CameraCreator()
{
  // Création de l'acteur  
  let actor = new Sup.Actor("Camera");
  
  // Positionnement
  actor.setPosition(640,320,10)
  
 // Attribution de la Camera
  new Sup.Camera(actor)
  actor.camera.setOrthographicMode(true);
  actor.camera.setOrthographicScale(640);
   
}

////== Création du Background bleu V
function BackgroundSeaCreator()
{
  // Création de l'acteur  
  let actor = new Sup.Actor("WaterBackground");
  
  // Positionnement
  actor.setPosition(640,320,0)
  
  // Attribution du sprite
  new Sup.SpriteRenderer(actor,"SPRITE/WaterBackgound");
  
  
  actor.addBehavior(GAMEBehavior); 
   
}

////== Une fonction qui créer le fond marin Aléatoire (Object) V
function BackgroundCreatorObject()
{
  IDBackgroundObject++;
  
// Création de l'acteur V
  let actor = new Sup.Actor("BaObject" + IDBackgroundObject + ""); 
   
// Positionement de l'acteur V
  actor.setPosition(Sup.Math.Random.integer(0,1280),115,Sup.Math.Random.integer(5,7));
  
// Attribution d'un sprite aléatoire V
  new Sup.SpriteRenderer(actor,"SPRITE/BackgoundObject/BObject" + Sup.Math.Random.integer(1,8) + "")

  if (IDBackgroundObject !=80)
  {BackgroundCreatorObject();}
   
}

////== Une fonction qui créer le fond marin Aléatoire (SOL) V
function BackgroundCreatorSol()
{
  IDBackgroundSol++
  
  // Création de l'acteur V
  let actor = new Sup.Actor("Batitle" + IDBackgroundSol + "");
  
  // Positionement de l'acteur V
  PositionBacgroundSolX = PositionBacgroundSolX + 128;
  actor.setPosition(PositionBacgroundSolX,0,8);
  
  // Attribution d'un sprite aléatoire V
  new Sup.SpriteRenderer(actor,"SPRITE/BackgoundTitle/Btitle" + Sup.Math.Random.integer(1,4) + "")

// Il nous en faut dix pour faire le sol complet  V
  if (IDBackgroundSol !=10)
  {Sup.setTimeout(1,BackgroundCreatorSol);}
}

//////////=== Les Fonctions Principales ===////////// ===============================================================

function SupTransition() //V
{
   Sup.getActor("SCOREA").destroy()
   Sup.getActor("PLAYER01").destroy()
   Menuini()
}

// Le Menu est initialisé V
function Menuini()
{
   Menu = 1;
   Timemod = 0;
   Lifemod = 0;

  // on affiche les acteurs du Menu
   Sup.setTimeout(1,NavMenu);
   Sup.setTimeout(1,PlayerCreator);
   Sup.setTimeout(1,treeHight);
}

// Création du Menu, du titre, et de la description des mods et commandes V
function NavMenu()
{
 // Création de l'acteur   MENU
  let actor = new Sup.Actor("NavMenu");
  
  // Positionnement
  actor.setPosition(640,320,9)
  
  // Attribution du sprite
  new Sup.SpriteRenderer(actor,"SPRITE/Menu/Menu0"); 
  
  // Création de l'acteur   TITRE
  let title = new Sup.Actor("TITRE");
  
  // Positionnement
  title.setPosition(640,490,9)
  
  // Attribution du sprite
  new Sup.SpriteRenderer(title,"SPRITE/TITLE");
  
    // Création de l'acteur  PRESS
  let Press = new Sup.Actor("PRESS");
  
  // Positionnement
  Press.setPosition(640,260,9)
  
  // Attribution du sprite
  new Sup.SpriteRenderer(Press,"SPRITE/PRESSSPACE");
  //Clignottement
  Sup.setTimeout(750,presscli)
  
    // Création de l'acteur   MODINFO
  let INFO = new Sup.Actor("INFO");
  
  // Positionnement
  INFO.setPosition(80,630,9)
  
  // Attribution du sprite
  new Sup.SpriteRenderer(INFO,"SPRITE/Info/Info01");
 
}

//Clignotement de pressspace
function presscli()
{
  if(Menu==1)
    {
  if(Sup.getActor("PRESS").getVisible() == false)
  {Sup.getActor("PRESS").setVisible(true)}
  else{Sup.getActor("PRESS").setVisible(false)}
  Sup.setTimeout(750,presscli);
    }
  
}

////== Création du Joueur V
function PlayerCreator()
{
  // Création de l'acteur  V
  let actor = new Sup.Actor("PLAYER01");
  
  // Positionnement V
  actor.setPosition(640,-80,9)
  
  // Attribution du sprite V
  new Sup.SpriteRenderer(actor,"SPRITE/Player");
  
   // Création d'un arcade body 2D V
  let Bodytype = Sup.ArcadePhysics2D.BodyType.Box;
  new Sup.ArcadePhysics2D.Body(actor, Bodytype, {movable : true, width: 5,  height: 26,  offset: { x: 0, y: 186, }, bounce: { x: 0, y: 0, }} );
  
  // L'acteur suis le comportement de PlayerCmpGame ou PlayerCmpMenu V
   if (Menu == 0){actor.addBehavior(PlayerCmpGame)}
    else{actor.addBehavior(PlayerCmpMenu)}   
  
  
}

// L'affichage du score quand une game est finit V
function ScoreScreen()
{
  Menu = 1;
  VectorPY = 0;   
  let mod: number;
  
  //Supression des acteurs commun aux mods V
  Sup.getActor("Poissongold").destroy()
  Sup.getActor("SCORE").destroy()
  
  //On cache le joueur car le supprimer ferrait bug les poissons, donc le jeu et on l'empécher de bouger V
  Sup.getActor("PLAYER01").setVisible(false);
  Sup.getActor("PLAYER01").arcadeBody2D.setMovable(false);
  
   if(Timemod == 1 && Lifemod == 0) // pour le mod time V
  {
    mod = 0; 
    Sup.getActor("TIME").destroy()
    Sup.getActor("TIMEadd").destroy()
  }
  
   if(Timemod == 1 && Lifemod == 1) // pour le mod hard V
  {
    mod = 1;
  Sup.getActor("TIME").destroy()
  Sup.getActor("TIMEadd").destroy()
  Sup.getActor("harplife").destroy()
  }
  
    if(Timemod == 0 && Lifemod == 1) // pour le mod life V
  { 
    mod = 2;
   Sup.getActor("harplife").destroy()
  }
  
   if(Hightscore[mod]<Score)// Si le score du mod est meilleur que celui enregistré, c'est un nouveau Hightscore V
   {
     Hightscore[mod]=Score
     Sup.Storage.setJSON("Score",Hightscore) // Enregistrement du hight score V
   } 
    
   
  // Affichage du score de la partie V
  let actor = new Sup.Actor("SCOREA");
  actor.setPosition(640,345,9);
  new Sup.TextRenderer(actor);
  actor.textRenderer.setSize(1500);
  actor.textRenderer.setFont("BUBLE");
  actor.textRenderer.setText(Score+"");
  
   
  // Appel du Menu après 1.5s V
  Sup.setTimeout(1500,SupTransition);
}

//=// Mod Time V
function ModTime()
{
  Menu = 0;
  Time = 60;
  Score = 0;
  CatchScore = 0;
  Timemod = 1;
    
  // Destruction des acteurs du Menu
  Sup.getActor("NavMenu").destroy();
  Sup.getActor("TITRE").destroy();
   Sup.getActor("PRESS").destroy();
   Sup.getActor("INFO").destroy();
  Sup.getActor("PLAYER01").destroy();
  Sup.getActor("TreeHight").destroy();
  
  // Création des Acteurs du mod Time
  Sup.setTimeout(1,PlayerCreator);   VectorPY = 0; // Pour stopper le harpon après la sélection
  Sup.setTimeout(1,GoldFish);
  Sup.setTimeout(1,ScorePanel);
  Sup.setTimeout(1,Timecounter);
  Sup.setTimeout(1,Timeadd);
}

//=// Mod Hard (appel des fonction life + time) V
function ModHard()
{
  Menu = 0;
  Time = 60;
  Life = 6;
  Score = 0;
  CatchScore = 0;
  Timemod = 1;
  Lifemod = 1;
  
  // Destruction des acteurs du Menu
    Sup.getActor("NavMenu").destroy();
    Sup.getActor("TITRE").destroy();
     Sup.getActor("PRESS").destroy();   
  Sup.getActor("INFO").destroy();
    Sup.getActor("PLAYER01").destroy();
    Sup.getActor("TreeHight").destroy();
  
  // Création des Acteurs du mod Time et Life
  Sup.setTimeout(1,PlayerCreator);   VectorPY = 0; // Pour stopper le harpon après la sélection
  Sup.setTimeout(1,GoldFish);
  Sup.setTimeout(1,ScorePanel);
  Sup.setTimeout(1,Timecounter);
  Sup.setTimeout(1,Timeadd);
  Sup.setTimeout(1,Harpcounter);
  
}

//=// Mod Life  V
function ModLife()
{
  
  Menu = 0;
  Life = 6;
  Score = 0;
  CatchScore = 0;
  Lifemod = 1;
  
  
    // Destruction des acteurs du Menu
    Sup.getActor("NavMenu").destroy();
    Sup.getActor("TITRE").destroy();
     Sup.getActor("PRESS").destroy();
     Sup.getActor("INFO").destroy();
    Sup.getActor("PLAYER01").destroy();
    Sup.getActor("TreeHight").destroy();

  
  // Création des Acteurs du mod Life
  Sup.setTimeout(1,PlayerCreator);   VectorPY = 0; // Pour stopper le harpon après la sélection
  Sup.setTimeout(1,GoldFish);
  Sup.setTimeout(1,ScorePanel);
  Sup.setTimeout(1,Harpcounter);
}

//=// Créer l'affichage du hightscore du menu V
function treeHight()
{
  let actor = new Sup.Actor("TreeHight");
  actor.setPosition(932,260,9);
  new Sup.TextRenderer(actor);
  actor.textRenderer.setSize(400);
  actor.textRenderer.setFont("BUBLE")
  actor.textRenderer.setText(Hightscore[0]+""+"-"+Hightscore[1]+""+"-"+Hightscore[2]+"")
  
  actor.setVisible(false)
}

//=// Montre le highscore des autre joueur ou toutes fonction que tu veut V
function ShowHightscore()
{
// OUAH AFFICHE en grand LE HS
}

////== La fonction qui creér le timecounter V
function Timecounter()
{
  let actor = new Sup.Actor("TIME");
  actor.setPosition(1140,585,9);
  new Sup.TextRenderer(actor);
  actor.textRenderer.setSize(720);
  actor.textRenderer.setFont("BUBLE")
  
  //lancement du décompte
  timego()
}

////== La fonction qui fait défiler le timecounter V
function timego()
{
  
  Time = Time - 1;
  if (Time > 0 && Menu == 0 )
  {
 
  Sup.getActor("TIME").textRenderer.setText( Time + "")  
   
  Sup.setTimeout(1000,timego)
  }
  else
  {ScoreScreen()}
  
  
}

////== La fonction qui creér le timeadd V
function Timeadd()
{
  let actor = new Sup.Actor("TIMEadd");
  actor.setVisible(false);
  actor.setPosition(1140,545,9);
  new Sup.TextRenderer(actor);
  actor.textRenderer.setSize(720);
  actor.textRenderer.setFont("BUBLE")
  actor.textRenderer.setText("+1s")
} 

////== La fonction qui cache le conteur temps ajouté V
function hidetadd(){Sup.getActor("TIMEadd").setVisible(false)}

////== La fonction qui créer les Lifes et le plus V
function Harpcounter()
{
 // Création de l'acteur  
  let actor = new Sup.Actor("harplife");
 // Positionnement
 actor.setPosition(140,545,9)
 // Attribution du sprite
 new Sup.SpriteRenderer(actor,"SPRITE/harplife");
 
  // Creation du plus...
  let plus = new Sup.Actor("plus");plus.setPosition(85,545,9);new Sup.SpriteRenderer(plus,"SPRITE/POINT/plus");plus.setVisible(false);
}
//et celle ci acctualise l'affichage de la vie V
function Harpactua()
{ if(Life<7){Sup.getActor("harplife").spriteRenderer.setAnimation(Life+"")}}

////== La Fonction qui cache le plus V
function hideplus(){Sup.getActor("plus").setVisible(false)}

////== La Fonction qui créer les poissons V
let idfish = 0;

function FishCreator()
{   
  idfish++;
  
  // création de l'acteur
  let actor = new Sup.Actor("Poisson" + idfish + "");
  
  // positionement aléatoirement G ou D et sur y
  actor.setPosition(GORD[Sup.Math.Random.integer(0,1)],Sup.Math.Random.integer(180,607),6);
 
 // Chaque acteur suis le comportement movefish
  actor.addBehavior(FIshMove);

  TimeoutPause = Sup.setTimeout(Sup.Math.Random.integer(250,950),FishCreator);
}

////== La Fonction qui créer le poisson doré V
function GoldFish()
{
  // Création de l'acteur  
  let actor = new Sup.Actor("Poissongold");
  
  // positionement     
  actor.setPosition(960,320,6);
  
  // Création d'un arcade body 2D
  let Bodytype = Sup.ArcadePhysics2D.BodyType.Box;
   
  new Sup.ArcadePhysics2D.Body(actor, Bodytype, {movable : true, width: 21,  height: 12,  offset: { x: 0, y: 0, }, bounce: { x: 0, y: 0, }} );
  
  // Attribution du sprite
  new Sup.SpriteRenderer(actor,"SPRITE/Fishs/FishGold");
  
  // L'acteur suis le comportement FishGOLDcmp
   actor.addBehavior(FishGOLDcmp);
}

////== La fonction qui creér le panel du score V
function ScorePanel()
{
  let actor = new Sup.Actor("SCORE");
  actor.setPosition(140,585,9);
  new Sup.TextRenderer(actor);
  actor.textRenderer.setSize(720);
  actor.textRenderer.setFont("BUBLE")
  actor.textRenderer.setText("0")

}

