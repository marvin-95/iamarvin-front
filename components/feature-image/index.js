import React from 'react'
import Image from 'next/image'
import Link from 'next/link';
import { innerImg , imgWrapper } from './feature-image.module.scss'

export default function FeatureImage({post}) {
  let img = '';
  
  const defaultFeaturedImageUrl = "http://localhost:8888/iammarvin-back/wp-content/uploads/2024/01/default-thumb.png";
  const defaultWidth = "600"
  const defaultHeight = "300"

  if(post.featuredImage){
    let size = post.featuredImage.node.mediaDetails.sizes[1];
    img = {
      src: size.sourceUrl,
      width: size.width,
      height: size.height
        
      }
    }
    else {
    img = {
      src: defaultFeaturedImageUrl,
      width: defaultWidth,
      height: defaultHeight
        
      }
  }
  return(
   <div className={imgWrapper}>
    <Image  className={innerImg}
            src={img.src} 
            style={{objectFit:"cover"}}
            height={img.height} 
            width={img.width} 
            alt={post.title} 
    /> 
    </div>
  )
}