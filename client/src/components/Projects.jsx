import { useQuery } from '@apollo/client'
import Spinner from './Spinner'
import ProjectCard from './ProjectCard'
import { GET_PROJECTS } from '../queries/projectQueries'

export default function Projects() {
  const { loading, error, data } = useQuery(GET_PROJECTS)

  if (loading) return <Spinner />
  if (error) {
    console.log(error.message)
    return <p>Something went wrong</p>
  }

  return (
    <>
      {data.projects.length > 0 ? (
        <div className='row mt-4'>
          {data.projects.map((project) => {
            return (
              <ProjectCard key={project.id} project={project}></ProjectCard>
            )
          })}
        </div>
      ) : (
        <p>No Projects</p>
      )}
    </>
  )
}
