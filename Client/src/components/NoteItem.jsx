export default function NoteItem({ title, content }) {
    return (
        <article className="note-item">
            <h3>{title}</h3>
            <p>{content}</p>
        </article>
    );
}