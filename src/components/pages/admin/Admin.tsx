import { useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  User,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../../../firebase/FirebaseManager";
import {
  SiteContent,
  fetchContent,
  saveContent,
} from "../../../content/ContentManager";
import { formatDate, fromIsoDate, toIsoDate } from "../../../utils/dateutils";
import { InstagramEmbed } from "react-social-media-embed";
import LazyMount from "../../LazyMount";
import { toYoutubeEmbedUrl } from "../../../content/youtube";
import paths from "../../../constants/paths.json";

type Row = Record<string, string>;
type Field = { key: string; label: string; type?: "date"; wide?: boolean };
type Tab = {
  key: keyof SiteContent;
  label: string;
  fields: Field[];
  required: string[];
  title: (row: Row) => string;
};

const tabs: Tab[] = [
  {
    key: "concerts",
    label: "Concerts",
    fields: [
      { key: "date", label: "Date", type: "date" },
      { key: "place", label: "Lieu" },
      { key: "city", label: "Ville" },
      { key: "department", label: "Département" },
      { key: "description", label: "Note (ex. Privée)", wide: true },
    ],
    required: ["date", "place"],
    title: (r) =>
      [r.date && formatDate(r.date), r.place].filter(Boolean).join(" · ") ||
      "Nouveau concert",
  },
  {
    key: "videos",
    label: "Vidéos",
    fields: [
      { key: "title", label: "Titre" },
      { key: "url", label: "Lien YouTube", wide: true },
    ],
    required: ["url"],
    title: (r) => r.title || r.url || "Nouvelle vidéo",
  },
  {
    key: "instagram",
    label: "Instagram",
    fields: [{ key: "url", label: "Lien du post", wide: true }],
    required: ["url"],
    title: (r) => r.url || "Nouveau post",
  },
];

const input =
  "w-full rounded-lg bg-white/5 border border-white/20 px-3 py-2 text-white outline-none focus:border-[#c9a5e3] [color-scheme:dark]";
const glass =
  "rounded-xl border border-[#c9a5e3]/25 bg-white/5 backdrop-blur-[6px]";
const btn =
  "rounded-lg border border-[#c9a5e3] px-4 py-2 text-[#c9a5e3] hover:bg-[#c9a5e3]/10 disabled:opacity-40 disabled:hover:bg-transparent";
const iconBtn = "px-2 text-white/60 hover:text-white disabled:opacity-20";

// Shows what visitors will see; nothing for a link that isn't recognisably YouTube/Instagram yet.
const Preview = ({ kind, url }: { kind: keyof SiteContent; url?: string }) => {
  if (!url) return null;
  if (kind === "videos") {
    const embed = toYoutubeEmbedUrl(url.trim());
    if (!embed.startsWith("https://www.youtube.com/embed/")) return null;
    return (
      <LazyMount>
        <iframe className="w-full rounded-lg mt-3" style={{ aspectRatio: "16/9" }} src={embed} title="Aperçu" loading="lazy" allowFullScreen />
      </LazyMount>
    );
  }
  if (kind === "instagram" && /^https:\/\/(www\.)?instagram\.com\/(p|reel|tv)\/[\w-]+/.test(url.trim()))
    return (
      <div className="mt-3 max-w-sm mx-auto">
        <LazyMount>
          <InstagramEmbed key={url} url={url.trim()} width="100%" />
        </LazyMount>
      </div>
    );
  return null;
};

const Editor = ({ tab, user }: { tab: Tab; user: User }) => {
  const [rows, setRows] = useState<Row[] | null>(null);
  const [status, setStatus] = useState("");
  const [loadError, setLoadError] = useState("");
  const [toDelete, setToDelete] = useState<number | null>(null);

  useEffect(() => {
    setRows(null);
    setLoadError("");
    setStatus("");
    fetchContent()
      .then((c) => setRows(((c[tab.key] as Row[]) ?? []).map((r) => ({ ...r }))))
      .catch((e) => {
        console.log("admin load failed", e);
        setLoadError(
          e?.code === "permission-denied"
            ? "Lecture refusée : les règles Firestore ne sont pas déployées."
            : "Impossible de joindre Firestore : la base est-elle créée dans la console Firebase ?"
        );
      });
  }, [tab]);

  if (loadError) return <p className="text-white/80">{loadError}</p>;
  if (!rows) return <p className="text-white/60">Chargement…</p>;

  const set = (i: number, key: string, value: string) => {
    setStatus("");
    setRows(rows.map((r, j) => (j === i ? { ...r, [key]: value } : r)));
  };
  const move = (i: number, d: number) => {
    const next = [...rows];
    [next[i], next[i + d]] = [next[i + d], next[i]];
    setStatus("");
    setRows(next);
  };
  const valid = rows.every((r) => tab.required.every((k) => r[k]?.trim()));

  const save = async (list: Row[] = rows) => {
    setStatus("Enregistrement…");
    try {
      const clean = list.map((r) =>
        Object.fromEntries(tab.fields.map((f) => [f.key, (r[f.key] ?? "").trim()]))
      );
      await saveContent({ [tab.key]: clean } as Partial<SiteContent>);
      setStatus("Enregistré. Visible sur le site au prochain chargement.");
    } catch (e: any) {
      setStatus(
        e?.code === "permission-denied"
          ? `${user.email} n'a pas le droit de modifier le site.`
          : "Échec de l'enregistrement, réessaie."
      );
    }
  };

  // Deleting is confirmed, then saved right away: nobody expects to press Enregistrer after a delete.
  const confirmDelete = () => {
    const next = rows.filter((_, j) => j !== toDelete);
    setToDelete(null);
    setRows(next);
    save(next);
  };

  return (
    <div className="space-y-4">
      <div className={`sticky top-2 z-10 p-3 space-y-2 ${glass} backdrop-blur-md shadow-lg shadow-black/30`}>
        <div className="flex flex-wrap items-center gap-3">
        <button className={btn} onClick={() => setRows([{}, ...rows])}>+ Ajouter</button>
        <button className={`${btn} ml-auto bg-[#c9a5e3] !text-black hover:bg-[#c9a5e3]/90`} disabled={!valid} onClick={() => save()}>
          Enregistrer
        </button>
        </div>
      {status && <p className="text-white/70">{status}</p>}
      {!valid && <p className="text-white/50 text-sm">Les champs * sont obligatoires.</p>}
      </div>
      {toDelete !== null && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/60 p-4" onClick={() => setToDelete(null)}>
          <div className={`${glass} bg-black/70 p-6 max-w-sm w-full space-y-4`} role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
            <p className="text-lg font-semibold">Supprimer cet élément ?</p>
            <p className="text-white/70 truncate">{tab.title(rows[toDelete])}</p>
            <p className="text-white/50 text-sm">La suppression est enregistrée immédiatement.</p>
            <div className="flex justify-end gap-3">
              <button className={btn} onClick={() => setToDelete(null)}>Annuler</button>
              <button className={`${btn} bg-[#c9a5e3] !text-black hover:bg-[#c9a5e3]/90`} onClick={confirmDelete}>Supprimer</button>
            </div>
          </div>
        </div>
      )}
      {rows.map((row, i) => (
        <div key={i} className={`${glass} p-4 hover:border-[#c9a5e3] transition-colors`}>
          <div className="flex items-center justify-between pb-3">
            <p className="font-semibold text-[#c9a5e3] truncate">{tab.title(row)}</p>
            <div className="flex shrink-0">
              <button className={iconBtn} disabled={i === 0} onClick={() => move(i, -1)} aria-label="Monter">↑</button>
              <button className={iconBtn} disabled={i === rows.length - 1} onClick={() => move(i, 1)} aria-label="Descendre">↓</button>
              <button className={iconBtn} onClick={() => setToDelete(i)} aria-label="Supprimer">✕</button>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {tab.fields.map((f) => (
              <label key={f.key} className={`text-sm text-white/70 ${f.wide ? "sm:col-span-2" : ""}`}>
                {f.label}
                {tab.required.includes(f.key) && " *"}
                <input
                  className={`${input} mt-1`}
                  type={f.type ?? "text"}
                  value={f.type === "date" ? toIsoDate(row[f.key] ?? "") : row[f.key] ?? ""}
                  onChange={(e) =>
                    set(i, f.key, f.type === "date" ? fromIsoDate(e.target.value) : e.target.value)
                  }
                />
              </label>
            ))}
          </div>
          <Preview kind={tab.key} url={row.url} />
        </div>
      ))}
    </div>
  );
};

const Admin = () => {
  // undefined = auth state not known yet
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const [tab, setTab] = useState(tabs[0]);
  const [error, setError] = useState("");

  useEffect(() => onAuthStateChanged(auth, setUser), []);

  const login = () =>
    signInWithPopup(auth, new GoogleAuthProvider()).catch(() =>
      setError("Connexion impossible, réessaie.")
    );

  return (
    <main className="bg-black/60 absolute inset-0 overflow-y-auto text-white">
      <div className="max-w-3xl mx-auto p-4 sm:p-6">
        <header className="flex items-center justify-between py-4">
          <a href={"#" + paths.projects} className="text-white/60 hover:text-white">← Le site</a>
          {user && (
            <button className="text-white/60 hover:text-white" onClick={() => signOut(auth)}>
              {user.email} · Déconnexion
            </button>
          )}
        </header>
        <h1 className="text-3xl font-semibold tracking-tight pb-6">Administration</h1>
        {user === undefined ? null : user === null ? (
          <div className={`${glass} p-8 text-center space-y-4`}>
            <p className="text-white/80">Espace réservé au groupe.</p>
            <button className={btn} onClick={login}>Se connecter avec Google</button>
            {error && <p className="text-white/60">{error}</p>}
          </div>
        ) : (
          <>
            <nav className="flex gap-2 pb-6">
              {tabs.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setTab(t)}
                  className={`rounded-full border px-4 py-1.5 ${
                    t === tab ? "border-[#c9a5e3] bg-[#c9a5e3] text-black" : "border-white/20 text-white/70 hover:border-[#c9a5e3]"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </nav>
            <Editor tab={tab} user={user} />
          </>
        )}
      </div>
    </main>
  );
};

export default Admin;
