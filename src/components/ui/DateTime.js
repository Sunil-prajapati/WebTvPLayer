import React from 'react'
import moment from "moment";
import LabelText from "../../components/typography/labelText";

export default function DateTime() {
  return (
      <div className="flex flex-col justify-center ">
        <div className="pl-4 border-l border-white ml-4">
          <LabelText
            text={moment().format("h:mm")}
            textColor="text-white"
            textAlign="text-left"
            fontSize={"lg:text-xl text-xs"}
            fontWeight="font-regular"
          />
          <LabelText
            text={moment().format("MMMM D, YYYY")}
            textColor="text-white"
            textAlign="text-left"
            fontSize={"lg:text-xl text-xs"}
            fontWeight="font-regular"
          />
        </div>
      </div>
  )
}
