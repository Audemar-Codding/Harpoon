// Quand dans une game V
class PlayerCmpGame extends Sup.Behavior {
 
  flag = 1;
  lifeadd = new Sup.Audio.SoundPlayer("Sons/life+",1)
  
  update() {
  
    VectorPX = 0;
    
    
    
    if (this.actor.getY() > 640) // Quand hors de l'écran V
      { 
        this.flag = 1;

        // on réduit à 0 le score de la prise, on cache l'affichage du addtime et on gére la Life
              
        if (Timemod == 1){hidetadd();}
       
        if (Lifemod == 1)
        {
          if(CatchScore >= 10) {Life++;this.lifeadd.play() ;Sup.getActor("plus").setVisible(true);  Sup.setTimeout(350,hideplus); Harpactua()}
          if(Life<1){ScoreScreen()}
          
        }
        
        CatchScore = 0;
        
        // on stope le harpon
        VectorPX = 0 ; VectorPY = 0; 
                     
        // remise à zero de la position du joueur sans setposition mais warp pour que le code fonctionne
       this.actor.arcadeBody2D.warpPosition(new Sup.Math.Vector3(this.actor.getX(),-80,9));
                    
      }
     else
    {
   
      if(this.actor.getY() == -80)   //pour éviter qu'on puisse bouger le harpon après l'avoir lancé     V
      {
        
        if (Sup.Input.isKeyDown("RIGHT") && this.actor.getX() < 1195) { VectorPX = 8;}
     
        if (Sup.Input.isKeyDown("LEFT") && this.actor.getX() > 85)  {VectorPX = -8;}
    
       }
          
      // On lance le harpon V
    if (Sup.Input.wasKeyJustPressed("SPACE"))  
    {
      VectorPY = 15;  
    
     if (Lifemod == 1 && this.flag == 1 ) // on enléve une vie
        {
          this.flag = 0;
          Life--;
          Harpactua(); 
        } 
     
    }
    
      } // fin else
 
    this.actor.arcadeBody2D.setVelocity( VectorPX, VectorPY );
  }
      
}  
Sup.registerBehavior(PlayerCmpGame);

// Quand dans le Menu V
class PlayerCmpMenu extends Sup.Behavior {
  
  Menu = 1
  NavSmenu = 0
  NavSprite = 0
  infomenu = 0
  infosprite = 0
  Mod = [ModTime,ModHard,ModLife,ShowHightscore]
  NavMenuActor = Sup.getActor("NavMenu");
  Sselect= new Sup.Audio.SoundPlayer("Sons/select",8);
  
  update() {
     
  
    ////== Changement de la selection active si il y a un mouvement V
   if (VectorPX != 0)
    {
       VectorPX = 0;
      let Px = this.actor.getX();
      
      // Hors du Menu V
      if(Px > 962 || Px < 378)
         {
           this.NavSmenu = 0
         }
      // Sous Time V
      if(Px > 378 && Px < 562)
         {
           this.NavSmenu = 1
         }
      // Sous Hard V
      if(Px > 562 && Px < 746)
         {
           this.NavSmenu = 2
         }
      // Sous Life V
      if(Px > 746 && Px < 902)
         {
           this.NavSmenu = 3
         }
      // Sous Highscore V
      if(Px > 902 && Px < 962)
         {
           this.NavSmenu = 4
           Sup.getActor("TreeHight").setVisible(true);
         }
         else{Sup.getActor("TreeHight").setVisible(false) }
       
   
      
     //Si il y a eut un changement de selection on l'affiche
      if(this.NavSmenu != this.NavSprite)
      {
        
        this.NavSprite = this.NavSmenu;
        this.NavMenuActor.spriteRenderer.setSprite("SPRITE/Menu/Menu" + this.NavSmenu + "")
        if(this.NavSmenu!=0)
        {if(this.Sselect.isPlaying()==true)
          {this.Sselect.stop()}
          this.Sselect.play();}
        
      }
      
      // Sous ?
      if(Px<107)
      {
        this.infosprite = 2;
      }else{this.infosprite=1}
      
      //Si il y a eut un changement de selection on l'affiche
      if(this.infomenu != this.infosprite)
      {
        this.infomenu = this.infosprite;
        Sup.getActor("INFO").spriteRenderer.setSprite("SPRITE/Info/Info0" + this.infosprite);
      }
    }
 
        //On Bouge le curseur  
    if (Sup.Input.isKeyDown("RIGHT") && this.actor.getX() < 1195) { VectorPX = 8;}
     
    if (Sup.Input.isKeyDown("LEFT") && this.actor.getX() > 85)  {VectorPX = -8;}  
      
    this.actor.arcadeBody2D.setVelocity( VectorPX, 0 );
    
    // On confirme la sélection (si il y en a une)
    if (Sup.Input.wasKeyJustPressed("SPACE"))  
    {      
         // Appel du mod Sélectionné
          if(this.NavSmenu != 0)
         { this.Mod[this.NavSmenu-1]();}          
    }
    
      
  
  }

  }  
Sup.registerBehavior(PlayerCmpMenu);