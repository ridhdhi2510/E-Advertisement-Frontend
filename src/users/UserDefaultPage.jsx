import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { Card, CardContent } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const partners = [
  { name: "Apple", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" },
  { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
  { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" },
  { name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
  { name: "Tesla", logo: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg" },
  { name: "Samsung", logo: "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg" },
  { name: "Nike", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg" },
  { name: "Netflix", logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" },
  { name: "BMW", logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg" },
  { name: "YouTube", logo: "https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg" },
];

const UserDefaultPage = () => {
  let carouselRef = React.useRef(null);

  return (
    <div className="py-10  text-center mx-auto max-w-[90%] md:max-w-5xl relative overflow-hidden " style={{ width:'940px'}}>
      <h2 className="text-2xl font-bold mb-6">Our Most Popular Partners</h2>
      
      {/* Carousel */}
      <div className="relative">
        <OwlCarousel
          ref={carouselRef}
          className="owl-theme"
          loop
          margin={10}
          autoplay
          autoplayTimeout={3000}
          autoplaySpeed={1000}
          autoplayHoverPause={false}
          smartSpeed={1000}
          nav={false}
          responsive={{
            0: { items: 2 },
            600: { items: 3 },
            1000: { items: 5 },
          }}
        >
          {partners.map((partner, index) => (
            <Card
              key={index}
              className="shadow-lg rounded-xl overflow-hidden flex justify-center items-center w-40 h-40 md:w-48 md:h-48 bg-white"
            >
              <CardContent className="flex justify-center items-center p-4">
                <img style={{height:'150px' , width:'150px'}}
                  src={partner.logo}
                  alt={partner.name}
                  className="h-32 w-32 object-contain"
                  
                />
              </CardContent>
            </Card>
          ))}
        </OwlCarousel>

        {/* Navigation Arrows */}
        <div className="flex justify-center items-center mt-6 gap-6">
          <button
            className="bg-white p-3 rounded-full shadow-md hover:scale-110 transition"
            onClick={() => carouselRef.current.prev()}
          >
            <ArrowBackIosIcon fontSize="medium" />
          </button>
          <button
            className="bg-white p-3 rounded-full shadow-md hover:scale-110 transition"
            onClick={() => carouselRef.current.next()}
          >
            <ArrowForwardIosIcon fontSize="medium" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDefaultPage;






// import React, { useEffect } from "react";
// import $ from "jquery";

// import "owl.carousel/dist/assets/owl.carousel.css";
// import "owl.carousel/dist/assets/owl.theme.default.css";
// import "owl.carousel";
// // import "/css/user/UserDefaultPage.css"
// import "../../public/css/user/UserDefaultPage.css";

// const partners = [
//   { id: 1, name: "Partner 1", img: "partner1.jpg" },
//   { id: 2, name: "Partner 2", img: "partner2.jpg" },
//   { id: 3, name: "Partner 3", img: "partner3.jpg" },
//   { id: 4, name: "Partner 4", img: "partner4.jpg" },
//   { id: 5, name: "Partner 5", img: "partner5.jpg" },
//   { id: 6, name: "Partner 6", img: "partner6.jpg" },
//   { id: 7, name: "Partner 7", img: "partner7.jpg" },
//   { id: 8, name: "Partner 8", img: "partner8.jpg" },
//   { id: 9, name: "Partner 9", img: "partner9.jpg" },
//   { id: 10, name: "Partner 10", img: "partner10.jpg" }
// ];

// const UserDefaultPage = () => {
//      useEffect(() => {
//           if (typeof window !== "undefined") {
//             $(".owl-carousel").owlCarousel({
//               loop: true,
//               margin: 10,
//               nav: true,
//               dots: true,
//               autoplay: true,
//               autoplayTimeout: 3000,
//               responsive: {
//                 0: { items: 1 },
//                 600: { items: 2 },
//                 1000: { items: 3 },
//               },
//             });
//           }
//         }, []);
        
        

//   return (
//     <div>
//       <nav className="blue darken-3">
//         <div className="nav-wrapper container">
//           <a href="#" className="brand-logo">
//             E-Hoarding
//           </a>
//         </div>
//       </nav>

//       <h2 className="center">Welcome to E-Hoarding</h2>

//       {/* Popular Partners Carousel */}
//       <div className="carousel-container">
//         <h4 className="center">Our Popular Partners</h4>
//         <div id="partner-carousel" className="owl-carousel owl-theme">
//           {partners.map((partner) => (
//             <div className="item" key={partner.id} style={{ padding: "10px" }}>
//               <div className="card" style={{ textAlign: "center", padding: "15px" }}>
//                 <div className="card-image">
//                   <img
//                     src={partner.img}
//                     alt={partner.name}
//                     style={{ width: "100%", borderRadius: "8px" }}
//                   />
//                 </div>
//                 <div className="card-content">
//                   <h5>{partner.name}</h5>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Prime Locations Selection */}
//       <div className="prime-locations">
//         <h4 className="center">Select a Prime Location</h4>
//         <div className="locations-container" style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
//           {["Location 1", "Location 2", "Location 3", "Location 4"].map((loc, index) => (
//             <div
//               key={index}
//               className="location"
//               style={{
//                 width: "180px",
//                 margin: "10px",
//                 padding: "12px",
//                 background: "#1976d2",
//                 borderRadius: "8px",
//                 boxShadow: "0px 2px 8px rgba(0,0,0,0.2)",
//                 cursor: "pointer",
//                 color: "white",
//                 fontWeight: "bold",
//                 textAlign: "center",
//                 transition: "background 0.3s",
//               }}
//               onMouseOver={(e) => (e.target.style.background = "#0d47a1")}
//               onMouseOut={(e) => (e.target.style.background = "#1976d2")}
//             >
//               {loc}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };
// export default UserDefaultPage;
