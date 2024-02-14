var Music = new Sup.Audio.SoundPlayer("Sons/Music",6,{loop: true});
var TimeoutPause;


class GAMEBehavior extends Sup.Behavior {
  
    start()
  {Music.play()}
  update() {
    if (Sup.Input.wasKeyJustPressed("ESCAPE") || Sup.Input.wasKeyJustPressed("BACK_SPACE"))
      { ScoreScreen(); }
        
  }
}
Sup.registerBehavior(GAMEBehavior);


document.addEventListener("webkitvisibilitychange", OUT, false);


function OUT() // ce qui se passe quand le jeu n'est pas sélectioner
{ if (document.hidden) {ispaused = true} else {ispaused = false}  outPAUSE() }

function outPAUSE() // se qui se passe quand le jeu est en pause ou unpause
{
  if (ispaused == true) // on met tout en pause
    {
      clearTimeout(TimeoutPause);
       
      Music.pause();
    }
  else // on reprend tout
    {
      FishCreator();
      Music.play();
      Music.setLoop(true);     
    }
}