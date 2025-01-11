import { ThumbsUp, Trash } from "@phosphor-icons/react";
import styles from "./Comment.module.css";
import { format, formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import { Avatar } from "./Avatar";
import { DeleteModal } from "./DeleteModal";
import { useState } from "react";

export interface CommentType {
  content: string;
  createdAt: Date;
  onDeleteComment: (comment: CommentType) => void;
}

interface CommentProps {
  comment: CommentType;
}

export function Comment({ comment }: CommentProps) {
  const [likeCount, setLikeCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const createdAtFormatted = format(
    comment.createdAt,
    "d 'de' LLLL 'às' HH:mm'h'",
    { locale: ptBR }
  );

  const createdAtRelatedToNow = formatDistanceToNow(comment.createdAt, {
    locale: ptBR,
    addSuffix: true,
  });

  function handleDeleteComment() {
    setIsOpen(true);
    // comment.onDeleteComment(comment);
  }

  function handleLike() {
    setLikeCount((state) => {
      return state + 1;
    });
  }

  return (
    <div className={styles.comment}>
      <DeleteModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onDeleteComment={comment.onDeleteComment}
        comment={comment}
      ></DeleteModal>
      <Avatar
        hasBorder={false}
        src="https://github.com/eduardobaptist.png"
        alt=""
      />

      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>
                Eduardo Baptista <span>(você)</span>
              </strong>
              <time
                title={createdAtFormatted}
                dateTime={comment.createdAt.toISOString()}
              >
                {createdAtRelatedToNow}
              </time>
            </div>
            <button title="Deletar comentário" onClick={handleDeleteComment}>
              <Trash size={24} />
            </button>
          </header>
          <p>{comment.content}</p>
        </div>

        <footer>
          <button onClick={handleLike}>
            <ThumbsUp /> Aplaudir <span>{likeCount}</span>
          </button>
        </footer>
      </div>
    </div>
  );
}
