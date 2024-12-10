import { useParams } from 'react-router-dom';

export default function Create() {
    const { id } = useParams();
    return(
        <>
        <h1>Create Page</h1>
        </>
    )
}