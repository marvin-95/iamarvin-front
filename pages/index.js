import { useI18n, useScopedI18n } from '../locales';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import Frontsection from '@/components/frontsection';
import Main from '@/components/main';
import ProjectPreview from '@/components/project-preview';
import { getAllPortfolioPost , getAllPortfolioPostEN } from '@/libs/posts';
import Section from '@/components/section';
import Head from 'next/head';
import Arrowup from "@/public/arrow-up-right.svg";
import { jobsDetails } from '@/libs/jobsDetails';
import { getFooterLinks } from '@/libs/footerLinks'; 
import JobDetail from '@/components/jobdetail';
import { useRouter } from 'next/router';

const inter = Inter({ subsets: ['latin'] });

export async function getStaticProps({ locale }) { // Récupérez le locale dans getStaticProps
  const allPortfolioPost = locale === 'en' ? await getAllPortfolioPostEN() : await getAllPortfolioPost();

  return {
    props: {
      allPortfolioPost: allPortfolioPost,
    },
  };
}

export default function Home({ allPortfolioPost }) {
  const landingT = useScopedI18n("landing");
  // const footerLinks = getFooterLinks(landingT);
  const router = useRouter();
  const lang = router.locale || 'fr'; // Récupération de la langue actuelle (fr par défaut)
  const selectedJobDetails = jobsDetails(lang); // Récupération des expériences en fonction de la langue

  return (
    <>
      <Head>
        <title>{landingT('title')} | Marvin Mensah</title>
      </Head>

      <Frontsection />
      <Main>
        <section className='content'>
          <div>
            <div className='presentationtxt' data-aos="fade-up" >
              <p dangerouslySetInnerHTML={{ __html: landingT('presentation') }} />
              
              <div className='skillstxt'>
              <ul>
                    <li>
                      <strong>{landingT('skills.projectManagement.title')}</strong> :<br/> {landingT('skills.projectManagement.description')} 
                    </li>
                    <li>
                      <strong>{landingT('skills.webDevelopment.title')}</strong> :<br/> {landingT('skills.webDevelopment.description')} 
                    </li>
                    <li>
                      <strong>{landingT('skills.uxuiDesign.title')}</strong> :<br/> {landingT('skills.uxuiDesign.description')} 
                    </li>
                  </ul>

            </div>


            </div>

            {/* <div className='Social' data-aos="fade-up">
              <h4>{landingT('social')}</h4>
              <ul>
              {footerLinks
                .filter(link => link.type === "lien") // Filtrage des liens du menu
                .map((link) => (
                  <li key={link.link}>
                    <Link href={link.link}>{link.slug}</Link>
                  </li>
              ))}
              </ul>
            </div> */}
          </div>

          <div className='pdp'>
            <Image
              data-aos="zoom-in"
              src="https://iammarvin.com/megaincrediblebackoffice/wp-content/uploads/2024/02/A970FA8E-F954-49F1-A284-2D24F0E70A14.jpeg"
              width={1440}
              height={1799}
              alt="Picture of the author"
            />
          </div>
        </section>

        <h2 className="ProjectSectionTitle">{landingT('projects')}</h2>

        <section>
          <div className='griddiv'>
            {allPortfolioPost.nodes.map((post, index) =>
              index < 3 ? (
                <ProjectPreview
                  key={post.id}
                  title={post.title}
                  post={post}
                  index={index}
                  slug={post.slug}
                />
              ) : null
            )}
          </div>
        </section>

        <div>
          <h2 className="ProjectSectionTitle">{landingT('experiences')}</h2>
          <div className='Jobwrapped'>
            {console.log(allPortfolioPost)}
            {selectedJobDetails.map((job, index) =>
              index < 3 ? (
                <JobDetail
                  key={index}
                  name={job.name}
                  role={job.role}
                  description={job.description}
                  date={job.date}
                />
              ) : null
            )}

            <div className='jobbutton' data-aos="fade-up" data-aos-duration={2}>
              <a className='CVlink' href='https://iammarvin.com/iammarvin_front/media/CV-Marvin-mensah2024_compressed.pdf' target="_blank" rel="noopener noreferrer">
                {landingT('see_cv')}
              </a>
            </div>
          </div>
        </div>
      </Main>
    </>
  );
}
