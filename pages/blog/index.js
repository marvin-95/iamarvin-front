import Image from 'next/image';
import styles from '@/styles/Home.module.css';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Main from '@/components/main';
import WrappedProject from "@/components/wrapped-project";
import FeatureImage from '@/components/feature-image';
import { getAllPosts, getAllPostsEN } from '@/libs/posts'; // Importez les deux fonctions
import { Date } from '@/components/date';
import MainArticlePreview from '@/components/main-article-preview';
import Head from 'next/head';
import HeroSection from '@/components/hero-section';
import { useRouter } from 'next/router';
import { useScopedI18n } from '@/locales';

export async function getStaticProps({ locale }) { // Récupérez le locale dans getStaticProps
  const allPosts = locale === 'en' ? await getAllPostsEN() : await getAllPosts();

  return {
    props: {
      allPosts: allPosts,
    },
  };
}

export default function Blog({ allPosts }) {
  const router = useRouter();
  const lang = router.locale || 'fr'; // Récupère la langue actuelle
  const blogT = useScopedI18n("blog"); // Utilisation du hook de traduction pour la page blog

  const backgroundImage = "https://iammarvin.com/megaincrediblebackoffice/wp-content/uploads/2024/04/alvaro-reyes-qWwpHwip31M-unsplash-min-scaled.jpg";

  return (
    <>
      <Head>
        <title>{blogT('title')} | Marvin Mensah</title>
      </Head>

      <HeroSection PageName={blogT('page_name')} BgImage={backgroundImage} />
      <Main>
        <p data-aos="zoom-out-down">{blogT('welcome_message')}</p>

        <div>
          <div data-aos="zoom-out-down" className='Section-title'>
            <h2>{blogT('latest_articles')}</h2>
          </div>
          <div className="PostGrid">
            {console.log(allPosts)}
            {allPosts?.nodes?.length > 0 ? (
              allPosts.nodes.map((post, index) => (
                <div key={post.id}>
                  <WrappedProject
                    title={post.title}
                    slug={post.slug}
                    date={post.date}
                    post={post}
                    tags={post.tags}
                  />
                </div>
              ))
            ) : (
              <p>Aucun article trouvé.</p>
            )}
          </div>
        </div>
      </Main>
    </>
  );
}