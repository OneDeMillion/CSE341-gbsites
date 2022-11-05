const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema, GraphQLList, GraphQLNonNull } = graphql;

//Schema defines data on the Graph like object types(museum type), relation between
//these object types and describes how it can reach into the graph to interact with
//the data to retrieve or mutate the data

var museums = [
    { id: 1, museumName:"Battle Museum", streetAddress:"Battle Street", cityAddress:"Battletown", postcode:"BA1 TO2", phoneNum:44227778888, website:"www.battle.museum.co.uk", description:"Learn of all of the GB's battles" },
    { id: 2, museumName:"War Museum", streetAddress:"War Street", cityAddress:"Wartown", postcode:"WA1 TO2", phoneNum:44228888888, website:"www.war.museum.co.uk", description:"Learn of all of the GB's wars" },
    { id: 3, museumName:"Plague Museum", streetAddress:"Plague Street", cityAddress:"Plaguetown", postcode:"PL1 TO2", phoneNum:44229998888, website:"www.plague.museum.co.uk", description:"Learn of all of the GB's plagues" }
]




//RootQuery describes how users can use the graph and grab data.
//For e.g. Root query will get all museums in the city of london, all museums, a certain museum

const MuseumType = new GraphQLObjectType({
    name: 'Museums',
    description: 'This represents a museum',
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLInt) },
        museumName: {type: new GraphQLNonNull(GraphQLString) },
        streetAddress: {type: GraphQLString},
        cityAddress: {type: GraphQLString},
        postcode: {type: GraphQLString},
        phoneNum: {type: GraphQLString},
        website: {type: GraphQLString},
        description: {type: GraphQLString}
    })
});



const RootQuery = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({    
        museum: {
            type: MuseumType,
            description: 'A single museum',
            args: {
                id: { type: GraphQLInt }
            },
            resolve: (parent, args) => museums.find(museum => museum.id === args.id )
        },
        museums: {
            type: new GraphQLList(MuseumType),
            description: 'List of All Museums',
            resolve: () => museums
        }
    })
});

const RootMutationType = new GraphQLObjectType({
    name: 'Mutation',
    description: 'Root Mutation',
    fields: () => ({
        addMuseum: {
            type: MuseumType,
            description: 'Add a Museum',
            args: {
                museumName: { type: new GraphQLNonNull(GraphQLString) },
                streetAddress: { type: GraphQLString },
                cityAddress: { type: GraphQLString },
                postcode: { type: GraphQLString },
                phoneNum: { type: GraphQLString },
                website: { type: GraphQLString },
                description: { type: GraphQLString }
            },
            resolve: (parent, args) => {
                const museum = { id: museums.length + 1, museumName: args.museumName, streetAddress: args.streetAddress, cityAddress: args.cityAddress, postcode: args.postcode, phoneNum: args.phoneNum, website: args.website  }
                museums.push(museum)
                return museum
            }
        }
    })
});

//Creating a new GraphQL Schema, with options query which defines query
// will allow users to use when they are making request
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutationType
});
