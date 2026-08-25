import Image from 'next/image';
import styles from '@/styles/Home.module.css';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Main from '@/components/main';
import FeatureImage from '@/components/feature-image';
import { getAllGaleriePosts } from '@/libs/posts';
import { PostGrid, AlbumPreview, albumPresentation } from './galerie.module.scss';
import Head from 'next/head';
import BackButton from '@/components/back-button';
import HeroSection from '@/components/hero-section';
import { useRouter } from 'next/router';
import { useScopedI18n } from '@/locales';

export async function getStaticProps() {
  const allGaleriePosts = await getAllGaleriePosts();

  return {
    props: {
      allGaleriePosts: allGaleriePosts,
    },
  };
}

export default function Galerie({ allGaleriePosts }) {
  const router = useRouter();
  const lang = router.locale || 'fr'; // Récupère la langue actuelle
  const galleryT = useScopedI18n("gallery"); // Utilisation du hook de traduction pour la galerie

  const backgroundImage = "https://iammarvin.com/megaincrediblebackoffice/wp-content/uploads/2024/04/hector-martinez-EG49vTtKdvI-unsplash-min-scaled.jpg";

  return (
    <>
      <Head>
        <title>{galleryT('title')} | Marvin Mensah</title>
      </Head>

      <HeroSection PageName={galleryT('page_name')} BgImage={backgroundImage}></HeroSection>

      <Main>
        <div>
          <div data-aos="zoom-out-down" className={albumPresentation}>
            <h2>{galleryT('latest_albums')}</h2>
            <p>{galleryT('albums_description')}</p>
          </div>
          <div className={PostGrid}>
            
            {allGaleriePosts.nodes.map((post, index) => (
              
              <div className={AlbumPreview} key={post.id}>
                <Link href={`/galerie/${post.slug}`}>
                  <FeatureImage data-aos="fade-up" data-aos-duration='1' post={post} />
                </Link>
                <Link href={`/galerie/${post.slug}`}>{post.title}</Link>
              </div>
            ))}
          </div>
        </div>
      </Main>
    </>
  );
}
