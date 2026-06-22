function Navbar() {
  return (
    <nav className="flex w-full items-center justify-between px-8 py-4 bg-[#f8f9fa] border-b border-gray-200">
      
      {/* ส่วนโลโก้ด้านซ้าย */}
      <div className="text-3xl font-semibold text-gray-800 tracking-tight cursor-pointer">
        hh<span className="text-emerald-500">.</span>
      </div>

      {/* ส่วนปุ่มด้านขวา */}
      <div className="flex items-center gap-3">
        <button className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-full hover:bg-gray-50 transition-colors">
          Log in
        </button>
        <button className="px-6 py-2.5 text-sm font-medium text-white bg-[#2b2a2a] rounded-full hover:bg-black transition-colors">
          Sign up
        </button>
      </div>

    </nav>
  )
}

export default Navbar