function validateForm() {
    
}
let form=document.getElementById("myForm")

form.addEventListener("submit", function (event) {
    // console.log(form)
   
    let x = document.forms["myForm"]["nameF"].value;
    console.log(x,"32",typeof(x))
    if (x == ""||x.trim().length==0) {
        console.log(x,"3232",typeof(x))
      alert("Name must not be empty!!");
        return ;
    }
    let y=document.forms["myForm"]["fileF"].value;
    if(y==""||y.trim().length==0){
        alert("Password field must not be empty")
        return ;
    }
    let z=document.forms["myForm"]["descF"].value;
    if(z==""||z.trim().length==0){
        alert("Description field must not be empty")
        return ;
    }
    let a=document.forms["myForm"]["quantity"].value;
    if(a==""||a.trim().length==0){
        alert("Quantity field must not be empty")
        return ;
    }
    let b=document.forms["myForm"]["submit"].value;
    if(b==""||b.trim().length==0){
        alert("Price field must not be empty")
        return ;
    }
    // console.log(document.getElementById("name").value);
    event.preventDefault();



    let formData = new FormData(form);
    console.log(...formData)
    let req1 = new XMLHttpRequest();
    req1.open("POST", "/seller");
    req1.send(formData)
    req1.addEventListener("load", (err) => {
        if(err)
            alert(err)
        else
        console.log(req1.responseText);
            alert("Product added successfully")
    })
    // form.reset();
})

