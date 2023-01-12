import { format, formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { ListDashes, TextOutdent } from 'phosphor-react';
import { useState } from 'react';
import { Avatar } from './Avatar'
import { Comment } from './Comment'
import styles from './Post.module.css';

export function Post(props) {

    // USANDO A LIB DATE-FNS
    const publishedDateFormatted = format(props.publishedAt, "dd 'de' LLLL 'às' HH:mm'h'", {
        locale: ptBR,
    })

    const publishedDateRelativeToNow = formatDistanceToNow(props.publishedAt, {
        locale: ptBR,
        addSuffix: true,
    })

    const [comments, setComments ] = useState([
        'Post muito bacana!'
    ])

    // 1opção para criar um novo comentario - forma imperativa:
    // function handleCreateNewComment(event) {
    //     event.preventDefault()
    //     // event.target vai retornar a tag onde esta o evento (form)/ o comment é o atributo name na textarea que já consegue pegar o texto digitado
    //     const newCommentText = event.target.comment.value;
    //     // setComments([...comments, comments.length + 1]);
    //     setComments([...comments, newCommentText]);
    //     // deixa a textarea vazia após enviar o comentario
    //     event.target.comment.value = '';
    // }

    const [newCommentText, setNewCommentText] = useState(''); //valor inicial da variavel

    // 2opção para criar um novo comentario - forma declarativa:
    function handleCreateNewComment(event) {
        event.preventDefault()
        setComments([...comments, newCommentText]);
        setNewCommentText(''); //volta ao estado inicial ao enviar o comentario
    }

    function handleNewCommentChange() {
        event.target.setCustomValidity('');
        // pega o texto(value) digitado na textarea e preencher o estado setNewCommentText
        setNewCommentText(event.target.value);
    }

    // deletar comentarios 
    function deleteComment(commentToDelete) {
        // filter onde retorn uma nova lista de comentarios que sejam diferentes do comentario que eu quero deletar
        // filter percorre cada comentario, se eu retorno true ele mantem na lista, se retorna false, ele remove
        const commentsWithoutDeletedOne = comments.filter(comment => {
            return comment != commentToDelete
        })
        setComments(commentsWithoutDeletedOne);
    }

    function handleNewCommentInvalid() {
        event.target.setCustomValidity('Esse campo é obrigatório!');
    }

    const isNewCommentEmpty = newCommentText.length === 0;

    return (
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <Avatar src={props.author.avatarUrl} hasBorder/>
                    <div className={styles.authorInfo}>
                        <strong>{props.author.name}</strong>
                        <span>{props.author.role}</span>
                    </div>
                </div>

               <time title={publishedDateFormatted} dateTime={props.publishedAt.toISOString()}>
                    {publishedDateRelativeToNow}
               </time>
            </header>

            
            <div className={styles.content}>
                {props.content.map(line => {
                    if (line.type === 'paragraph') {
                        return <p key={line.content}>{line.content}</p>;
                    } else if (line.type === 'link') {
                        return <p key={line.content}><a href="#">{line.content}</a></p>;
                    }
                })}

                {/* <p>Fala galeraa 👋</p>
                <p>Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀</p>
                <p>👉{' '}<a href="#">jane.design/doctorcare</a></p>
                <p>
                    <a href="">#novoprojeto</a>{' '}
                    <a href="">#nlw</a>{' '}
                    <a href="">#rocketseat</a>
                </p> */}
            </div>

            <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
                <strong>Deixe seu feedback</strong>
                <textarea 
                    placeholder='Deixe um comentário'
                    name="comment"
                    value={newCommentText} //sempre vai trazer o value da variavel atual quando o estado mudar
                    onChange={handleNewCommentChange}
                    onInvalid={handleNewCommentInvalid}
                    required>
                </textarea>
                <footer>
                    <button type='submit' disabled={isNewCommentEmpty}>Publicar</button>
                </footer>
            </form>
            <div className={styles.commentList}>
                {comments.map(comment => {
                    return  <Comment key={comment} content={comment} onDeleteComment={deleteComment}/>
                })}
            </div>
        </article>
    )
}