// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ReviewContract {
    struct Review {
        address reviewer;
        string text;
        uint timestamp;
    }

    // Mapping of turfId => array of reviews
    mapping(uint => Review[]) private turfReviews;

    // Event for when a review is submitted
    event ReviewSubmitted(uint indexed turfId, address indexed reviewer, string reviewText, uint timestamp);

    // Leave a review for a turf
    function leaveReview(uint turfId, string memory reviewText) public {
        require(bytes(reviewText).length > 0, "Review cannot be empty");

        Review memory newReview = Review({
            reviewer: msg.sender,
            text: reviewText,
            timestamp: block.timestamp
        });

        turfReviews[turfId].push(newReview);

        emit ReviewSubmitted(turfId, msg.sender, reviewText, block.timestamp);
    }

    // Get all reviews for a specific turf
    function getReviews(uint turfId) public view returns (Review[] memory) {
        return turfReviews[turfId];
    }
}
