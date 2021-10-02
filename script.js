var submitBtn=$(".btn");


$(".btn").on("click",searchRun);
function searchRun(){

    var dropDownEl=document.getElementByClass(".dropdown-item");
    var format=dropDownEl.getAttribute("format");

    console.log(format);
}
