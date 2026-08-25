// pages/projet/[postSlug].js
import Head from "next/head";
import Image from "next/image";
import {
  frontImage,
  renderStyle,
  wrapContent,
  rSection,
  postdataContent,
  tagSection,
  dateSection,
  projectTag,
  slugMeta,
  accroche,
  wrapContentCentered,
} from './slug.module.scss';
import Main from '@/components/main';
import { getPostSlugs, getSinglePost , getAllPosts } from "@/libs/posts";
import { DateYear } from "@/components/date";
import HeroSection from "@/components/hero-section";
import Projetfrontimage from "@/components/projet-frontimage";
import NewProjetfrontimage from "@/components/newprojet-frontimage";
import BackButton from "@/components/back-button";

export async function getStaticPaths({ locales }) {
  const postSlugsPortfolio = await getPostSlugs("portfolio");
  const postSlugsPortfolioEn = await getPostSlugs("portfolio-en");

  const postSlugs = [...postSlugsPortfolio, ...postSlugsPortfolioEn];

  
  
  // console.log("🚀 Slugs utilisés pour la génération :", postSlugs.map(s => s.slug));
  
  return {
    paths: locales.flatMap((locale) =>
      postSlugs.map((s) => ({
        params: { postSlug: s.slug },
        locale,
      }))
    ),
    fallback: false, // Assurez-vous que fallback est bien sur false pour les tests
  };
}


export async function getStaticProps({ params, locale }) {

  // {console.log( 'se',locale)}
  const postData = await getSinglePost(params.postSlug);

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
    postData.featuredImage.node.mediaDetails.sizes[1] && postData.featuredImage.node.mediaDetails.sizes[1].sourceUrl){
       featuredImageUrl = postData.featuredImage.node.mediaDetails.sizes[1].sourceUrl;
  }

  return {
    props: {
      postData,
      featuredImageUrl,
      locale, // Ajout du locale pour les props
    },
  };
}

export default function Post({ postData, featuredImageUrl, locale }) {
  return (
    <>
    {/* {  console.log(postData)} */}
    <Head>
    <title key={postData.slug}> {postData.title} </title>
    </Head>
    
    
    { featuredImageUrl &&  <NewProjetfrontimage  postData={postData} title={postData.title}  BgImage={featuredImageUrl}/> }  
                              


    {/* { featuredImageUrl &&  <Projetfrontimage  BgImage={featuredImageUrl}/> }  */}
    <Main>
    <div className={wrapContent}>
 
    <div className={wrapContentCentered}>
      <div>
      <div className={postdataContent}>


            <div className={slugMeta}>
                  <div className={accroche}>
                  {/* <h4> Dernière modification par Marvin le <Date dateString={postData.modified} /> </h4> */}                
                  <h2> {postData.excerpt.replace(/<\/?[^>]+(>|$)/g, "")}</h2>
                  
                  </div>
               
            </div>

      </div>

        <div className={renderStyle} dangerouslySetInnerHTML={ {__html: postData.content} }></div>
    </div>
    </div>
    </div>
    </Main>

    </>
  );
  }