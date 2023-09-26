const { User, Book } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

// Resolvers to run Queries and Mutations
const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      // Check if a user is authenticated (context.user is set)
      if (context.user) {
        // If authenticated, fetch the user's data while excluding sensitive fields
        const userData = await User.findOne({ _id: context.user._id })
          .select("-__v -password")
          .populate('savedBooks');
        return userData;
      }

      // If not authenticated, throw an AuthenticationError
      throw new AuthenticationError("Not logged in");
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      // Create a new user based on input arguments
      const user = await User.create(args);
      // Generate a token for the new user
      const token = signToken(user);

      // Return the generated token and user data
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      // Find a user with the provided email
      const user = await User.findOne({ email });

      // If the user doesn't exist, throw an AuthenticationError
      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      // Check if the provided password is correct
      const correctPw = await user.isCorrectPassword(password);

      // If the password is incorrect, throw an AuthenticationError
      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      // Generate a token for the authenticated user
      const token = signToken(user);

      // Return the generated token and user data
      return { token, user };
    },
    saveBook: async (parent, args, context) => {
      // Check if a user is authenticated (context.user is set)
      if (context.user) {
        // Find and update the user's data to add a saved book
        let user = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: args.input } },
          { new: true }
        );

        // Return the updated user data
        return user;
      }

      // If not authenticated, throw an AuthenticationError
      throw new AuthenticationError("You need to be logged in!");
    },
    removeBook: async (parent, args, context) => {
      // Check if a user is authenticated (context.user is set)
      if (context.user) {
        // Find and update the user's data to remove a saved book by bookId
        let user = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId: args.bookId } } },
          { new: true }
        );

        // Return the updated user data
        return user;
      }

      // If not authenticated, throw an AuthenticationError
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
