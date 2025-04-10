import { useAppDispatch, useAppSelector } from "../store/hooks";
import { clearFeedBack, selectFeedBack } from "../store/cartSlice";
import { useEffect } from "react";

function Notification() {
    const feedBack = useAppSelector(selectFeedBack)
    const dispatch = useAppDispatch()
  
    useEffect(() => {
      if(feedBack) {
        const timer = setTimeout(() => {
          dispatch(clearFeedBack())
        }, 2000);
        return () => clearTimeout(timer); 
      }
    }, [feedBack])

    function isDelete(){
        return feedBack?.includes("removed") ? "bg-red-500/90" : "bg-green-500/90"
    }

  return (
    <div className={`${!feedBack && "hidden"} slide-in-right  fixed right-4 bottom-14 ${isDelete()} p-2 text-center rounded flex gap-2 items-center justify-center shadow-md shadow-sky-900/40 z-50 text-white`}>
       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-circle-alert-icon lucide-circle-alert">
       <circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/>
       <line x1="12" x2="12.01" y1="16" y2="16"/></svg>
       <p className="text-sky-50">{feedBack}</p>
    </div>
  )
}

export default Notification