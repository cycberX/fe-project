// let toastElment = null;
// export function Toast(message) {
//   if (!toastElment) {
//     toastElment = document.createElement("div");
//     toastElment.style.position = "fixed";
//     toastElment.style.bottom = "50px";
//     toastElment.style.right = "50px";
//     toastElment.style.backgroundColor = "#000000";
//     toastElment.style.color = "#ffffff";
//     toastElment.style.width = "300px";
//     toastElment.style.textAlign = "center";
//     toastElment.style.padding = "0.7rem 1rem";
//     toastElment.style.border = "1px solid var(--white)";
//     toastElment.style.borderRadius = "15px";
//     toastElment.style.zIndex = "4";
//     document.body.appendChild(toastElment);
//   }
//   toastElment.innerText = message;

//   setTimeout(() => {
//     toastElment.remove();
//     toastElment = null;
//   }, 4000);
// }



export function Toast(message,type){
  const toastDiv = document.createElement('div');
  toastDiv.className = 'toast';
  toastDiv.style.position = 'fixed';
  toastDiv.style.bottom = '20px';
  toastDiv.style.right = '20px';
  toastDiv.style.backgroundColor = '#000000';
  toastDiv.style.color = '#ffffff';
  toastDiv.style.padding = '10px';
  toastDiv.style.borderRadius = '5px';
  toastDiv.style.opacity = '0.9';
  toastDiv.style.transition = 'opacity 0.3s ease-in-out';
  toastDiv.style.zIndex = '4';
  const toastText = document.createElement('p');
  let toastmessage;
  if(type ==='success'){
    toastmessage = `<i class="bi bi-check-circle-fill"></i> ${message}`;
  }else if(type === 'error'){
    toastmessage = `<i class="bi bi-exclamation-circle-fill"></i> ${message}`;
  }else{
    toastmessage = `<i class="bi bi-info-circle-fill"></i> ${message}`;
  }
  toastText.textContent = message;
  toastDiv.appendChild(toastText);
  document.body.appendChild(toastDiv);
  setTimeout(() => {
    toastDiv.style.opacity = '0';
    setTimeout(() => {
      document.body.removeChild(toastDiv);
    }, 300);
  }, 3000);
  return toastDiv;
}
