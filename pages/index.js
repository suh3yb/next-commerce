import axios from 'axios';

const Home = ({ products }) => {
  return (
    <>
      {products.map(product => (
        <div key={product.sku}>
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <h3>{product.price}</h3>
          <br />
        </div>
      ))}
    </>
  );
};

Home.getInitialProps = async () => {
  const url = 'http://localhost:3000/api/products';
  const response = await axios.get(url);
  return { products: response.data };
};

export default Home;
