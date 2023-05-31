import { useRouter } from "next/router";
import { useState } from "react";
import style from "../../components/products/Product.module.css";
import ProductsForm from "../../components/products/ProductsForm";
import SearchItems from "../../components/products/SearchItems";
import axios from "axios";
import Head from "next/head";

const Products = ({ products }) => {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const filterList = products.filter((item) =>
    item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
  );

  const AddNewProduct = () => {
    router.push("products/new-product");
  };

  return (
    <div className={style.products}>
      <Head>
        <title>Products</title>
        <meta name="description" content="out products" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="shortcut-icon" href="favicon.ico" />
      </Head>
      <div className={style.top}>
        <h1 className={style.mainTitle}>Our Products</h1>
      </div>
      <SearchItems search={search} setSearch={setSearch} />
      <div className={style.AddNew_Number}>
        <div className={style.addNewProduct}>
          <button onClick={AddNewProduct}>Add New Product</button>
        </div>
        <div className={style.mainTitleNumber}>{filterList.length}</div>
      </div>

      <ProductsForm products={filterList} />
    </div>
  );
};

export default Products;

export const getServerSideProps = async () => {
  //Fetch Api
  // const res = await fetch("http://localhost:3000/api/products");
  // const data = await res.json();

  //const res = await axios.get("http://localhost:3000/api/products");
  const res = await axios.get(
    `${process.env.APP_DEV || process.env.API_PROD}/api/products`
  );

  return {
    props: {
      products: res.data.map((product) => ({
        id: product._id.toString(),
        name: product.Name,
        description: product.Description,
        image: product.ImageURL,
        price: product.Price,
        quantity: product.Qty,
        category: product.Category,
      })),
    },
  };
};

// export const getStaticProps = async () => {
//   const res = await fetch("http://localhost:3000/api/products");
//   const data = await res.json();

//   return {
//     props: {
//       products: data,
//     },
//   };
// }
