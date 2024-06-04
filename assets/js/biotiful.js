let x;
let y;
let size;
let rotation;
let transitiontimer;
let wingtimer;
let nexttimer;
const maxSizeButterfly = 100;
$(function(){
    const butterflys = document.getElementsByClassName("butterfly_wrapper");
    initButterfly(butterflys);
    flutter(5000);
})

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
}

function flutter(vartimer)
{
    const butterflys = document.getElementsByClassName("butterfly_wrapper");

    for(let index = 0; index < butterflys.length; index++){
        nexttimer[index]=vartimer+(generaterandomno(-200,200));
        nexttimer[index]=(nexttimer[index] < 1500 || nexttimer[index] > 3000 ? 1500 : nexttimer[index]);
        
        size[index]+=generaterandomno(-10,20);
        size[index]=(size[index]<30?40:size[index]);
        size[index]=(size[index]>100?90:size[index]);
        x[index]+=generaterandomno(-window.innerWidth,window.innerWidth);
        y[index]+=generaterandomno(-1000,1000);
        x[index]= x[index] < 20 ? 30 : x[index];
        y[index]= y[index] < 20 ? 30 : y[index];
        x[index]= x[index] > window.innerWidth ? Math.floor(window.innerWidth - size[index] - maxSizeButterfly * 2) : x[index];
        y[index]= y[index] > 1000 ? Math.floor(1000 - size[index] - maxSizeButterfly * 2) : y[index];

        rotation[index]+=generaterandomno(-10,10);
        rotation[index]=(rotation[index]<20?0:rotation[index]);
        rotation[index]=(rotation[index]>20?0:rotation[index]);

        transitiontimer[index]=generaterandomno(50,200)/10;

        butterflys[index].style.marginLeft=x[index]+"px";
        butterflys[index].style.marginTop=y[index]+"px";
        butterflys[index].style.width=size[index]+"px";
        butterflys[index].style.height=size[index]+"px";
        butterflys[index].style.transform="rotate("+rotation[index]+"deg)";
        butterflys[index].style.webkitTransform="rotate("+rotation[index]+"deg)";		
        butterflys[index].style.transition="all "+transitiontimer[index]+"s";	
        butterflys[index].style.webkitTransition="all "+transitiontimer[index]+"s";

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
    }


    setTimeout(function(){flutter(nexttimer[0]);},vartimer);
}

function generaterandomno(varmin,varmax)
{
    return Math.floor((Math.random() * (varmax-varmin+1)) + varmin);
}