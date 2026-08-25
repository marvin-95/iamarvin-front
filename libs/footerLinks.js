const getFooterLinks = (t) => [
  { slug: t("footer.home"), link: "/", type: "lien" },
  { slug: t("footer.blog"), link: "/blog", type: "lien" },
  { slug: t("footer.resume"), link: "https://iammarvin.com/iammarvin_front/media/CV-Marvin-mensah2024_compressed.pdf", type: "lien" },
  { slug: t("footer.legalNotice"), link: "/mentions-legales", type: "lien" },
  { slug: t("footer.twitter"), link: "https://twitter.com/marvin_msh", type: "social" },
  { slug: t("footer.linkedin"), link: "https://www.linkedin.com/in/marvin-mensah-75b774160/", type: "social" },
  { slug: t("footer.dribbble"), link: "https://dribbble.com/Marvin-96", type: "social" },
];

export default getFooterLinks;
