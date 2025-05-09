

//cement with carousel 3 seconds animation
import{  useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


export default function Index() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    

    // Sample food items for the carousel
    const foodItems = [
        {
            id: 1,
            title: "Caffeteria",
            description: "A perfect blend of flavors in every bite, crafted with authentic Italian recipes.",
            img: "/caffeteria.jpg",
        },
        {
            id: 2,
            title: "VIIT Canteen",
            description: "Experience the authentic South Indian, Maharashtrian food",
            img: "/viit.jpg",
        },
        {
            id: 3,
            title: "Amantran",
            description: "Veg and Non-veg Food available.",
            img: "/amantran.jpg",
        },
        {
            id: 4,
            title: "Kakuchi Mess",
            description: "Distance - 200m",
            img: "kaku.jpg",
        },
        {
            id: 5,
            title: "Maheshwari",
            description: "Distance - 200m",
            img: "maheshwari.jpg",
        },
    ];

    const teamMembers = [
    { name: "Dhiraj Jagtap", role: "Project Manager", image: "https://media.licdn.com/dms/image/v2/D4D03AQH4wc_LhTw-Tg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1699863758570?e=1743638400&v=beta&t=P2ezs9B4s8UmDVkGhDeBh9yAzIUfTxeh_ueeEP8lLtI" },
    { name: "Pranil Gawande", role: "UI/UX Designer", image: "https://media.licdn.com/dms/image/v2/D5603AQFCu2v7T6FBaQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1722607857986?e=1743638400&v=beta&t=QcwevWPniDbbxkKamcakR8vN1t_9QybFny85FY1qz20" },
    { name: "Manish More", role: "Backend Developer", image: "https://media.licdn.com/dms/image/v2/D4D03AQH4CkAWuvY3Aw/profile-displayphoto-shrink_400_400/B4DZRHRueDG0Ag-/0/1736362617994?e=1743638400&v=beta&t=lcNUDaBG0oQBPa__uVAaFf0R4D4oaBUj_EztkJ3h8cc" },
    { name: "Gaurav Hadge", role: "Frontend Developer", image: "https://media.licdn.com/dms/image/v2/D4E03AQFZUCcNbaajbQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1696009133694?e=1743638400&v=beta&t=7cSnfjEr011ndmLAc7EUBIyq_hnRg1-0NtwOTnvIfqI" }
    ];

    const printItems = [
        {
            id: 1,
            title: "CC",
            description: "Distance - 10m",
            img: "/cc.jpg",
        },
        {
            id: 2,
            title: "Arihant Enterprices",
            description: "Distance - 240m",
            img: "/arihant.jpg",
        },
        {
            id: 3,
            title: "Mahendra Xerox",
            description: "Distance - 200m",
            img: "mahendra.jpg",
        },
       
    ]

    // Carousel settings
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2, // Adjust based on screen size
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1024,
                settings: { slidesToShow: 2 },
            },
            {
                breakpoint: 768,
                settings: { slidesToShow: 1 },
            },
        ],
    };

    return (
        <div className="min-h-screen bg-white overflow-x-hidden">
            {/* Navigation */}
            <nav className="relative px-4 md:px-8 py-4 bg-[#F0F4F8]">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <span className="text-[#102A43] text-2xl font-bold">
                            <span className="text-[#D64545]">C</span>ampus<span className="text-[#D64545]">S</span>ync
                        </span>
                    </div>

                    {/* Mobile Menu Button */}
                    <button className="md:hidden text-[#102A43]" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                            />
                        </svg>
                    </button>

                    {/* Desktop Navigation */}
                    <div className="flex items-center space-x-4 lg:space-x-8">
                        
                        <Link  to="#" className="text-[#334E68] hover:text-[#D64545] transition-colors">
                               Home
                        </Link>
                        <Link  to="/login" className="text-[#334E68] hover:text-[#D64545] transition-colors">
                                Login
                        </Link>
                        <Link  to="/register" className="text-[#334E68] hover:text-[#D64545] transition-colors">
                                SignUp
                        </Link>
                        <a  href="#us" className="text-[#334E68] hover:text-[#D64545] transition-colors">
                                About CampusSync
                        </a>
                        <a  href="#about" className="text-[#334E68] hover:text-[#D64545] transition-colors transform   ">
                                Team Charlie
                        </a>
                        
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="relative bg-[#F0F4F8] py-12 md:py-20">
                <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center gap-8">
                    <div className="max-w-xl text-center md:text-left">
                        <h1 className="text-4xl md:text-5xl font-bold text-[#102A43] mb-4">CampusSync</h1>
                        <p className="text-[#334E68] mb-8 text-sm md:text-base">
                        A smart digital solution for campus canteen and printing services, offering seamless ordering and efficient service.
                        </p>
                        <div className="flex justify-center md:justify-start space-x-4">
                            <a href="/register" className="bg-[#D64545] text-white px-6 py-3 rounded-full hover:bg-[#102A43] transition-colors">
                                SignUp
                            </a>
                            <a href="/login" className="bg-white text-[#102A43] px-6 py-3 rounded-full border border-[#102A43] hover:bg-[#F0F4F8] transition-colors">
                                Login
                            </a>
                        </div>
                        <br />
                        <div className="flex justify-center md:justify-start space-x-4">
                            <a href="/canteen-login" className="bg-white text-[#0e7263] px-6 py-3 rounded-full border border-[#102A43] hover:bg-[#F0F4F8] transition-colors">
                                Canteen Login
                            </a>
                            <a href="/print-login" className="bg-[#45aad6] text-white px-6 py-3 rounded-full hover:bg-[#102A43] transition-colors">
                                Printer Login
                            </a>
                        </div>
                    </div>
                    <div className="relative w-full md:w-auto -mt-6">
                        <img
                            src="https://vierp-test.s3.ap-south-1.amazonaws.com/logo/vit_logo_new.png"
                            alt="Italian dish"
                            className="rounded-full w-[280px] h-[280px] md:w-[400px] md:h-[400px] object-contain overflow-visible mx-auto transform -translate-y-6"
                        />
                    </div>
                </div>
            </div>

           {/* Why Us Section */}
<div id="us" className="relative bg-gradient-to-r from-[#F0F4F8] to-[#D64545]/10 py-16 md:py-24">
    <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#102A43] mb-6">Why Choose CampusSync?</h2>
        <p className="text-lg text-[#334E68] max-w-3xl mx-auto mb-10">
            CampusSync is your one-stop platform for hassle-free campus services. Enjoy fast, digital ordering for canteens and printing stations, saving you time and effort.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition duration-300 border border-[#F0F4F8]">
                <div className="flex items-center justify-center w-16 h-16 mx-auto bg-[#D64545]/10 rounded-full">
                    <img src="https://cdn-icons-png.flaticon.com/128/869/869636.png" alt="Order" className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-semibold text-[#102A43] mt-4">Seamless Ordering</h3>
                <p className="text-[#334E68] mt-2">
                    Place your canteen and printing orders online and skip the wait.
                </p>
            </div>

            {/* Feature 2 */}
            <div className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition duration-300 border border-[#F0F4F8]">
                <div className="flex items-center justify-center w-16 h-16 mx-auto bg-[#D64545]/10 rounded-full">
                    <img src="https://cdn-icons-png.flaticon.com/128/3845/3845731.png" alt="Fast" className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-semibold text-[#102A43] mt-4">Fast & Reliable</h3>
                <p className="text-[#334E68] mt-2">
                    Get real-time order updates with zero delays.
                </p>
            </div>

            {/* Feature 3 */}
            <div className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition duration-300 border border-[#F0F4F8]">
                <div className="flex items-center justify-center w-16 h-16 mx-auto bg-[#D64545]/10 rounded-full">
                    <img src="https://cdn-icons-png.flaticon.com/128/4727/4727409.png" alt="Campus-Wide" className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-semibold text-[#102A43] mt-4">Campus-Wide Access</h3>
                <p className="text-[#334E68] mt-2">
                    Available across all campus canteens & print shops.
                </p>
            </div>
        </div>
    </div>
</div>



            {/* Food Carousel Section */}
            <div className="bg-white py-12 md:py-20">
                <h2 className="text-2xl md:text-2xl lg:text-4xl font-bold text-[#102A43] mb-6 text-center">
                    Food Section
                </h2>
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <Slider {...settings}>
                        {foodItems.map((item) => (
                            <div key={item.id} className="p-4">
                                <div className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 border border-[#F0F4F8]">
                                    <div className="relative mb-4 overflow-hidden rounded-xl">
                                        <img
                                            src={item.img}
                                            alt={item.title}
                                            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                    </div>
                                    <h3 className="text-lg font-semibold text-[#102A43] mb-2">{item.title}</h3>
                                    <p className="text-[#334E68] mb-4 text-sm">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>


            {/* Printer Carousel Section */}
            <div className="bg-white  py-5 md:py-20">
                <h2 className="text-2xl md:text-2xl lg:text-4xl font-bold text-[#102A43] mb-6 text-center">
                    Printing Section
                </h2>
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <Slider {...settings}>
                        {printItems.map((item) => (
                            <div key={item.id} className="p-4">
                                <div className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 border border-[#F0F4F8]">
                                    <div className="relative mb-4 overflow-hidden rounded-xl">
                                        <img
                                            src={item.img}
                                            alt={item.title}
                                            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                    </div>
                                    <h3 className="text-lg font-semibold text-[#102A43] mb-2">{item.title}</h3>
                                    <p className="text-[#334E68] mb-4 text-sm">{item.description}</p>
                                
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>

            <section id="about" className="py-16 px-6 text-center max-w-6xl mx-auto">
         <h2 className="text-4xl font-bold text-gray-800">Meet Our Team - Team Charlie</h2>
         <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
           We are a passionate team dedicated to improving campus services for students and faculty.
         </p>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
           {teamMembers.map((member, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300">
              <img src={member.image} alt={member.name} className="rounded-full w-24 h-24 mx-auto shadow-md" />
              <h3 className="text-xl font-semibold mt-4 text-gray-800">{member.name}</h3>
              <p className="text-gray-500">{member.role}</p>
            </div>
          ))}
        </div>
      </section>
            <footer className="bg-gray-900 text-white py-10 mt-12">
         <div className="container mx-auto text-center">
           <h3 className="text-xl font-semibold">Connect with Us</h3>
           <div className="flex justify-center space-x-6 mt-4">
             <a href="#" className="text-gray-400 hover:text-white transition duration-300"><i className="fab fa-facebook-f"></i></a>
             <a href="#" className="text-gray-400 hover:text-white transition duration-300"><i className="fab fa-twitter"></i></a>
             <a href="#" className="text-gray-400 hover:text-white transition duration-300"><i className="fab fa-instagram"></i></a>
             <a href="#" className="text-gray-400 hover:text-white transition duration-300"><i className="fab fa-linkedin"></i></a>
           </div>
           <p className="mt-6 text-gray-400">&copy; {new Date().getFullYear()} CampusSync. All rights reserved.</p>
           <p className="mt-2 text-gray-400">Contact us: <a href="mailto:support@campussync.com" className="text-blue-400 hover:underline">support@campussync.com</a></p>
         </div>
       </footer>
        </div>
    );
}