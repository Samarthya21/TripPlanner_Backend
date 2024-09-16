"use client";
import { useEffect, useState } from 'react';
import { FaHotel, FaUtensils, FaMapMarkerAlt, FaSignOutAlt} from 'react-icons/fa';
import  PlaceCard  from '/Users/samarthyaalok/Desktop/TripPlanner/frontend/app/components/PlaceCard/PlaceCard.js';
import useStore from '/Users/samarthyaalok/Desktop/TripPlanner/frontend/app/useCreateStore.js'; 
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';


export default function Dashboard() {
    const router = useRouter();
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/V1/Login');
        }
     }, []);
    const [selectedCategory, setSelectedCategory] = useState("hotels");
    
    function handleLogout() {
        localStorage.removeItem('email');
        localStorage.removeItem('token');
        router.push('/V1/Login');
    }

    const city=JSON.parse(localStorage.getItem("city"));
    const foods = JSON.parse(localStorage.getItem("foods"));
    const hotels = JSON.parse(localStorage.getItem("hotels"));
    const attractions = JSON.parse(localStorage.getItem("attractions"));

    const foods_st = useStore(state => state.foods);
    const hotels_st = useStore(state => state.hotels);
    const attractions_st = useStore(state => state.attractions);
    const email=localStorage.getItem("email");
    
    function handleDelete(e) { 
        e.preventDefault();
        useStore.setState({foods: []});
        useStore.setState({hotels: []});
        useStore.setState({attractions: []});
        toast.success('Your Trip has been deleted');
    }
    async function handleSave(e) {
        console.log(email);
        e.preventDefault();
        let obj = {
            foods: foods_st,
            hotels: hotels_st,
            attractions: attractions_st,
            email:email,
        }
        
        try {
            const response = await axios.post("http://localhost:8000/api/v1/save", {
                obj
            });
            console.log("reponse is",response);
            toast.success('Your Trip has been saved');

        }
        catch (err) { 
            console.log(err);
        }
    }
    

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-[350px]  p-6 shadow-xl rounded-r-lg bg-gradient-to-t from-blue-600 to-blue-100">
                
                <h1 className="text-3xl font-semibold mb-6 text-gray-800 text-center mb-[100px]">Explore {city}</h1>
                
                <ul className="space-y-6">
                    <li
                        className={`p-3 text-lg font-semibold cursor-pointer rounded-lg transition-all duration-300 ${
                            selectedCategory === "hotels" ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-blue-100"
                        }`}
                        onClick={() => setSelectedCategory("hotels")}
                    >
                        <FaHotel className="inline mr-3" /> Hotels
                    </li>
                    <li
                        className={`p-3 text-lg font-semibold cursor-pointer rounded-lg transition-all duration-300 ${
                            selectedCategory === "foods" ? "bg-green-500 text-white" : "text-gray-700 hover:bg-green-100"
                        }`}
                        onClick={() => setSelectedCategory("foods")}
                    >
                        <FaUtensils className="inline mr-3" /> Restaurants
                    </li>
                    <li
                        className={`p-3 text-lg font-semibold cursor-pointer rounded-lg transition-all duration-300 ${
                            selectedCategory === "attractions" ? "bg-orange-500 text-white" : "text-gray-700 hover:bg-orange-100"
                        }`}
                        onClick={() => setSelectedCategory("attractions")}
                    >
                        <FaMapMarkerAlt className="inline mr-3" /> Tourist Attractions
                    </li>
                    <li
                        className={`p-3 text-lg font-semibold cursor-pointer rounded-lg transition-all duration-300 ${
                            selectedCategory === "all" ? "bg-red-500 text-white" : "text-gray-700 hover:bg-red-100"
                        }`}
                        onClick={() => setSelectedCategory("all")}
                    >
                        <FaMapMarkerAlt className="inline mr-3" /> Your Trip
                    </li>
                    <li
                        className="pl-[25px] pt-[400px] text-lg font-semibold cursor-pointer rounded-lg transition-all duration-300 "
                          
                        onClick={handleLogout}
                    >
                        <FaSignOutAlt className="inline mr-3" /> Logout 
                    </li>
                </ul>
                
            </div>
            {/* Main Content */}
            
            <div className="flex-grow p-8">
                <h2 className="text-2xl font-bold mb-4 capitalize">{selectedCategory}</h2>
                {
                selectedCategory=== 'all' && (
                    <div className='h-[100px] w-[350px] '>
                        <button onClick={handleSave}
                                className='h-[50px] w-[150px] border border-green-300 rounded mr-4'>Save</button>  
                        <button onClick={handleDelete}
                                className='h-[50px] w-[150px] border border-red-500 rounded'>Delete
                                
                        </button>
                    </div>
                        
                    
                        
                )
                }
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {selectedCategory === 'foods' && foods.map((food, index) => (
            <PlaceCard
                key={index}
                name={food.name}
                rate={food.rating}
                image={food.image}
                type="foods"  
                selectedCategory={selectedCategory}      
            />
        ))}
        {selectedCategory === 'hotels' && hotels.map((hotel, index) => (
            <PlaceCard
                key={index}
                name={hotel.name}
                rate={hotel.rating}
                image={hotel.image}
                type="hotels"
                selectedCategory={selectedCategory}
            />
        ))}
        {selectedCategory === 'attractions' && attractions.map((a, index) => (
            <PlaceCard
                key={index}
                name={a.name}
                rate={a.rating}
                image={a.image}
                type="attractions"
                selectedCategory={selectedCategory}
            />
        ))}
        {selectedCategory === 'all' && foods_st.map((a, index) => (
            <PlaceCard
                key={index}
                name={a.name}
                rate={a.rating}
                image={a.image}
                selectedCategory={selectedCategory}
            />
        ))}
        {selectedCategory === 'all' && hotels_st.map((a, index) => (
            <PlaceCard
                key={index}
                name={a.name}
                rate={a.rating}
                image={a.image}
                selectedCategory={selectedCategory}
            />
        ))}
        {selectedCategory === 'all' && attractions_st.map((a, index) => (
            <PlaceCard
                key={index}
                name={a.name}
                rate={a.rating}
                image={a.image}
                selectedCategory={selectedCategory}
            />
        ))}
                </div>
            </div>
        <Toaster/>    
        </div>
    );
}
