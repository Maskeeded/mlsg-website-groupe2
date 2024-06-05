let x;
let y;
let size;
let rotation;
let transitiontimer;
let wingtimer;
let nexttimer;
let isGrab = -1;
let timeout;
const maxSizeButterfly = 100;
const butterflys = document.getElementsByClassName("butterfly_wrapper");
$(function(){
    initButterfly(butterflys);
    initListenerButterFly(butterflys);
    startFlutter(5000, butterflys);
})

function initListenerButterFly(butterflys){
    for(let index = 0; index < butterflys.length; index++){
        butterflys[index].addEventListener('mousedown', function(e){
            isGrab = index;
            $('body').addClass('grabbed-butter-fly');
            clearTimeout(timeout[index]);
            const boundingRect = butterflys[index].getBoundingClientRect();
            const width = boundingRect.width > maxSizeButterfly ? maxSizeButterfly : boundingRect.width;
            const height = boundingRect.height > maxSizeButterfly ? maxSizeButterfly : boundingRect.height;
            butterflys[index].style.width = width + "px";
            butterflys[index].style.height = height + "px";
            butterflys[index].style.transition = "none";	
            moveButterFly(e);
        });
        butterflys[index].addEventListener('mouseup', function(){
            if(isGrab === -1) return;
            $('body').removeClass('grabbed-butter-fly');
            isGrab = -1;
            flutter(nexttimer[index], butterflys[index], index);
        });
        butterflys[index].addEventListener('mouseleave', function(){
            if(isGrab === -1) return;
            $('body').removeClass('grabbed-butter-fly');
            isGrab = -1;
            flutter(nexttimer[index], butterflys[index], index);
        });
    }

    addEventListener('mousemove', function(e){
        if(isGrab === -1) return;
        moveButterFly(e);
    })

    function moveButterFly(e){
        const service = document.querySelector('.services-1-wrap');
        const offsetTop = service.offsetTop;
        const pageY = e.pageY;
        const y = pageY - offsetTop;
        const x = e.pageX;
        const boundingRect = butterflys[isGrab].getBoundingClientRect();
        butterflys[isGrab].style.left= (x - Math.floor(boundingRect.width / 2)) + "px";
        butterflys[isGrab].style.top= (y - Math.floor(boundingRect.height / 2)) + "px"; 
    }
}

function initButterfly(butterflys){
    const length = butterflys.length;
    x = Array.from({length}, () => 0);
    for(let i = 0; i < x.length; ++i)
        x[i] = Math.floor(Math.random() * window.innerWidth - 100);
    y = Array.from({length}, () => 0);
    for(let i = 0; i < y.length; ++i)
        y[i] = Math.floor(Math.random() * 900);
    size = Array.from({length}, () => 30);
    rotation = Array.from({length}, () => 0);
    transitiontimer = Array.from({length}, () => 0);
    wingtimer = Array.from({length}, () => 0);
    nexttimer = Array.from({length}, () => 0);
    timeout = Array.from({length}, () => -1);
}

function startFlutter(vartimer, butterflys){
    for(let index = 0; index < butterflys.length; index++)
        flutter(vartimer, butterflys[index], index);
}

function flutter(vartimer, butterFly, index)
{
    if(isGrab === index) return;
    nexttimer[index]=vartimer+(generaterandomno(-200,200));
    nexttimer[index]=(nexttimer[index] < 2500 || nexttimer[index] > 5000 ? 2500 : nexttimer[index]);
    
    size[index]+=generaterandomno(-10,20);
    size[index]=(size[index]<30 ? 30 + generaterandomno(0, 30) : size[index]);
    size[index]=(size[index] > maxSizeButterfly ? maxSizeButterfly - generaterandomno(0, 40) : size[index]);
    x[index]+=generaterandomno(-window.innerWidth,window.innerWidth);
    y[index]+=generaterandomno(-1000,1000);
    x[index]= x[index] < 20 ? 30 + generaterandomno(0, 500) : x[index];
    y[index]= y[index] < 20 ? 30 + generaterandomno(0, 500) : y[index];
    x[index]= x[index] > window.innerWidth ? Math.floor(window.innerWidth - size[index]) - generaterandomno(0,500) : x[index];
    y[index]= y[index] > 1000 ? Math.floor(1000 - size[index]) - generaterandomno(0,500) : y[index];

    rotation[index]+=generaterandomno(-10,10);
    rotation[index]=(rotation[index]< -20 ? 0 : rotation[index]);
    rotation[index]=(rotation[index] > 20 ? 0 :rotation[index]);

    transitiontimer[index]=generaterandomno(40,60)/10;

    butterFly.style.left=x[index]+"px";
    butterFly.style.top=y[index]+"px";
    butterFly.style.width=size[index]+"px";
    butterFly.style.height=size[index]+"px";
    butterFly.style.transform="rotate("+rotation[index]+"deg)";
    butterFly.style.webkitTransform="rotate("+rotation[index]+"deg)";		
    butterFly.style.transition="all "+transitiontimer[index]+"s";	
    butterFly.style.webkitTransition="all "+transitiontimer[index]+"s";

    wingtimer[index]=generaterandomno(1,5);
    var upperwings=document.getElementsByClassName("upperwing");
    var lowerwings=document.getElementsByClassName("lowerwing");

    for (var k= index * 2;k<=index * 2 + 1;k++)
    {
        upperwings[k].style.animationDuration="0."+wingtimer[index]+"s";
        upperwings[k].style.webkitAnimationDuration="0."+wingtimer[index]+"s";
        lowerwings[k].style.animationDuration="0."+wingtimer[index]+"s";
        lowerwings[k].style.webkitAnimationDuration="0."+wingtimer[index]+"s";
    }

    timeout[index] = setTimeout(function(){flutter(nexttimer[index], butterFly, index);},vartimer);
}

function generaterandomno(varmin,varmax)
{
    return Math.floor((Math.random() * (varmax-varmin+1)) + varmin);
}