import Head from "next/head";
// import products from "../../products.json";
import { fromImageToUrl,API_URL } from "../../utils/urls";
import { twoDecimals } from "../../utils/format"
// const product = products[0];

const Product = ({ product }) => {
  return (
    <div>
      <Head>
        {product.meta_title && <title>{product.meta_title}</title>}
        {product.meta_description && (
          <meta name="description" content={product.meta_description} />
        )}
      </Head>
      <h3>{product.name}</h3>
      <img src={fromImageToUrl(product.image)} />
      <h3>{product.name}</h3>
      <p>${twoDecimals(product.price)}</p>
      <p>{product.constent}</p>
    </div>
  );
};

export async function getStaticProps({ params :{ slug }}) {
    const product_res= await fetch(`${API_URL}/products/?slug=${slug}`)
    const found = await product_res.json();

    return{
        props:{
            product:found[0] //Brecause API Response for a Filter is a Array
        }
    }
}

export async function getStaticPaths() {
    //Retrive All The Products
    const products_res = await fetch(`${API_URL}/products/`)
    const products = await products_res.json()

    //Return to Next.js Context
    return {
        paths: products.map(product =>({ 
            params: { slug: String(product.slug)}
        })),
        fallback:false //Tells Nextjs to Show 404 if params is Empty
    }
}


export default Product;
