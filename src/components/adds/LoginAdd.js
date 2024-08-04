import React, { useEffect } from "react";
import '../../styles/component/adds.scss';

export default function LoginAdd() {
  useEffect(() => {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  },[]);
  return (
    <div>
      <ins
        className="adsbygoogle login_add"
        style={{display:"block"}}
        data-ad-client="ca-pub-7697720437318720"
        data-ad-slot="8693166286"
        data-ad-format="fluid" // fluid to control height of adds 
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
}
