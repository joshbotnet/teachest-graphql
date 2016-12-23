# TeaChest GraphQL

<p><img src="./static/teachest.png" width="220px" /></p>

GraphQL Server based on apollostack/graphql-server-express

This is one of 3 related projects:

- `VueJS App` - https://github.com/joshbotnet/teachest-vuejs.git
- `Express Server` - https://github.com/joshbotnet/teachest-express.git
- `GraphQL Server` - https://github.com/joshbotnet/teachest-graphql.git

See the TeaChest Stack README for details:

- https://github.com/joshbotnet/teachest-stack.git

References for this project:

- https://github.com/apollostack/frontpage-server
- https://github.com/apollostack/graphql-server
- https://github.com/apollostack/graphql-server-express

GraphQL Schema:

Queries:

```
query {
  users {
    id
  }
}
```

Mutations:

```
mutation ($firstName: String, $lastName: String) {
  createUser (firstName: $firstName, lastName: $lastName)  {
    firstName: firstName,
    lastName: lastName
  }
}

with

{
  "firstName": "John",
  "lastName": "Citizen"
}
```

```
mutation ($title: String, $content: String, $user: String) {
  createPost (title: $title, content: $content, user: $user)  {
    title: title,
    content: content,
    user: user {
      id
    }
  }
}

with

{
  "title": "Post 3 title",
  "content": "Post 3 content",
  "user": "585d8e0e641fc60c7cf06cbe"
}
```