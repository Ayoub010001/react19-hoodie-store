function Header({cartCount}: {cartCount: number}) {
  return (
    <header className="bg-sky-800 text-white flex justify-between items-center p-4">
        <h1 className=" text-xl">Konoha🍥Store</h1>
        <div className="bg-sky-600 py-2 px-4 rounded-lg hover:bg-sky-700 cursor-pointer transition-all duration-300 relative">
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-1">{cartCount}</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-shopping-cart-icon lucide-shopping-cart"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
        </div>
    </header>
  )
}

export default Header