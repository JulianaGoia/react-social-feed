import styles from './Avatar.module.css';

export function Avatar(props) {
    return (
        <img src={props.src} className={props.hasBorder ? styles.avatarWithBorder : styles.avatar} />
    );
}


// Outra opção seria pegar somente os parametros desejados dentro de um objeto e passar como props
// export function Avatar({hasBorder = true, src}) {
//     return (
//         <img src={src} className={hasBorder ? styles.avatarWithBorder : styles.avatar} />
//     );
// }