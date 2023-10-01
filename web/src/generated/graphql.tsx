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
  BigInt: any;
  DateTime: any;
  JSON: any;
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

export type ColorTheme = {
  __typename?: 'ColorTheme';
  _count?: Maybe<ColorThemeCount>;
  colors: Array<Scalars['String']>;
  creatorId?: Maybe<Scalars['String']>;
  global: Scalars['Boolean'];
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
};

export type ColorThemeCount = {
  __typename?: 'ColorThemeCount';
  randomWheels: Scalars['Int'];
  usersStandard: Scalars['Int'];
};

export type ColorThemeInput = {
  colors?: Maybe<Array<Scalars['String']>>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type CustomReward = {
  __typename?: 'CustomReward';
  autoFulfill: Scalars['Boolean'];
  backgroundColor: Scalars['String'];
  broadcasterDisplayName: Scalars['String'];
  broadcasterId: Scalars['String'];
  broadcasterName: Scalars['String'];
  cooldownExpiryDate?: Maybe<Scalars['DateTime']>;
  cost: Scalars['Float'];
  globalCooldown?: Maybe<Scalars['Int']>;
  id: Scalars['String'];
  image: Scalars['String'];
  isEnabled: Scalars['Boolean'];
  isInStock: Scalars['Boolean'];
  isPaused: Scalars['Boolean'];
  maxRedemptionsPerStream?: Maybe<Scalars['Int']>;
  maxRedemptionsPerUserPerStream?: Maybe<Scalars['Int']>;
  prompt: Scalars['String'];
  redemptionsThisStream?: Maybe<Scalars['Int']>;
  title: Scalars['String'];
  userInputRequired: Scalars['Boolean'];
};

export type EventSubscription = {
  __typename?: 'EventSubscription';
  condition?: Maybe<Scalars['JSON']>;
  id: Scalars['String'];
  paused: Scalars['Boolean'];
  randomWheelId?: Maybe<Scalars['String']>;
  reward?: Maybe<CustomReward>;
  rewardId?: Maybe<Scalars['String']>;
  subscriptionId?: Maybe<Scalars['String']>;
  twitchUserId: Scalars['String'];
  type: Scalars['String'];
  useInput: Scalars['Boolean'];
  userId?: Maybe<Scalars['String']>;
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
  deleteEntriesRedemptionSync?: Maybe<Scalars['Boolean']>;
  deleteRandomWheel?: Maybe<AppError>;
  deleteRandomWheelEntry?: Maybe<Scalars['Boolean']>;
  deleteRandomWheelMember?: Maybe<Scalars['Boolean']>;
  disconnectAccessToken: Scalars['Boolean'];
  eventSubDeleteAllSubscriptions: Scalars['Boolean'];
  likeRandomWheel?: Maybe<RandomWheelLike>;
  login: UserResponse;
  logout: Scalars['Boolean'];
  pauseEntriesRedemptionSync?: Maybe<EventSubscription>;
  register: UserResponse;
  spinRandomWheel: RandomWheelWinner;
  syncEntriesWithRedemption?: Maybe<EventSubscription>;
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
  editAnonymous?: Maybe<Scalars['Boolean']>;
  fadeDuration?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  spinDuration?: Maybe<Scalars['Int']>;
};


export type MutationDeleteEntriesRedemptionSyncArgs = {
  ids: Array<Scalars['String']>;
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


export type MutationPauseEntriesRedemptionSyncArgs = {
  id: Scalars['String'];
  pause: Scalars['Boolean'];
};


export type MutationRegisterArgs = {
  displayname?: Maybe<Scalars['String']>;
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationSpinRandomWheelArgs = {
  randommWheelId: Scalars['String'];
};


export type MutationSyncEntriesWithRedemptionArgs = {
  randomWheelId: Scalars['String'];
  rewardId: Scalars['String'];
  useInput?: Maybe<Scalars['Boolean']>;
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
  channelRewards: Array<CustomReward>;
  colorThemes: Array<ColorTheme>;
  eventSubActiveSubscriptions: Scalars['JSON'];
  eventSubscriptionsForWheel: Array<EventSubscription>;
  me?: Maybe<User>;
  myRandomWheels: Array<RandomWheel>;
  randomWheelBySlug?: Maybe<RandomWheel>;
  userAccesToken: UserAccessToken;
};


export type QueryChannelRewardsArgs = {
  userId?: Maybe<Scalars['String']>;
};


export type QueryColorThemesArgs = {
  type?: Maybe<Scalars['String']>;
};


export type QueryEventSubscriptionsForWheelArgs = {
  randomWheelId: Scalars['String'];
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
  access: AccessType;
  accessType: Scalars['String'];
  createdAt: Scalars['DateTime'];
  editAnonymous: Scalars['Boolean'];
  editable: Scalars['Boolean'];
  entries: Array<RandomWheelEntry>;
  fadeDuration: Scalars['Int'];
  id: Scalars['String'];
  liked: Scalars['Boolean'];
  members: Array<RandomWheelMember>;
  name?: Maybe<Scalars['String']>;
  owner?: Maybe<User>;
  ownerId?: Maybe<Scalars['String']>;
  rotation: Scalars['Float'];
  slug: Scalars['String'];
  spinDuration: Scalars['Int'];
  theme?: Maybe<ColorTheme>;
  themeId?: Maybe<Scalars['String']>;
  uniqueEntries: Scalars['Boolean'];
  winners: Array<RandomWheelWinner>;
};

export type RandomWheelCount = {
  __typename?: 'RandomWheelCount';
  entries: Scalars['Int'];
  eventSubscriptions: Scalars['Int'];
  likes: Scalars['Int'];
  members: Scalars['Int'];
  winners: Scalars['Int'];
};

export type RandomWheelEntry = {
  __typename?: 'RandomWheelEntry';
  color?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  name: Scalars['String'];
  randomWheelId: Scalars['String'];
  redemptionId?: Maybe<Scalars['String']>;
  weight: Scalars['Int'];
};

export type RandomWheelEntryInput = {
  name?: Maybe<Scalars['String']>;
  weight?: Maybe<Scalars['Int']>;
};

export type RandomWheelInput = {
  accessType?: Maybe<Scalars['String']>;
  editAnonymous?: Maybe<Scalars['Boolean']>;
  fadeDuration?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  spinDuration?: Maybe<Scalars['Int']>;
  theme?: Maybe<ColorThemeInput>;
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
  drawnById?: Maybe<Scalars['String']>;
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
  standardThemeId?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  username: Scalars['String'];
};

export type UserAccessToken = {
  __typename?: 'UserAccessToken';
  expiresIn: Scalars['Int'];
  id: Scalars['String'];
  obtainmentTimestamp: Scalars['BigInt'];
  scope: Array<Scalars['String']>;
  twitchUserId?: Maybe<Scalars['String']>;
  twitchUsername?: Maybe<Scalars['String']>;
  userId: Scalars['String'];
};

export type UserCount = {
  __typename?: 'UserCount';
  colorThemes: Scalars['Int'];
  drawnWinners: Scalars['Int'];
  eventSubscriptions: Scalars['Int'];
  likes: Scalars['Int'];
  randomWheelMember: Scalars['Int'];
  randomWheels: Scalars['Int'];
  userAccessTokens: Scalars['Int'];
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

export type ColorThemeFragment = { __typename?: 'ColorTheme', id: string, name?: Maybe<string>, colors: Array<string>, creatorId?: Maybe<string>, global: boolean };

export type CustomRewardFragment = { __typename?: 'CustomReward', id: string, broadcasterId: string, broadcasterName: string, broadcasterDisplayName: string, backgroundColor: string, isEnabled: boolean, cost: number, title: string, prompt: string, userInputRequired: boolean, maxRedemptionsPerStream?: Maybe<number>, maxRedemptionsPerUserPerStream?: Maybe<number>, globalCooldown?: Maybe<number>, isPaused: boolean, isInStock: boolean, redemptionsThisStream?: Maybe<number>, autoFulfill: boolean, cooldownExpiryDate?: Maybe<any>, image: string };

export type EventSubscriptionFragment = { __typename?: 'EventSubscription', id: string, randomWheelId?: Maybe<string>, userId?: Maybe<string>, twitchUserId: string, type: string, rewardId?: Maybe<string>, condition?: Maybe<any>, useInput: boolean, paused: boolean, reward?: Maybe<{ __typename?: 'CustomReward', id: string, broadcasterId: string, broadcasterName: string, broadcasterDisplayName: string, backgroundColor: string, isEnabled: boolean, cost: number, title: string, prompt: string, userInputRequired: boolean, maxRedemptionsPerStream?: Maybe<number>, maxRedemptionsPerUserPerStream?: Maybe<number>, globalCooldown?: Maybe<number>, isPaused: boolean, isInStock: boolean, redemptionsThisStream?: Maybe<number>, autoFulfill: boolean, cooldownExpiryDate?: Maybe<any>, image: string }> };

export type RandomWheelDetailsFragment = { __typename?: 'RandomWheel', id: string, slug: string, name?: Maybe<string>, createdAt: any, rotation: number, spinDuration: number, fadeDuration: number, accessType: string, editable: boolean, editAnonymous: boolean, liked: boolean, theme?: Maybe<{ __typename?: 'ColorTheme', id: string, name?: Maybe<string>, colors: Array<string> }>, _count?: Maybe<{ __typename?: 'RandomWheelCount', entries: number }> };

export type RandomWheelEntryFragment = { __typename?: 'RandomWheelEntry', id: string, name: string, weight: number };

export type RandomWheelWinnerFragment = { __typename?: 'RandomWheelWinner', id: string, name: string, createdAt: any, winnerIndex?: Maybe<number> };

export type RandomWheelMemberFragment = { __typename?: 'RandomWheelMember', id: string, roleName: string, user: { __typename?: 'User', id: string, username: string, displayname?: Maybe<string> } };

export type NormalUserFragment = { __typename?: 'User', id: string, username: string, displayname?: Maybe<string> };

export type UserNameFragment = { __typename?: 'User', id: string, username: string, displayname?: Maybe<string> };

export type UserAccessTokenFragment = { __typename?: 'UserAccessToken', id: string, scope: Array<string>, expiresIn: number, obtainmentTimestamp: any, twitchUserId?: Maybe<string>, twitchUsername?: Maybe<string> };

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
  editAnonymous?: Maybe<Scalars['Boolean']>;
}>;


export type CreateRandomWheelMutation = { __typename?: 'Mutation', createRandomWheel: { __typename?: 'RandomWheel', id: string, slug: string, name?: Maybe<string>, createdAt: any, rotation: number, spinDuration: number, fadeDuration: number, accessType: string, editable: boolean, editAnonymous: boolean, liked: boolean, theme?: Maybe<{ __typename?: 'ColorTheme', id: string, name?: Maybe<string>, colors: Array<string> }>, _count?: Maybe<{ __typename?: 'RandomWheelCount', entries: number }> } };

export type DeleteRandomWheelMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteRandomWheelMutation = { __typename?: 'Mutation', deleteRandomWheel?: Maybe<{ __typename?: 'AppError', errorMessage?: Maybe<string>, errorCode: number }> };

export type DeleteRandomWheelEntryMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteRandomWheelEntryMutation = { __typename?: 'Mutation', deleteRandomWheelEntry?: Maybe<boolean> };

export type DisconnectAccessTokenMutationVariables = Exact<{ [key: string]: never; }>;


export type DisconnectAccessTokenMutation = { __typename?: 'Mutation', disconnectAccessToken: boolean };

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


export type SpinRandomWheelMutation = { __typename?: 'Mutation', spinRandomWheel: { __typename?: 'RandomWheelWinner', id: string, name: string, createdAt: any, drawnById?: Maybe<string>, randomWheelId: string, winnerIndex?: Maybe<number> } };

export type DeleteEntriesRedemptionSyncMutationVariables = Exact<{
  ids: Array<Scalars['String']> | Scalars['String'];
}>;


export type DeleteEntriesRedemptionSyncMutation = { __typename?: 'Mutation', deleteEntriesRedemptionSync?: Maybe<boolean> };

export type PauseEntriesRedemptionSyncMutationVariables = Exact<{
  id: Scalars['String'];
  pause: Scalars['Boolean'];
}>;


export type PauseEntriesRedemptionSyncMutation = { __typename?: 'Mutation', pauseEntriesRedemptionSync?: Maybe<{ __typename?: 'EventSubscription', id: string, randomWheelId?: Maybe<string>, userId?: Maybe<string>, twitchUserId: string, type: string, rewardId?: Maybe<string>, condition?: Maybe<any>, useInput: boolean, paused: boolean, reward?: Maybe<{ __typename?: 'CustomReward', id: string, broadcasterId: string, broadcasterName: string, broadcasterDisplayName: string, backgroundColor: string, isEnabled: boolean, cost: number, title: string, prompt: string, userInputRequired: boolean, maxRedemptionsPerStream?: Maybe<number>, maxRedemptionsPerUserPerStream?: Maybe<number>, globalCooldown?: Maybe<number>, isPaused: boolean, isInStock: boolean, redemptionsThisStream?: Maybe<number>, autoFulfill: boolean, cooldownExpiryDate?: Maybe<any>, image: string }> }> };

export type SyncEntriesWithRedemptionMutationVariables = Exact<{
  rewardId: Scalars['String'];
  randomWheelId: Scalars['String'];
}>;


export type SyncEntriesWithRedemptionMutation = { __typename?: 'Mutation', syncEntriesWithRedemption?: Maybe<{ __typename?: 'EventSubscription', id: string, randomWheelId?: Maybe<string>, userId?: Maybe<string>, twitchUserId: string, type: string, rewardId?: Maybe<string>, condition?: Maybe<any>, useInput: boolean, paused: boolean, reward?: Maybe<{ __typename?: 'CustomReward', id: string, broadcasterId: string, broadcasterName: string, broadcasterDisplayName: string, backgroundColor: string, isEnabled: boolean, cost: number, title: string, prompt: string, userInputRequired: boolean, maxRedemptionsPerStream?: Maybe<number>, maxRedemptionsPerUserPerStream?: Maybe<number>, globalCooldown?: Maybe<number>, isPaused: boolean, isInStock: boolean, redemptionsThisStream?: Maybe<number>, autoFulfill: boolean, cooldownExpiryDate?: Maybe<any>, image: string }> }> };

export type UpdateRandomWheelMutationVariables = Exact<{
  id: Scalars['String'];
  options: RandomWheelInput;
}>;


export type UpdateRandomWheelMutation = { __typename?: 'Mutation', updateRandomWheel?: Maybe<{ __typename?: 'RandomWheel', id: string, slug: string, name?: Maybe<string>, createdAt: any, rotation: number, spinDuration: number, fadeDuration: number, accessType: string, editable: boolean, editAnonymous: boolean, liked: boolean, theme?: Maybe<{ __typename?: 'ColorTheme', id: string, name?: Maybe<string>, colors: Array<string> }>, _count?: Maybe<{ __typename?: 'RandomWheelCount', entries: number }> }> };

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

export type ChannelRewardsQueryVariables = Exact<{
  userId?: Maybe<Scalars['String']>;
}>;


export type ChannelRewardsQuery = { __typename?: 'Query', channelRewards: Array<{ __typename?: 'CustomReward', id: string, broadcasterId: string, broadcasterName: string, broadcasterDisplayName: string, backgroundColor: string, isEnabled: boolean, cost: number, title: string, prompt: string, userInputRequired: boolean, maxRedemptionsPerStream?: Maybe<number>, maxRedemptionsPerUserPerStream?: Maybe<number>, globalCooldown?: Maybe<number>, isPaused: boolean, isInStock: boolean, redemptionsThisStream?: Maybe<number>, autoFulfill: boolean, cooldownExpiryDate?: Maybe<any>, image: string }> };

export type ColorThemesQueryVariables = Exact<{
  type?: Maybe<Scalars['String']>;
}>;


export type ColorThemesQuery = { __typename?: 'Query', colorThemes: Array<{ __typename?: 'ColorTheme', id: string, name?: Maybe<string>, colors: Array<string>, creatorId?: Maybe<string>, global: boolean }> };

export type EventSubscriptionsForWheelQueryVariables = Exact<{
  randomWheelId: Scalars['String'];
}>;


export type EventSubscriptionsForWheelQuery = { __typename?: 'Query', eventSubscriptionsForWheel: Array<{ __typename?: 'EventSubscription', id: string, randomWheelId?: Maybe<string>, userId?: Maybe<string>, twitchUserId: string, type: string, rewardId?: Maybe<string>, condition?: Maybe<any>, useInput: boolean, paused: boolean, reward?: Maybe<{ __typename?: 'CustomReward', id: string, broadcasterId: string, broadcasterName: string, broadcasterDisplayName: string, backgroundColor: string, isEnabled: boolean, cost: number, title: string, prompt: string, userInputRequired: boolean, maxRedemptionsPerStream?: Maybe<number>, maxRedemptionsPerUserPerStream?: Maybe<number>, globalCooldown?: Maybe<number>, isPaused: boolean, isInStock: boolean, redemptionsThisStream?: Maybe<number>, autoFulfill: boolean, cooldownExpiryDate?: Maybe<any>, image: string }> }> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: Maybe<{ __typename?: 'User', id: string, username: string, displayname?: Maybe<string> }> };

export type MyRandomWheelsQueryVariables = Exact<{
  type?: Maybe<Scalars['String']>;
}>;


export type MyRandomWheelsQuery = { __typename?: 'Query', myRandomWheels: Array<{ __typename?: 'RandomWheel', id: string, slug: string, name?: Maybe<string>, createdAt: any, rotation: number, spinDuration: number, fadeDuration: number, accessType: string, editable: boolean, editAnonymous: boolean, liked: boolean, theme?: Maybe<{ __typename?: 'ColorTheme', id: string, name?: Maybe<string>, colors: Array<string> }>, _count?: Maybe<{ __typename?: 'RandomWheelCount', entries: number }> }> };

export type RandomWheelBySlugQueryVariables = Exact<{
  slug: Scalars['String'];
}>;


export type RandomWheelBySlugQuery = { __typename?: 'Query', randomWheelBySlug?: Maybe<{ __typename?: 'RandomWheel', id: string, slug: string, name?: Maybe<string>, createdAt: any, rotation: number, spinDuration: number, fadeDuration: number, accessType: string, editable: boolean, editAnonymous: boolean, liked: boolean, owner?: Maybe<{ __typename?: 'User', id: string, username: string, displayname?: Maybe<string> }>, members: Array<{ __typename?: 'RandomWheelMember', id: string, roleName: string, user: { __typename?: 'User', id: string, username: string, displayname?: Maybe<string> } }>, theme?: Maybe<{ __typename?: 'ColorTheme', id: string, name?: Maybe<string>, colors: Array<string> }>, _count?: Maybe<{ __typename?: 'RandomWheelCount', entries: number }> }> };

export type RandomWheelBySlugEntriesQueryVariables = Exact<{
  slug: Scalars['String'];
}>;


export type RandomWheelBySlugEntriesQuery = { __typename?: 'Query', randomWheelBySlug?: Maybe<{ __typename?: 'RandomWheel', id: string, entries: Array<{ __typename?: 'RandomWheelEntry', id: string, name: string, weight: number }> }> };

export type RandomWheelBySlugMembersQueryVariables = Exact<{
  slug: Scalars['String'];
}>;


export type RandomWheelBySlugMembersQuery = { __typename?: 'Query', randomWheelBySlug?: Maybe<{ __typename?: 'RandomWheel', id: string, members: Array<{ __typename?: 'RandomWheelMember', id: string, roleName: string, user: { __typename?: 'User', id: string, username: string, displayname?: Maybe<string> } }> }> };

export type RandomWheelBySlugWinnersQueryVariables = Exact<{
  slug: Scalars['String'];
}>;


export type RandomWheelBySlugWinnersQuery = { __typename?: 'Query', randomWheelBySlug?: Maybe<{ __typename?: 'RandomWheel', id: string, winners: Array<{ __typename?: 'RandomWheelWinner', id: string, name: string, createdAt: any, winnerIndex?: Maybe<number> }> }> };

export type UserAccessTokenQueryVariables = Exact<{ [key: string]: never; }>;


export type UserAccessTokenQuery = { __typename?: 'Query', userAccesToken: { __typename?: 'UserAccessToken', id: string, scope: Array<string>, expiresIn: number, obtainmentTimestamp: any, twitchUserId?: Maybe<string>, twitchUsername?: Maybe<string> } };

export type UsernameExistsMutationVariables = Exact<{
  username: Scalars['String'];
}>;


export type UsernameExistsMutation = { __typename?: 'Mutation', usernameExists: boolean };

export const ColorThemeFragmentDoc = gql`
    fragment ColorTheme on ColorTheme {
  id
  name
  colors
  creatorId
  global
}
    `;
export const CustomRewardFragmentDoc = gql`
    fragment CustomReward on CustomReward {
  id
  broadcasterId
  broadcasterName
  broadcasterDisplayName
  backgroundColor
  isEnabled
  cost
  title
  prompt
  userInputRequired
  maxRedemptionsPerStream
  maxRedemptionsPerUserPerStream
  globalCooldown
  isPaused
  isInStock
  redemptionsThisStream
  autoFulfill
  cooldownExpiryDate
  image
}
    `;
export const EventSubscriptionFragmentDoc = gql`
    fragment EventSubscription on EventSubscription {
  id
  randomWheelId
  userId
  twitchUserId
  type
  rewardId
  condition
  useInput
  paused
  reward {
    ...CustomReward
  }
}
    ${CustomRewardFragmentDoc}`;
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
  editAnonymous
  liked
  theme {
    id
    name
    colors
  }
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
export const UserAccessTokenFragmentDoc = gql`
    fragment UserAccessToken on UserAccessToken {
  id
  scope
  expiresIn
  obtainmentTimestamp
  twitchUserId
  twitchUsername
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
    mutation CreateRandomWheel($name: String, $accessType: String, $spinDuration: Int, $fadeDuration: Int, $editAnonymous: Boolean) {
  createRandomWheel(
    name: $name
    accessType: $accessType
    spinDuration: $spinDuration
    fadeDuration: $fadeDuration
    editAnonymous: $editAnonymous
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
export const DisconnectAccessTokenDocument = gql`
    mutation DisconnectAccessToken {
  disconnectAccessToken
}
    `;

export function useDisconnectAccessTokenMutation() {
  return Urql.useMutation<DisconnectAccessTokenMutation, DisconnectAccessTokenMutationVariables>(DisconnectAccessTokenDocument);
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
export const DeleteEntriesRedemptionSyncDocument = gql`
    mutation DeleteEntriesRedemptionSync($ids: [String!]!) {
  deleteEntriesRedemptionSync(ids: $ids)
}
    `;

export function useDeleteEntriesRedemptionSyncMutation() {
  return Urql.useMutation<DeleteEntriesRedemptionSyncMutation, DeleteEntriesRedemptionSyncMutationVariables>(DeleteEntriesRedemptionSyncDocument);
};
export const PauseEntriesRedemptionSyncDocument = gql`
    mutation PauseEntriesRedemptionSync($id: String!, $pause: Boolean!) {
  pauseEntriesRedemptionSync(id: $id, pause: $pause) {
    ...EventSubscription
  }
}
    ${EventSubscriptionFragmentDoc}`;

export function usePauseEntriesRedemptionSyncMutation() {
  return Urql.useMutation<PauseEntriesRedemptionSyncMutation, PauseEntriesRedemptionSyncMutationVariables>(PauseEntriesRedemptionSyncDocument);
};
export const SyncEntriesWithRedemptionDocument = gql`
    mutation SyncEntriesWithRedemption($rewardId: String!, $randomWheelId: String!) {
  syncEntriesWithRedemption(rewardId: $rewardId, randomWheelId: $randomWheelId) {
    ...EventSubscription
  }
}
    ${EventSubscriptionFragmentDoc}`;

export function useSyncEntriesWithRedemptionMutation() {
  return Urql.useMutation<SyncEntriesWithRedemptionMutation, SyncEntriesWithRedemptionMutationVariables>(SyncEntriesWithRedemptionDocument);
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
export const ChannelRewardsDocument = gql`
    query ChannelRewards($userId: String) {
  channelRewards(userId: $userId) {
    ...CustomReward
  }
}
    ${CustomRewardFragmentDoc}`;

export function useChannelRewardsQuery(options?: Omit<Urql.UseQueryArgs<ChannelRewardsQueryVariables>, 'query'>) {
  return Urql.useQuery<ChannelRewardsQuery, ChannelRewardsQueryVariables>({ query: ChannelRewardsDocument, ...options });
};
export const ColorThemesDocument = gql`
    query ColorThemes($type: String) {
  colorThemes(type: $type) {
    ...ColorTheme
  }
}
    ${ColorThemeFragmentDoc}`;

export function useColorThemesQuery(options?: Omit<Urql.UseQueryArgs<ColorThemesQueryVariables>, 'query'>) {
  return Urql.useQuery<ColorThemesQuery, ColorThemesQueryVariables>({ query: ColorThemesDocument, ...options });
};
export const EventSubscriptionsForWheelDocument = gql`
    query EventSubscriptionsForWheel($randomWheelId: String!) {
  eventSubscriptionsForWheel(randomWheelId: $randomWheelId) {
    ...EventSubscription
  }
}
    ${EventSubscriptionFragmentDoc}`;

export function useEventSubscriptionsForWheelQuery(options: Omit<Urql.UseQueryArgs<EventSubscriptionsForWheelQueryVariables>, 'query'>) {
  return Urql.useQuery<EventSubscriptionsForWheelQuery, EventSubscriptionsForWheelQueryVariables>({ query: EventSubscriptionsForWheelDocument, ...options });
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
      ...RandomWheelMember
    }
  }
}
    ${RandomWheelDetailsFragmentDoc}
${UserNameFragmentDoc}
${RandomWheelMemberFragmentDoc}`;

export function useRandomWheelBySlugQuery(options: Omit<Urql.UseQueryArgs<RandomWheelBySlugQueryVariables>, 'query'>) {
  return Urql.useQuery<RandomWheelBySlugQuery, RandomWheelBySlugQueryVariables>({ query: RandomWheelBySlugDocument, ...options });
};
export const RandomWheelBySlugEntriesDocument = gql`
    query RandomWheelBySlugEntries($slug: String!) {
  randomWheelBySlug(slug: $slug) {
    id
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
    id
    winners {
      ...RandomWheelWinner
    }
  }
}
    ${RandomWheelWinnerFragmentDoc}`;

export function useRandomWheelBySlugWinnersQuery(options: Omit<Urql.UseQueryArgs<RandomWheelBySlugWinnersQueryVariables>, 'query'>) {
  return Urql.useQuery<RandomWheelBySlugWinnersQuery, RandomWheelBySlugWinnersQueryVariables>({ query: RandomWheelBySlugWinnersDocument, ...options });
};
export const UserAccessTokenDocument = gql`
    query UserAccessToken {
  userAccesToken {
    ...UserAccessToken
  }
}
    ${UserAccessTokenFragmentDoc}`;

export function useUserAccessTokenQuery(options?: Omit<Urql.UseQueryArgs<UserAccessTokenQueryVariables>, 'query'>) {
  return Urql.useQuery<UserAccessTokenQuery, UserAccessTokenQueryVariables>({ query: UserAccessTokenDocument, ...options });
};
export const UsernameExistsDocument = gql`
    mutation UsernameExists($username: String!) {
  usernameExists(username: $username)
}
    `;

export function useUsernameExistsMutation() {
  return Urql.useMutation<UsernameExistsMutation, UsernameExistsMutationVariables>(UsernameExistsDocument);
};