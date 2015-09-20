app.factory("uploadImage", function(){
  return function(id){
    var link;
    var selectedFile = document.getElementById(id).files[0];
    var fd = new FormData(); 
    fd.append("image", selectedFile);
    var xhr = new XMLHttpRequest();
    console.log(xhr);
    xhr.open("POST", "https://api.imgur.com/3/image.json");
    xhr.setRequestHeader('Authorization', 'Client-ID 4ff4d561a18ac75');
    xhr.send(fd);
    return xhr;
  };
});