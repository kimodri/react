import ReactMarkdown from 'react-markdown'

export default function Recipe(prop){
    return(
        <section className="suggested-recipe-container"><ReactMarkdown>{prop.recipe}</ReactMarkdown></section>
    )
}