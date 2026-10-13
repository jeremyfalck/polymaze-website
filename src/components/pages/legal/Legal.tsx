import { ReactNode, useEffect, useState } from "react";
import { NavBar } from "../../navbar/Navbar";
import useHeaderHeight from "../../navbar/useHeaderHeight";

const Section = ({ title, children }: { title: string; children: ReactNode }) => (
  <section className="space-y-2">
    <h2 className="text-xl font-semibold text-[#c9a5e3]">{title}</h2>
    {children}
  </section>
);

const Legal = () => {
  const [ref, headerHeight] = useHeaderHeight();
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    const onResize = () => setHeight(window.innerHeight);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <main className="overscroll-none overflow-hidden">
      <div
        className="w-full mx-auto py-6 sm:px-6 lg:px-8 absolute top-0 left-0 overscroll-contain overflow-y-auto"
        style={{ maxHeight: height, paddingTop: headerHeight }}
      >
        <div className="max-w-3xl mx-auto p-4 space-y-6 text-white/90">
          <h1 className="text-3xl font-bold text-white">Mentions légales</h1>

          <Section title="Éditeur du site">
            <p>
              Association POLYMAZE, association déclarée (loi 1901), créée le
              1<sup>er</sup> novembre 2021.
              <br />
              SIREN : 917 611 279
              <br />
              Siège social : Résidence Jean de Berry, 39 avenue des Prés le Roi,
              18000 Bourges
              <br />
              Contact :{" "}
              <a className="underline" href="mailto:polymazemusic@gmail.com">
                polymazemusic@gmail.com
              </a>
            </p>
          </Section>

          <Section title="Directeur de la publication">
            <p>Sébastien Clos, représentant légal de l'association POLYMAZE.</p>
          </Section>

          <Section title="Hébergeur">
            <p>
              OVH SAS, 2 rue Kellermann, 59100 Roubaix, France.
              <br />
              <a className="underline" href="https://www.ovhcloud.com">
                www.ovhcloud.com
              </a>
            </p>
          </Section>

          <Section title="Propriété intellectuelle">
            <p>
              Les textes, images, logos et musiques présents sur ce site sont la
              propriété de l'association POLYMAZE ou de leurs auteurs. Toute
              reproduction sans autorisation est interdite.
            </p>
          </Section>

          <Section title="Données personnelles et cookies">
            <p>
              Ce site ne comporte ni compte utilisateur, ni formulaire, ni outil
              de mesure d'audience, et ne collecte directement aucune donnée
              personnelle.
            </p>
            <p>
              Il intègre des contenus de services tiers (lecteurs Spotify,
              vidéos YouTube, liens Instagram) ainsi qu'un calendrier hébergé par
              Google. Ces services peuvent déposer leurs propres cookies et
              traiter votre adresse IP selon leurs politiques de confidentialité.
              Vous pouvez les limiter via les réglages de votre navigateur ou une
              extension de blocage.
            </p>
            <p>
              Pour exercer vos droits (accès, rectification, suppression), écrivez
              à{" "}
              <a className="underline" href="mailto:polymazemusic@gmail.com">
                polymazemusic@gmail.com
              </a>
              .
            </p>
          </Section>
        </div>
      </div>
      <NavBar index={-1} ref={ref} />
    </main>
  );
};

export default Legal;
