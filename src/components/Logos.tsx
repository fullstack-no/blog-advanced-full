import { ImFacebook } from "react-icons/im";
import { FaInstagram } from "react-icons/fa6";
import { SiTiktok } from "react-icons/si";
import { FaYoutube } from "react-icons/fa6";

export const Logos = () => {
  return (
    <div>
      <div className="flex items-center gap-2">
        <div className="p-1 bg-sky-500 rounded-full cursor-pointer">
          <ImFacebook size={12} color="white" />
        </div>

        <div className="p-1 bg-orange-500 rounded-full cursor-pointer">
          <FaInstagram size={12} color="white" />
        </div>

        <div className="p-1 bg-black rounded-full cursor-pointer">
          <SiTiktok size={12} color="white" />
        </div>

        <div className="p-1 bg-red-500 rounded-full cursor-pointer">
          <FaYoutube size={12} color="white" />
        </div>
      </div>
    </div>
  );
};
