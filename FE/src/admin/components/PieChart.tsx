
const PieChart = () => {
   
  return (
    <div className="p-10 flex justify-center items-center">
    <div className="relative inline-flex">
      <div className="w-20 h-20">
        <svg viewBox="0 0 36 36" className="w-full">
          <circle cx="18" cy="18" r="15.91549430918954" fill="none" stroke="#ddd" stroke-width="2" stroke-dasharray="100, 100"></circle>
          <circle cx="18" cy="18" r="15.91549430918954" fill="none" stroke="#6366F1" stroke-width="2" stroke-dasharray="40, 100" stroke-dashoffset="25"></circle>
        </svg>
        <div className="absolute w-full h-full flex justify-center items-center text-lg font-bold text-blue-600">40%</div>
      </div>
    </div>
  </div>
  
  )
}

export default PieChart