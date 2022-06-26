import { useEffect } from 'react';

const Home = () => {
  useEffect(() => {
    console.log('Home component created');
  });
  return (
    <div>
      <p>This is home page</p>
    </div>
  );
};

export default Home;
