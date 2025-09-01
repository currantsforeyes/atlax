
import React, { useState, useEffect, useMemo } from 'react';
import type { Experience, Review } from '../types';
import { ICONS } from '../constants';
import { Icon } from './Icon';
import ExperienceGrid from './ExperienceGrid';
import StarRating from './StarRating';
import { experiences } from '../data';
import { api } from '../services/api';
import ReviewForm from './ReviewForm';

interface ExperienceDetailProps {
  experience: Experience;
  onBack: () => void;
  onExperienceClick: (experience: Experience) => void;
  onNavClick: (page: string) => void;
}

const ExperienceDetail: React.FC<ExperienceDetailProps> = ({ experience, onBack, onExperienceClick, onNavClick }) => {
    const { id, title, creator, creatorAvatarUrl, thumbnailUrl, playerCount, genre, description } = experience;
    const formattedPlayerCount = playerCount.toLocaleString();
    const [reviews, setReviews] = useState<Review[]>([]);
    const [isLoadingReviews, setIsLoadingReviews] = useState(true);

    useEffect(() => {
        const fetchReviews = async () => {
            setIsLoadingReviews(true);
            const fetchedReviews = await api.getReviewsForExperience(id);
            setReviews(fetchedReviews);
            setIsLoadingReviews(false);
        };
        fetchReviews();
    }, [id]);

    const handleReviewSubmitted = (newReview: Review) => {
        setReviews(prevReviews => [newReview, ...prevReviews]);
    };

    const relatedExperiences = useMemo(() => experiences
        .filter(exp => exp.genre === genre && exp.id !== id)
        .slice(0, 5), [genre, id]);

  return (
    <div className="animate-fade-in">
        <button onClick={onBack} className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors mb-6">
            <Icon svg={ICONS.arrowLeft} className="h-5 w-5" />
            <span>Back to Discover</span>
        </button>

        <div className="bg-gray-800 rounded-2xl overflow-hidden">
            <div className="relative h-48 md:h-64 lg:h-80">
                <img src={thumbnailUrl} alt={`${title} banner`} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-800 to-transparent" />
            </div>
            <div className="p-6 md:p-8 relative -mt-16">
                <div className="flex flex-col md:flex-row md:items-end md:space-x-6">
                    <div className="flex-shrink-0">
                        <img src={experience.thumbnailUrl.replace('600/400', '300/200')} alt={title} className="w-32 h-32 md:w-48 md:h-48 object-cover rounded-lg shadow-lg border-4 border-gray-700" />
                    </div>
                    <div className="mt-4 md:mt-0 flex-1">
                        <span className="text-sm font-bold text-indigo-400 uppercase tracking-wider">{genre}</span>
                        <h1 className="text-3xl lg:text-5xl font-bold text-white mt-1">{title}</h1>
                        <div className="flex items-center space-x-2 mt-2 text-gray-400">
                            <img src={creatorAvatarUrl} alt={creator} className="h-6 w-6 rounded-full" />
                            <span>By {creator}</span>
                        </div>
                    </div>
                    <div className="mt-6 md:mt-0 flex-shrink-0">
                        <button className="w-full md:w-auto bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-4 px-8 rounded-full flex items-center justify-center space-x-3 text-lg transition-transform hover:scale-105">
                            <Icon svg={ICONS.play} className="h-6 w-6" />
                            <span>Play</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            <div className="lg:col-span-2 space-y-8">
                <div className="bg-gray-800 rounded-2xl p-6">
                    <h2 className="text-xl font-bold mb-4">About this experience</h2>
                    <p className="text-gray-300 leading-relaxed">{description}</p>
                </div>

                <div className="bg-gray-800 rounded-2xl p-6">
                    <h2 className="text-xl font-bold mb-4">Reviews ({reviews.length})</h2>
                    <div className="space-y-6">
                        {isLoadingReviews ? (
                            <p className="text-gray-500">Loading reviews...</p>
                        ) : reviews.length > 0 ? reviews.map(review => (
                            <div key={review.id} className="flex space-x-4">
                                <img src={review.authorAvatarUrl} alt={review.author} className="h-10 w-10 rounded-full flex-shrink-0 mt-1" />
                                <div>
                                    <div className="flex items-center space-x-2">
                                        <span className="font-semibold text-white">{review.author}</span>
                                        <StarRating rating={review.rating} />
                                    </div>
                                    <p className="text-gray-400 mt-1">{review.comment}</p>
                                </div>
                            </div>
                        )) : <p className="text-gray-500">No reviews yet. Be the first to leave one!</p>}
                    </div>
                    <ReviewForm experienceId={id} onReviewSubmitted={handleReviewSubmitted} onNavClick={onNavClick} />
                </div>
            </div>

            <div className="lg:col-span-1">
                 <div className="bg-gray-800 rounded-2xl p-6">
                    <h2 className="text-xl font-bold mb-4">Stats</h2>
                    <div className="flex items-center space-x-4 bg-gray-700/50 p-4 rounded-lg">
                        <Icon svg={ICONS.users} className="h-8 w-8 text-indigo-400"/>
                        <div>
                            <div className="text-2xl font-bold text-white">{formattedPlayerCount}</div>
                            <div className="text-sm text-gray-400">Playing Now</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        {relatedExperiences.length > 0 && (
            <div className="mt-12">
                <ExperienceGrid title="You Might Also Like" experiences={relatedExperiences} onExperienceClick={onExperienceClick} />
            </div>
        )}
    </div>
  );
};

export default ExperienceDetail;
