module.exports = {
  Query: {
    clients: () => {
      return [
        { name: 'Snoop', age: 42 },
        { name: 'Dre', age: 52 }
      ]
    },
    client: () => {}
  },
  Mutation: {
    addClient: () => {}
  },
  Client: {
    products: () => {}
  }
}
