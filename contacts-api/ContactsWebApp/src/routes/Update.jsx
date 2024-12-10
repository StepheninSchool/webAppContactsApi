import { useParams } from 'react-router-dom';

export default function Update() {
    const { id } = useParams();
    return(
        <>
        <h1>Update Page</h1>
        </>
    )  
}