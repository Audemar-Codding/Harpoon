class FIshMove extends Sup.Behavior {
 time = 0; 
 movex = 0;
 movey = 0.2;
 nsprite 
 flagscore = 1;
 npupd = [pupdelete1,pupdelete2,pupdelete3,pupdelete4,pupdelete5,pupdelete6];
width  = [50,58,48,62,58,44]
height = [48,40,56,30,30,26]

// Récupération des sons
   point = new Sup.Audio.SoundPlayer("Sons/pointwin",8)

  start()
  {

// Attribution d'un sprite aléatoire V
  this.nsprite = Sup.Math.Random.integer(1,6);
  new Sup.SpriteRenderer(this.actor,"SPRITE/Fishs/Fish" + this.nsprite + "");

// Création d'un arcadebody2D en fonction du sprite V
  let Bodytype = Sup.ArcadePhysics2D.BodyType.Box;

  new Sup.ArcadePhysics2D.Body(this.actor, Bodytype, {movable : true, width: this.width[this.nsprite-1],  height: this.height[this.nsprite-1],  offset: { x: 0, y: 0, }, bounce: { x: 0, y: 0, }});
  
    // HO ! la queue du poisson bougeeee V
    this.actor.spriteRenderer.setAnimation("Move")
   
    // On lui dit vers où aller sur X et à quel vitesse V
   if (this.actor.getX()==-32) 
   {
     this.movex = this.nsprite/2 + Sup.Math.Random.float(1,4); 
   } 
    else  
    {
      this.movex = this.nsprite*-1/2 - Sup.Math.Random.float(1,4); 
      this.actor.spriteRenderer.setHorizontalFlip(true);
    }
       
     this.actor.arcadeBody2D.setVelocity(this.movex,this.movey);
    
    // Temps d'attente aléatoire avant que le poisson ne changer d'orientation sur y V
     this.time = Sup.Math.Random.integer(-200,100);
  }

  update() {

    if (this.movey!=15) // Si pas harponné V~
         {
    
    this.time++;
      
    let PosX = this.actor.getX();
    let PosY = this.actor.getY();


    // Collision avec le bord haut ou bas et donc changement d'orientation sur y
    if (PosY == 160 || PosY == 608)
      {
         this.movey=this.movey*-1
         this.actor.arcadeBody2D.setVelocity(this.movex,this.movey)
      }
    
    // Sortie de l'écran sur X ou Y et donc suppréssion de l'acteur
    if (PosX < -32 || PosX > 1312 || PosY >  640)
      {
         this.actor.destroy();
      }
    
    // Une fois un certain temps écoulé le poisson change d'orientation sur Y
    if (this.time==180)
      {
        this.time = Sup.Math.Random.integer(-60,60);
        this.movey=this.movey*-1;              
      }
    
            }
    
        
    // Se fait harponner V
    if (Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D,Sup.getActor("PLAYER01").arcadeBody2D))
      {
             
 
       
        // En fonction du poisson, augmente le score, le temps et le score de prise
        if(this.flagscore == 1) {
          
          //les sons joués
         hit.play(); 
         this.point.play();
          
         CatchScore = CatchScore + this.nsprite // le score de la prise
       
        
        if (Timemod == 1) {
        if (CatchScore>=10)  // Affichage du temps ajouté par la prise si >= à 10
          {
            Time++; // le temps  (ajouté automatiquement par la fonction timego)  
            Sup.getActor("TIMEadd").setVisible(true);
            tick.play()
            tack.play()
          }
          

        
       
                          }
          
        // Acctuallisation du score  
        Score =   Score + this.nsprite   
        Sup.getActor("SCORE").textRenderer.setText(Score + "");
                 
        // popups du score
        let popup = new  Sup.Actor( this.nsprite + "" + "pup");
        
       popup.setPosition(this.actor.getX(),this.actor.getY()+40,9.2)
        
        new Sup.SpriteRenderer(popup,"SPRITE/POINT/" + this.nsprite + "");
         
        Sup.setTimeout(350,this.npupd[this.nsprite-1]);
         
        this.flagscore = 0;    

                
             this.movex = 0;
                this.movey = 15;
       
        // Positionne le poisson sur la pointe du harpon
        this.actor.arcadeBody2D.warpPosition(new Sup.Math.Vector3(Sup.getActor("PLAYER01").getX(),Sup.getActor("PLAYER01").getY()+160,9));
        
        }

      }
    
    this.actor.arcadeBody2D.setVelocity(this.movex,this.movey)
   
  }
}
Sup.registerBehavior(FIshMove);

class FishGOLDcmp extends Sup.Behavior {
time = 0; 
movex = 5;
movey = 2.5;
flagscore = 1;
  
point = new Sup.Audio.SoundPlayer("Sons/goldcatch",1)

  start() {
    //  HO ! la queue du poisson bouuugeee
    this.actor.spriteRenderer.setAnimation("Move");
   
    // On lui dit vers où aller sur X et Y
  this.actor.arcadeBody2D.setVelocity(this.movex,this.movey);
    
    // Temps d'attente aléatoire avant que le poisson ne changer d'orientation sur y
     this.time = Sup.Math.Random.integer(-300,150);
  }

  update() {
   
    this.time++;

       
    // Se fait harponner
    if (Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D,Sup.getActor("PLAYER01").arcadeBody2D) )
      {
                this.movex = 0;
                this.movey = 15;
       
        // Positionne le poisson sur la pointe du harpon
        this.actor.arcadeBody2D.warpPosition(new Sup.Math.Vector3(Sup.getActor("PLAYER01").getX(),Sup.getActor("PLAYER01").getY()+190,9.1));
      
        // En fonction du poisson, augmente le score
        if(this.flagscore == 1) {
          
          //son
          this.point.play();
          hit.play();
          
          Score = Score + 10;  
          Sup.getActor("SCORE").textRenderer.setText(Score + "");
          
          Time++; // le temps  (ajouter automatiquement par la fonction timego)
          
          CatchScore = CatchScore + 10 // le score de la prise
          
          // Affichage du temps ajouté par la prise
        if (Timemod == 1) { Sup.getActor("TIMEadd").setVisible(true); }             
       
          // popup du score
       
        let popup = new  Sup.Actor( 10 + ""+ "pup" );
        
        popup.setPosition(this.actor.getX(),this.actor.getY()+20,9.2)
        
        new Sup.SpriteRenderer(popup,"SPRITE/POINT/" + 10 + "");
        
        Sup.setTimeout(500,pupdelete10);
          
              this.flagscore = 0;
        }
        // arrête le poisson une fois hors de l'écrans
      if (this.actor.getY() >  640)
      {this.movey = 0; this.movex = 0;}
      
      }
    else
{    
    // Collision avec le bord haut ou bas et donc changement d'orientation sur y
    if (this.actor.getY() < 160 || this.actor.getY() > 608)
      {
         this.movey=this.movey*-1
         this.actor.arcadeBody2D.setVelocity(this.movex,this.movey)
      }
    
    // Collision avec le bord droite ou gauche et donc changement d'orientation sur x
    if (this.actor.getX() < 48 || this.actor.getX() > 1232)
      {this.movex=this.movex*-1
         this.actor.arcadeBody2D.setVelocity(this.movex,this.movey);
       if (this.actor.spriteRenderer.getHorizontalFlip() == true)
       {this.actor.spriteRenderer.setHorizontalFlip(false)}
       else{this.actor.spriteRenderer.setHorizontalFlip(true)}
      }
    
    // Une fois un certain temps écoulé le poisson change d'orientation sur y
    if (this.time==180)
      {
        this.time = Sup.Math.Random.integer(-300,150);
        this.movey=this.movey*-1; 
        this.actor.arcadeBody2D.setVelocity(this.movex,this.movey)
      }
 }
    
    
  }
}
Sup.registerBehavior(FishGOLDcmp);


