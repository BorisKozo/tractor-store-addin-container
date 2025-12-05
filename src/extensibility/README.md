# AddinContainer

The addin container provides a facility for distributed configuration of the application.
It does not provide state management and should not be used for this purpose!

### Usage

The addin container stores elements of `Addin<T>` type in buckets arranged in a tree like manner.
Each `Addin<T>` must have a unique _id_ for the specific path where this addin is being added,
and _content_ which is the data that the addin stores. The content must be either an object or a function
(it cannot be a primitive value). In general, most of the time you will only need to worry about
the content of the addins.

When adding an addin to the container you must specify the _path_ to which the addin will be added.
Note that you can only add during the initialization stage and once the system is initialized you should
not add additional addins. This is not enforced in the current implementation but may be in the future.
The _path_ to which you add the addin consists of words seperated by '.' (you should stick to alphanumeric
characters when creating the path). There are helper functions to help you build the path from the parts
but most likely the path will be defined for you in some const that you will just use.

Each such _path_ is a contract between a configuration producer and a configuration consumer (similar to the
pub-sub pattern). For example, the main menu may define a certain path where the producers can add their
menu items. Once the application is initialized the menu will read this path and build the menu. The menu
doesn't care who added the addins as long as the content is of the correct type (the type is not enforced in any way
because JavaScript).

#### globalAddinContainer

While you can create as many instances of the addin container as you want, there is one instance called
`globalAddinContainer` which should be used throughout the entire system. You should always consume
the addins from this singleton.

#### Services

Services are helper classes that encapsulate some functionality under a single class.
The AddinContainer encapsulates the addition and retrieval of services.
Never store state in a service! The services are just a set of functions to interact with
other elements of the system.
