import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Home() {
        //store results from api
        const [contacts, setContacts] = useState([]);

        useEffect(() => {
            // Function to fetch data from the API
            async function fetchData() {
              // const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + searchCharacter); // Fetching data from the API
              const url = 'http://localhost:3000/api/contacts/all';
              const response = await fetch(url)
              if (response.ok) {
                const data = await response.json();
                if (!ignore)
                  setContacts(data);
              } else {
                setContacts(null);
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
        <h1>Home Page</h1>
        <p>
            <Link to="/create">Add a contact</Link>
        </p>
        <p>
            <Link to="/read">Find a contact</Link>
        </p>
        <p>
            <Link to="/update">Update a contact</Link>
        </p>
        <p>
            <Link to="/delete">Delete a contact</Link>
        </p>

        {
            contacts.length > 0 ?
            contacts.map((contact, index) => {
                return <div key={index}>{ contact.firstName + ' ' + contact.lastName }</div>

            }) :
            <div>No contacts.</div>
        }
        </>
    )
}