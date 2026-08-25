import Head from "next/head";
import Image from "next/image";
import Link from "next/link"; // Importez le composant Link
import {
  frontImage,
  renderStyle,
  tagName,
  postMeta,
  wrapContent,
  postdataContent,
  wrapContentCentered,
} from './slug.module.scss';
import Main from '@/components/main';
import { getPostSlugs, getSinglePost } from "@/libs/posts";
import { Date } from "@/components/date";


export async function getStaticPaths({ locales, defaultLocale }) {  // Ajout de locales et defaultLocale

  const postSlugsArticle = await getPostSlugs("article");
  const postSlugsArticleEn = await getPostSlugs("article-en");

  
  const postSlugs = [...postSlugsArticle, ...postSlugsArticleEn];
  

  return {
    paths: locales.flatMap((locale) => // Utilisation de flatMap pour générer les paths pour chaque langue
      postSlugs.map((s) => ({
        params: { postSlug: s.slug },
        locale, // Ajout du locale pour chaque path
      }))
    ),
    fallback: false,
  };
}

export async function getStaticProps({ params, locale }) { // Ajout du paramètre locale
  const postData = await getSinglePost(params.postSlug);

  let featuredImageUrl = "http://localhost:8888/iammarvin-back/wp-content/uploads/2024/01/default-thumb.png";

  if (postData.featuredImage && postData.featuredImage.node && postData.featuredImage.node.mediaDetails && postData.featuredImage.node.mediaDetails.sizes && postData.featuredImage.node.mediaDetails.sizes[1] && postData.featuredImage.node.mediaDetails.sizes[1].sourceUrl) {
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

export default function Post({ postData, featuredImageUrl, locale }) { // Ajout de locale dans les props
  return (
    <>
      <Head>
        <title key={postData.slug}> {postData.title} </title>
      </Head>

      <Main>
        <div className={wrapContent}>
          <div className={wrapContentCentered}>
            <div>
              <div className={postdataContent}>
                <div>
                  {/* Correction du lien de retour */}
                  <Link href="/[locale]" as={`/${locale}`}> 
                    <p> Retour </p> 
                  </Link>

                  <div className={postMeta}>
                    {postData.tags.nodes.map(tag => (
                      <h4 key={tag.id} className={tagName}> {tag.name} </h4>
                    ))}
                    <h1> {postData.title} </h1>

                    <p> Dernière modification par Marvin le <Date dateString={postData.modified} /> </p>
                  </div>
                  <div className={frontImage}>
                    {featuredImageUrl && <Image src={featuredImageUrl} alt={postData.title} fill style={{objectFit:"cover"}} />}
                  </div>
                </div>
              </div>

              <div className={renderStyle} dangerouslySetInnerHTML={{ __html: postData.content }}></div>
            </div>
          </div>
        </div>
      </Main>

    </>
  );
}