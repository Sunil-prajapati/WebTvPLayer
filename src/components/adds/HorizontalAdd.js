import React, { useEffect } from "react";
import '../../styles/component/adds.scss';

export default function HorizontalAdd() {
  useEffect(() => {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);
  return (
    <div>
      <ins
        className="adsbygoogle horizontal_add"
        style={{display:"block"}}
        data-ad-client="ca-pub-7697720437318720"
        data-ad-slot="1423420045"
        data-ad-format="fluid"
        data-full-width-responsive="true"></ins>
    </div>
  );
}