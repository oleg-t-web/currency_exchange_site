import { Link } from 'react-router-dom';

import PAGES from '../helpers/Links';

const NotFound = () => {
  return (
    <div>
      <h2>Page not exists :((</h2>
      <p>
        <Link to={PAGES.HOME}>Go home page</Link>
      </p>
    </div>
  );
};

export default NotFound;
