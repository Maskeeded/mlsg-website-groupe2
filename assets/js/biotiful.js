$(function(){
    let x;
    let y;
    let size;
    let rotation;
    let transitiontimer;
    let wingtimer;
    let nexttimer;
    let isGrab = -1, frogged = -1;
    let timeout;
    let maxSizeButterfly = 100;
    const butterflys = initArrayOfButterFlys();
    const freeIndexButterFlys = [];
    const $containerOfButterFlys = $('.services-1-wrap');
    const $frog = $('#container-frog');
    let canFrogged = true;

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
            if(butterflys[index] !== null)
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
    
        transitiontimer[index] = generaterandomno(40,60) / 10;
    
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
    
        wingtimer[index] = generaterandomno(1,5);
    
        $butterFly.find('.upperwing').css({
            'animationDuration': "0."+wingtimer[index]+"s",
            'webkitAnimationDuration': "0."+wingtimer[index]+"s"
        });

        $butterFly.find('.lowerwing').css({
            'animationDuration': "0."+wingtimer[index]+"s",
            'webkitAnimationDuration': "0."+wingtimer[index]+"s"
        });
        
    
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
            const hasFreeIndex = freeIndexButterFlys.length !== 0;
            console.log('OUI', hasFreeIndex)
            if(hasFreeIndex === false){
                x.push(mousePosX);
                y.push(mousePosY);
                size.push(size[index]);
                rotation.push(rotation[index]);
                transitiontimer.push(transitiontimer[index]);
                wingtimer.push(wingtimer[index]);
                nexttimer.push(nexttimer[index]);
                timeout.push(-1);
            }

            let newIndex = hasFreeIndex ? freeIndexButterFlys.splice(0,1)[0] : x.length - 1;

            if(hasFreeIndex === true){
                x[newIndex] = mousePosX;
                y[newIndex] = mousePosY;
                size[newIndex] = size[index];
                rotation[newIndex] = rotation[index];
                transitiontimer[newIndex] = transitiontimer[index];
                wingtimer[newIndex] = wingtimer[index];
                nexttimer[newIndex] = nexttimer[index];
                timeout[newIndex] = -1;
            }
            console.log(x)
            console.log(butterflys, freeIndexButterFlys, newIndex)
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

            if(hasFreeIndex) butterflys[newIndex] = $cloneButterfly.get(0)
            else butterflys.push($cloneButterfly.get(0));

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
            if(frogged === index) return;
            isGrab = index;
            $('body').addClass('grabbed-butter-fly');
            freezeButterFly($(this), index);
            moveButterFly(e);
        }

        function onDblClick(e, index){
            if(frogged === index) return;
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

    function freezeButterFly($butterFly, index, frogged = false){
        clearTimeout(timeout[index]);
        const boundingRect = $butterFly.get(0).getBoundingClientRect();
        const width = boundingRect.width > maxSizeButterfly ? maxSizeButterfly : boundingRect.width;
        const height = boundingRect.height > maxSizeButterfly ? maxSizeButterfly : boundingRect.height;
        $butterFly.css({
            'width': width + "px",
            'height': height + "px",
            'transition': "none"
        });

    }

    function initListenerFrog(){
        $frog.on('dblclick', function(e){
            if(canFrogged === false) return;
            canFrogged = false;
            if(freeIndexButterFlys.length === butterflys.length - 1) return;
            let butterFly = null;
            let index = 0;
            do {
                index = Math.floor(Math.random() * butterflys.length);
                butterFly = butterflys[index];
            } while (butterFly === null);
            frogged = index;
            const $butterFly = $(butterFly);
            freezeButterFly($butterFly, index, true);
            const angle = getRotationDeg($frog.get(0), butterFly);
            $frog
                .find('.tongue')
                .css({
                    'transform': `rotate(${angle}deg)`
                })
                .animate({
                    'height': getHeightTongue($frog.get(0), butterFly)
                }, 250, eatButterFly)
            ;
        });

        function eatButterFly(){
            const scrollHeight = +$containerOfButterFlys.prop('scrollHeight');
            const $tongue = $(this);
            const $butterFly = $(butterflys[frogged]);
            console.log(($butterFly.css('left')).replace('px', ''))
            const leftPosButterFly = +($butterFly.css('left')).replace('px', '');
            const topPosButterFly = +($butterFly.css('top')).replace('px', '');
            const left = window.innerWidth - leftPosButterFly - 100;
            const top = scrollHeight - topPosButterFly - 100;
            $butterFly.animate({
                'left': '+='+left,
                'top': '+='+top
            }, 1000);
            $tongue.animate({
                'height': '0px'
            }, 1000, removeButterFly);
        }

        function removeButterFly(){
            const butterFly = butterflys[frogged];
            butterflys[frogged] = null;
            freeIndexButterFlys.push(frogged);
            frogged = -1;
            butterFly.remove();
            canFrogged = true;
        }

        function getHeightTongue(frog, butterFly){
            let rectButterFly = butterFly.getBoundingClientRect();
            let rectFrog = frog.getBoundingClientRect();
            let x1 = rectFrog.left + rectFrog.width / 2;
            let y1 = rectFrog.top + rectFrog.height / 2;
            let x2 = rectButterFly.left + rectButterFly.width / 2;
            let y2 = rectButterFly.top + rectButterFly.height / 2;
            let distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
            return distance;
        }
        

        function getRotationDeg(frog, butterFly){
            let rectButterFly = butterFly.getBoundingClientRect();
            let rectFrog = frog.getBoundingClientRect();
            let x = rectButterFly.left + rectButterFly.width / 2 - rectFrog.left - rectFrog.width / 2;
            let y = rectButterFly.top + rectButterFly.height / 2 - rectFrog.top - rectFrog.height / 2;
            let angleDeg = (Math.atan2(y, x) * 180 / Math.PI) + 90;
            return angleDeg;
        }
    }

    initButterfly(butterflys);
    initMaxSizeButterfly();
    initListenerButterFly(butterflys);
    initListenerFrog();
    startFlutter(5000, butterflys);
})

