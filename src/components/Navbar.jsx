// import logoImg from '@/../public/logo.png';
// import Image from 'next/image';
// import Link from 'next/link';
// import NavItems from './nav-items';
import { UserIcon, LogInIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ethers } from 'ethers';

export default function Navbar() {
    const [user, setUser] = useState(null);// To store the connected account
    const [account, setAccount] = useState(null);// To store the connected account

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        // Check if MetaMask is already connected when the page loads
        if (window.ethereum) {
            window.ethereum.request({ method: 'eth_accounts' })
                .then(accounts => {
                    if (accounts.length > 0) {
                        setAccount(accounts[0]);
                    }
                })
                .catch(err => {
                    console.error('Error checking accounts:', err);
                });
        }
    }, []);

    const connectMetaMask = async () => {
        if (window.ethereum) {
            try {
                // Request access to the user's MetaMask account
                const [selectedAccount] = await window.ethereum.request({
                    method: 'eth_requestAccounts',
                });

                // Set the selected account
                setAccount(selectedAccount);
            } catch (error) {
                console.error('Error connecting to MetaMask:', error);
            }
        } else {
            alert('MetaMask is not installed!');
        }
    };
    return (
        <nav className="sticky top-0 z-50 bg-white/60 shadow backdrop-blur-sm">
            <div className="wrapper container flex h-16 w-full items-center justify-between py-2 px-4 md:px-12">
                <a href="/">
                    <p className='text-md font-bold text-gray-900 dark:text-gray-100 md:text-xl'>Truff Book</p>
                </a>

                <ul className="flex gap-4">
                    {/* <>
                        <li className="hidden md:inline">
                            <Link to="/signup">
                                <button className="border px-4 py-2 rounded-md flex items-center gap-2 hover:bg-gray-100">
                                    <UserIcon className="size-4" />
                                    Register
                                </button>
                            </Link>
                        </li>
                        <li>
                            <Link to="/signin">
                                <button className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-700">
                                    <LogInIcon className="size-4" />
                                    Login
                                </button>
                            </Link>
                        </li>
                    </> */}
                    <>
                        
                        {user ? (
                            <div className='flex items-center gap-2'>

                                <li className="flex items-center gap-2 font-medium">
                                    <UserIcon className="size-4" />
                                    <span>{user.name}</span>
                                </li>
                                <button
                                    onClick={() => {
                                        localStorage.removeItem('user');
                                        window.location.reload();
                                    }}
                                    className="ml-4 text-sm text-red-600 hover:underline"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <>
                                <li className="hidden md:inline">
                                    <Link to="/signup">
                                        <button className="border px-4 py-2 rounded-md flex items-center gap-2 hover:bg-gray-100">
                                            <UserIcon className="size-4" />
                                            Register
                                        </button>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/signin">
                                        <button className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-700">
                                            <LogInIcon className="size-4" />
                                            Login
                                        </button>
                                    </Link>
                                </li>
                            </>
                        )}
                        <div className="flex items-center gap-4">
                            <button
                                onClick={connectMetaMask}
                                className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
                            >
                                {account ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}` : 'Connect Wallet'}
                            </button>
                        </div>
                    </>
                </ul>
            </div>
        </nav>
    );
}