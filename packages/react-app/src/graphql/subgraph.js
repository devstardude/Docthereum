import { gql } from "@apollo/client";

// See more example queries on https://thegraph.com/explorer/subgraph/paulrberg/create-eth-app
export const GET_DOC_AUTHS = gql(`
  {
    docAuthorisedEntities {
      id
      count
      name
      _authAddre
    }
  }
`);
export const GET_LAB_AUTHS = gql(`
{
  labAuthorisedEntities {
    id
    count
    name
    _authAddre
  }
}
`);

export const GET_REPORTS_SAVED = gql(`
{
  reportSavedEntities {
    id
    count
    patientName
    labName
    addedAt
    fileId
    category
  }
}
`);
  
