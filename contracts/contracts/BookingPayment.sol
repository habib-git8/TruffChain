// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BookingPayment {

    struct Booking {
        address user;
        string timeSlot;
        bool paid;
    }

    // Use turfId as bookingId directly
    mapping(uint256 => Booking) public bookings;

    // Events
    event SlotBooked(uint256 bookingId, address indexed user, uint256 turfId, string timeSlot);
    event PaymentReceived(uint256 bookingId, uint256 amount);

    // Book a slot (bookingId == turfId)
    function bookSlot(uint256 turfId, string memory timeSlot) public {
        // Ensure the slot is not already booked
        require(bookings[turfId].user == address(0), "Turf already booked");

        bookings[turfId] = Booking({
            user: msg.sender,
            timeSlot: timeSlot,
            paid: false
        });

        emit SlotBooked(turfId, msg.sender, turfId, timeSlot);
    }

    // Pay for the booked slot (bookingId == turfId)
    function payForSlot(
        uint256 turfId,
        address payable recipient,
        uint256 amount
    ) public payable {
        Booking storage booking = bookings[turfId];

        require(booking.user == msg.sender, "You can only pay for your own booking");
        require(!booking.paid, "Slot already paid for");
        require(amount > 0, "Amount must be greater than zero");
        require(msg.value == amount, "Incorrect payment amount");

        booking.paid = true;
        recipient.transfer(msg.value);

        emit PaymentReceived(turfId, msg.value);
    }


    // Optional: Return booking owner
    function getBookingOwner(uint256 turfId) public view returns (address) {
        return bookings[turfId].user;
    }
}
