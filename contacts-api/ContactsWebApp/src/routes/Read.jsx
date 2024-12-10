import { useParams } from 'react-router-dom';
import { useEffect, useState} from 'react';

export default function Read() {
    const { id } = useParams();
    //store result from api
    const [contact, setContact] = useState(null);

    useEffect(() => {
        // Function to fetch data from the API
        async function fetchData() {
          // const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + searchCharacter); // Fetching data from the API
          const url = 'http:/./localhost:3000/api/contacts/get/' + id;
          const response = await fetch(url)

          if (response.ok) {
            const data = await response.json();
            if (!ignore)
              setContact(data);
          } else {
            setContact(null);
          }
        }

        let ignore = false;
        fetchData();
        return () => {
            ignore = true;
        }
    }, []);

    return(
        <>
        <h1>Read Page for { id }</h1>
        {
            contact ?
            <div>{ contact.firstName + '' + contact.lastName }</div> :
            <div>Contact not found</div>
        }
        </>
    )
}