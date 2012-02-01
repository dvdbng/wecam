
var wecam = {
    init: function(){
        this.canvas = document.getElementById("wecam-canvas");
        this.size = Math.min(window.innerWidth-20,window.innerHeight-20);
        this.canvas.width = this.size;
        this.canvas.height = this.size;
        this.ctx = this.canvas.getContext("2d");
    },
    render: function(bytes,width,colors){
        var s = this.size; // Canvas width
        var sw = s/(width+2); // Square width
        var ctx = this.ctx;
        var color = false;

        // Draw border
        for(var i=0; i<width+2; ++i){
            ctx.fillStyle = color?"black":"white";
            color = !color;
            ctx.fillRect(i*sw,0,sw,sw);
            ctx.fillRect(0,i*sw,sw,sw);
            if(width%2==0)ctx.fillStyle = color?"black":"white";
            ctx.fillRect(i*sw,s-sw,sw,sw);
            ctx.fillRect(s-sw,i*sw,sw,sw);
        }
        // Draw center
        for(var i=0, l=width*width; i<l; ++i){
            ctx.fillStyle = "rgb(" + bytes[i*3] + "," + bytes[i*3+1] + "," + bytes[i*3+2] + ")";
            ctx.fillRect(
                sw + (i%width)*sw,
                sw + (~~(i/width))*sw,
                sw+1,sw+1
            );
        }

    }
};

var cd = 1; // Numero de bits por canal
wecam.init();
var aob = [255,255,255];
for(i=0; i<128*128*3; ++i){
    aob.push(Math.round(Math.random()*cd)*(256/cd));
}

wecam.render(aob,16,cd);
