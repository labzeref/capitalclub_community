export const GTMLogs =(data)=>{
// console.log('gtm called : ' , data)
window.dataLayer = window.dataLayer || [];
window.dataLayer.push(data);
}