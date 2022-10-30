const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLSchema } = graphql;

//Schema defines data on the Graph like object types(museum type), relation between
//these object types and describes how it can reach into the graph to interact with
//the data to retrieve or mutate the data

var fakeMuseumDatabase = [
    { museumName:"Battle Museum", streetAddress:"Battle Street", cityAddress:"Battletown", postcode:"BA1 TO2", phoneNum:44227778888, website:"www.battle.museum.co.uk", description:"Learn of all of the GB's battles", id:1 },
    { museumName:"War Museum", streetAddress:"War Street", cityAddress:"Wartown", postcode:"WA1 TO2", phoneNum:44228888888, website:"www.war.museum.co.uk", description:"Learn of all of the GB's wars", id:2 },
    { museumName:"Plague Museum", streetAddress:"Plague Street", cityAddress:"Plaguetown", postcode:"PL1 TO2", phoneNum:44229998888, website:"www.plague.museum.co.uk", description:"Learn of all of the GB's plagues", id:3 }
]

const MuseumType = new GraphQLObjectType({
    name: 'Museum',
    fields: () => ({
        id: { type: GraphQLID},
        museumName: { type: GraphQLString },
        streetAddress: { type: GraphQLString },
        cityAddress: { type: GraphQLString },
        postcode: { type: GraphQLString },
        phoneNum: { type: GraphQLInt },
        website: { type: GraphQLString },
        description: { type: GraphQLString}
    })
});

//RootQuery describes how users can use the graph and grab data.
//For e.g. Root query will get all museums in the city of london, all museums, a certain museum

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        museum: {
            type: MuseumType,
            //argument passed by the user while making the query
            args: { id: { type: GraphQLID} },
            resolve(parent, args) {
                // Here we define how to get data from database source

                // this will return the museum with id passed in argument by the user
                return fakeMuseumDatabase.findIndex((item) => { return item.id == args.id});
            }
        }
    }
});

//Creating a new GraphQL Schema, with options query which defines query
// will allow users to use when they are making request
module.exports = new GraphQLSchema({
    query: RootQuery
});
