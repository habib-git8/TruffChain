// import BusinessFilter from '@/components/businesses/business-filter';
// import BusinessSearch from '@/components/businesses/business-search';

import { Suspense, useEffect, useState } from 'react';
import BusinessSearch from '../components/BusinessSearch';
import Business from '../components/Bussiness';
import ground2 from '../ground2.jpg';
import Navbar from '../components/Navbar';
import { ArrowRightIcon } from 'lucide-react'; // Assuming you're using lucide-react
import { Link } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';
import { ethers } from 'ethers';
import { BrowserProvider, Contract, parseEther } from 'ethers';
import ReviewModal from '../components/ReviewModal';


export default function MarketSection() {
    const [selectedBusiness, setSelectedBusiness] = useState(null);
    const [businesses, setBusinesses] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        date: '',
        price: '',
        category: '',
        timeSlot: '',
        location: '',
        image: null, // File upload
        contractaddress: '',
    });
    const [account, setAccount] = useState(null);
    const BookingPaymentAddress = "0x949754D2fE8931833B8a6443f2AAe01a20eA4e22";
    const ReviewAddress = "0x949754D2fE8931833B8a6443f2AAe01a20eA4e22";

    const ReviewABI = [
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "turfId",
              "type": "uint256"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "reviewer",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "string",
              "name": "reviewText",
              "type": "string"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "timestamp",
              "type": "uint256"
            }
          ],
          "name": "ReviewSubmitted",
          "type": "event"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "turfId",
              "type": "uint256"
            }
          ],
          "name": "getReviews",
          "outputs": [
            {
              "components": [
                {
                  "internalType": "address",
                  "name": "reviewer",
                  "type": "address"
                },
                {
                  "internalType": "string",
                  "name": "text",
                  "type": "string"
                },
                {
                  "internalType": "uint256",
                  "name": "timestamp",
                  "type": "uint256"
                }
              ],
              "internalType": "struct ReviewContract.Review[]",
              "name": "",
              "type": "tuple[]"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "turfId",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "reviewText",
              "type": "string"
            }
          ],
          "name": "leaveReview",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        }
      ];

    const BookingPaymentABI = [
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "bookingId",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            }
          ],
          "name": "PaymentReceived",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "bookingId",
              "type": "uint256"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "user",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "turfId",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "string",
              "name": "timeSlot",
              "type": "string"
            }
          ],
          "name": "SlotBooked",
          "type": "event"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "turfId",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "timeSlot",
              "type": "string"
            }
          ],
          "name": "bookSlot",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "name": "bookings",
          "outputs": [
            {
              "internalType": "address",
              "name": "user",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "timeSlot",
              "type": "string"
            },
            {
              "internalType": "bool",
              "name": "paid",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "turfId",
              "type": "uint256"
            }
          ],
          "name": "getBookingOwner",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "turfId",
              "type": "uint256"
            },
            {
              "internalType": "address payable",
              "name": "recipient",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            }
          ],
          "name": "payForSlot",
          "outputs": [],
          "stateMutability": "payable",
          "type": "function"
        }
      ];
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = (business) => {
      setSelectedBusiness(business);
      setShowModal(true);
    };
  
    const handleCloseModal = () => {
      setSelectedBusiness(null);
      
    };
  
    const handleSubmitReview = (reviewText) => {
      console.log("Review for", selectedBusiness.name, ":", reviewText, selectedBusiness.id);
      // Optionally send to backend or smart contract
      leaveReview(selectedBusiness.id, reviewText);
      setShowModal(false);
    };
    // const provider = new BrowserProvider(window.ethereum);
    // const signer = provider.getSigner();
    // const contract = new ethers.Contract(BookingPaymentAddress, BookingPaymentABI, signer);

    const getContract = async () => {
        if (!window.ethereum) throw new Error("MetaMask not detected");

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(BookingPaymentAddress, BookingPaymentABI, signer);
        return contract;
    };
    const getReviewContract = async () => {
        if (!window.ethereum) throw new Error("MetaMask not detected");

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(ReviewAddress, ReviewABI, signer);
        return contract;

    };
    const leaveReview = async (turfId, reviewText) => {
        try {
            const contract = await getReviewContract();
            console.log('Leaving review for turf ID:', turfId);
            
            const tx = await contract.leaveReview(turfId, reviewText);
            await tx.wait();
            setShowModal(false);
    
            console.log("Review submitted successfully!");
        } catch (error) {
            console.error("Review submission failed:", error.message);
        }
    };
   
    // Simulating an API call or fetching businesses data
    useEffect(() => {
        const fetchTurfs = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/turfs');
                const data = await response.json();
                const formattedData = data.map((turf) => {
                    return {
                        ...turf,
                        date: format(new Date(turf.date), 'yyyy-MM-dd'), // Format the date here
                    };
                });
                setBusinesses(formattedData);
                console.log('Fetched turfs:', formattedData);
            } catch (error) {
                console.error('Failed to fetch turfs:', error);
            }
        };

        fetchTurfs();
    }, []);

    // const bookSlot = async (turfId, time_slot) => {
    //     try {

    //         console.log('Booking slot for turf ID:', turfId, 'at time slot:', time_slot);
    //         const tx = await contract.bookSlot(turfId, time_slot);
    //         await tx.wait();
    //         alert('Slot booked successfully!');
    //     } catch (error) {
    //         console.error('Booking error:', error);
    //     }
    // };
    const bookSlot = async (turfId, time_slot) => {
        try {
            const contract = await getContract();
            console.log('Booking slot for turf ID:', turfId, 'at time slot:', time_slot);
            const tx = await contract.bookSlot(turfId, time_slot);
            await tx.wait();
            console.log("Slot booked!");
            const res = await fetch("http://localhost:5000/api/turfs/update-booked", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ turfId }),
          });
  
          const data = await res.json();
          if (data.success) {
              console.log("Database updated successfully ✅");
              window.location.reload();
          } else {
              console.warn("Booking confirmed, but DB update failed:", data.error);
          }
        } catch (error) {
            console.error("Booking failed:", error.message);
        }
    };
    const payForSlot = async (turfId, recipientAddress, amountInEth) => {
        try {
            console.log('Paying for slot:', turfId, 'to recipient:', recipientAddress, 'amount:', amountInEth);
            const booking_value = amountInEth/ 1621; // Example value in ETH
            const contract = await getContract();
            const tx = await contract.payForSlot(
                turfId,
                recipientAddress,
                ethers.parseEther(booking_value.toString()), // amount in wei
                {
                    value: ethers.parseEther(booking_value.toString()), // actual ETH sent
                }
            );
            await tx.wait();
            console.log("Payment successful!" , booking_value);
            await fetch("http://localhost:5000/api/turfs/update-payed", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ turfId, payed: true }),
            });
        
            console.log("Database updated with payment status.");
        
            // Optional: reload screen
            window.location.reload();
        } catch (error) {
            console.error("Payment failed:", error.message);
        }
    };




    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = new FormData();
            data.append('name', formData.name);
            data.append('date', formData.date);
            data.append('timeSlot', formData.timeSlot);
            data.append('price', formData.price);
            data.append('category', formData.category);
            data.append('location', formData.location);
            data.append('image', formData.image);
            data.append('contractaddress', formData.contractaddress);

            const res = await axios.post('http://localhost:5000/api/turfs', data, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            // Add new turf to UI
            setBusinesses(prev => [...prev, res.data]);

            // Optional: Reset form
            setFormData({
                name: '',
                date: '',
                timeSlot: '',
                price: '',
                category: '',
                location: '',
                image: null,
                contractAddress: '',
            });

            // Close modal
            document.getElementById('crud-modal').classList.add('hidden');

        } catch (err) {
            console.error('Failed to publish turf:', err);
        }
    };

    return (
        <>

            <Navbar />

            <main className="bg-gray-100 py-8 dark:bg-gray-800 md:py-12 px-4 md:px-12">
                <div className="wrapper container mx-auto">

                    <div className="mb-6 flex flex-col items-center justify-between md:mb-8 md:flex-row">
                        <div className="mb-4 flex-1 md:mb-0">
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 md:text-3xl">
                                Perfect Turff for You
                            </h1>
                            <p className="mt-2 text-gray-600 dark:text-gray-400">
                                Find the perfect Turff for your needs
                            </p>
                        </div>
                        <div className="flex w-full items-center space-x-4 md:w-auto">
                            <Suspense>
                                <BusinessSearch />
                                {/* <BusinessFilter /> */}
                            </Suspense>
                        </div>
                    </div>
                    <div className='flex items-center mb-6 gap-4'>
                        <button data-modal-target="crud-modal" data-modal-toggle="crud-modal" type="button" className="group gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl text-lg flex items-center hover:bg-blue-700 transition">
                            <div className="flex items-center gap-2">
                                <ArrowRightIcon className="size-5 transition-transform duration-300 group-hover:translate-x-1" />
                                Publish Your Truff
                            </div>
                        </button>
                    </div>


                    {/* <!-- Modal toggle --> */}



                    <div
                        id="crud-modal"
                        tabIndex="-1"
                        aria-hidden="true"
                        className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
                    >
                        <div className="relative p-4 w-full max-w-md max-h-full">
                            {/* Modal content */}
                            <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                                {/* Modal header */}
                                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                        Publish Your Turf
                                    </h3>
                                    <button
                                        type="button"
                                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                        data-modal-toggle="crud-modal"
                                    >
                                        <svg
                                            className="w-3 h-3"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 14 14"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                            />
                                        </svg>
                                        <span className="sr-only">Close modal</span>
                                    </button>
                                </div>

                                <form
                                    className="p-4 md:p-5"
                                    onSubmit={handleSubmit}
                                >
                                    <div className="grid gap-4 mb-4 grid-cols-2">
                                        <div className="col-span-2">
                                            <label htmlFor="turf-name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                Turf Name
                                            </label>
                                            <input
                                                type="text"
                                                id="turf-name"
                                                placeholder="NCI Turf Ground"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                                            />
                                        </div>

                                        <div className="col-span-2 sm:col-span-1">
                                            <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                Date
                                            </label>
                                            <input
                                                type="date"
                                                id="date"
                                                value={formData.date}
                                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                                            />
                                        </div>

                                        <div className="col-span-2 sm:col-span-1">
                                            <label htmlFor="timeSlot" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                Time Slot
                                            </label>
                                            <input
                                                type="text"
                                                id="timeSlot"
                                                placeholder="6:00 PM - 7:00 PM"
                                                value={formData.timeSlot}
                                                onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                                            />
                                        </div>

                                        <div className="col-span-2 sm:col-span-1">
                                            <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                Price
                                            </label>
                                            <input
                                                type="number"
                                                id="price"
                                                placeholder="800"
                                                value={formData.price}
                                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                                            />
                                        </div>

                                        <div className="col-span-2 sm:col-span-1">
                                            <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                Category
                                            </label>
                                            <select
                                                id="category"
                                                value={formData.category}
                                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                                            >
                                                <option value="">Select category</option>
                                                <option value="5-a-side">5-a-side</option>
                                                <option value="Cricket">Cricket</option>
                                                <option value="Indoor Soccer">Indoor Soccer</option>
                                            </select>
                                        </div>

                                        <div className="col-span-2">
                                            <label htmlFor="location" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                Location
                                            </label>
                                            <input
                                                type="text"
                                                id="location"
                                                placeholder="Dublin, Ireland"
                                                value={formData.location}
                                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                                            />
                                        </div>

                                        <div className="col-span-2">
                                            <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                Upload Turf Image
                                            </label>
                                            <input
                                                type="file"
                                                id="image"
                                                accept="image/*"
                                                onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
                                                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-600 dark:border-gray-500"
                                            />
                                        </div>
                                        <div className="col-span-2">
                                            <label htmlFor="contractAddress" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                Contract Address
                                            </label>
                                            <input
                                                type="text"
                                                id="contractAddress"
                                                placeholder="0x1234567890abcdef..."
                                                value={formData.contractaddress}
                                                onChange={(e) => setFormData({ ...formData, contractaddress: e.target.value })}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    >
                                        <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                                        </svg>
                                        Publish Turf
                                    </button>
                                </form>

                            </div>
                        </div>
                    </div>


                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">


                        {businesses.map((business, index) => (
                            <Business key={business.id} {...business} onBook={() => bookSlot(business.id, business.time_slot)} onPay={() => payForSlot(business.id, business.contractaddress, business.price)} onReview={() => handleOpenModal(business)}/>
                        ))}
                    </div>
                    {showModal && (
        <ReviewModal
          business={selectedBusiness}
          onClose={handleCloseModal}
          onSubmit={handleSubmitReview}
        />
      )}


                </div>
            </main>
        </>
    );
}
