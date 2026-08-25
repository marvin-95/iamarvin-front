import Image from 'next/image';
import styles from '@/styles/Home.module.css';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Main from '@/components/main';
import FeatureImage from '@/components/feature-image';
import { getAllPortfolioPost , getAllPortfolioPostEN } from '@/libs/posts';
import { PostGrid, AlbumPreview, albumPresentation } from './mes-projets.module.scss';
import Head from 'next/head';
import HeroSection from '@/components/hero-section';
import ProjectPreview from '@/components/project-preview';
import { useI18n, useScopedI18n } from '@/locales'; // Import des traductions

 
export async function getStaticProps({ locale }) { // Récupérez le locale dans getStaticProps
  const allPortfolioPost = locale === 'en' ? await getAllPortfolioPostEN() : await getAllPortfolioPost();

  return {
    props: {
      allPortfolioPost: allPortfolioPost,
    },
  };
}

export default function MesProjets({ allPortfolioPost }) {
  const backgroundImage =
    'https://iammarvin.com/megaincrediblebackoffice/wp-content/uploads/2024/04/alvaro-reyes-qWwpHwip31M-unsplash-min-scaled.jpg';

  const t = useI18n(); // Hook global pour la traduction
  const projectsT = useScopedI18n('projects'); // Traductions spécifiques à la page "Mes Projets"

  return (
    <>
      <Head>
        <title>{t('projects.page_title')} | Marvin Mensah</title>
      </Head>

      <HeroSection PageName={t('projects.page_title')} BgImage={backgroundImage} />

      <Main>
        <div>
          <div className={albumPresentation}>
            <h2 data-aos="zoom-out-down">{projectsT('latest_projects')}</h2>
            {/* <p>{projectsT('photo_description')}</p> */}
          </div>

          <div className="PostGrid">
            {allPortfolioPost.nodes.map((post, index) => (
              <ProjectPreview key={post.id} title={post.title} post={post} index={index} slug={post.slug} />
            ))}
          </div>
        </div>
      </Main>
    </>
  );
}
