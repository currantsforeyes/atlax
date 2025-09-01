import React, { useState } from 'react';
import StarRating from './StarRating';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../services/api';
import type { Review } from '../types';

interface ReviewFormProps {
    experienceId: string;
    onReviewSubmitted: (newReview: Review) => void;
    onNavClick: (page: string) => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ experienceId, onReviewSubmitted, onNavClick }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { user } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        if (rating === 0 || !comment.trim()) {
            alert('Please provide a rating and a comment.');
            return;
        }
        
        setIsSubmitting(true);
        const newReview = await api.addUserReview({
            experienceId,
            userId: user.id,
            rating,
            comment,
        });
        
        if (newReview) {
            onReviewSubmitted(newReview);
            // Reset form
            setRating(0);
            setComment('');
        }
        setIsSubmitting(false);
    };

    if (!user) {
        return (
            <div className="mt-8 border-t border-gray-700 pt-6 text-center">
                <p className="text-gray-400">
                    You must be{' '}
                    <button onClick={() => onNavClick('Auth')} className="font-bold text-indigo-400 hover:underline">
                        logged in
                    </button>{' '}
                    to leave a review.
                </p>
            </div>
        );
    }

    return (
        <div className="mt-8 border-t border-gray-700 pt-6">
            <h3 className="text-lg font-bold mb-4">Leave a Review</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Your Rating</label>
                    <StarRating rating={rating} onRatingChange={setRating} interactive />
                </div>
                <div>
                    <label htmlFor="comment" className="block text-sm font-medium text-gray-400 mb-2">Your Comment</label>
                    <textarea
                        id="comment"
                        rows={4}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Share your thoughts about this experience..."
                        disabled={isSubmitting}
                    />
                </div>
                <div>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-6 rounded-full transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit Review'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ReviewForm;