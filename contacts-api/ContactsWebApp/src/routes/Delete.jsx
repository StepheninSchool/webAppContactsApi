import { useParams } from 'react-router-dom';

export default function Delete() {
    const { id } = useParams();
    return(
        <>
        <h1>Delete Page</h1>
        </>
    )
}