import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { getSession } from '../../store/actions/auth-action';
import { getRestaurants } from '../../store/actions/restaurant-action';

const RestaurantEntities = ({
  getSession,
  getRestaurants,
  authentication,
  restaurants,
}) => {
  useEffect(() => {
    getSession();
    getRestaurants();
  }, [getSession, getRestaurants]);

  return (
    <div>
      {restaurants &&
        restaurants.map((restaurant, i) => (
          <div key={`restaurant-${i}`}>{restaurant.name}</div>
        ))}
    </div>
  );
};

const mapStateToProps = ({ restAuthReducer, restaurantReducer }) => ({
  authentication: restAuthReducer,
  restaurants: restaurantReducer.restaurants,
});

const mapDispatchToProps = {
  getSession,
  getRestaurants,
};

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantEntities);
