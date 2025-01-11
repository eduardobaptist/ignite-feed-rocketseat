import { PencilSimpleLine } from "@phosphor-icons/react";
import { Avatar } from "./Avatar";
import styles from "./Sidebar.module.css";

export function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <img
        className={styles.cover}
        src="https://images.unsplash.com/photo-1611647832580-377268dba7cb?q=50&w=500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />

      <div className={styles.profile}>
        <Avatar src="https://github.com/eduardobaptist.png"/>
        <strong>Eduardo Baptista</strong>
        <span>Dev Fullstack</span>
      </div>

      <footer>
        <a href="#">
          <PencilSimpleLine />
          Editar seu perfil
        </a>
      </footer>
    </aside>
  );
}
