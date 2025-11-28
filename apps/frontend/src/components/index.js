export { default as ProtectedRoute } from "./ProtectedRoute.jsx";

export function createButton(text){
  const button = document.createElement('button');
  button.textContent = text;
  button.style.backgroundColor = '#4CAF50';
  button.style.color = 'white';
  button.style.padding = '12px 24px';
  button.style.border = 'none';
  button.style.borderRadius = '5px';
  button.style.cursor = 'pointer';

  button.addEventListener('click', () =>{
    alert('dugme "${text}" je kliknuto');
  });

  return button;
}