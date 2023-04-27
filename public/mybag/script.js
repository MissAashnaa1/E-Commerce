let button=document.getElementsByClassName("e")
let product=document.getElementsByClassName("products")[0]
for(let i=0;i<button.length;i++){
    button[i].addEventListener("click",(event)=>{
        let identity=event.target.id;
        console.log(identity)   
        let description=(event.target.nextElementSibling).innerHTML;
        // console.log(description)

        product.classList.toggle("pro")
        let popup=document.createElement("div");
        popup.className="popup"
        product.style.filter="blur(20px)"
        product.style.pointerEvents="none"
        let divvv=document.getElementById(identity)
        console.log(divvv)
        let n=document.createElement("div");
        n.className="proname";
        // console.log(divvv.childNodes[0].innerHTML)
        n.innerHTML=divvv.children[0].innerHTML;
        let img=document.createElement("img");
        img.src=divvv.children[3].children[0].src;
        console.log(img.src)
        img.alt="unable to show";
        img.style.width="200px";
        img.style.height="200px"
        let d=document.createElement("div")
         d.innerHTML =`<p>${description}</p>`;
        let button=document.createElement("button")
        button.innerHTML="close"
        button.addEventListener("click",()=>{
        popup.classList.toggle("popupactive")
         document.body.removeChild(popup)
        product.style.filter="none";
        product.style.pointerEvents="auto"
        })
        d.style.width="200px";
        d.style.height="200px";
        d.style.display="inline";
        button.className="btn btn-info"
        let br=document.createElement("br")
        popup.appendChild(n)
        popup.appendChild(br)
        popup.appendChild(img)
        popup.appendChild(br)
        popup.appendChild(d)
        popup.appendChild(br)
        popup.appendChild(button)
    document.body.appendChild(popup)
    })
}
let inc=document.getElementsByClassName("inc")
let dec=document.getElementsByClassName("dec")
let del=document.getElementsByClassName("del")
for(let i=0;i<inc.length;i++){
    inc[i].addEventListener("click",(e)=>{
    let identity=e.target.id;
    let div=e.target.parentElement.nextElementSibling;
    // console.log(div)
    let q =e.target.nextElementSibling.innerHTML;

        let divv=document.getElementById(identity)
        // console.log(divv)
        let stock=divv.lastElementChild.innerHTML;

        q = parseInt(q)
        stock = parseInt(stock)
        
        if(q>=stock){
            div.innerHTML="More products unavailable"
            div.style.color="black"
        }
        if(q<stock&&q>0){//udhr 10 hojyega na //0 m delete vla handle krna h case
            var request=new XMLHttpRequest();
            request.open("POST","/incitem")
            request.setRequestHeader("Content-Type","application/json")
            request.send(JSON.stringify({"id":identity}));
            request.addEventListener("load",()=>
            {
                // q++;
                 e.target.nextElementSibling.innerHTML=++q
            })
        }
        
    
    })
}
for(let i=0;i<dec.length;i++){
    dec[i].addEventListener("click",(e)=>{
    let identity=e.target.id;
    let div=e.target.parentElement.nextElementSibling;
    // console.log(div)
    let q =e.target.previousElementSibling.innerHTML;

        let divv=document.getElementById(identity)
        // console.log(divv)
        let stock=divv.lastElementChild.innerHTML;

        q = parseInt(q)
        stock = parseInt(stock)
        
        if(q<=1){
            var request=new XMLHttpRequest();
            request.open("POST","/delitem")
            request.setRequestHeader("Content-Type","application/json")
            request.send(JSON.stringify({"id":identity}));
            request.addEventListener("load",()=>{
            console.log(document.getElementById(identity))
            document.getElementById(identity).remove();
            })
        
        }
        if(q<=stock&&q>1){//udhr 10 hojyega na //0 m delete vla handle krna h case
            var request=new XMLHttpRequest();
            request.open("POST","/decitem")
            request.setRequestHeader("Content-Type","application/json")
            request.send(JSON.stringify({"id":identity}));
            request.addEventListener("load",()=>
            {
                // q++;
                 e.target.previousElementSibling.innerHTML=--q
            })
        }
        
    
    })
}
    for(let i=0;i<del.length;i++){
        del[i].addEventListener("click",(e)=>{
        let identity=e.target.id;
        var request=new XMLHttpRequest();
        request.open("POST","/delitem")
        request.setRequestHeader("Content-Type","application/json")
        request.send(JSON.stringify({"id":identity}));
        request.addEventListener("load",()=>{
            console.log(document.getElementById(identity))
            document.getElementById(identity).remove();
            })
        })
    }

