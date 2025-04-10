import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../store/hooks";
    import {
      selectCartItems,
      selectCartTotal,
      removeFromCart,
    } from "../store/cartSlice";

function CartPage() {
  const cart = useAppSelector(selectCartItems);
  const total = useAppSelector(selectCartTotal);
  const dispatch = useAppDispatch();

  const handleRemoveFromCart = (id: string) => {
    console.log(id)
    dispatch(removeFromCart(id));
  };

  return (
    <main className={`container max-w-[1080px] mx-auto px-4 py-8 fade-in`}>
      <div className="flex justify-between items-center bg-sky-900/40 p-4 rounded-lg shadow-md">
        <h1 className=" text-amber-50 text-2xl font-bold">My Cart :</h1>
        <Link to="/" className="text-amber-50 hover:text-sky-500 transition-colors duration-300">
          <button className="bg-sky-900 hover:bg-sky-700 text-amber-50 font-bold py-2 px-4 rounded mt-4"> 
          Continue Shopping
          </button>
        </Link>
      </div>
      <table className="table-auto md:table-fixed text-center text-amber-50 w-full mt-4 ">
        <thead className="bg-sky-900">
          <tr >
            <th className="border-2 border-sky-100/40 min-w-24">Image</th>
            <th className="border-2 border-sky-100/40 p-4 ">Name</th>
            <th className="border-2 border-sky-100/40 p-4 ">Description</th>
            <th className="border-2 border-sky-100/40 p-4 ">Price</th>
            <th className="border-2 border-sky-100/40 p-4 ">Delete</th>
          </tr>
        </thead>
        <tbody className="bg-sky-900/20">
          {cart.map((item) => {
            return (<tr>
              <td className=" border-l-2 border-b-2 border-sky-100/40 p-4 ">
                <img src={item.imageUrl} alt={item.name} className="w-16 h-16 m-auto" />
              </td>
              <td className="border-2 border-sky-100/40 p-4 ">{item.name}</td>
              <td className="border-2 border-sky-100/40 p-4 ">{item.description}</td>
              <td className="border-2 border-sky-100/40 p-4 ">${item.price}</td>
              <td className="border-2 border-sky-100/40 p-4 ">
                <button 
                  onClick={() => handleRemoveFromCart(item.id)}
                  className="transition duration-300 ease-in-out bg-red-500/20 text-red-500 px-2 py-1 rounded cursor-pointer hover:bg-red-500/80 hover:text-white">Delete</button>
              </td>
            </tr>)
          })}
        </tbody>
        <tfoot>
          <tr className="bg-sky-900/70">
            <th colSpan={3} className="border-b-2 border-l-2 border-r-2 border-sky-100/40 p-4 text-right">Total:</th>
            <td colSpan={2} className=" bg-green-700/70 border-b-2 border-l-2 border-r-2 border-sky-100/40 p-4 ">
              ${total} 
            </td>
          </tr>
        </tfoot>
      </table>
    </main>
  )
}

export default CartPage