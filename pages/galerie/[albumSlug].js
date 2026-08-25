import Head from "next/head";
import Image from "next/image";
import { frontImage, renderStyle , wrapContent, postdataContent, wrapContentCentered} from './galerie.module.scss'
import Main from '@/components/main'
import { getPostSlugs, getSinglePost } from "@/libs/posts";
import Date from "@/components/date";
import Link from "next/image"


export async function getStaticProps({params}){ 
  const postData = await getSinglePost(params.albumSlug);
  
  
  let featuredImageUrl = "http://localhost:8888/iammarvin-back/wp-content/uploads/2024/01/default-thumb.png";
  

  if (postData.featuredImage && 
    postData.featuredImage.node &&
    postData.featuredImage.node.mediaDetails &&
    postData.featuredImage.node.mediaDetails.sizes &&
    postData.featuredImage.node.mediaDetails.sizes[5] &&
    postData.featuredImage.node.mediaDetails.sizes[5].sourceUrl) {
  featuredImageUrl = postData.featuredImage.node.mediaDetails.sizes[5].sourceUrl;
} else if(postData.featuredImage && 
  postData.featuredImage.node &&
  postData.featuredImage.node.mediaDetails &&
  postData.featuredImage.node.mediaDetails.sizes &&
  postData.featuredImage.node.mediaDetails.sizes[4] &&
  postData.featuredImage.node.mediaDetails.sizes[4].sourceUrl) {
    featuredImageUrl = postData.featuredImage.node.mediaDetails.sizes[4].sourceUrl;
} else {
  featuredImageUrl = postData.featuredImage.node.mediaDetails.sizes[1].sourceUrl;
}

  return {
    
    props: {
      postData,
      featuredImageUrl
    }
    
  };
}

export async function getStaticPaths(){ 
  const albumSlugs = await getPostSlugs('galerie');

  return {
    paths: albumSlugs.map((s) => (
      {
        params: {
          albumSlug: s.slug
      }
       }
    )), 
    fallback: false
  
  }
}

export default function Galerie( {postData ,featuredImageUrl } ){ 
  return(
    <>
    
    <Head>
    <title key={postData.slug}> {postData.title} </title>
    </Head>

    <Main>
            <div className={wrapContent}>
                  <div className={wrapContentCentered}>
                  
                          <div className={postdataContent}>
                        
                                {/* <Link href="/galerie"> <li id="galerie"> Galerie</li> </Link> */}
                               
                                {/* <h4> Dernière modification par Marvin le <Date dateString={postData.modified} /> </h4> */}
                                <h1 data-aos="fade-down" data-aos-duration="1500"> { postData.title } </h1>
                                
                                {postData.tags.nodes.map(tag => (
                                <h2 data-aos="zoom-out-down"> {tag.name} </h2>
                                ))}
                                      <div data-aos="fade-up" data-aos-duration="1500" className={frontImage}>
                                      { featuredImageUrl &&  

                                      <Image  src={featuredImageUrl} 
                                              alt={featuredImageUrl} 
                                              width={600} 
                                              height={400}  
                                      /> } 
                                  
                                </div>
                          </div>

                           <div className={renderStyle} dangerouslySetInnerHTML={ {__html: postData.content} }></div>
               
            </div>
          </div>
    </Main>

    </>
  );
  }