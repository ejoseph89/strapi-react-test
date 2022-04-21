import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'

const CATEGORIES = gql`
  query GetCategories {
    categories {
      data {
        id
        attributes {
          name
        }
      }
    }
  }
`

const SiteHeader = () => {
  const { loading, error, data } = useQuery(CATEGORIES)


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;
  
  const categoriesList = data.categories.data

  
  return (
    <div className="site-header">
      <Link to='/' className='logo-link'>Ninja Reviews</Link>
      <nav className="categories">
        <span>Filter reviews by category:</span>
        {
          categoriesList.map(category => (
            <Link key={category.id} to={`/category/${category.id}`} >{category.attributes.name}</Link>
          ))
        }
      </nav>
      <Outlet />
    </div>
  )
}

export default SiteHeader