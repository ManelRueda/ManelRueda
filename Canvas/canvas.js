window.onload = function () 
{
    canvasBox1();
    canvasBox2();
    canvasBox3();
    canvasBox4();
    canvasBox5();
    canvasBox6();
    canvasBox7();
    canvasBox8();
}

function canvasBox1() 
{
    var canvas = document.getElementById("canvas-box1");
    if (canvas.getContext) 
    {
        var ctx = canvas.getContext("2d");
        //Un rectangulo rojo
        ctx.fillStyle = "red";
        ctx.fillRect(60, 10, 50, 50);

        ctx.strokeStyle = "Blue"
        ctx.strokeRect(10, 10, 50, 50);
    }
}

function canvasBox2() 
{
    var canvas = document.getElementById("canvas-box2");
    if (canvas.getContext) 
    {
        var ctx = canvas.getContext("2d");
        ctx.fillStyle = "red"

        ctx.fillRect(50, 50, 100, 100);
        ctx.clearRect(70, 70, 60, 60);

        ctx.strokeStyle = "Blue"
        ctx.strokeRect(80, 80, 40, 40);
    }
}

function canvasBox3() 
{
    var canvas = document.getElementById("canvas-box3");
    if (canvas.getContext) 
    {
        var ctx = canvas.getContext("2d");
        ctx.moveTo(100, 20);

        ctx.lineTo(50, 150);
        ctx.lineTo(150, 150);
        ctx.lineTo(100, 20);


        ctx.fillStyle = "red"
        ctx.fill();


        ctx.beginPath();

        ctx.moveTo(100, 63.33);
        ctx.lineTo(75, 128.33);
        ctx.lineTo(125, 128.33);
        ctx.lineTo(100, 63.33);

        ctx.strokeStyle = "blue"
        ctx.stroke();

        ctx.beginPath();
    }
}
function canvasBox4() 
{
    var canvas = document.getElementById("canvas-box4");
    if (canvas.getContext) 
    {
        var ctx = canvas.getContext("2d");

                
        ctx.arc(100, 100, 50, degToRad(30), degToRad(330));
        ctx.lineTo(100,100);
        ctx.fillStyle="yellow"
        ctx.fill();

        ctx.beginPath();
        ctx.arc(110, 75, 5, degToRad(0), degToRad(360))
        ctx.fillStyle="black"
        ctx.fill();
    }
}
function degToRad(degrees) 
{
    return degrees * Math.PI / 180;
};

function canvasBox5() 
{
    var canvas = document.getElementById("canvas-box5");
    if (canvas.getContext) 
    {
        var ctx = canvas.getContext('2d');
        var gradient = ctx.createLinearGradient(30, 30, 0, 100);
        
        gradient.addColorStop(0, 'rgba(255, 0, 0, 1)');
        gradient.addColorStop(0.5, 'rgba(0, 0, 255, 1)');
        gradient.addColorStop(1, 'rgba(0, 255, 100, 1)');
        
        ctx.fillStyle= gradient;
        ctx.fillRect(50,50,100,100)        
    }
}

function canvasBox6() 
{
    var canvas = document.getElementById("canvas-box6");
    if (canvas.getContext) 
    {
        var ctx = canvas.getContext('2d');
        ctx.fillStyle = 'blue';
        ctx.font = '30px Arial';
        ctx.fillText('Benito Camela', 0, 30);
        
        ctx.beginPath();
        
        ctx.strokeStyle = 'blue';
        ctx.font = '30px ComicSans';
        ctx.strokeText('Tela de Jabadentro', 0, 70);

    }
}