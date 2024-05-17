import React from "react";
import { FaFax, FaPhoneAlt, FaRegEnvelope } from "react-icons/fa";
type Props = {};

const Info = (props: Props) => {
  return (
    <div className="lg:col-span-5 bg-[#F2F2F2]">
      <div className="p-6">
        {" "}
        <h3 className="font-bold text-2xl pb-5">Contact Us</h3>
        <p className="text-[#707070]">
          Claritas est etiam processus dynamicus, qui sequitur mutationem
          consuetudium lectorum. Mirum est notare quam littera gothica, quam
          nunc putamus parum claram anteposuerit litterarum formas human. qui
          sequitur mutationem consuetudium lectorum. Mirum est notare quam
        </p>
        <div className=" divide-y divide-gray-100">
          <div>
            <div className="flex items-center">
              {" "}
              <FaFax />
              <h4 className="font-semibold py-3 ps-1">Address</h4>
            </div>

            <p className="text-[#707070]">
              123 Main Street, Anytown, CA 12345 – USA
            </p>
          </div>
          <div>
            <div className="flex items-center">
              {" "}
              <FaPhoneAlt />
              <h4 className="font-semibold py-3 ps-1">Phone</h4>
            </div>

            <p className="text-[#707070]">
              Mobile: (08) 123 456 789
              <br />
              Hotline: 1009 678 456
            </p>
          </div>
          <div>
            <div className="flex items-center">
              {" "}
              <FaRegEnvelope />
              <h4 className="font-semibold py-3 ps-1">Email</h4>
            </div>

            <p className="text-[#707070]">
              yourmail@domain.com
              <br />
              support@hastech.company
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
