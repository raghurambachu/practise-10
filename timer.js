class Timer{

    constructor(defaultDuration,durationInput,startButton,pauseButton,refreshButton,callbacks){
        this.defaultDuration = defaultDuration;
        this.durationInput = durationInput;
        this.startButton = startButton;
        this.pauseButton = pauseButton;
        this.refreshButton = refreshButton;
        this.initialValueOnForm = durationInput.value;
        

        this.durationInput.value = defaultDuration;
        if(callbacks){
            this.onStart = callbacks.onStart ;
            this.onTick = callbacks.onTick ;
            this.onComplete = callbacks.onComplete ;
        }

        

        this.startButton.addEventListener('click',this.start)
        this.pauseButton.addEventListener('click',this.pause)
        this.refreshButton.addEventListener('click',this.refresh)
        this.durationInput.addEventListener('input',this.settingInitial)
        
    }

    settingInitial = () =>{
            this.initialValueOnForm = parseFloat(durationInput.value) ;     
            
                 
    }

    start = () => {

        if(this.onStart){
            this.onStart(this.timeRemaining);
        }

       this.tick();
       this.interval = setInterval(this.tick,50);

       if( parseFloat(this.durationInput.value) < parseFloat(this.initialValueOnForm) )
       this.startButton.disabled =true;
       
       
    }

    tick = () => {

        //check if the timer has reached zero
        if( this.timeRemaining <= 0 ){
            this.pause();
            if(this.onComplete){
                this.onComplete();
            }
        }else{
            this.timeRemaining= this.timeRemaining - 0.05;
            if(this.onTick){
                this.onTick(this.timeRemaining);
            }
            
        }

        
        //this.timeRemaining on RHS basically gets timeremaing from getter
        // and that on LHS takes the RHS as parameter and passes it as time to setter
        //no need to use paranethesis to call getters and setters
    }

    get timeRemaining(){
        return parseFloat(this.durationInput.value);
    }

    set timeRemaining(time){
        this.durationInput.value = time.toFixed(2);
    }

    pause = () =>{
        clearInterval(this.interval);
        
        this.startButton.disabled = false;
    }

    refresh = () =>{
        
        this.durationInput.value = this.defaultDuration;

        if( parseFloat(this.durationInput.value) === parseFloat(this.defaultDuration) )
        this.startButton.disabled = false;
        
        if(this.interval){
            
            this.isRefresh =true ;

            this.onTick(this.defaultDuration,this.isRefresh);
            this.pause();
            
        }
            
    }




}
