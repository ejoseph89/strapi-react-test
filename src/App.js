import React from "react";

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { Routes, Route } from 'react-router-dom'

import HomePage from "./pages/HomePage";
import ReviewDetails from "./pages/ReviewDetails";
import Category from "./pages/Category";
import SiteHeader from "./components/SiteHeader";

// apollo client
const client = new ApolloClient({
  uri: "http://localhost:1337/graphql",
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Routes>
          <Route element={<SiteHeader />}>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/details/:id" element={<ReviewDetails />} />
            <Route path="/category/:id" element={<Category />} />
          </Route>
        </Routes>
      </div>
    </ApolloProvider>
  );
}

export default App;
