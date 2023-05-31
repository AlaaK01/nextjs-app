import { useRouter } from 'next/router';
import { useState } from "react";
import style from "../../components/users/User.module.css";
import UsersForm from "../../components/users/UsersForm";
import SearchItems from "../../components/products/SearchItems";
import axios from "axios";
import Head from "next/head";

const Users = ({ users }) => {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const filterList = users.filter((user) =>
    user.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
  );

  const AddNewUser = () => {
    router.push("users/new-user");
  };

  return (
    <div className={style.users}>
      <Head>
        <title>Users</title>
        <meta name="description" content="our users" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="shortcut-icon" href="favicon.ico" />
      </Head>
      <div className={style.top}>
        <h1 className={style.mainTitle}>Users</h1>
      </div>
      <SearchItems search={search} setSearch={setSearch} />
      <div className={style.AddNew_Number}>
        <div className={style.addNewUser}>
          <button onClick={AddNewUser}>Add New User</button>
        </div>
        {users.lenght}
        <div className={style.mainTitleNumber}>{filterList.length}</div>
      </div>

      <UsersForm users={filterList} />
    </div>
  );
};

export default Users;

export const getServerSideProps = async () => {
  //Fetch Api
  // const res = await fetch("http://localhost:3000/api/products");
  // const data = await res.json();

  //const res = await axios.get("http://localhost:3000/api/products");
  const res = await axios.get(
    `${process.env.APP_DEV || process.env.API_PROD}/api/users`
  );

  return {
    props: {
      users: res.data
    },
  };
};

// // export const getStaticProps = async () => {
// //   const res = await fetch("http://localhost:3000/api/products");
// //   const data = await res.json();

// //   return {
// //     props: {
// //       products: data,
// //     },
// //   };
// // }





// const Users = ({users}) => {
//   return (
//     <div>
//       <h1>users</h1>
//       <h1>users</h1>
//       <h1>users</h1>
//       {users.map((user) => (
//         <p>{user.name}</p>
//       ))}
//     </div>
//   )
// }

// export default Users

// export const getStaticProps = async () => {
//   const res = await fetch("http://localhost:3000/api/users");
//   const data = await res.json();

//   return {
//     props: {
//       users: data,
//     },
//   };
// }
