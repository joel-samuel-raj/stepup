import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { getGithubContributions } from 'github-contributions-counter'
import axios from 'axios'

dotenv.config();

const app: Express = express();
const {PORT, TOKEN} = process.env;

const getData = async ( id: string ) => {

  return await getGithubContributions( {
    username: id,
    token: TOKEN as string 
  } ).then( ( r ) => {
    const calendar = r.data.data.user.contributionsCollection.contributionCalendar
    const totalContributions = calendar.totalContributions
    let weeklyContributionsTemp = calendar.weeks.reduce<any>( ( lastTwoWeeks, week, i ) => {
      if ( i >= calendar.weeks.length - 2 ) {
        let temp = week.contributionDays.reduce<any>( ( count, day ) => ( [ ...count, day.contributionCount ] ), [] )
        return lastTwoWeeks.concat( temp )
      }
      else {
        return lastTwoWeeks
      }
    }, [] )
    const weeklyContributions = weeklyContributionsTemp.splice( weeklyContributionsTemp.length - 7, 7 )
    const weeklyContributionsSum = weeklyContributions.reduce((total: number, week: any) => total += week, 0)
    const dailyContributions = calendar.weeks[ calendar.weeks.length - 1 ].contributionDays.pop()?.contributionCount
    return { totalContributions, weeklyContributions, weeklyContributionsSum, dailyContributions }
  }).catch(e => "invalid username")
}

app.get( '/:id', async ( req: Request, res: Response ) => {
  const id = req.params.id
  await getData( id ).then( ( r ) => {
    console.log( r )
    res.json( r )
  } )
});
 
app.get( '/', async ( req: Request, res: Response ) => {
  const endpoint = "http://localhost:1337/graphql"
  const headers = {
    "content-type": "application/json",
  }
  const query = {
    "query": `query {
            usersPermissionsUsers(filters: {}, pagination: {}, sort: []) {
              data {
                id
                attributes {
                  githubUsername
                }
              }
            }
          }
          `,
    "variables": {},
  }

  const response = axios( {
    url: endpoint,
    method: "Post",
    headers,
    data: query
  })
  const data = ( await response ).data.data.usersPermissionsUsers.data
  console.log(data)

  const users = data.reduce( ( arr: any, user: any ) => {
    if ( user.attributes.githubUsername ) {
      return [...arr, user.attributes.githubUsername]
    }
    else {
      return arr
    }
  }, [])
  console.log(users)
  const array = users.reduce( async ( data: any, user: string ) => {
    data = await data
    let temp = await getData( user )
    console.log(temp)
    return data = [...data, temp]
  }, Promise.resolve( [] ) ).then( (arr: any) => {
      const totalContributions = arr.reduce( ( total: number, user: any ) => total += user.totalContributions, 0 )
      const weeklyContributionsSum = arr.reduce( ( total: number, user: any ) => total += user.weeklyContributionsSum, 0 )
      const weeklyContributions = [0,0,0,0,0,0,0]
      for ( let i = 0; i < 7; i++ ) {
        weeklyContributions[i] = arr.reduce( ( total: number, user: any ) => total += user.weeklyContributions[ i ], 0 )
      }
    const dailyContributions = arr.reduce( ( total: number, user: any ) => total += user.dailyContributions, 0 )
    return {
      array: arr, totalContributions, weeklyContributionsSum, weeklyContributions, dailyContributions
    }
  }).then((r: any) => res.json(r))
})

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});