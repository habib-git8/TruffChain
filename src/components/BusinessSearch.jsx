import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { SearchIcon } from 'lucide-react';  // Assuming you're using lucide-react for icons
import { Input  } from './input';// Adjust the import path based on where your Input component is

export default function BusinessSearch() {
  const [searchParams, setSearchParams] = useSearchParams(); // Get search parameters from the URL
  const navigate = useNavigate();  // Replaces useHistory from previous versions

  const handleSearch = (term) => {
    const params = new URLSearchParams(searchParams);  // Create a new instance of URLSearchParams
    if (term.trim()) {
      params.set('query', term.trim());
    } else {
      params.delete('query');
    }

    // Use navigate to update the URL without reloading the page
    navigate(`?${params.toString()}`);
  };

  return (
    <div className="relative flex-1 md:flex-none">
      <SearchIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-500 dark:text-gray-400" />
      <Input
        className="focus:ring-primary-500 w-full rounded-md bg-white py-2 pl-10 pr-4 focus:border-transparent focus:outline-none focus:ring-2 dark:bg-gray-900 dark:text-gray-100 md:w-64"
        placeholder="Search businesses"
        type="text"
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get('query') || ''}  // Default value for input field
      />
    </div>
  );
}
