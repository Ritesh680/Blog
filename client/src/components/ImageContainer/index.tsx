import React from 'react'

interface ImageContainer{
  size?: 'small' | 'large';
  imageSrc: string;
  textContainer: React.ReactNode;
}

const ImageContainer = ({size='large',imageSrc,textContainer}:ImageContainer) => {
  return (
    <div className={`${size=='small'?'w-[400px]':'w-[800px]'} overflow-hidden`}>
      <img src={imageSrc} alt="image" className={`${size=='small'?'w-[400px]':'w-[800px]'} object-cover`}/>
      <div className='mx-5 -translate-y-20 bg-white shadow-xl  text-black'>
        {textContainer}
      </div>
    </div>
  )
}

export default ImageContainer