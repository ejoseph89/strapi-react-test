import React from 'react'

import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'

// import useFetch from '../hooks/useFetch';

const REVIEWS = gql`
  query GetReviews {
    reviews {
      data {
        id,
        attributes {
          title,
          rating,
          body,
          categories {
            data {
              id,
              attributes {
                name
              }
            }
          }
        }
      }
    }
  }
`


const HomePage = () => {

  // Rest - fetch
  // const { loading, error, data } = useFetch(
  //   "http://localhost:1337/api/reviews"
  // );

  const { loading, error, data } = useQuery(REVIEWS)


  if(loading) return <p>Loading...</p>
  if(error) return <p>Error!</p>

  const { reviews } = data
  
  return (
    <div>
      {reviews.data.map(review => {
        const { id, attributes } = review
        const { rating, title, body } = attributes

        return (
          <div key={id} className="review-card">
            <div className="rating">{rating}</div>
            <h2>{title}</h2>
            {
              attributes.categories.data.map(c => (
                <small key={c.id}>{c.attributes.name}</small>
              ))
            }
            <p>{body.substring(0, 200)}...</p>
            <Link to={`/details/${review.id}`}>Read more</Link>
          </div>
        );
      })}
    </div>
  )
}

export default HomePage