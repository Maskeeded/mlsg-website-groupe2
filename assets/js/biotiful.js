$(function(){
    let x;
    let y;
    let size;
    let rotation;
    let transitiontimer;
    let wingtimer;
    let nexttimer;
    let isGrab = -1;
    let timeout;
    let maxSizeButterfly = 100;
    const butterflys = initArrayOfButterFlys();
    const $containerOfButterFlys = $('.services-1-wrap');

    function initArrayOfButterFlys(){
        const toReturn = [];
        $('.butterfly_wrapper').each(function(){
            toReturn.push(this);
        });
        return toReturn;
    }

    function initMaxSizeButterfly(){
        if(window.innerWidth > 1000)
            maxSizeButterfly = 100;
        else if(window.innerWidth > 500)
            maxSizeButterfly = 75;
        else
            maxSizeButterfly = 50;
    }
    
    function initButterfly(butterflys){
        const length = butterflys.length;
        x = Array.from({length}, () => 0);
        for(let i = 0; i < x.length; ++i)
            x[i] = Math.floor(Math.random() * window.innerWidth - 100);
        y = Array.from({length}, () => 0);
        for(let i = 0; i < y.length; ++i)
            y[i] = Math.floor(Math.random() * $containerOfButterFlys.prop('scrollHeight'));
        size = Array.from({length}, () => 30);
        rotation = Array.from({length}, () => 0);
        transitiontimer = Array.from({length}, () => 0);
        wingtimer = Array.from({length}, () => 0);
        nexttimer = Array.from({length}, () => 0);
        timeout = Array.from({length}, () => -1);
    }
    
    function startFlutter(vartimer, butterflys){
        for(let index = 0; index < butterflys.length; index++)
            flutter(vartimer, $(butterflys[index]), index);
    }
    
    function flutter(vartimer, $butterFly, index)
    {
        const scrollHeight = $containerOfButterFlys.prop('scrollHeight');

        nexttimer[index]=vartimer+(generaterandomno(-200,200));
        nexttimer[index]=(nexttimer[index] < 2500 || nexttimer[index] > 5000 ? 2500 : nexttimer[index]);
        
        size[index]+=generaterandomno(-10,20);
        size[index]=(size[index] < 30 ? 30 + generaterandomno(0, 30) : size[index]);
        size[index]=(size[index] > maxSizeButterfly ? maxSizeButterfly - generaterandomno(0, 40) : size[index]);
        x[index]+=generaterandomno(-window.innerWidth,window.innerWidth);
        y[index]+=generaterandomno(-scrollHeight,scrollHeight);
        x[index]= x[index] < 20 ? 30 + generaterandomno(0, 500) : x[index];
        y[index]= y[index] < 20 ? 30 + generaterandomno(0, 500) : y[index];
        x[index]= x[index] > window.innerWidth ? Math.floor(window.innerWidth - size[index]) - generaterandomno(0,500) : x[index];
        y[index]= y[index] > scrollHeight ? Math.floor(scrollHeight - size[index]) - generaterandomno(0,500) : y[index];
    
        rotation[index]+=generaterandomno(-10,10);
        rotation[index]=(rotation[index]< -20 ? 0 : rotation[index]);
        rotation[index]=(rotation[index] > 20 ? 0 :rotation[index]);
    
        transitiontimer[index]=generaterandomno(40,60)/10;
    
        $butterFly.css({
            'left': x[index]+"px",
            'top': y[index]+"px",
            'width': size[index]+"px",
            'height': size[index]+"px",
            'transform': "rotate("+rotation[index]+"deg)",
            'webkitTransform': "rotate("+rotation[index]+"deg)",
            'transition': "all "+transitiontimer[index]+"s",
            'webkitTransition': "all "+transitiontimer[index]+"s"
        });
    
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
    
        timeout[index] = setTimeout(function(){flutter(nexttimer[index], $butterFly, index);},vartimer);
    }
    
    function generaterandomno(varmin,varmax)
    {
        return Math.floor((Math.random() * (varmax-varmin+1)) + varmin);
    }

    function initListenerButterFly(butterflys){
        for(let index = 0; index < butterflys.length; index++){
            butterflys[index].addEventListener('mousedown', function(e){
                (onMouseDown.bind(this))(e, index);
            });
            butterflys[index].addEventListener('mouseup', onMouseUp);
            butterflys[index].addEventListener('dblclick', function(e){
                (onDblClick.bind(this))(e, index);
            });
        }

        $('body').on('mouseleave', function(e){
            if(isGrab === -1) return;
            $('body').removeClass('grabbed-butter-fly');
            flutter(nexttimer[isGrab], $(butterflys[isGrab]), isGrab);
            isGrab = -1;
        });
    
        addEventListener('mousemove', function(e){
            if(isGrab === -1) return;
            moveButterFly(e);
        });
    
        addEventListener('resize', initMaxSizeButterfly);

        function addButterFly(index, $butterfly, mousePosX, mousePosY){
            x.push(mousePosX);
            y.push(mousePosY);
            size.push(size[index]);
            rotation.push(rotation[index]);
            transitiontimer.push(transitiontimer[index]);
            wingtimer.push(wingtimer[index]);
            nexttimer.push(nexttimer[index]);
            timeout.push(-1);
            const newIndex = x.length - 1;
            const $cloneButterfly = $('<div></div>');
            $cloneButterfly
                .html($butterfly.html())
                .attr('class', $butterfly.attr('class'))
                .css({
                    'left': mousePosX + 'px',
                    'top': mousePosY + 'px'
                })
                .on('mousedown', function(e){
                    (onMouseDown.bind(this))(e, newIndex);
                })
                .on('mouseup', onMouseUp)
                .on('dblclick', function(e){
                    (onDblClick.bind(this))(e, newIndex);
                });
            
            butterflys.push($cloneButterfly.get(0));
            $butterfly.after($cloneButterfly);
            flutter(nexttimer[index], $cloneButterfly, newIndex);
        }

        function onMouseUp(){
            if(isGrab === -1) return;
            $('body').removeClass('grabbed-butter-fly');
            flutter(nexttimer[isGrab], $(this), isGrab);
            isGrab = -1;
        }
    
        function onMouseDown(e, index){
            isGrab = index;
            $('body').addClass('grabbed-butter-fly');
            clearTimeout(timeout[isGrab]);
            const boundingRect = this.getBoundingClientRect();
            const width = boundingRect.width > maxSizeButterfly ? maxSizeButterfly : boundingRect.width;
            const height = boundingRect.height > maxSizeButterfly ? maxSizeButterfly : boundingRect.height;
            $(this).css({
                'width': width + "px",
                'height': height + "px",
                'transition': "none"
            });
            moveButterFly(e);
        }

        function onDblClick(e, index){
            const service = document.querySelector('.services-1-wrap');
            const offsetTop = service.offsetTop;
            const pageY = e.pageY;
            const y = pageY - offsetTop;
            const x = e.pageX;
            addButterFly(index, $(this), x, y);
        }
    
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

    initButterfly(butterflys);
    initMaxSizeButterfly();
    initListenerButterFly(butterflys);
    startFlutter(5000, butterflys);
})

