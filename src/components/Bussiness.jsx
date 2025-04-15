import PropTypes from 'prop-types';
import Ground2 from '../ground2.jpg'

function Business({ name, image, time_slot, location, date, price, category, onBook ,booked ,payed, onPay, onReview}) {
  return (
    <div className="flex flex-col overflow-hidden rounded-lg bg-white shadow-md dark:bg-gray-900">
      {/* Image */}
      <div className="group flex h-40 items-center justify-center overflow-hidden bg-gray-200 dark:bg-gray-800">
        <img
          src={image || Ground2} // default image fallback
          alt={name}
          className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
        />
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col space-y-2 p-4">
        {/* Ground/Turf Name */}
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          {name}
        </h2>

        {/* Location */}
        <p className="text-sm text-gray-600 dark:text-gray-400">
          📍 {location}
        </p>

        {/* Date & Time */}
        <div className="text-sm text-gray-700 dark:text-gray-300">
          🗓️ <span className="font-medium">{date}</span> — ⏰ {time_slot}
        </div>

        {/* Category */}
        <p className="text-sm text-blue-600 dark:text-blue-400 capitalize">
          Type: {category}
        </p>

        {/* Price */}
        <p className="text-lg font-bold text-green-600 dark:text-green-400">
          {price}$
        </p>

        {/* Book Button */}
        {booked ? (
          <button
            disabled
            className="mt-2 rounded-md bg-gray-500 px-4 py-2 text-white cursor-not-allowed"
          >
            Booked
          </button>
        ) : (
          <button
            onClick={onBook}
            className="mt-2 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition"
          >
            Book Now
          </button>
        )}
        {payed ? (
          <button
            disabled
            className="mt-2 rounded-md bg-gray-500 px-4 py-2 text-white cursor-not-allowed"
          >
            Payed
          </button>
        ) : (
          <button
            onClick={onPay}
            className="mt-2 rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700 transition"
          >
            Pay Now
          </button>
        )}
        {booked && (
          <button
            onClick={onReview}
            className="mt-2 rounded-md bg-yellow-600 px-4 py-2 text-white hover:bg-yellow-700 transition"
          >
            Review
          </button>
        )}
      </div>
    </div>
  );
}

// Prop validation
Business.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string,
  location: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  timeSlot: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
  onBook: PropTypes.func.isRequired,
};

export default Business;
