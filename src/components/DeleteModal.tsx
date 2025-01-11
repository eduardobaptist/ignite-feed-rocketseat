import { useEffect, useRef } from "react";
import { CommentType } from "./Comment";
import styles from "./DeleteModal.module.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDeleteComment: (comment: CommentType) => void;
  comment: CommentType;
}

export function DeleteModal({
  isOpen,
  onClose,
  onDeleteComment,
  comment,
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalOverlay} />
      <div ref={modalRef} className={styles.modalContent}>
        <header className={styles.modalHeader}>
          <span>Excluir comentário</span>
        </header>

        <main className={styles.content}>
          <span>Você tem certeza que gostaria de excluir este comentário?</span>
        </main>

        <footer className={styles.actions}>
          <button className={styles.cancelBtn} onClick={onClose}>
            Cancelar
          </button>
          <button
            className={styles.deleteBtn}
            onClick={() => {
              onDeleteComment(comment);
              onClose();
            }}
          >
            Sim, excluir
          </button>
        </footer>
      </div>
    </div>
  );
}
