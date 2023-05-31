import style from "../../../components/products/Product.module.css";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/cart.slice";
import Head from "next/head";
import Image from "next/image";
import axios from "axios";

const Product = ({ product }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { productId } = router.query;

  const handleBackProducts = () => {
    router.push("/products");
  };

  const handleGoToUpdate = () => {
    router.push(`/products/update-product/${productId}`);
  };

  const handleGoToDelete = () => {
    router.push(`/products/delete-product/${productId}`);
  };

  return (
    <div className={style.details}>
      <Head>
        <title>Product</title>
        <meta name="description" content="one product" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="shortcut-icon" href="favicon.ico" />
      </Head>
      <div className={style.imageContainer}>
        <Image
          src={product.ImageURL}
          alt={product.Name}
          width={600}
          height={400}
        />
        {/* <img src={product.ImageURL} alt={product.Name} /> */}
      </div>
      <div className={style.allDetails}>
        <div className={style.namePriceDetails}>
          <h1>{product.Name}</h1>
          <span>${product.Price}</span>
          <div className={style.description}>
            <p>{product.Description}</p>
          </div>
        </div>
        <div className={style.updateAndDelete}>
          <div className={style.actions}>
            <button onClick={handleGoToUpdate}>Edit Product</button>
          </div>
          <div className={style.actionsDelete}>
            <button onClick={handleGoToDelete}>Delete Product</button>
          </div>
        </div>
        <div>
          <button
            key={product._id}
            onClick={() => dispatch(addToCart(product))}
            className={style.addToCart}
          >
            Add To Cart
          </button>
        </div>
        <div>
          <button onClick={handleBackProducts} className={style.goBack}>
            Back To Products
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;

export const getStaticPaths = async () => {
  //const res = await fetch("http://localhost:3000/api/products/");
  //const data = await res.json();

  const res = await axios.get(
    `${process.env.APP_DEV || process.env.API_PROD}/api/products`
  );

  const paths = res.data.map((path) => {
    return {
      params: { productId: `${path._id.toString()}` },
    };
  });

  return {
    paths: paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  // const res = await fetch(
  //   `http://localhost:3000/api/products/${context.params.productId}`
  // );
  // const data = await res.json();

  const res = await axios.get(
    `${process.env.APP_DEV || process.env.API_PROD}/api/products/${
      context.params.productId
    }`
  );

  return {
    props: {
      product: res.data,
    },
  };
};

// export const getServerSideProps = async (context) => {
//   const res = await fetch(
//     `http://localhost:3000/api/products/${context.params.productId}`
//   );
//   const data = await res.json();

//   return {
//     props: {
//       product: data,
//     },
//   };
// };
