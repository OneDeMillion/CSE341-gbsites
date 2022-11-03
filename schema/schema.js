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

var reviews = [
    { id: 1, review: "Interesting museum, but more for adults", museumId: 1 },
    { id: 2, review: "How did I not know there were this many battles?!?! Can't wait to go back!", museumId: 1},
    { id: 3, review: "This is the best museum in all of the UK! Everyone should visit here!", museumId: 2},
    { id: 4, review: "I learned so much! I cried at the sacrifice! I was in awe at the bravery!", museumId: 2 },
    { id: 5, review: "Lots of info, but very depressing!", museumId: 3 }
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
        phoneNum: {type: GraphQLInt},
        website: {type: GraphQLString},
        description: {type: GraphQLString},
        review: {
            type: ReviewType,
            resolve: (museum) => {
                return reviews.find(review => museum.id === review.museumId)
            }
        }
    })
});

const ReviewType = new GraphQLObjectType({
    name: 'Review',
    description: 'This represents a review of a museum',
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLInt) },
        review: {type: new GraphQLNonNull(GraphQLString) },
        museums: { 
            type: new GraphQLList(MuseumType),
            resolve: (review) => {
                return museums.filter(museum => museum.id === review.museumId)
            } 
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({    
        museums: {
            type: new GraphQLList(MuseumType),
            description: 'List of All Museums',
            resolve: () => museums
        },
        reviews: {
            type: new GraphQLList(ReviewType),
            description: 'List of All Reviews',
            resolve: () => reviews
        }
    })
});






//Creating a new GraphQL Schema, with options query which defines query
// will allow users to use when they are making request
module.exports = new GraphQLSchema({
    query: RootQuery
});
