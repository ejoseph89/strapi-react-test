import React from "react";

import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";

// import useFetch from '../hooks/useFetch'
import { useQuery, gql } from "@apollo/client";

const REVIEW = gql`
  query GetReview($id: ID!) {
    review(id: $id) {
      data {
        id
        attributes {
          title
          rating
          body
          categories {
            data {
              id
              attributes {
                name
              }
            }
          }
        }
      }
    }
  }
`;

const ReviewDetails = () => {
  const { id } = useParams();
  // const { loading, error, data } = useFetch(
  //   `http://localhost:1337/api/reviews/${id}`
  // );

  const { loading, error, data } = useQuery(REVIEW, {
    variables: {
      id: id,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  const { review } = data;

  const { attributes } = review.data;
  const { rating, title, body } = attributes;

  return (
    <div className="review-card">
      <div className="rating">{rating}</div>
      <h2>{title}</h2>

      {attributes.categories.data.map((c) => (
        <small key={c.id}>{c.attributes.name}</small>
      ))}

      <ReactMarkdown>{body}</ReactMarkdown>
    </div>
  );
};

export default ReviewDetails;
