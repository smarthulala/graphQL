import { useState } from 'react'
import { FaList } from 'react-icons/fa'
import { useMutation, useQuery } from '@apollo/client'
import { GET_PROJECTS } from '../queries/projectQueries'
import { GET_CLIENTS } from '../queries/clientQueries'
import { ADD_PROJECT } from '../mutations/projectMutations'

export default function AddProjectModal() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [clientId, setClientId] = useState('')
  const [status, setStatus] = useState('new')

  const [addProject] = useMutation(ADD_PROJECT, {
    variables: { name, description, clientId, status },
    update(cache, { data: { addProject } }) {
      const { projects } = cache.readQuery({ query: GET_PROJECTS })
      cache.writeQuery({
        query: GET_PROJECTS,
        data: { projects: [...projects, addProject] },
      })
    },
  })

  const { loading, error, data } = useQuery(GET_CLIENTS)

  const onSubmit = (event) => {
    event.preventDefault()

    if (name === '' || description === '' || status === '') {
      return alert('please fill in all fields')
    }

    addProject(name, description, clientId, status)

    setName('')
    setDescription('')
    setClientId('')
    setStatus('new')
  }

  if (loading) return <div>Loading</div>
  if (error) return <div>Something went Wrong</div>

  return (
    <>
      {!loading && !error && (
        <>
          <button
            type='button'
            className='btn btn-secondary'
            data-bs-toggle='modal'
            data-bs-target='#addProjectModal'
          >
            <div className='d-flex align-items-center'>
              <FaList className='icon' />
              <div>Add Project</div>
            </div>
          </button>

          <div
            className='modal fade'
            id='addProjectModal'
            data-bs-backdrop='static'
            data-bs-keyboard='false'
            aria-labelledby='addProjectModalLabel'
            aria-hidden='true'
          >
            <div className='modal-dialog'>
              <div className='modal-content'>
                <div className='modal-header'>
                  <h1 className='modal-title fs-5' id='addProjectModalLabel'>
                    New Project
                  </h1>
                  <button
                    type='button'
                    className='btn-close'
                    data-bs-dismiss='modal'
                    aria-label='Close'
                  ></button>
                </div>
                <div className='modal-body'>
                  <form onSubmit={onSubmit}>
                    <div className='mb-3'>
                      <label className='form-label' htmlFor='name'>
                        Name
                      </label>
                      <input
                        type='text'
                        className='form-control'
                        id='name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className='mb-3'>
                      <label className='form-label' htmlFor='description'>
                        Description
                      </label>
                      <textarea
                        className='form-control'
                        id='description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                    <div className='mb-3'>
                      <label className='form-label' htmlFor='status'>
                        Status
                      </label>
                      <select
                        id='status'
                        className='form-select'
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        <option value='new'>Not Started</option>
                        <option value='progress'>In Progress</option>
                        <option value='completed'>Completed</option>
                      </select>
                    </div>
                    <div className='mb-3'>
                      <label className='form-label'>Status</label>
                      <select
                        id='clientId'
                        className='form-select'
                        value={clientId}
                        onChange={(e) => setClientId(e.target.value)}
                      >
                        <option value=''>Select Client</option>
                        {data.clients.map((client) => (
                          <option key={client.id} value={client.id}>
                            {client.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <button
                      className='btn btn-primary'
                      type='submit'
                      data-bs-dismiss='modal'
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
