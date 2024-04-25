import { createApi } from "@reduxjs/toolkit/query/react";
import { graphqlRequestBaseQuery } from "@rtk-query/graphql-request-base-query";
import createHistory from "history/createBrowserHistory";
import authSlice from "../authSlice/authSlice";

export const api = createApi({
  tagTypes: ["User", "Coment"],
  baseQuery: graphqlRequestBaseQuery({
    url: "http://marketplace.node.ed.asmer.org.ua/graphql",
    prepareHeaders(headers, { getState }) {
      const { token } = getState().auth;
      if (token) {
        headers.set("Authorization", "Bearer " + token);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAdAll: builder.query({
      query: (skip) => ({
        document: `query allAd($count: String){
                    AdFind(query: $count) {
                      _id
                      title
                      tags
                      address
                      price
                      createdAt
                      images {_id text createdAt url originalFileName}
                    }
                  }`,
        variables: {
          count: JSON.stringify([
            {},
            { sort: [{ _id: -1 }], skip: [skip], limit: [12] },
          ]),
        },
      }),
    }),
    getAdMy: builder.query({
      query: (_id) => ({
        document: `query myAd($owner: String){
                    AdFind(query: $owner) {
                      _id
                      title
                      tags
                      address
                      price
                      createdAt
                      images {_id text createdAt url originalFileName}
                    }
                  }`,
        variables: {
          owner: JSON.stringify([
            { ___owner: {"$in": [_id] } },
            { sort: [{ _id: -1 }] }
          ]),
        },
      }),
    }),
    createNewAd: builder.mutation({
      query: (newAd) => ({
        document: `
                  mutation CreateNewAd($newAd: AdInput){
                    AdUpsert(ad: $newAd) {
                      _id
                    }
                  }`,
        variables: { "newAd":
          newAd
        }
      }),
    }),
    getAllAdCount: builder.query({
      query: () => ({
        document: `query allAdCount{
                    AdCount(query: "[{}]")
                  }`,
      }),
    }),
    getTagsAll: builder.query({
      query: () => ({
        document: `query allAdTagsss {
                    AdFind(query: "[{\\"$and\\": [{\\"tags\\": {\\"$ne\\": null}}, {\\"tags\\": {\\"$ne\\": \\"\\"}}] }]") {
                      _id
                      tags
                    }
                }`,
      }),
    }),
    getAllAdTagg: builder.query({
      query: ({ tag, skip }) => ({
        document: `query allAdTagg($q2: String){
                    AdFind(query: $q2) {
                      _id
                      title
                      tags
                      address
                      price
                      createdAt
                      images {_id text createdAt url originalFileName}
                    }
                  }`,
        variables: {
          q2: JSON.stringify([
            { tags: tag },
            { sort: [{ _id: -1 }], skip: skip, limit: [12] },
          ]),
        },
      }),
    }),
    getAllAdCountTags: builder.query({
      query: (tag) => ({
        document: `query allAdCount($q2: String){
                    AdCount(query: $q2)
                  }`,
        variables: {
          q2: JSON.stringify([
            { tags: tag },
          ]),
        },
      }),
    }),
    getAdOne: builder.query({
      query: ({ _id }) => ({
        document: `query AdOne($q1: String) {
                    AdFindOne(query: $q1) {
                      _id
                      title
                      description
                      tags
                      address
                      price
                      createdAt
                      owner {
                        _id
                        createdAt
                        login
                        nick
                        avatar {
                          _id
                          createdAt
                          text
                          url
                          originalFileName
                        }
                      }
                      images {_id text createdAt url originalFileName}
                      comments {
                        _id
                        text
                        createdAt
                        owner {
                          _id
                          createdAt
                          login
                          nick
                          avatar {
                            _id
                            createdAt
                            text
                            url
                            originalFileName
                          }
                        }
                      }
                    }
                }`,
        variables: { q1: JSON.stringify([{ _id }]) },
      }),
      providesTags: (result, error, { _id }) => {
        return [{ type: "Comment", id: _id }];
      },
    }),
    addComment: builder.mutation({
      query: ({ _id, text }) => ({
        document: `
                mutation addComment($comment: CommentInput!) {
                    CommentUpsert (comment: $comment) {
                      _id
                    }
                }`,
        variables: JSON.stringify({
          comment: {
            text: text,
            ad: {
              _id: _id,
            },
          },
        }),
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Comment", id: arg._id },
      ],
    }),
    login: builder.mutation({
      query: ({ login, password }) => ({
        document: `
                    query login($login: String!, $password: String!) {
                        login(login: $login, password: $password)
                    }
                    `,
        variables: { login, password },
      }),
    }),
    registration: builder.mutation({
      query: ({ login, password }) => ({
        document: `
                    mutation reg($login: String!, $password: String!) {
                        createUser(login: $login, password: $password) {
                        _id
                        login
                        }
                    }
                    `,
        variables: { login, password },
      }),
    }),
    getUserById: builder.query({
      query: ({ _id }) => ({
        document: `query oneUser($query: String){
                    UserFindOne(query: $query){
                        _id login nick createdAt phones addresses avatar{ url text _id originalFileName }
                    }
                }`,
        variables: { query: JSON.stringify([{ _id }]) },
      }),
      providesTags: (result, error, { _id }) => {
        return [{ type: "User", id: _id }];
      },
    }),
    setCreateUser: builder.mutation({
      query: ({ newUser }) => ({
        document: `
                      mutation createUser($newUser: UserInput!) {
                          UserUpsert (user: $newUser) {
                              _id login nick createdAt phones addresses avatar{ _id }
                          }
                      }
                      `,
        variables: JSON.stringify({ newUser }),
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "User", id: arg.newUser._id },
      ],
    }),
  }),
});

export const history = createHistory();

export const useGetAdAllQuery = api.useGetAdAllQuery;
export const useLoginMutation = api.useLoginMutation;
export const useGetAdOneQuery = api.useGetAdOneQuery;
export const useRegistrationMutation = api.useRegistrationMutation;
export const useGetAllAdTaggQuery = api.useGetAllAdTaggQuery;
export const useGetTagsAllQuery = api.useGetTagsAllQuery;
export const useAddCommentMutation = api.useAddCommentMutation;
export const useSetCreateUserMutation = api.useSetCreateUserMutation;
export const useGetAllAdCountQuery = api.useGetAllAdCountQuery;
export const useGetAdMyQuery = api.useGetAdMyQuery;
export const useCreateNewAdMutation = api.useCreateNewAdMutation;
export const useGetAllAdCountTagsQuery = api.useGetAllAdCountTagsQuery;
