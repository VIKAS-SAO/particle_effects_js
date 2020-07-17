
 window.addEventListener('load',function () {
     


     const canvas=document.getElementById('canvas')
    const ctx=canvas.getContext('2d') 
    canvas.height=window.innerHeight
    canvas.width=window.innerWidth
    

    var mouse={
        x:null,
        y:null,
        radius:(canvas.height/80)*(canvas.width/80)
    }
    window.addEventListener('mousemove',function(e){
        mouse.x=e.clientX;
        mouse.y=e.clientY; 
    })
    window.addEventListener('resize',function(e){
        canvas.height=window.innerHeight;
        canvas.width=window.innerWidth;
        
    })

    class particle{
        constructor(x,y,speedx,speedy,size,color){
            this.x=x;
            this.y=y;
            this.speedx=speedx;
            this.speedy=speedy;
            this.size=size;
            this.color=color;
            
        }
         draw() {
            ctx.beginPath()
            ctx.arc(this.x,this.y,this.size,0,Math.PI*2,false)
            ctx.strokeStyle='white'
            ctx.lineWidth=2; 
            ctx.stroke()
            ctx.fillStyle='rgb(236, 52, 52)';
             ctx.fill() 
        }
        update(){
            if(this.x>canvas.width || this.x<0){
                this.speedx=-this.speedx;
            }
            if(this.y>canvas.height || this.y<0){
                this.speedy=-this.speedy;
            } 

            //collision detection mouse and particle
            var dx=mouse.x-this.x;
            var dy=mouse.y-this.y;
            var distance=Math.sqrt(dx*dx+dy*dy);
            if(distance<mouse.radius+this.size){
                if(mouse.x<this.x){
                    this.x+=10;
                }
                if(mouse.x>this.x){
                    this.x-=10;
                }
                if(mouse.y<this.y){
                    this.y+=10;
                } 
                if(mouse.y>this.y){
                    this.y-=10;
                }

            }

            






            this.x+=this.speedx;
            this.y+=this.speedy;
            this.draw()
        }  

    }
 





    var particlearray=[]
   function initparticles( ) {
      
       for(var i=0;i<150;i++){
        particlearray.push(new particle(Math.random()*canvas.width,Math.random()*canvas.height,Math.random()*5+2,Math.random()*5+2,Math.random()*4+2,'red'))
       }
       
   }
 

    function animate() {
            requestAnimationFrame(animate);
            //ctx.fillStyle = "rgb(88, 87, 87)";
             ctx.clearRect(0,0,canvas.width,canvas.height)
            for(var i=0;i<150;i++){
                particlearray[i].update()
            }
            connect()
 
    }
    //conneectng the particles
    function connect( ) {
        for(var a=0;a<150;a++){
            for( var b=0;b<150;b++){
                var dx=particlearray[a].x-particlearray[b].x;
                var dy=particlearray[a].y-particlearray[b].y;
                 if(Math.sqrt(dx*dx+dy*dy)<100){
                    ctx.beginPath()
                    ctx.moveTo(particlearray[a].x,particlearray[a].y)
                    ctx.lineTo(particlearray[b].x,particlearray[b].y)
                    var opacity=1-Math.sqrt(dx*dx+dy*dy)/2000;
                    ctx.lineWidth=1;
                    ctx.strokeStyle='rgb(223, 18, 18,'+opacity+')';
                    ctx.stroke()

                }
                
            }
        }
        
    }
    initparticles()
    animate()





























})