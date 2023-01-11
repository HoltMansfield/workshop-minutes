import { useQuery, gql } from '@apollo/client'

const GET_LOCATIONS = gql`
  query {
    projects(userId: "John Blaze") {
      id
      userId
      name
    }
  }
`;

export const Testy = () => {
  const { loading, error, data } = useQuery(GET_LOCATIONS)

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  //@ts-expect-error
  return data.projects.map(project => {
    return <div>Id: {project.id} Name: {project.name}</div>
  })
}
