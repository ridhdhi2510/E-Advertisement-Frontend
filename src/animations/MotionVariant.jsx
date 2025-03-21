export const fadeIn = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } }
  };
  
  export const hoverEffect = {
    whileHover: { scale: 1.1, transition: { duration: 0.3 } }
  };
  
  export const featureHover = {
    whileHover: { scale: 1.05, boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)" }
  };
  
  export const fadeInSlow = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1.5 } }
  };
  