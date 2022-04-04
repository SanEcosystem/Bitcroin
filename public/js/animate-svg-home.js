// const inViewport1 = (entries, observer) => {
//     var idx=0.5;
//     entries.forEach(entry => {
//         console.log(idx);
//         if (entry.isIntersecting){
//             console.log(entry.target.style.transform);
//             entry.target.style.transform = `translateY(-2%)`;
//             entry.target.style.transitionDelay = idx+`s`;
//             idx = idx + 0.5;
            
//         }
//     //   entry.target.classList.toggle("is-inViewport", entry.isIntersecting);
//     });
//   };
  
//   const Obs1 = new IntersectionObserver(inViewport1);
//   const obsOptions1 = {}; 
  
//   // Attach observer to every [data-inviewport] element:
//   const ELs_inViewport1 = document.querySelectorAll('.wrap-seed-sale-container');
//   ELs_inViewport1.forEach(EL => {
//     //   console.log(EL);
//     Obs1.observe(EL, obsOptions1);
//   });

const inViewport = (entries, observer) => {
    entries.forEach(entry => {
      entry.target.classList.toggle("is-inViewport", entry.isIntersecting);
    });
  };
  
  const Obs = new IntersectionObserver(inViewport);
  const obsOptions = {}; 
  
  // Attach observer to every [data-inviewport] element:
  const ELs_inViewport = document.querySelectorAll('[data-inviewport]');
  ELs_inViewport.forEach(EL => {
    Obs.observe(EL, obsOptions);
  });

if ('IntersectionObserver' in window)  {  
    // Recommended: make this selector more specific with a `data-animate-on-visible` 
    let elements = document.querySelectorAll("svg");  
    let observer = new IntersectionObserver(entries => {    
         // quit early if users wants Reduced Motion    
        let mediaQuery = window.matchMedia('(prefers-reduced-motion: no-preference)');    
        if(!mediaQuery.matches) {      
            return;    
        }    
        for(let entry of entries) {      
            if(!entry.isIntersecting) {        
                continue;      
            }      
            // Look for <animate> or <animateTransform> that need JS to start      
            let beginElements = entry.target.querySelectorAll(`:scope [begin="indefinite"]`);      
            for(let beginEl of beginElements) {        
                beginEl.beginElement();        
                // Unobserve so we don’t re-animate the dead        
                // observer.unobserve(entry.target);      
            }    
        }  
    },  
    {    threshold: .5 
        // 50% of element must be visible  
    });  
    for(let elem of elements) {    
        // console.log(elem);
        observer.observe(elem);  
    }
}