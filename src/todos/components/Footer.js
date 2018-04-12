import React from 'react';
import FilterLink from '../containers/FilterLink';
import { filters } from '../todos';

const Footer = () => (
  <p>
    Show:
    {' '}
    <FilterLink filter={filters.SHOW_ALL}>
      ALL
    </FilterLink>
    {', '}
    <FilterLink filter={filters.SHOW_ACTIVE}>
      Active
    </FilterLink>
    {', '}
    <FilterLink filter={filters.SHOW_COMPLETED}>
      Completed
    </FilterLink>
  </p>
);

export default Footer;
