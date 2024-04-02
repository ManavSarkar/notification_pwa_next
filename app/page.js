"use client";
import Image from "next/image";
import ring from "@/public/assets/images/ring-illustration.png";
import bell from "@/public/assets/images/notification-bell.png";
import { useEffect, useState } from "react";
export default function Home() {
  const [animate, setAnimate] = useState(true);
  const sendNotification = async () => {
    try{
      const permission = await Notification.requestPermission();
      if (!("Notification" in window)) {
        alert("This browser does not support notification");
        return;
      }
      if (permission === "granted") {
        navigator.serviceWorker.startMessages();
        let registration = await navigator.serviceWorker.getRegistration();
        if(registration ===  undefined){
          new Notification("This is my project, did you like it?");

        }
        else{
          registration.showNotification("This is my project, did you like it?")
        }
      }
    }
   catch(e){
    alert("Notification is not supported")
   }
  };

  return (
    <div className="absolute w-full h-full bg-black">
      <h1 className="text-3xl text-white text-center mt-32 font-medium">
        Lorem Ipsum...
      </h1>
      <h3 className="text-lg mt-4 text-center text-white opacity-80">
        Lorem ipsum dolor sit amet.
      </h3>
      <div className="relative mt-16">
        <Image
          src={bell}
          width={50}
          height={50}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          alt="Bell Illustration"
        />

        <Image
          src={ring}
          width={300}
          height={300}
          className={"mx-auto mt-12" + (animate ? " animate-ping" : "")}
          alt="Ring Illustration"
        />
      </div>
      <div className="max-w-2xl   mx-8 md:mx-auto my-8 from-[#9d0d3d00] via-[#de502c70] to-[#f9b561] bg-gradient-to-r rounded-lg p-0.5">
        <button
          onClick={sendNotification}
          className={
            "px-4 py-4 from-[#9D0D3D] via-[#DE502C] to-[#C6802C] bg-gradient-to-r w-full text-white rounded-lg" +
            (animate ? " animate-pulse" : "")
          }
        >
          <p className=" text-center font-bold leading-4 text-base text-white">
            Send Notification
          </p>
        </button>
      </div>

      {/* switch */}
      <div className="flex justify-center items-center mt-8">
        <label className="flex items-center cursor-pointer">
          <div className="relative">
            <input
              type="checkbox"
              checked={animate}
              onChange={() => setAnimate(!animate)}
              className="sr-only"
            />
            <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
            <div
              className={`${
                !animate ? "bg-red-400  left-0 " : "bg-green-600  right-0 "
              } absolute top-0 w-8 h-8 rounded-full transition-transform`}
            ></div>
          </div>
          <div className="ml-3 text-white font-medium">Animate</div>
        </label>
      </div>
    </div>
  );
}
