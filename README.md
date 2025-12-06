# The Tractor Store - React & Module Federation

An implementation of [The Tractor Store](https://micro-frontends.org/tractor-store/) built with React, Vite and AddinContainer. 
It's based on the [Blueprint](https://github.com/neuland/tractor-store-blueprint).
And heavily inspired by the implementation by [Kent Li](https://github.com/teabyii/tractor-store-react)

## About This Implementation

This is an implementation of the Micro Frontends tractor store except it doesn't ues MF and instead uses an alternative method to achieve similar result.
I strongly believe in the [SOLID](https://www.digitalocean.com/community/conceptual-articles/s-o-l-i-d-the-first-five-principles-of-object-oriented-design) design principals
and I felt like the MF paradigm is pushing you towards breaking some of these principals. In my implementation I take great care
not to break the DIP and the Open-closed principals while still supporting full separation between the modules.
Essentially each module can be deployed separately withing the monolithic structure giving you the benefits of a monolith design and of the 
separation of MF. Notice how eslint prevents you from importing from other modules and the common to import any modules.
Each team can be assigned with one or more modules which can be developed separately. Consider a case where one
of the modules is deleted, the application would continue working as usual except all the functionality that was
provided by this module will not be available. Everything else should not break.

### Technologies

List of techniques used in this implementation.

| Aspect                     | Solution                                      |
| -------------------------- |-----------------------------------------------|
| 🛠️ Frameworks, Libraries   | [React], [React-Router], [Vite]               |
| 📝 Rendering               | SPA                                           |
| 🐚 Application Shell       | [Vite]                                        |
| 🧩 Client-Side Integration | [AddinContainer]                              |
| 🧩 Server-Side Integration | None                                          |
| 📣 Communication           | [AddinContainer]               |
| 🗺️ Navigation              | SPA, One module per Team, history API routing |
| 🎨 Styling                 | Self-Contained CSS (No Global Styles)         |
| 🍱 Design System           | None                                          |
| 🔮 Discovery               | None                                          |
| 🚚 Deployment              | Local only                                    |
| 👩‍💻 Local Development       | [Vite]                                        |

[React]: https://react.dev/
[React-Router]: https://reactrouter.com/en/main
[Vite]: https://vite.dev/
[AddinContainer]: /src/extensibility/AddinContainer.ts


### Limitations

This implementation is deliberately kept simple to focus on the separation of concerns aspects. 
URLs are hardcoded, components could be more DRY and no linting, testing or type-safety is implemented. 
In a real-world scenario, these aspects should be addressed properly.

### Performance

![pagespeed](./pagespeed.png)

## How to run locally

Run the following commands:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open  http://localhost:5173/ in your browser to see the integrated application.

Alternatively, you can use the `npm run build` command to build the application locally and run it with your favorite webserver.

## About The Authors



## License

This sample code is released using the MIT license. For more information, see the [LICENSE](LICENSE) file.