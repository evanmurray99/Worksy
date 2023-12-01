import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import axios from 'axios';
import ReviewPopUp from '../Components/ReviewPopUp';

vi.mock('axios');

describe('ReviewPopUp component test', () => {
  it('renders ReviewPopUp component', () => {
    const reviews = [
      { reviewer: 'user1', rating: 4, text: 'Great service' },
      { reviewer: 'user2', rating: 5, text: 'Excellent experience' },
    ];

    render(
      <ReviewPopUp
        reviews={reviews}
        setReviews={() => {}}
        post_id="123"
        user={{ _id: 'currentUser' }}
        isOpen={true}
        closePopUp={() => {}}
        showForm={true}
      />,
      { wrapper: MemoryRouter }
    );
  });

  it('displays average rating', () => {
    const reviews = [
      { reviewer: 'user1', rating: 4, text: 'Great service' },
      { reviewer: 'user2', rating: 5, text: 'Excellent experience' },
    ];

    render(
      <ReviewPopUp
        reviews={reviews}
        setReviews={() => {}}
        post_id="123"
        user={{ _id: 'currentUser' }}
        isOpen={true}
        closePopUp={() => {}}
        showForm={true}
      />,
      { wrapper: MemoryRouter }
    );

    const averageRating = screen.getByText(/4.5/i);
    expect(averageRating).toBeInTheDocument();
  });

  it('displays reviews with user names and ratings', () => {
    const reviews = [
      { reviewer: 'user1', rating: 4, text: 'Great service' },
      { reviewer: 'user2', rating: 5, text: 'Excellent experience' },
    ];

    render(
      <ReviewPopUp
        reviews={reviews}
        setReviews={() => {}}
        post_id="123"
        user={{ _id: 'currentUser' }}
        isOpen={true}
        closePopUp={() => {}}
        showForm={true}
      />,
      { wrapper: MemoryRouter }
    );

    const user2RatingStars = screen.getAllByText('★');
    
    expect(user2RatingStars).toHaveLength(5); 
  });

  it('displays a review form', () => {
    const reviews = [
      { reviewer: 'user1', rating: 4, text: 'Great service' },
    ];

    render(
      <ReviewPopUp
        reviews={reviews}
        setReviews={() => {}}
        post_id="123"
        user={{ _id: 'currentUser' }}
        isOpen={true}
        closePopUp={() => {}}
        showForm={true}
      />,
      { wrapper: MemoryRouter }
    );

    const ratingStars = screen.getAllByText('★');
    const submitButton = screen.getByRole('button', { name: /Submit/i });
    expect(ratingStars).toHaveLength(5); 
    expect(submitButton).toBeInTheDocument();
  });
});
