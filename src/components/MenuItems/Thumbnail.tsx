import React from "react";

export default function Thumbnail({alt,src}) {


    return (
        <img
            alt={alt}
            src={src}
            className="w-full h-48 object-cover rounded-lg mb-4"
        />
    );

}