import { Avatar } from "./Avatar";
import { Comment, CommentType } from "./Comment";
import { format, formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import styles from "./Post.module.css";
import { FormEvent, useState, ChangeEvent } from "react";

interface Author {
  name: string;
  role: string;
  avatarUrl: string;
}

interface Content {
  type: "paragraph" | "link";
  content: string;
}

export interface PostType {
  id: number;
  author: Author;
  publishedAt: Date;
  content: Content[];
}

interface PostProps {
  post: PostType;
}

export function Post({ post }: PostProps) {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [newCommentText, setNewCommentText] = useState("");

  const publishedAtFormatted = format(
    post.publishedAt,
    "d 'de' LLLL 'às' HH:mm'h'",
    { locale: ptBR }
  );

  const publishedAtRelatedToNow = formatDistanceToNow(post.publishedAt, {
    locale: ptBR,
    addSuffix: true,
  });

  function handleCommentSubmit(event: FormEvent) {
    event.preventDefault();
    setComments([
      ...comments,
      {
        content: newCommentText,
        createdAt: new Date(),
        onDeleteComment: deleteComment,
      },
    ]);
    setNewCommentText("");
  }

  function handleCommentTextChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setNewCommentText(event.target.value);
  }

  function deleteComment(commentToDelete: CommentType) {
    setComments((prevComments) =>
      prevComments.filter((comment) => comment !== commentToDelete)
    );
  }

  const isNewCommentEmpty = newCommentText.length === 0;

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={post.author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{post.author.name}</strong>
            <span>{post.author.role}</span>
          </div>
        </div>

        <time
          title={publishedAtFormatted}
          dateTime={post.publishedAt.toISOString()}
        >
          {publishedAtRelatedToNow}
        </time>
      </header>

      <div className={styles.content}>
        {post.content.map((line) => {
          switch (line.type) {
            case "paragraph":
              return <p key={line.content}>{line.content}</p>;
            case "link":
              return (
                <p key={line.content}>
                  <a href="#">{line.content}</a>
                </p>
              );
            default:
              return null;
          }
        })}
      </div>

      <form onSubmit={handleCommentSubmit} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>
        <textarea
          name="comment"
          value={newCommentText}
          onChange={handleCommentTextChange}
          placeholder="Deixe um comentário"
          required
        />
        <footer>
          <button disabled={isNewCommentEmpty} type="submit">
            Publicar
          </button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map((comment) => {
          return <Comment key={comment.content} comment={comment} />;
        })}
      </div>
    </article>
  );
}
