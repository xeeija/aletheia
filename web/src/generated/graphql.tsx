import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type AppError = {
  __typename?: 'AppError';
  errorCode: Scalars['Int'];
  errorMessage?: Maybe<Scalars['String']>;
  fieldErrors?: Maybe<Array<FieldError>>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createRandomWheel: RandomWheelResponse;
  deleteRandomWheel?: Maybe<AppError>;
  login: UserResponse;
  logout: Scalars['Boolean'];
  register: UserResponse;
  updateRandomWheel: RandomWheelResponse;
  updateUser: UserResponse;
};


export type MutationCreateRandomWheelArgs = {
  name?: Maybe<Scalars['String']>;
};


export type MutationDeleteRandomWheelArgs = {
  id: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationRegisterArgs = {
  displayname?: Maybe<Scalars['String']>;
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationUpdateRandomWheelArgs = {
  id: Scalars['String'];
  options: RandomWheelInput;
};


export type MutationUpdateUserArgs = {
  user: UserInput;
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  myRandomWheels: RandomWheelListResponse;
  randomWwheelBySlug: RandomWheelResponse;
};


export type QueryRandomWwheelBySlugArgs = {
  slug: Scalars['String'];
};

export type RandomWheel = {
  __typename?: 'RandomWheel';
  _count?: Maybe<RandomWheelCount>;
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  ownerId: Scalars['String'];
  slug: Scalars['String'];
};

export type RandomWheelCount = {
  __typename?: 'RandomWheelCount';
  entries: Scalars['Int'];
  members: Scalars['Int'];
  winners: Scalars['Int'];
};

export type RandomWheelInput = {
  name?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
};

export type RandomWheelList = {
  __typename?: 'RandomWheelList';
  items: Array<RandomWheel>;
};

export type RandomWheelListResponse = AppError | RandomWheelList;

export type RandomWheelResponse = AppError | RandomWheel;

export type User = {
  __typename?: 'User';
  _count?: Maybe<UserCount>;
  createdAt: Scalars['DateTime'];
  displayname?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  username: Scalars['String'];
};

export type UserCount = {
  __typename?: 'UserCount';
  drawnWinners: Scalars['Int'];
  randomWheelMember: Scalars['Int'];
  randomWheels: Scalars['Int'];
};

export type UserInput = {
  displayname?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type NormalUserFragment = { __typename?: 'User', id: string, username: string, displayname?: Maybe<string> };

export type CreateRandomWheelMutationVariables = Exact<{
  name?: Maybe<Scalars['String']>;
}>;


export type CreateRandomWheelMutation = { __typename?: 'Mutation', createRandomWheel: { __typename?: 'AppError', errorMessage?: Maybe<string>, errorCode: number, fieldErrors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>> } | { __typename?: 'RandomWheel', id: string, slug: string, name?: Maybe<string>, createdAt: any, ownerId: string } };

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', user?: Maybe<{ __typename?: 'User', id: string, username: string, displayname?: Maybe<string> }>, errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>> } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
  displayname?: Maybe<Scalars['String']>;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', user?: Maybe<{ __typename?: 'User', id: string, username: string, displayname?: Maybe<string> }>, errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>> } };

export type UpdateUserMutationVariables = Exact<{
  user: UserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'UserResponse', user?: Maybe<{ __typename?: 'User', id: string, username: string, displayname?: Maybe<string> }>, errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>> } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: Maybe<{ __typename?: 'User', id: string, username: string, displayname?: Maybe<string> }> };

export type MyRandomWheelsQueryVariables = Exact<{ [key: string]: never; }>;


export type MyRandomWheelsQuery = { __typename?: 'Query', myRandomWheels: { __typename?: 'AppError', errorCode: number, errorMessage?: Maybe<string>, fieldErrors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>> } | { __typename?: 'RandomWheelList', items: Array<{ __typename?: 'RandomWheel', id: string, slug: string, name?: Maybe<string>, createdAt: any, ownerId: string }> } };

export type RandomWheelBySlugQueryVariables = Exact<{
  slug: Scalars['String'];
}>;


export type RandomWheelBySlugQuery = { __typename?: 'Query', randomWwheelBySlug: { __typename?: 'AppError', errorCode: number, errorMessage?: Maybe<string>, fieldErrors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>> } | { __typename?: 'RandomWheel', id: string, slug: string, name?: Maybe<string>, createdAt: any, ownerId: string } };

export const NormalUserFragmentDoc = gql`
    fragment NormalUser on User {
  id
  username
  displayname
}
    `;
export const CreateRandomWheelDocument = gql`
    mutation CreateRandomWheel($name: String) {
  createRandomWheel(name: $name) {
    ... on RandomWheel {
      id
      slug
      name
      createdAt
      ownerId
    }
    ... on AppError {
      errorMessage
      errorCode
      fieldErrors {
        field
        message
      }
    }
  }
}
    `;

export function useCreateRandomWheelMutation() {
  return Urql.useMutation<CreateRandomWheelMutation, CreateRandomWheelMutationVariables>(CreateRandomWheelDocument);
};
export const LoginDocument = gql`
    mutation Login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    user {
      ...NormalUser
    }
    errors {
      field
      message
    }
  }
}
    ${NormalUserFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RegisterDocument = gql`
    mutation Register($username: String!, $password: String!, $displayname: String) {
  register(username: $username, password: $password, displayname: $displayname) {
    user {
      ...NormalUser
    }
    errors {
      field
      message
    }
  }
}
    ${NormalUserFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const UpdateUserDocument = gql`
    mutation UpdateUser($user: UserInput!) {
  updateUser(user: $user) {
    user {
      ...NormalUser
    }
    errors {
      field
      message
    }
  }
}
    ${NormalUserFragmentDoc}`;

export function useUpdateUserMutation() {
  return Urql.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument);
};
export const MeDocument = gql`
    query Me {
  me {
    ...NormalUser
  }
}
    ${NormalUserFragmentDoc}`;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};
export const MyRandomWheelsDocument = gql`
    query MyRandomWheels {
  myRandomWheels {
    ... on RandomWheelList {
      items {
        id
        slug
        name
        createdAt
        ownerId
      }
    }
    ... on AppError {
      errorCode
      errorMessage
      fieldErrors {
        field
        message
      }
    }
  }
}
    `;

export function useMyRandomWheelsQuery(options: Omit<Urql.UseQueryArgs<MyRandomWheelsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MyRandomWheelsQuery>({ query: MyRandomWheelsDocument, ...options });
};
export const RandomWheelBySlugDocument = gql`
    query RandomWheelBySlug($slug: String!) {
  randomWwheelBySlug(slug: $slug) {
    ... on RandomWheel {
      id
      slug
      name
      createdAt
      ownerId
    }
    ... on AppError {
      errorCode
      errorMessage
      fieldErrors {
        field
        message
      }
    }
  }
}
    `;

export function useRandomWheelBySlugQuery(options: Omit<Urql.UseQueryArgs<RandomWheelBySlugQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<RandomWheelBySlugQuery>({ query: RandomWheelBySlugDocument, ...options });
};