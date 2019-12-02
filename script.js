



const durationInput = document.querySelector('#duration');
const startButton = document.querySelector('#start');
const pauseButton = document.querySelector('#pause');
const refreshButton =document.querySelector('#refresh');

const circle = document.querySelector('circle')
const perimeter= 2 * Math.PI * circle.getAttribute('r') ;
circle.setAttribute('stroke-dasharray',perimeter);

let duration ;


const timer = new Timer(30,durationInput,startButton,pauseButton,refreshButton,{
    onStart(totalDuration){
        duration = totalDuration;
    },
    onTick(timeRemaining,refresh){
        if(!refresh)
            circle.setAttribute('stroke-dashoffset',perimeter * timeRemaining/duration - perimeter);
        if(refresh){
            circle.setAttribute('stroke-dasharray',perimeter);  
            circle.setAttribute('stroke-dashoffset',0)
        }
    },
    onComplete(){
        console.log('Timer completed')
    }
})