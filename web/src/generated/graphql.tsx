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
  DateTime: any;
};

export type AccessType = {
  __typename?: 'AccessType';
  _count?: Maybe<AccessTypeCount>;
  type: Scalars['String'];
};

export type AccessTypeCount = {
  __typename?: 'AccessTypeCount';
  randomWheel: Scalars['Int'];
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
  addRandomWheelEntry: RandomWheelEntry;
  clearRandomWheel: Scalars['Int'];
  createRandomWheel: RandomWheel;
  deleteRandomWheel?: Maybe<AppError>;
  deleteRandomWheelEntry?: Maybe<Scalars['Boolean']>;
  deleteRandomWheelMember?: Maybe<Scalars['Boolean']>;
  likeRandomWheel?: Maybe<RandomWheelLike>;
  login: UserResponse;
  logout: Scalars['Boolean'];
  register: UserResponse;
  spinRandomWheel: RandomWheelWinner;
  updateRandomWheel?: Maybe<RandomWheel>;
  updateRandomWheelEntry: RandomWheelEntry;
  updateRandomWheelMembers?: Maybe<Array<RandomWheelMember>>;
  updateUser: UserResponse;
  usernameExists: Scalars['Boolean'];
};


export type MutationAddRandomWheelEntryArgs = {
  name: Scalars['String'];
  randomWheelId: Scalars['String'];
};


export type MutationClearRandomWheelArgs = {
  id: Scalars['String'];
};


export type MutationCreateRandomWheelArgs = {
  accessType?: Maybe<Scalars['String']>;
  fadeDuration?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  spinDuration?: Maybe<Scalars['Int']>;
};


export type MutationDeleteRandomWheelArgs = {
  id: Scalars['String'];
};


export type MutationDeleteRandomWheelEntryArgs = {
  id: Scalars['String'];
};


export type MutationDeleteRandomWheelMemberArgs = {
  id: Scalars['String'];
};


export type MutationLikeRandomWheelArgs = {
  like: Scalars['Boolean'];
  randomWheelId: Scalars['String'];
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


export type MutationSpinRandomWheelArgs = {
  randommWheelId: Scalars['String'];
};


export type MutationUpdateRandomWheelArgs = {
  id: Scalars['String'];
  options: RandomWheelInput;
};


export type MutationUpdateRandomWheelEntryArgs = {
  entry: RandomWheelEntryInput;
  id: Scalars['String'];
};


export type MutationUpdateRandomWheelMembersArgs = {
  members: Array<RandomWheelMemberInput>;
  randomWheelId: Scalars['String'];
};


export type MutationUpdateUserArgs = {
  user: UserInput;
};


export type MutationUsernameExistsArgs = {
  username: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  myRandomWheels: Array<RandomWheel>;
  randomWheelBySlug?: Maybe<RandomWheel>;
};


export type QueryMyRandomWheelsArgs = {
  type?: Maybe<Scalars['String']>;
};


export type QueryRandomWheelBySlugArgs = {
  slug: Scalars['String'];
};

export type RandomWheel = {
  __typename?: 'RandomWheel';
  _count?: Maybe<RandomWheelCount>;
  access: Array<AccessType>;
  accessType: Scalars['String'];
  createdAt: Scalars['DateTime'];
  editable: Scalars['Boolean'];
  entries: Array<RandomWheelEntry>;
  fadeDuration: Scalars['Int'];
  id: Scalars['String'];
  liked: Scalars['Boolean'];
  members: Array<RandomWheelMember>;
  name?: Maybe<Scalars['String']>;
  owner: User;
  ownerId: Scalars['String'];
  rotation: Scalars['Float'];
  slug: Scalars['String'];
  spinDuration: Scalars['Int'];
  uniqueEntries: Scalars['Boolean'];
  winners: Array<RandomWheelWinner>;
};

export type RandomWheelCount = {
  __typename?: 'RandomWheelCount';
  entries: Scalars['Int'];
  likes: Scalars['Int'];
  members: Scalars['Int'];
  winners: Scalars['Int'];
};

export type RandomWheelEntry = {
  __typename?: 'RandomWheelEntry';
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  name: Scalars['String'];
  randomWheelId: Scalars['String'];
  weight: Scalars['Int'];
};

export type RandomWheelEntryInput = {
  name?: Maybe<Scalars['String']>;
  weight?: Maybe<Scalars['Int']>;
};

export type RandomWheelInput = {
  accessType?: Maybe<Scalars['String']>;
  fadeDuration?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  spinDuration?: Maybe<Scalars['Int']>;
};

export type RandomWheelLike = {
  __typename?: 'RandomWheelLike';
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  randomWheelId: Scalars['String'];
  userId: Scalars['String'];
};

export type RandomWheelMember = {
  __typename?: 'RandomWheelMember';
  id: Scalars['String'];
  randomWheelId: Scalars['String'];
  role: RandomWheelRole;
  roleName: Scalars['String'];
  user: User;
  userId: Scalars['String'];
};

export type RandomWheelMemberInput = {
  delete?: Maybe<Scalars['Boolean']>;
  id?: Maybe<Scalars['String']>;
  role: Scalars['String'];
  username: Scalars['String'];
};

export type RandomWheelRole = {
  __typename?: 'RandomWheelRole';
  _count?: Maybe<RandomWheelRoleCount>;
  description?: Maybe<Scalars['String']>;
  name: Scalars['String'];
};

export type RandomWheelRoleCount = {
  __typename?: 'RandomWheelRoleCount';
  members: Scalars['Int'];
};

export type RandomWheelWinner = {
  __typename?: 'RandomWheelWinner';
  createdAt: Scalars['DateTime'];
  drawnById: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  randomWheelId: Scalars['String'];
  winnerIndex?: Maybe<Scalars['Int']>;
};

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
  likes: Scalars['Int'];
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

export type RandomWheelDetailsFragment = { __typename?: 'RandomWheel', id: string, slug: string, name?: Maybe<string>, createdAt: any, rotation: number, spinDuration: number, fadeDuration: number, accessType: string, editable: boolean, liked: boolean, _count?: Maybe<{ __typename?: 'RandomWheelCount', entries: number }> };

export type RandomWheelEntryFragment = { __typename?: 'RandomWheelEntry', id: string, name: string, weight: number };

export type RandomWheelWinnerFragment = { __typename?: 'RandomWheelWinner', id: string, name: string, createdAt: any, winnerIndex?: Maybe<number> };

export type RandomWheelMemberFragment = { __typename?: 'RandomWheelMember', id: string, roleName: string, user: { __typename?: 'User', id: string, username: string, displayname?: Maybe<string> } };

export type NormalUserFragment = { __typename?: 'User', id: string, username: string, displayname?: Maybe<string> };

export type UserNameFragment = { __typename?: 'User', id: string, username: string, displayname?: Maybe<string> };

export type AddRandomWheelEntryMutationVariables = Exact<{
  randomWheelId: Scalars['String'];
  name: Scalars['String'];
}>;


export type AddRandomWheelEntryMutation = { __typename?: 'Mutation', addRandomWheelEntry: { __typename?: 'RandomWheelEntry', id: string, name: string, weight: number } };

export type ClearRandomWheelMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type ClearRandomWheelMutation = { __typename?: 'Mutation', clearRandomWheel: number };

export type CreateRandomWheelMutationVariables = Exact<{
  name?: Maybe<Scalars['String']>;
  accessType?: Maybe<Scalars['String']>;
  spinDuration?: Maybe<Scalars['Int']>;
  fadeDuration?: Maybe<Scalars['Int']>;
}>;


export type CreateRandomWheelMutation = { __typename?: 'Mutation', createRandomWheel: { __typename?: 'RandomWheel', id: string, slug: string, name?: Maybe<string>, createdAt: any, rotation: number, spinDuration: number, fadeDuration: number, accessType: string, editable: boolean, liked: boolean, _count?: Maybe<{ __typename?: 'RandomWheelCount', entries: number }> } };

export type DeleteRandomWheelMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteRandomWheelMutation = { __typename?: 'Mutation', deleteRandomWheel?: Maybe<{ __typename?: 'AppError', errorMessage?: Maybe<string>, errorCode: number }> };

export type DeleteRandomWheelEntryMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteRandomWheelEntryMutation = { __typename?: 'Mutation', deleteRandomWheelEntry?: Maybe<boolean> };

export type LikeRandomWheelMutationVariables = Exact<{
  randomWheelId: Scalars['String'];
  like: Scalars['Boolean'];
}>;


export type LikeRandomWheelMutation = { __typename?: 'Mutation', likeRandomWheel?: Maybe<{ __typename?: 'RandomWheelLike', id: string, userId: string, randomWheelId: string, createdAt: any }> };

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

export type SpinRandomWheelMutationVariables = Exact<{
  wheelId: Scalars['String'];
}>;


export type SpinRandomWheelMutation = { __typename?: 'Mutation', spinRandomWheel: { __typename?: 'RandomWheelWinner', id: string, name: string, createdAt: any, drawnById: string, randomWheelId: string, winnerIndex?: Maybe<number> } };

export type UpdateRandomWheelMutationVariables = Exact<{
  id: Scalars['String'];
  options: RandomWheelInput;
}>;


export type UpdateRandomWheelMutation = { __typename?: 'Mutation', updateRandomWheel?: Maybe<{ __typename?: 'RandomWheel', id: string, slug: string, name?: Maybe<string>, createdAt: any, rotation: number, spinDuration: number, fadeDuration: number, accessType: string, editable: boolean, liked: boolean, _count?: Maybe<{ __typename?: 'RandomWheelCount', entries: number }> }> };

export type UpdateRandomWheelEntryMutationVariables = Exact<{
  id: Scalars['String'];
  entry: RandomWheelEntryInput;
}>;


export type UpdateRandomWheelEntryMutation = { __typename?: 'Mutation', updateRandomWheelEntry: { __typename?: 'RandomWheelEntry', id: string, name: string, weight: number } };

export type UpdateRandomWheelMembersMutationVariables = Exact<{
  randomWheelId: Scalars['String'];
  members: Array<RandomWheelMemberInput> | RandomWheelMemberInput;
}>;


export type UpdateRandomWheelMembersMutation = { __typename?: 'Mutation', updateRandomWheelMembers?: Maybe<Array<{ __typename?: 'RandomWheelMember', id: string }>> };

export type UpdateUserMutationVariables = Exact<{
  user: UserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'UserResponse', user?: Maybe<{ __typename?: 'User', id: string, username: string, displayname?: Maybe<string> }>, errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>> } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: Maybe<{ __typename?: 'User', id: string, username: string, displayname?: Maybe<string> }> };

export type MyRandomWheelsQueryVariables = Exact<{
  type?: Maybe<Scalars['String']>;
}>;


export type MyRandomWheelsQuery = { __typename?: 'Query', myRandomWheels: Array<{ __typename?: 'RandomWheel', id: string, slug: string, name?: Maybe<string>, createdAt: any, rotation: number, spinDuration: number, fadeDuration: number, accessType: string, editable: boolean, liked: boolean, _count?: Maybe<{ __typename?: 'RandomWheelCount', entries: number }> }> };

export type RandomWheelBySlugQueryVariables = Exact<{
  slug: Scalars['String'];
}>;


export type RandomWheelBySlugQuery = { __typename?: 'Query', randomWheelBySlug?: Maybe<{ __typename?: 'RandomWheel', id: string, slug: string, name?: Maybe<string>, createdAt: any, rotation: number, spinDuration: number, fadeDuration: number, accessType: string, editable: boolean, liked: boolean, owner: { __typename?: 'User', id: string, username: string, displayname?: Maybe<string> }, members: Array<{ __typename?: 'RandomWheelMember', userId: string, roleName: string }>, _count?: Maybe<{ __typename?: 'RandomWheelCount', entries: number }> }> };

export type RandomWheelBySlugEntriesQueryVariables = Exact<{
  slug: Scalars['String'];
}>;


export type RandomWheelBySlugEntriesQuery = { __typename?: 'Query', randomWheelBySlug?: Maybe<{ __typename?: 'RandomWheel', entries: Array<{ __typename?: 'RandomWheelEntry', id: string, name: string, weight: number }> }> };

export type RandomWheelBySlugMembersQueryVariables = Exact<{
  slug: Scalars['String'];
}>;


export type RandomWheelBySlugMembersQuery = { __typename?: 'Query', randomWheelBySlug?: Maybe<{ __typename?: 'RandomWheel', id: string, members: Array<{ __typename?: 'RandomWheelMember', id: string, roleName: string, user: { __typename?: 'User', id: string, username: string, displayname?: Maybe<string> } }> }> };

export type RandomWheelBySlugWinnersQueryVariables = Exact<{
  slug: Scalars['String'];
}>;


export type RandomWheelBySlugWinnersQuery = { __typename?: 'Query', randomWheelBySlug?: Maybe<{ __typename?: 'RandomWheel', winners: Array<{ __typename?: 'RandomWheelWinner', id: string, name: string, createdAt: any, winnerIndex?: Maybe<number> }> }> };

export type UsernameExistsMutationVariables = Exact<{
  username: Scalars['String'];
}>;


export type UsernameExistsMutation = { __typename?: 'Mutation', usernameExists: boolean };

export const RandomWheelDetailsFragmentDoc = gql`
    fragment RandomWheelDetails on RandomWheel {
  id
  slug
  name
  createdAt
  rotation
  spinDuration
  fadeDuration
  accessType
  editable
  liked
  _count {
    entries
  }
}
    `;
export const RandomWheelEntryFragmentDoc = gql`
    fragment RandomWheelEntry on RandomWheelEntry {
  id
  name
  weight
}
    `;
export const RandomWheelWinnerFragmentDoc = gql`
    fragment RandomWheelWinner on RandomWheelWinner {
  id
  name
  createdAt
  winnerIndex
}
    `;
export const UserNameFragmentDoc = gql`
    fragment UserName on User {
  id
  username
  displayname
}
    `;
export const RandomWheelMemberFragmentDoc = gql`
    fragment RandomWheelMember on RandomWheelMember {
  id
  roleName
  user {
    ...UserName
  }
}
    ${UserNameFragmentDoc}`;
export const NormalUserFragmentDoc = gql`
    fragment NormalUser on User {
  id
  username
  displayname
}
    `;
export const AddRandomWheelEntryDocument = gql`
    mutation AddRandomWheelEntry($randomWheelId: String!, $name: String!) {
  addRandomWheelEntry(randomWheelId: $randomWheelId, name: $name) {
    ...RandomWheelEntry
  }
}
    ${RandomWheelEntryFragmentDoc}`;

export function useAddRandomWheelEntryMutation() {
  return Urql.useMutation<AddRandomWheelEntryMutation, AddRandomWheelEntryMutationVariables>(AddRandomWheelEntryDocument);
};
export const ClearRandomWheelDocument = gql`
    mutation ClearRandomWheel($id: String!) {
  clearRandomWheel(id: $id)
}
    `;

export function useClearRandomWheelMutation() {
  return Urql.useMutation<ClearRandomWheelMutation, ClearRandomWheelMutationVariables>(ClearRandomWheelDocument);
};
export const CreateRandomWheelDocument = gql`
    mutation CreateRandomWheel($name: String, $accessType: String, $spinDuration: Int, $fadeDuration: Int) {
  createRandomWheel(
    name: $name
    accessType: $accessType
    spinDuration: $spinDuration
    fadeDuration: $fadeDuration
  ) {
    ...RandomWheelDetails
  }
}
    ${RandomWheelDetailsFragmentDoc}`;

export function useCreateRandomWheelMutation() {
  return Urql.useMutation<CreateRandomWheelMutation, CreateRandomWheelMutationVariables>(CreateRandomWheelDocument);
};
export const DeleteRandomWheelDocument = gql`
    mutation DeleteRandomWheel($id: String!) {
  deleteRandomWheel(id: $id) {
    errorMessage
    errorCode
  }
}
    `;

export function useDeleteRandomWheelMutation() {
  return Urql.useMutation<DeleteRandomWheelMutation, DeleteRandomWheelMutationVariables>(DeleteRandomWheelDocument);
};
export const DeleteRandomWheelEntryDocument = gql`
    mutation DeleteRandomWheelEntry($id: String!) {
  deleteRandomWheelEntry(id: $id)
}
    `;

export function useDeleteRandomWheelEntryMutation() {
  return Urql.useMutation<DeleteRandomWheelEntryMutation, DeleteRandomWheelEntryMutationVariables>(DeleteRandomWheelEntryDocument);
};
export const LikeRandomWheelDocument = gql`
    mutation LikeRandomWheel($randomWheelId: String!, $like: Boolean!) {
  likeRandomWheel(randomWheelId: $randomWheelId, like: $like) {
    id
    userId
    randomWheelId
    createdAt
  }
}
    `;

export function useLikeRandomWheelMutation() {
  return Urql.useMutation<LikeRandomWheelMutation, LikeRandomWheelMutationVariables>(LikeRandomWheelDocument);
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
export const SpinRandomWheelDocument = gql`
    mutation SpinRandomWheel($wheelId: String!) {
  spinRandomWheel(randommWheelId: $wheelId) {
    id
    name
    createdAt
    drawnById
    randomWheelId
    winnerIndex
  }
}
    `;

export function useSpinRandomWheelMutation() {
  return Urql.useMutation<SpinRandomWheelMutation, SpinRandomWheelMutationVariables>(SpinRandomWheelDocument);
};
export const UpdateRandomWheelDocument = gql`
    mutation UpdateRandomWheel($id: String!, $options: RandomWheelInput!) {
  updateRandomWheel(id: $id, options: $options) {
    ...RandomWheelDetails
  }
}
    ${RandomWheelDetailsFragmentDoc}`;

export function useUpdateRandomWheelMutation() {
  return Urql.useMutation<UpdateRandomWheelMutation, UpdateRandomWheelMutationVariables>(UpdateRandomWheelDocument);
};
export const UpdateRandomWheelEntryDocument = gql`
    mutation UpdateRandomWheelEntry($id: String!, $entry: RandomWheelEntryInput!) {
  updateRandomWheelEntry(id: $id, entry: $entry) {
    ...RandomWheelEntry
  }
}
    ${RandomWheelEntryFragmentDoc}`;

export function useUpdateRandomWheelEntryMutation() {
  return Urql.useMutation<UpdateRandomWheelEntryMutation, UpdateRandomWheelEntryMutationVariables>(UpdateRandomWheelEntryDocument);
};
export const UpdateRandomWheelMembersDocument = gql`
    mutation UpdateRandomWheelMembers($randomWheelId: String!, $members: [RandomWheelMemberInput!]!) {
  updateRandomWheelMembers(randomWheelId: $randomWheelId, members: $members) {
    id
  }
}
    `;

export function useUpdateRandomWheelMembersMutation() {
  return Urql.useMutation<UpdateRandomWheelMembersMutation, UpdateRandomWheelMembersMutationVariables>(UpdateRandomWheelMembersDocument);
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

export function useMeQuery(options?: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'>) {
  return Urql.useQuery<MeQuery, MeQueryVariables>({ query: MeDocument, ...options });
};
export const MyRandomWheelsDocument = gql`
    query MyRandomWheels($type: String) {
  myRandomWheels(type: $type) {
    ...RandomWheelDetails
  }
}
    ${RandomWheelDetailsFragmentDoc}`;

export function useMyRandomWheelsQuery(options?: Omit<Urql.UseQueryArgs<MyRandomWheelsQueryVariables>, 'query'>) {
  return Urql.useQuery<MyRandomWheelsQuery, MyRandomWheelsQueryVariables>({ query: MyRandomWheelsDocument, ...options });
};
export const RandomWheelBySlugDocument = gql`
    query RandomWheelBySlug($slug: String!) {
  randomWheelBySlug(slug: $slug) {
    ...RandomWheelDetails
    owner {
      ...UserName
    }
    members {
      userId
      roleName
    }
  }
}
    ${RandomWheelDetailsFragmentDoc}
${UserNameFragmentDoc}`;

export function useRandomWheelBySlugQuery(options: Omit<Urql.UseQueryArgs<RandomWheelBySlugQueryVariables>, 'query'>) {
  return Urql.useQuery<RandomWheelBySlugQuery, RandomWheelBySlugQueryVariables>({ query: RandomWheelBySlugDocument, ...options });
};
export const RandomWheelBySlugEntriesDocument = gql`
    query RandomWheelBySlugEntries($slug: String!) {
  randomWheelBySlug(slug: $slug) {
    entries {
      ...RandomWheelEntry
    }
  }
}
    ${RandomWheelEntryFragmentDoc}`;

export function useRandomWheelBySlugEntriesQuery(options: Omit<Urql.UseQueryArgs<RandomWheelBySlugEntriesQueryVariables>, 'query'>) {
  return Urql.useQuery<RandomWheelBySlugEntriesQuery, RandomWheelBySlugEntriesQueryVariables>({ query: RandomWheelBySlugEntriesDocument, ...options });
};
export const RandomWheelBySlugMembersDocument = gql`
    query RandomWheelBySlugMembers($slug: String!) {
  randomWheelBySlug(slug: $slug) {
    id
    members {
      ...RandomWheelMember
    }
  }
}
    ${RandomWheelMemberFragmentDoc}`;

export function useRandomWheelBySlugMembersQuery(options: Omit<Urql.UseQueryArgs<RandomWheelBySlugMembersQueryVariables>, 'query'>) {
  return Urql.useQuery<RandomWheelBySlugMembersQuery, RandomWheelBySlugMembersQueryVariables>({ query: RandomWheelBySlugMembersDocument, ...options });
};
export const RandomWheelBySlugWinnersDocument = gql`
    query RandomWheelBySlugWinners($slug: String!) {
  randomWheelBySlug(slug: $slug) {
    winners {
      ...RandomWheelWinner
    }
  }
}
    ${RandomWheelWinnerFragmentDoc}`;

export function useRandomWheelBySlugWinnersQuery(options: Omit<Urql.UseQueryArgs<RandomWheelBySlugWinnersQueryVariables>, 'query'>) {
  return Urql.useQuery<RandomWheelBySlugWinnersQuery, RandomWheelBySlugWinnersQueryVariables>({ query: RandomWheelBySlugWinnersDocument, ...options });
};
export const UsernameExistsDocument = gql`
    mutation UsernameExists($username: String!) {
  usernameExists(username: $username)
}
    `;

export function useUsernameExistsMutation() {
  return Urql.useMutation<UsernameExistsMutation, UsernameExistsMutationVariables>(UsernameExistsDocument);
};