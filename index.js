let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
canvas.width=350
canvas.height=350
const bulbImg = document.getElementById('bulbIMG')
let levelSelect = document.getElementById("diff")



function onload(){
    for(let i = 0; i< localStorage.length;i++){
        let data = localStorage.getItem(localStorage.key(i))
        if(data !== null){
        let pData = JSON.parse(data)
        console.log(pData)
        let option = document.createElement('option')
        option.value = pData[1]
        
        if(detectLigth(pData[0]) === true && detectNumber(pData[0]) === true && detectRed(pData[0]) === true ){
            option.text = pData[1] +" játéka " + pData[3]+":" + pData[4] + " " +pData[2] + " (nyert)"
        }
        else{
            option.text = pData[1] +" játéka " + pData[3]+":" + pData[4] + " " +pData[2]
        }
        levelSelect.add(option)
        }

    }
}



onload()





let szab = document.querySelector("#rules")

document.addEventListener('click',show);
function show(e) {
    const id = e.target.dataset.toggleId;
    if (!id) return;

    const elem = document.getElementById(id);
    elem.hidden = !elem.hidden;
}

function generateEasy(){
    canvas.width=350
    canvas.height=350
    let arr = []
    for (let i = 0; i<7; i++){
        arr[i]=[]
        for(let j = 0; j<7; j++){
            arr[i][j] = new tile(ctx,i,j,true,null)
        }
    }

    arr[0][3]=new tile(ctx,0,3,false,1)
    arr[1][1]=new tile(ctx,1,1,false,0)
    arr[1][5]=new tile(ctx,1,5,false,2)
    arr[3][0]=new tile(ctx,3,0,false,null)
    arr[3][3]=new tile(ctx,3,3,false,null)
    arr[3][6]=new tile(ctx,3,6,false,null)
    arr[5][1]=new tile(ctx,5,1,false,null)
    arr[5][5]=new tile(ctx,5,5,false,2)
    arr[6][3]=new tile(ctx,6,3,false,3)

    return arr
}

function generateMedium(){
    canvas.width=350
    canvas.height=350
    let arr = []
    for (let i = 0; i<7; i++){
        arr[i]=[]
        for(let j = 0; j<7; j++){
            arr[i][j] = new tile(ctx,i,j,true,null)
        }
    }

    arr[0][2]=new tile(ctx,0,2,false,0)
    arr[0][4]=new tile(ctx,0,4,false,null)
    arr[2][0]=new tile(ctx,2,0,false,null)
    arr[2][2]=new tile(ctx,2,2,false,null)
    arr[2][4]=new tile(ctx,2,4,false,3)
    arr[2][6]=new tile(ctx,2,6,false,null)
    arr[3][3]=new tile(ctx,3,3,false,1)
    arr[4][0]=new tile(ctx,4,0,false,2)
    arr[4][2]=new tile(ctx,4,2,false,null)
    arr[4][4]=new tile(ctx,4,4,false,null)
    arr[4][6]=new tile(ctx,4,6,false,null)
    arr[6][2]=new tile(ctx,6,2,false,null)
    arr[6][4]=new tile(ctx,6,4,false,2)

    return arr

}

function generateHard(){
    canvas.height = 500
    canvas.width = 500
    let arr = []
    for (let i = 0; i<10; i++){
        arr[i]=[]
        for(let j = 0; j<10; j++){
            arr[i][j] = new tile(ctx,i,j,true,null)
        }
    }

    arr[0][1]=new tile(ctx,0,1,false,null)
    arr[1][5]=new tile(ctx,1,5,false,3)
    arr[1][7]=new tile(ctx,1,7,false,2)
    arr[1][9]=new tile(ctx,1,9,false,null)
    arr[2][1]=new tile(ctx,2,1,false,0)
    arr[2][3]=new tile(ctx,2,3,false,null)
    arr[2][7]=new tile(ctx,2,7,false,null)
    arr[3][4]=new tile(ctx,3,4,false,null)
    arr[4][1]=new tile(ctx,4,1,false,1)
    arr[4][4]=new tile(ctx,4,4,false,null)
    arr[4][5]=new tile(ctx,4,5,false,1)
    arr[4][6]=new tile(ctx,4,6,false,null)
    arr[5][3]=new tile(ctx,5,3,false,null)
    arr[5][4]=new tile(ctx,5,4,false,null)
    arr[5][5]=new tile(ctx,5,5,false,null)
    arr[5][8]=new tile(ctx,5,8,false,3)
    arr[6][5]=new tile(ctx,6,5,false,null)
    arr[7][2]=new tile(ctx,7,2,false,1)
    arr[7][7]=new tile(ctx,7,7,false,0)
    arr[7][8]=new tile(ctx,7,8,false,null)
    arr[8][0]=new tile(ctx,8,0,false,3)
    arr[8][2]=new tile(ctx,8,2,false,null)
    arr[8][4]=new tile(ctx,8,4,false,0)
    arr[9][8]=new tile(ctx,9,8,false,0)

    return arr
    
}






class tile{
    constructor(context, y, x, isWhite,num) {
        this.context = context;
        this.x = x;
        this.y = y;
        this.isWhite = isWhite;
        this.num = num;
    }

    width = 50
    height = 50

    bulb = false
    ligth = false
    red = false
    redNum = false
    

    rect() {
        return {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height,
            isWhite: this.isWhite
        }
    }


}








let level
let diff

//gombok
let startBtn = document.getElementById("start")
startBtn.addEventListener('click',function(e){
    let txt
    let nameTag

    clearInterval(Interval);
    Interval = setInterval(startTimer, 10);

    
    if(levelSelect.value === "1"){
        diff = "könnyű 7x7"
        seconds = 00
        tens = 00

        txt = document.getElementById("name")
        nameTag = document.getElementById("nameT")
        nameTag.innerHTML = txt.value +" játéka"
        level = generateEasy()
        for (let i = 0; i < level.length; i++){
            for(let j = 0; j < level.length; j++){
                nextToBlack(level,j,i)
            }
        }
        drawLevel(level)
        play(level)
    }
    if(levelSelect.value === "2"){
        diff = "közepes 7x7"
        seconds = 00
        tens = 00
        txt = document.getElementById("name")
        nameTag = document.getElementById("nameT")
        nameTag.innerHTML = txt.value + " játéka"
        level = generateMedium()
        for (let i = 0; i < level.length; i++){
            for(let j = 0; j < level.length; j++){
                nextToBlack(level,j,i)
            }
        }
        drawLevel(level)
        play(level)
    }
    if(levelSelect.value === "3"){
        diff = "nehéz 10x10"
        seconds = 00
        tens = 00
        txt = document.getElementById("name")
        nameTag = document.getElementById("nameT")
        nameTag.innerHTML = txt.value + " játéka"
        level = generateHard()
        for (let i = 0; i < level.length; i++){
            for(let j = 0; j < level.length; j++){
                nextToBlack(level,j,i)
            }
        }
        drawLevel(level)
        play(level)
    }
    else{
        let data = JSON.parse(localStorage.getItem(levelSelect.value))
        diff = data[2]
        seconds = data[3]
        tens = data[4]
        txt = document.getElementById("name")
        nameTag = document.getElementById("nameT")
        txt.value = data[1]
        nameTag.innerHTML = txt.value + " játéka"
        level = data[0]
        for (let i = 0; i < level.length; i++){
            for(let j = 0; j < level.length; j++){
                nextToBlack(level,j,i)
            }
        }
        if(data[2] === "nehéz 10x10"){
            canvas.height = 500
            canvas.width = 500
        } else{
            canvas.height = 350
            canvas.width = 350
        }
        drawLevel(level)
        play(level)
    }
})


let saveBtn = document.getElementById("save")

saveBtn.addEventListener('click',function(e){
    let saveFile = [level,document.getElementById("name").value,diff,seconds,tens]
    if(localStorage.getItem(document.getElementById("name").value)!==null){
        localStorage.removeItem(document.getElementById("name").value)
        for(let i = 0 ; i<levelSelect.length; i++){
            if(levelSelect.options[i].value === document.getElementById("name").value){
                levelSelect.remove(i)
            }
        }
    }
    localStorage.setItem(document.getElementById("name").value,JSON.stringify(saveFile))
    let option = document.createElement('option')
    option.value = document.getElementById("name").value
    option.text = document.getElementById("name").value +" játéka " + seconds+":" + tens + " " + diff
    levelSelect.add(option)
})


















//játék menet
function play(level){
canvas.addEventListener('click', function(e){
    let target = collides(level,e.offsetX,e.offsetY)

    let f = target.bulb
    let g = target.isWhite
    if (f === false && target.isWhite){
        level[target.y][target.x].bulb = true

        for(let i = target.x; i< level.length; i++){
            if(level[target.y][i].isWhite === true){
                level[target.y][i].ligth = true
            } else {
                break
            }
        }

        for(let i = target.x; i >= 0; i--){
            if(level[target.y][i].isWhite === true){
                level[target.y][i].ligth = true
            } else {
                break
            }
        }

        for(let i = target.y; i< level.length; i++){
            if(level[i][target.x].isWhite === true){
                level[i][target.x].ligth = true
            } else {
                break
            }
        }

        for(let i = target.y; i >= 0; i--){
            if(level[i][target.x].isWhite === true){
                level[i][target.x].ligth = true
            } else {
                break
            }
        }
             
    }
    if(f === true && target.isWhite === true){
        level[target.y][target.x].bulb = false

        for(let i = target.x; i< level.length; i++){
            if(level[target.y][i].isWhite === true){
                if(otherBulb(level,i,target.y) === false && level[target.y][i].bulb === false){
                    level[target.y][i].ligth = false
                }
            
            } else {
                break
            }
        }

        for(let i = target.x; i >= 0; i--){
            if(level[target.y][i].isWhite === true){
                if(otherBulb(level,i,target.y) === false && level[target.y][i].bulb === false){
                    level[target.y][i].ligth = false
                }
            } else {
                break
            }
        }

        for(let i = target.y; i< level.length; i++){
            if(level[i][target.x].isWhite === true){
                if(otherBulb(level,target.x,i) === false && level[i][target.x].bulb === false){
                    level[i][target.x].ligth = false
                }
            } else {
                break
            }
        }

        for(let i = target.y; i >= 0; i--){
            if(level[i][target.x].isWhite === true){
                if(otherBulb(level,target.x,i) === false && level[i][target.x].bulb ===false ){
                    level[i][target.x].ligth = false
                }
            } else {
                break
            }
        }
        
    }

    for (let i = 0; i < level.length; i++){
        for(let j = 0; j < level.length; j++){
            if(level[j][i].bulb === true && otherBulb(level,i,j) === true){
                level[j][i].red = true
            } else{
                level[j][i].red = false
            }
        }
    }

    for (let i = 0; i < level.length; i++){
        for(let j = 0; j < level.length; j++){
            nextToBlack(level,j,i)
        }
    }

    drawLevel(level)
    if (detectLigth(level) === true && detectNumber(level) === true && detectRed(level) === true){
        console.log("ASD")
        alert("Gratulálok nyertél!")

        let saveFile = [level,document.getElementById("name").value,diff,seconds,tens]
    if(localStorage.getItem(document.getElementById("name").value)!==null){
        localStorage.removeItem(document.getElementById("name").value)
        for(let i = 0 ; i<levelSelect.length; i++){
            if(levelSelect.options[i].value === document.getElementById("name").value){
                levelSelect.remove(i)
            }
        }
    }
    localStorage.setItem(document.getElementById("name").value,JSON.stringify(saveFile))
    let option = document.createElement('option')
    option.value = document.getElementById("name").value
    option.text = document.getElementById("name").value +" játéka " + seconds+":" + tens + " " + diff + "(nyert)"
    levelSelect.add(option)

    }
})
}








//seged fuggvenyek
function otherBulb(arr,x,y){
    let check = false

    for(let i = x+1; i< arr.length; i++){
        if(arr[y][i].isWhite === true){
            if(arr[y][i].bulb === true){
                check = true
            }
            
        } else {
            break
        }
    }

    for(let i = x-1; i >= 0; i--){
        if(arr[y][i].isWhite === true){
            if(arr[y][i].bulb === true){
                check = true
            }
        } else {
            break
        }
    }

    for(let i = y+1; i< arr.length; i++){
        if(arr[i][x].isWhite === true){
            if(arr[i][x].bulb === true){
                check = true
            }
        } else {
            break
        }
    }

    for(let i = y-1; i >= 0; i--){
        if(arr[i][x].isWhite === true){
            if(arr[i][x].bulb === true){
                check = true
            }
        } else {
            break
        }
    }
    return check

}

function draw(a) {
    if(a.isWhite === true){
        ctx.beginPath()
        ctx.strokeRect(a.x*a.height,a.y*a.width,a.height,a.width)
        ctx.stroke()
        ctx.closePath()
        
    }
    if(a.isWhite === false){
        ctx.beginPath()
        ctx.fillRect(a.x*a.height,a.y*a.width,a.height,a.width)
        ctx.stroke()
        ctx.closePath()

        if(a.num !== null){
            ctx.font = "30px Arial"
            ctx.fillStyle = "white"
            ctx.textAlign = "center"
            ctx.textBaseline = "middle"
            ctx.fillText(a.num,a.x*50+25,a.y*50+25)
            
            ctx.fillStyle = "black"
        }

        if(a.num !== null && a.redNum === true){
            ctx.font = "30px Arial"
            ctx.fillStyle = "red"
            ctx.textAlign = "center"
            ctx.textBaseline = "middle"
            ctx.fillText(a.num,a.x*50+25,a.y*50+25)
            
            ctx.fillStyle = "black"
        }

    }

    if(a.ligth === true){
        ctx.rect(a.x*a.height,a.y*a.width,a.height,a.width)
        ctx.fillStyle = "yellow"
        ctx.fill()
        ctx.fillStyle = "black"
    }

    if(a.red === true){
        ctx.rect(a.x*a.height,a.y*a.width,a.height,a.width)
        ctx.fillStyle = "red"
        ctx.fill()
        ctx.fillStyle = "black"
    }

    if(a.bulb === true){
        ctx.drawImage(bulbImg,a.x*50,a.y*50,50,50)
    }
    
}

function drawLevel(level){
    ctx.reset()
    level.forEach(r => r.forEach(t => draw(t)))
}

function nextToBlack(arr, y, x){
    let number = 0
    if(arr[y][x].num !== null){
        if(y-1 >= 0){
            if(arr[y-1][x].bulb === true){
                number++;
            }
        }
        if(x-1 >= 0){
            if(arr[y][x-1].bulb === true){
                number++;
            }
        }
        if(y+1 < arr.length){
            if(arr[y+1][x].bulb === true){
                number++;
            }
        }
        if(x+1 < arr.length){
            if(arr[y][x+1].bulb === true){
                number++;
            }
        }

    }
  


    if(number === arr[y][x].num){
        arr[y][x].redNum = false
        return true
    } else {
        arr[y][x].redNum = true
        return false
    }
}


function detectLigth(arr){
    let a = true
    for(let i=0;i<arr.length;i++){
        for(let j=0;j<arr.length;j++){
            if(arr[i][j].isWhite === true && arr[i][j].ligth === false){
                a = false
            }
        }
    }
    return a
}

function detectRed(arr){
    
        let a = true
        for(let i=0;i<arr.length;i++){
            for(let j=0;j<arr.length;j++){
                if(arr[i][j].isWhite === true && arr[i][j].red === true){
                    a = false
                }
            }
        }
        return a
    
}

function detectNumber(arr){
    let a = true
    for(let i = 0;i<arr.length;i++){
        for(let j=0;j<arr.length;j++){
            if(arr[i][j].isWhite === false && arr[i][j].num!==null && nextToBlack(arr,i,j) === false){
                a = false
            }
        }
    }
    return a
}

function collides(arr,x,y){
    let collision
    for ( let i = 0; i < arr.length;i++){
        for (let j = 0; j < arr.length; j++){
            let rect = arr[j][i]
            let left = rect.x*50
            let rigth = (rect.x*50)+50
            let top = rect.y*50
            let bottom = (rect.y*50)+50
            

            if(rigth >= x && left <= x && bottom >= y && top <= y){
                 collision = arr[j][i]
               
            }
        }
    }
    return collision
}



  
    let seconds = 00; 
    let tens = 00; 
    let appendTens = document.getElementById("tens")
    let appendSeconds = document.getElementById("seconds")

    let Interval ;
  

    
     
    
    function startTimer () {
      tens++; 
      
      if(tens <= 9){
        appendTens.innerHTML = "0" + tens
      }
      
      if (tens > 9){
        appendTens.innerHTML = tens
        
      } 
      
      if (tens > 99) {

        seconds++
        appendSeconds.innerHTML = "0" + seconds
        tens = 0
        appendTens.innerHTML = "0" + 0
      }
      
      if (seconds > 9){
        appendSeconds.innerHTML = seconds
      }
    
    }
    
  




