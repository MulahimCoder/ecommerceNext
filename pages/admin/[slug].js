import Product from '@/models/Product'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import mongoose from "mongoose";
import Head from 'next/head';
import toast from 'react-hot-toast';
import Link from 'next/link';
import AdminMenu from './AdminMenu';
import User from '@/models/User';

export default function Post({ userRole,initialproduct }) {
  const router = useRouter()
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [img, setImg] = useState('');
  const [category, setCategory] = useState('');
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [tPrice, setTprice] = useState('');
  const [price, setPrice] = useState('');
  const [availableQty, setAvailableQty] = useState('');
  const [admin, setAdmin] = useState(false);
  const [produc, setProduc] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem('myuser');
    if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser.token && userRole == parsedUser.email) {
            setAdmin(true);
            setTitle(initialproduct.title)
            setSlug(initialproduct.slug)
            setDescription(initialproduct.description)
            setImg(initialproduct.img)
            setCategory(initialproduct.category)
            setSize(initialproduct.size)
            setColor(initialproduct.color)
            setTprice(initialproduct.tPrice)
            setPrice(initialproduct.price)
            setAvailableQty(initialproduct.availableQty)
        } else {
            router.push('/404'); // Redirect to the home page if not logged in
        }
    } else {
        router.push('/404'); // Redirect to the home page if user data is not found
    }
  }, [router.query])
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'title') {
      setTitle(value);
    }
    else if (name === 'slug') {
      setSlug(value.toLowerCase().replace(/ /g, '-'))
    }
    else if (name === 'description') {
      setDescription(value);
    } else if (name === 'img') {
      setImg(value);
    } else if (name === 'category') {
      setCategory(value);
    } else if (name === 'size') {
      setSize(value); // Use the selected value from the <select>
    } else if (name === 'color') {
      setColor(value.toLowerCase());
    } else if (name === 'tPrice') {
      setTprice(value);
    } else if (name === 'price') {
      setPrice(value);
    } else if (name === 'availableQty') {
      setAvailableQty(value);
    }
  };


  const addProductToList = () => {
    const newProduct = {
        _id: initialproduct._id, // Include the product ID for updating
        title,
        slug,
        description,
        img,
        category,
        size,
        color,
        tPrice,
        price,
        availableQty,
    };

    setProduc([...produc, newProduct]);

    // Clear the input fields after adding
    setSlug('');
    setTitle('');
    setDescription('');
    setImg('');
    setCategory('');
    setSize('');
    setColor('');
    setTprice('');
    setPrice('');
    setAvailableQty('');
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('../api/updateProducts', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(produc), // Submit the list of products
      });

      if (res.ok) {
        toast.success('Products updated successfully', { duration: 3000 });
        setProduc([]); // Clear the list of products after successful submission
        router.push('/admin/viewProduct')
      } else {
        const data = await res.json();
        toast.error(data.message, { duration: 3000 });
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error in updating products', { duration: 3000 });
    }
  };








  return <>
    <Head>
      <title>Update Product</title>
      <meta name='description' content='visit this page if you want to create your account' />
      <link rel="icon" href="/favicon.io" />
    </Head>
    <div className="col-md-3">
      <AdminMenu />
    </div>
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Update your Product
        </h2>
        <p className="mt-1 text-center text-sm text-gray-500">
          OR
          <Link href="/admin" className="font-semibold leading-6 text-pink-600 hover:text-pink-500">
            Admin Dashboard
          </Link>
        </p>
      </div>
      <div>
        <div className='fixed lg:bottom-2 lg:right-3 bottom-12 md:bottom-12 right-2'>
          <Link href={'/'}><button className='flex mr-2 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded lg:text-lg'>
            HomePage
          </button></Link>
        </div>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" method="POST">
          <div>
            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
              Title
            </label>
            <div className="mt-2">
              <input
                onChange={handleChange}
                value={title}
                id="title"
                name="title"
                type="text"
                autoComplete="title"
                requipink
                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label htmlFor="slug" className="block text-sm font-medium leading-6 text-gray-900">
              Slug
            </label>
            <div className="mt-2">
              <input
                onChange={handleChange}
                value={slug}
                id="slug"
                name="slug"
                type="text"
                autoComplete="slug"
                requipink
                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
              Description
            </label>
            <div className="mt-2">
              <textarea
                placeholder='Set the description'
                onChange={handleChange}
                value={description}
                id="description"
                name="description"
                type="text"
                autoComplete="description"
                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="img" className="block text-sm font-medium leading-6 text-gray-900">
                Set Img
              </label>

            </div>
            <div className="mt-2">
              <input
                onChange={handleChange}
                value={img}
                placeholder='Set image using url'
                id="img"
                name="img"
                type="text"
                autoComplete="current-img"
                requipink
                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="img" className="block text-sm font-medium leading-6 text-gray-900">
                Set Category
              </label>

            </div>
            <div className="mt-2">
              <div className="mt-2">
                <select
                  onChange={handleChange}
                  value={category}
                  id="category"
                  name="category"
                  autoComplete="category"
                  required
                  className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
                >
                  <option value="">Select a category</option>
                  <option value="T-Shirts">T-Shirts</option>
                  <option value="Stickers">Stickers</option>
                  <option value="Hoodies">Hoodies</option>
                  <option value="Mugs">Mugs</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="img" className="block text-sm font-medium leading-6 text-gray-900">
                Set Color
              </label>

            </div>
            <div className="mt-2">
              <input
                onChange={handleChange}
                value={color}
                placeholder='Enter a color of product'
                id="color"
                name="color"
                type="text"
                autoComplete="color"
                requipink
                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="size" className="block text-sm font-medium leading-6 text-gray-900">
                  Set Size
                </label>

              </div>
              <div className="mt-2">
                <div className="mt-2">
                  <select
                    onChange={handleChange}
                    value={size}
                    id="size"
                    name="size"
                    required
                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
                  >
                    <option value="">Select a Size</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                    <option value="XXL">XXL</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <label htmlFor="img" className="block text-sm font-medium leading-6 text-gray-900">
                Set Total Price
              </label>

            </div>
            <div className="mt-2">
              <input
                onChange={handleChange}
                value={tPrice}
                id="tPrice"
                name="tPrice"
                type="number"
                autoComplete="tPrice"
                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="img" className="block text-sm font-medium leading-6 text-gray-900">
                Set Selling Price
              </label>

            </div>
            <div className="mt-2">
              <input
                onChange={handleChange}
                value={price}
                id="price"
                name="price"
                type="number"
                autoComplete="price"
                requipink
                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="img" className="block text-sm font-medium leading-6 text-gray-900">
                Set Available Qty
              </label>

            </div>
            <div className="mt-2">
              <input
                onChange={handleChange}
                value={availableQty}
                id="availableQty"
                name="availableQty"
                type="number"
                autoComplete="availableQty"
                requipink
                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              onClick={addProductToList}
              type="button"
              className="flex w-full justify-center rounded-md bg-pink-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
            >
              Add Product To List
            </button>
          </div>
          <div>
            <button
              onClick={handleSubmit}
              type="submit"
              className="flex w-full justify-center rounded-md bg-pink-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
            >
              Update
            </button>
          </div>
        </form>


      </div>
    </div>
  </>
}


export const getServerSideProps = async (context) => {
  if (!mongoose.connections[0].readyState) {
      await mongoose.connect(process.env.MONGO_URI);
  }

  try {
      // Find the user with role equal to 1
      const user = await User.findOne({ role: process.env.auth });

      if (!user) {
          return {
              redirect: {
                  destination: '/',
                  permanent: false,
              }
          }
      } else {
        
            let initialproduct = await Product.findOne({ slug: context.query.slug });
            if (initialproduct == null) {
              return { props: { error: 404 }, }
            }
            let varients = await Product.find({ title: initialproduct.title, category: initialproduct.category })
            let colorSizeSlug = {} //{pink:{xl:{slug:'wear-the-code-xl'}}}
            for (let item of varients) {
              if (Object.keys(colorSizeSlug).includes(item.color)) {
                colorSizeSlug[item.color][item.size] = { slug: item.slug }
              }
              else {
                colorSizeSlug[item.color] = {}
                colorSizeSlug[item.color][item.size] = { slug: item.slug }
              }
            }

          // Move this return statement here, outside of the for loop
          return {
              props: {
                  userRole: user.email,
                  initialproduct: JSON.parse(JSON.stringify(initialproduct)), varients: JSON.parse(JSON.stringify(colorSizeSlug))
              },
          };
      }
  } catch (error) {
      // Handle any errors that might occur during the database query
      console.error('Error:', error);
      return {
          props: { userRole },
      };
  }
}