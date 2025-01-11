import styles from "./App.module.css";
import "./global.css";

import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { Post, PostType } from "./components/Post";

export function App() {
  const posts: Array<PostType> = [
    {
      id: 1,
      author: {
        avatarUrl: "https://github.com/diego3g.png",
        name: "Diego Fernandes",
        role: "CTO @Rocketseat",
      },
      content: [
        { type: "paragraph", content: "Fala galeraa 👋" },
        {
          type: "paragraph",
          content:
            "Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀",
        },
        { type: "link", content: "jane.design/doctorcare" },
      ],
      publishedAt: new Date("2025-01-08 17:00:00"),
    },
    {
      id: 2,
      author: {
        avatarUrl: "https://github.com/maykbrito.png",
        name: "Mayk Brito",
        role: "Educator @Rocketseat",
      },
      content: [
        { type: "paragraph", content: "E aí dev, beleza?" },
        {
          type: "paragraph",
          content:
            "Passando aqui pra divulgar a formação fullstack da Rocketseat! 😉",
        },
        {
          type: "paragraph",
          content:
            "Aqui você aprende sobre HTML, CSS e JavaScript, do front ao backend, da ideia ao deploy 🚀",
        },
        {
          type: "link",
          content: "https://app.rocketseat.com.br/journey/full-stack/overview",
        },
      ],
      publishedAt: new Date("2025-01-07 17:00:00"),
    },
  ];

  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {posts.map((post) => {
            return <Post key={post.id} post={post} />;
          })}
        </main>
      </div>
    </div>
  );
}
