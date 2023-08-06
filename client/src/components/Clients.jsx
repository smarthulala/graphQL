import { useQuery } from '@apollo/client'
import ClientRow from './ClientRow'
import { GET_CLIENTS } from '../queries/clientQueries'
import Spinner from './Spinner'
import { useEffect } from 'react'

export default function Clients() {
  const { loading, error, data } = useQuery(GET_CLIENTS)

  useEffect(() => {}, [data])
  
  if (loading) return <Spinner />
  if (error) {
    console.log(error.message)
    return <p>Something went wrong</p>
  }

  return (
    <>
      {!loading && !error && (
        <table className='table table-hover mt-3'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.clients.map((client) => (
              <ClientRow client={client} key={client.id} />
            ))}
          </tbody>
        </table>
      )}
    </>
  )
}
