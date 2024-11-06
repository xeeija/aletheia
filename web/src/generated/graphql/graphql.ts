import type { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core"
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never }
export type Incremental<T> = T | { [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
  BigInt: { input: bigint; output: bigint }
  DateTimeISO: { input: Date; output: Date }
}

export type AccessType = {
  __typename?: "AccessType"
  _count?: Maybe<AccessTypeCount>
  type: Scalars["String"]["output"]
}

export type AccessTypeCount = {
  __typename?: "AccessTypeCount"
  randomWheel: Scalars["Int"]["output"]
}

export type AppError = {
  __typename?: "AppError"
  errorCode: Scalars["Int"]["output"]
  errorMessage?: Maybe<Scalars["String"]["output"]>
  fieldErrors?: Maybe<Array<FieldError>>
}

export type ColorTheme = {
  __typename?: "ColorTheme"
  _count?: Maybe<ColorThemeCount>
  colors: Array<Scalars["String"]["output"]>
  creatorId?: Maybe<Scalars["String"]["output"]>
  global: Scalars["Boolean"]["output"]
  id: Scalars["String"]["output"]
  name?: Maybe<Scalars["String"]["output"]>
}

export type ColorThemeCount = {
  __typename?: "ColorThemeCount"
  randomWheels: Scalars["Int"]["output"]
  usersStandard: Scalars["Int"]["output"]
}

export type ColorThemeInput = {
  colors?: InputMaybe<Array<Scalars["String"]["input"]>>
  id?: InputMaybe<Scalars["String"]["input"]>
  name?: InputMaybe<Scalars["String"]["input"]>
}

export type CustomReward = {
  __typename?: "CustomReward"
  autoFulfill: Scalars["Boolean"]["output"]
  backgroundColor: Scalars["String"]["output"]
  broadcasterDisplayName: Scalars["String"]["output"]
  broadcasterId: Scalars["String"]["output"]
  broadcasterName: Scalars["String"]["output"]
  cooldownExpiryDate?: Maybe<Scalars["DateTimeISO"]["output"]>
  cost: Scalars["Float"]["output"]
  globalCooldown?: Maybe<Scalars["Int"]["output"]>
  id: Scalars["String"]["output"]
  image: Scalars["String"]["output"]
  isEnabled: Scalars["Boolean"]["output"]
  isInStock: Scalars["Boolean"]["output"]
  isPaused: Scalars["Boolean"]["output"]
  maxRedemptionsPerStream?: Maybe<Scalars["Int"]["output"]>
  maxRedemptionsPerUserPerStream?: Maybe<Scalars["Int"]["output"]>
  prompt: Scalars["String"]["output"]
  redemptionsThisStream?: Maybe<Scalars["Int"]["output"]>
  title: Scalars["String"]["output"]
  userInputRequired: Scalars["Boolean"]["output"]
}

export type CustomRewardCreateInput = {
  autoFulfill?: InputMaybe<Scalars["Boolean"]["input"]>
  backgroundColor?: InputMaybe<Scalars["String"]["input"]>
  cost: Scalars["Int"]["input"]
  globalCooldown?: InputMaybe<Scalars["Int"]["input"]>
  isEnabled?: InputMaybe<Scalars["Boolean"]["input"]>
  isPaused?: InputMaybe<Scalars["Boolean"]["input"]>
  maxRedemptionsPerStream?: InputMaybe<Scalars["Int"]["input"]>
  maxRedemptionsPerUserPerStream?: InputMaybe<Scalars["Int"]["input"]>
  prompt?: InputMaybe<Scalars["String"]["input"]>
  title: Scalars["String"]["input"]
  userInputRequired?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type CustomRewardUpdateInput = {
  autoFulfill?: InputMaybe<Scalars["Boolean"]["input"]>
  backgroundColor?: InputMaybe<Scalars["String"]["input"]>
  cost?: InputMaybe<Scalars["Int"]["input"]>
  globalCooldown?: InputMaybe<Scalars["Int"]["input"]>
  isEnabled?: InputMaybe<Scalars["Boolean"]["input"]>
  isPaused?: InputMaybe<Scalars["Boolean"]["input"]>
  maxRedemptionsPerStream?: InputMaybe<Scalars["Int"]["input"]>
  maxRedemptionsPerUserPerStream?: InputMaybe<Scalars["Int"]["input"]>
  prompt?: InputMaybe<Scalars["String"]["input"]>
  title?: InputMaybe<Scalars["String"]["input"]>
  userInputRequired?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type FieldError = {
  __typename?: "FieldError"
  field: Scalars["String"]["output"]
  message: Scalars["String"]["output"]
}

export type Mutation = {
  __typename?: "Mutation"
  addRandomWheelEntry: RandomWheelEntry
  addRewardGroupItem?: Maybe<RewardGroupItem>
  addWheelSync?: Maybe<RandomWheelSync>
  clearRandomWheel: Scalars["Int"]["output"]
  createChannelReward?: Maybe<CustomReward>
  createRandomWheel: RandomWheel
  createRewardGroup?: Maybe<RewardGroup>
  createRewardLink?: Maybe<RewardLink>
  deleteChannelReward: Scalars["Boolean"]["output"]
  deleteRandomWheel?: Maybe<AppError>
  deleteRandomWheelEntry?: Maybe<Scalars["Boolean"]["output"]>
  deleteRandomWheelMember?: Maybe<Scalars["Boolean"]["output"]>
  deleteRewardGroup?: Maybe<Scalars["Boolean"]["output"]>
  deleteRewardGroupItem?: Maybe<Scalars["Boolean"]["output"]>
  deleteRewardLink: Scalars["Boolean"]["output"]
  deleteWheelSync?: Maybe<Scalars["Boolean"]["output"]>
  disconnectAccessToken: Scalars["Boolean"]["output"]
  likeRandomWheel?: Maybe<RandomWheelLike>
  login: UserResponse
  logout: Scalars["Boolean"]["output"]
  pauseWheelSync?: Maybe<RandomWheelSync>
  register: UserResponse
  resetShareToken?: Maybe<Scalars["Boolean"]["output"]>
  spinRandomWheel: RandomWheelWinner
  updateChannelReward?: Maybe<CustomReward>
  updateRandomWheel?: Maybe<RandomWheel>
  updateRandomWheelEntry: RandomWheelEntry
  updateRandomWheelMembers?: Maybe<Array<RandomWheelMember>>
  updateRewardGroup?: Maybe<RewardGroup>
  updateRewardGroupItem?: Maybe<RewardGroupItem>
  updateRewardToken: CustomReward
  updateUser: UserResponse
  usernameExists: Scalars["Boolean"]["output"]
}

export type MutationAddRandomWheelEntryArgs = {
  color?: InputMaybe<Scalars["String"]["input"]>
  name: Scalars["String"]["input"]
  randomWheelId: Scalars["String"]["input"]
  weight?: InputMaybe<Scalars["Float"]["input"]>
}

export type MutationAddRewardGroupItemArgs = {
  rewardGroupId: Scalars["String"]["input"]
  rewardId: Scalars["String"]["input"]
  triggerCooldown?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type MutationAddWheelSyncArgs = {
  addExisting?: Scalars["Boolean"]["input"]
  randomWheelId: Scalars["String"]["input"]
  rewardId: Scalars["String"]["input"]
  useInput?: Scalars["Boolean"]["input"]
}

export type MutationClearRandomWheelArgs = {
  id: Scalars["String"]["input"]
}

export type MutationCreateChannelRewardArgs = {
  reward: CustomRewardCreateInput
}

export type MutationCreateRandomWheelArgs = {
  accessType?: InputMaybe<Scalars["String"]["input"]>
  editAnonymous?: InputMaybe<Scalars["Boolean"]["input"]>
  fadeDuration?: InputMaybe<Scalars["Int"]["input"]>
  name?: InputMaybe<Scalars["String"]["input"]>
  spinDuration?: InputMaybe<Scalars["Int"]["input"]>
  uniqueEntries?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type MutationCreateRewardGroupArgs = {
  items: Array<RewardGroupItemInput>
  rewardGroup: RewardGroupInput
}

export type MutationCreateRewardLinkArgs = {
  rewardId: Scalars["String"]["input"]
  type: Scalars["String"]["input"]
}

export type MutationDeleteChannelRewardArgs = {
  rewardId: Scalars["String"]["input"]
}

export type MutationDeleteRandomWheelArgs = {
  id: Scalars["String"]["input"]
}

export type MutationDeleteRandomWheelEntryArgs = {
  id: Scalars["String"]["input"]
}

export type MutationDeleteRandomWheelMemberArgs = {
  id: Scalars["String"]["input"]
}

export type MutationDeleteRewardGroupArgs = {
  id: Scalars["String"]["input"]
}

export type MutationDeleteRewardGroupItemArgs = {
  id: Scalars["String"]["input"]
}

export type MutationDeleteRewardLinkArgs = {
  id: Scalars["String"]["input"]
}

export type MutationDeleteWheelSyncArgs = {
  ids: Array<Scalars["String"]["input"]>
}

export type MutationLikeRandomWheelArgs = {
  like: Scalars["Boolean"]["input"]
  randomWheelId: Scalars["String"]["input"]
}

export type MutationLoginArgs = {
  password: Scalars["String"]["input"]
  username: Scalars["String"]["input"]
}

export type MutationPauseWheelSyncArgs = {
  id: Scalars["String"]["input"]
  paused: Scalars["Boolean"]["input"]
}

export type MutationRegisterArgs = {
  displayname?: InputMaybe<Scalars["String"]["input"]>
  password: Scalars["String"]["input"]
  username: Scalars["String"]["input"]
}

export type MutationResetShareTokenArgs = {
  randommWheelId: Scalars["String"]["input"]
}

export type MutationSpinRandomWheelArgs = {
  randommWheelId: Scalars["String"]["input"]
}

export type MutationUpdateChannelRewardArgs = {
  reward: CustomRewardUpdateInput
  rewardId: Scalars["String"]["input"]
}

export type MutationUpdateRandomWheelArgs = {
  id: Scalars["String"]["input"]
  options: RandomWheelInput
}

export type MutationUpdateRandomWheelEntryArgs = {
  entry: RandomWheelEntryInput
  id: Scalars["String"]["input"]
}

export type MutationUpdateRandomWheelMembersArgs = {
  members: Array<RandomWheelMemberInput>
  randomWheelId: Scalars["String"]["input"]
}

export type MutationUpdateRewardGroupArgs = {
  id: Scalars["String"]["input"]
  items?: InputMaybe<Array<RewardGroupItemInput>>
  rewardGroup?: InputMaybe<RewardGroupInput>
}

export type MutationUpdateRewardGroupItemArgs = {
  id: Scalars["String"]["input"]
  rewardEnabled?: InputMaybe<Scalars["Boolean"]["input"]>
  triggerCooldown?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type MutationUpdateRewardTokenArgs = {
  token: Scalars["String"]["input"]
  type: Scalars["String"]["input"]
}

export type MutationUpdateUserArgs = {
  user: UserInput
}

export type MutationUsernameExistsArgs = {
  username: Scalars["String"]["input"]
}

export type Query = {
  __typename?: "Query"
  channelRewards: Array<CustomReward>
  colorThemes: Array<ColorTheme>
  me?: Maybe<User>
  myRandomWheels: Array<RandomWheel>
  randomWheelBySlug?: Maybe<RandomWheel>
  rewardByToken: CustomReward
  rewardGroup: RewardGroup
  rewardGroups: Array<RewardGroup>
  rewardLinks: Array<RewardLink>
  syncForWheel: Array<RandomWheelSync>
  userAccesToken?: Maybe<UserAccessToken>
}

export type QueryChannelRewardsArgs = {
  onlyManageable?: InputMaybe<Scalars["Boolean"]["input"]>
  userId?: InputMaybe<Scalars["String"]["input"]>
}

export type QueryColorThemesArgs = {
  type?: Scalars["String"]["input"]
}

export type QueryMyRandomWheelsArgs = {
  type?: Scalars["String"]["input"]
}

export type QueryRandomWheelBySlugArgs = {
  slug: Scalars["String"]["input"]
  token?: InputMaybe<Scalars["String"]["input"]>
}

export type QueryRewardByTokenArgs = {
  token: Scalars["String"]["input"]
  type: Scalars["String"]["input"]
}

export type QueryRewardGroupArgs = {
  id: Scalars["String"]["input"]
}

export type QueryRewardGroupsArgs = {
  items?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type QueryRewardLinksArgs = {
  rewardIds?: InputMaybe<Array<Scalars["String"]["input"]>>
}

export type QuerySyncForWheelArgs = {
  randomWheelId: Scalars["String"]["input"]
}

export type RandomWheel = {
  __typename?: "RandomWheel"
  _count?: Maybe<RandomWheelCount>
  access: AccessType
  accessType: Scalars["String"]["output"]
  createdAt: Scalars["DateTimeISO"]["output"]
  editAnonymous: Scalars["Boolean"]["output"]
  editable: Scalars["Boolean"]["output"]
  entries: Array<RandomWheelEntry>
  fadeDuration: Scalars["Int"]["output"]
  id: Scalars["String"]["output"]
  liked: Scalars["Boolean"]["output"]
  members: Array<RandomWheelMember>
  name?: Maybe<Scalars["String"]["output"]>
  owner?: Maybe<User>
  ownerId?: Maybe<Scalars["String"]["output"]>
  rotation: Scalars["Float"]["output"]
  shareToken?: Maybe<Scalars["String"]["output"]>
  slug: Scalars["String"]["output"]
  spinDuration: Scalars["Int"]["output"]
  theme?: Maybe<ColorTheme>
  themeId?: Maybe<Scalars["String"]["output"]>
  uniqueEntries: Scalars["Boolean"]["output"]
  winners: Array<RandomWheelWinner>
}

export type RandomWheelCount = {
  __typename?: "RandomWheelCount"
  entries: Scalars["Int"]["output"]
  likes: Scalars["Int"]["output"]
  members: Scalars["Int"]["output"]
  wheelSync: Scalars["Int"]["output"]
  winners: Scalars["Int"]["output"]
}

export type RandomWheelEntry = {
  __typename?: "RandomWheelEntry"
  color?: Maybe<Scalars["String"]["output"]>
  createdAt: Scalars["DateTimeISO"]["output"]
  id: Scalars["String"]["output"]
  name: Scalars["String"]["output"]
  randomWheelId: Scalars["String"]["output"]
  redemptionId?: Maybe<Scalars["String"]["output"]>
  weight: Scalars["Int"]["output"]
}

export type RandomWheelEntryInput = {
  color?: InputMaybe<Scalars["String"]["input"]>
  name?: InputMaybe<Scalars["String"]["input"]>
  weight?: InputMaybe<Scalars["Int"]["input"]>
}

export type RandomWheelInput = {
  accessType?: InputMaybe<Scalars["String"]["input"]>
  editAnonymous?: InputMaybe<Scalars["Boolean"]["input"]>
  fadeDuration?: InputMaybe<Scalars["Int"]["input"]>
  name?: InputMaybe<Scalars["String"]["input"]>
  spinDuration?: InputMaybe<Scalars["Int"]["input"]>
  theme?: InputMaybe<ColorThemeInput>
  uniqueEntries?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type RandomWheelLike = {
  __typename?: "RandomWheelLike"
  createdAt: Scalars["DateTimeISO"]["output"]
  id: Scalars["String"]["output"]
  randomWheelId: Scalars["String"]["output"]
  userId: Scalars["String"]["output"]
}

export type RandomWheelMember = {
  __typename?: "RandomWheelMember"
  id: Scalars["String"]["output"]
  randomWheelId: Scalars["String"]["output"]
  role: RandomWheelRole
  roleName: Scalars["String"]["output"]
  user: User
  userId: Scalars["String"]["output"]
}

export type RandomWheelMemberInput = {
  delete?: InputMaybe<Scalars["Boolean"]["input"]>
  id?: InputMaybe<Scalars["String"]["input"]>
  role: Scalars["String"]["input"]
  username: Scalars["String"]["input"]
}

export type RandomWheelRole = {
  __typename?: "RandomWheelRole"
  _count?: Maybe<RandomWheelRoleCount>
  description?: Maybe<Scalars["String"]["output"]>
  name: Scalars["String"]["output"]
}

export type RandomWheelRoleCount = {
  __typename?: "RandomWheelRoleCount"
  members: Scalars["Int"]["output"]
}

export type RandomWheelSync = {
  __typename?: "RandomWheelSync"
  createdAt: Scalars["DateTimeISO"]["output"]
  eventSubscriptionId?: Maybe<Scalars["String"]["output"]>
  id: Scalars["String"]["output"]
  paused: Scalars["Boolean"]["output"]
  pending: Scalars["Boolean"]["output"]
  randomWheelId: Scalars["String"]["output"]
  reward?: Maybe<CustomReward>
  rewardId: Scalars["String"]["output"]
  useInput: Scalars["Boolean"]["output"]
}

export type RandomWheelWinner = {
  __typename?: "RandomWheelWinner"
  createdAt: Scalars["DateTimeISO"]["output"]
  drawnById?: Maybe<Scalars["String"]["output"]>
  id: Scalars["String"]["output"]
  name: Scalars["String"]["output"]
  randomWheelId: Scalars["String"]["output"]
  winnerIndex?: Maybe<Scalars["Int"]["output"]>
}

export type RewardGroup = {
  __typename?: "RewardGroup"
  _count?: Maybe<RewardGroupCount>
  active: Scalars["Boolean"]["output"]
  cooldownExpiry?: Maybe<Scalars["DateTimeISO"]["output"]>
  id: Scalars["String"]["output"]
  items?: Maybe<Array<RewardGroupItem>>
  name?: Maybe<Scalars["String"]["output"]>
  triggerSelected: Scalars["Boolean"]["output"]
  userId: Scalars["String"]["output"]
}

export type RewardGroupCount = {
  __typename?: "RewardGroupCount"
  items: Scalars["Int"]["output"]
}

export type RewardGroupInput = {
  active?: InputMaybe<Scalars["Boolean"]["input"]>
  name?: InputMaybe<Scalars["String"]["input"]>
  triggerSelected?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type RewardGroupItem = {
  __typename?: "RewardGroupItem"
  id: Scalars["String"]["output"]
  rewardEnabled: Scalars["Boolean"]["output"]
  rewardGroupId: Scalars["String"]["output"]
  rewardId: Scalars["String"]["output"]
  triggerCooldown: Scalars["Boolean"]["output"]
}

export type RewardGroupItemInput = {
  rewardId: Scalars["String"]["input"]
  triggerCooldown?: InputMaybe<Scalars["Boolean"]["input"]>
}

export type RewardLink = {
  __typename?: "RewardLink"
  id: Scalars["String"]["output"]
  rewardId: Scalars["String"]["output"]
  token: Scalars["String"]["output"]
  type: Scalars["String"]["output"]
  userId: Scalars["String"]["output"]
}

export type User = {
  __typename?: "User"
  _count?: Maybe<UserCount>
  createdAt: Scalars["DateTimeISO"]["output"]
  displayname?: Maybe<Scalars["String"]["output"]>
  id: Scalars["String"]["output"]
  standardThemeId?: Maybe<Scalars["String"]["output"]>
  updatedAt: Scalars["DateTimeISO"]["output"]
  username: Scalars["String"]["output"]
}

export type UserAccessToken = {
  __typename?: "UserAccessToken"
  expiresIn: Scalars["Int"]["output"]
  id: Scalars["String"]["output"]
  obtainmentTimestamp: Scalars["BigInt"]["output"]
  scope: Array<Scalars["String"]["output"]>
  twitchUserId?: Maybe<Scalars["String"]["output"]>
  twitchUsername?: Maybe<Scalars["String"]["output"]>
  userId: Scalars["String"]["output"]
}

export type UserCount = {
  __typename?: "UserCount"
  colorThemes: Scalars["Int"]["output"]
  drawnWinners: Scalars["Int"]["output"]
  eventSubscriptions: Scalars["Int"]["output"]
  likes: Scalars["Int"]["output"]
  randomWheelMember: Scalars["Int"]["output"]
  randomWheels: Scalars["Int"]["output"]
  rewardGroups: Scalars["Int"]["output"]
  rewardLinks: Scalars["Int"]["output"]
  userAccessTokens: Scalars["Int"]["output"]
}

export type UserInput = {
  displayname?: InputMaybe<Scalars["String"]["input"]>
  username?: InputMaybe<Scalars["String"]["input"]>
}

export type UserResponse = {
  __typename?: "UserResponse"
  errors?: Maybe<Array<FieldError>>
  user?: Maybe<User>
}

export type ColorThemeFragment = {
  __typename?: "ColorTheme"
  id: string
  name?: string | null
  colors: Array<string>
  creatorId?: string | null
  global: boolean
}

export type CustomRewardFragment = {
  __typename?: "CustomReward"
  id: string
  broadcasterId: string
  broadcasterName: string
  broadcasterDisplayName: string
  backgroundColor: string
  isEnabled: boolean
  cost: number
  title: string
  prompt: string
  userInputRequired: boolean
  maxRedemptionsPerStream?: number | null
  maxRedemptionsPerUserPerStream?: number | null
  globalCooldown?: number | null
  isPaused: boolean
  isInStock: boolean
  redemptionsThisStream?: number | null
  autoFulfill: boolean
  cooldownExpiryDate?: Date | null
  image: string
}

export type CustomRewardMenuItemFragment = {
  __typename?: "CustomReward"
  id: string
  title: string
  backgroundColor: string
  isEnabled: boolean
  isPaused: boolean
  image: string
}

export type RandomWheelDetailsFragment = {
  __typename?: "RandomWheel"
  id: string
  slug: string
  name?: string | null
  createdAt: Date
  rotation: number
  spinDuration: number
  fadeDuration: number
  accessType: string
  editable: boolean
  editAnonymous: boolean
  uniqueEntries: boolean
  shareToken?: string | null
  liked: boolean
  theme?: { __typename?: "ColorTheme"; id: string; name?: string | null; colors: Array<string> } | null
  _count?: { __typename?: "RandomWheelCount"; entries: number } | null
}

export type RandomWheelEntryFragment = { __typename?: "RandomWheelEntry"; id: string; name: string; weight: number }

export type RandomWheelWinnerFragment = {
  __typename?: "RandomWheelWinner"
  id: string
  name: string
  createdAt: Date
  winnerIndex?: number | null
}

export type RandomWheelMemberFragment = {
  __typename?: "RandomWheelMember"
  id: string
  roleName: string
  user: { __typename?: "User"; id: string; username: string; displayname?: string | null }
}

export type RandomWheelSyncFragment = {
  __typename?: "RandomWheelSync"
  id: string
  randomWheelId: string
  eventSubscriptionId?: string | null
  rewardId: string
  paused: boolean
  useInput: boolean
  pending: boolean
  createdAt: Date
}

export type RewardGroupFragment = {
  __typename?: "RewardGroup"
  id: string
  name?: string | null
  active: boolean
  triggerSelected: boolean
  userId: string
  cooldownExpiry?: Date | null
  items?: Array<{
    __typename?: "RewardGroupItem"
    id: string
    rewardGroupId: string
    rewardId: string
    rewardEnabled: boolean
    triggerCooldown: boolean
  }> | null
}

export type RewardGroupDetailsFragment = {
  __typename?: "RewardGroup"
  id: string
  name?: string | null
  active: boolean
  triggerSelected: boolean
  userId: string
  cooldownExpiry?: Date | null
}

export type RewardGroupItemFragment = {
  __typename?: "RewardGroupItem"
  id: string
  rewardGroupId: string
  rewardId: string
  rewardEnabled: boolean
  triggerCooldown: boolean
}

export type RewardLinkFragment = {
  __typename?: "RewardLink"
  id: string
  userId: string
  rewardId: string
  token: string
  type: string
}

export type NormalUserFragment = { __typename?: "User"; id: string; username: string; displayname?: string | null }

export type UserNameFragment = { __typename?: "User"; id: string; username: string; displayname?: string | null }

export type UserAccessTokenFragment = {
  __typename?: "UserAccessToken"
  id: string
  scope: Array<string>
  expiresIn: number
  obtainmentTimestamp: bigint
  twitchUserId?: string | null
  twitchUsername?: string | null
}

export type LoginMutationVariables = Exact<{
  username: Scalars["String"]["input"]
  password: Scalars["String"]["input"]
}>

export type LoginMutation = {
  __typename?: "Mutation"
  login: {
    __typename?: "UserResponse"
    user?: { __typename?: "User"; id: string; username: string; displayname?: string | null } | null
    errors?: Array<{ __typename?: "FieldError"; field: string; message: string }> | null
  }
}

export type LogoutMutationVariables = Exact<{ [key: string]: never }>

export type LogoutMutation = { __typename?: "Mutation"; logout: boolean }

export type AddRandomWheelEntryMutationVariables = Exact<{
  randomWheelId: Scalars["String"]["input"]
  name: Scalars["String"]["input"]
}>

export type AddRandomWheelEntryMutation = {
  __typename?: "Mutation"
  addRandomWheelEntry: { __typename?: "RandomWheelEntry"; id: string; name: string; weight: number }
}

export type ClearRandomWheelMutationVariables = Exact<{
  id: Scalars["String"]["input"]
}>

export type ClearRandomWheelMutation = { __typename?: "Mutation"; clearRandomWheel: number }

export type CreateRandomWheelMutationVariables = Exact<{
  name?: InputMaybe<Scalars["String"]["input"]>
  accessType?: InputMaybe<Scalars["String"]["input"]>
  spinDuration?: InputMaybe<Scalars["Int"]["input"]>
  fadeDuration?: InputMaybe<Scalars["Int"]["input"]>
  editAnonymous?: InputMaybe<Scalars["Boolean"]["input"]>
}>

export type CreateRandomWheelMutation = {
  __typename?: "Mutation"
  createRandomWheel: {
    __typename?: "RandomWheel"
    id: string
    slug: string
    name?: string | null
    createdAt: Date
    rotation: number
    spinDuration: number
    fadeDuration: number
    accessType: string
    editable: boolean
    editAnonymous: boolean
    uniqueEntries: boolean
    shareToken?: string | null
    liked: boolean
    theme?: { __typename?: "ColorTheme"; id: string; name?: string | null; colors: Array<string> } | null
    _count?: { __typename?: "RandomWheelCount"; entries: number } | null
  }
}

export type DeleteRandomWheelMutationVariables = Exact<{
  id: Scalars["String"]["input"]
}>

export type DeleteRandomWheelMutation = {
  __typename?: "Mutation"
  deleteRandomWheel?: { __typename?: "AppError"; errorMessage?: string | null; errorCode: number } | null
}

export type DeleteRandomWheelEntryMutationVariables = Exact<{
  id: Scalars["String"]["input"]
}>

export type DeleteRandomWheelEntryMutation = { __typename?: "Mutation"; deleteRandomWheelEntry?: boolean | null }

export type LikeRandomWheelMutationVariables = Exact<{
  randomWheelId: Scalars["String"]["input"]
  like: Scalars["Boolean"]["input"]
}>

export type LikeRandomWheelMutation = {
  __typename?: "Mutation"
  likeRandomWheel?: {
    __typename?: "RandomWheelLike"
    id: string
    userId: string
    randomWheelId: string
    createdAt: Date
  } | null
}

export type ResetShareTokenMutationVariables = Exact<{
  randomWheelId: Scalars["String"]["input"]
}>

export type ResetShareTokenMutation = { __typename?: "Mutation"; resetShareToken?: boolean | null }

export type SpinRandomWheelMutationVariables = Exact<{
  wheelId: Scalars["String"]["input"]
}>

export type SpinRandomWheelMutation = {
  __typename?: "Mutation"
  spinRandomWheel: {
    __typename?: "RandomWheelWinner"
    id: string
    name: string
    createdAt: Date
    drawnById?: string | null
    randomWheelId: string
    winnerIndex?: number | null
  }
}

export type UpdateRandomWheelMutationVariables = Exact<{
  id: Scalars["String"]["input"]
  options: RandomWheelInput
}>

export type UpdateRandomWheelMutation = {
  __typename?: "Mutation"
  updateRandomWheel?: {
    __typename?: "RandomWheel"
    id: string
    slug: string
    name?: string | null
    createdAt: Date
    rotation: number
    spinDuration: number
    fadeDuration: number
    accessType: string
    editable: boolean
    editAnonymous: boolean
    uniqueEntries: boolean
    shareToken?: string | null
    liked: boolean
    theme?: { __typename?: "ColorTheme"; id: string; name?: string | null; colors: Array<string> } | null
    _count?: { __typename?: "RandomWheelCount"; entries: number } | null
  } | null
}

export type UpdateRandomWheelEntryMutationVariables = Exact<{
  id: Scalars["String"]["input"]
  entry: RandomWheelEntryInput
}>

export type UpdateRandomWheelEntryMutation = {
  __typename?: "Mutation"
  updateRandomWheelEntry: { __typename?: "RandomWheelEntry"; id: string; name: string; weight: number }
}

export type UpdateRandomWheelMembersMutationVariables = Exact<{
  randomWheelId: Scalars["String"]["input"]
  members: Array<RandomWheelMemberInput> | RandomWheelMemberInput
}>

export type UpdateRandomWheelMembersMutation = {
  __typename?: "Mutation"
  updateRandomWheelMembers?: Array<{ __typename?: "RandomWheelMember"; id: string }> | null
}

export type RegisterMutationVariables = Exact<{
  username: Scalars["String"]["input"]
  password: Scalars["String"]["input"]
  displayname?: InputMaybe<Scalars["String"]["input"]>
}>

export type RegisterMutation = {
  __typename?: "Mutation"
  register: {
    __typename?: "UserResponse"
    user?: { __typename?: "User"; id: string; username: string; displayname?: string | null } | null
    errors?: Array<{ __typename?: "FieldError"; field: string; message: string }> | null
  }
}

export type AddWheelSyncMutationVariables = Exact<{
  rewardId: Scalars["String"]["input"]
  randomWheelId: Scalars["String"]["input"]
  useInput?: InputMaybe<Scalars["Boolean"]["input"]>
  addExisting?: InputMaybe<Scalars["Boolean"]["input"]>
}>

export type AddWheelSyncMutation = {
  __typename?: "Mutation"
  addWheelSync?: {
    __typename?: "RandomWheelSync"
    id: string
    randomWheelId: string
    eventSubscriptionId?: string | null
    rewardId: string
    paused: boolean
    useInput: boolean
    pending: boolean
    createdAt: Date
  } | null
}

export type DeleteWheelSyncMutationVariables = Exact<{
  ids: Array<Scalars["String"]["input"]> | Scalars["String"]["input"]
}>

export type DeleteWheelSyncMutation = { __typename?: "Mutation"; deleteWheelSync?: boolean | null }

export type DisconnectAccessTokenMutationVariables = Exact<{ [key: string]: never }>

export type DisconnectAccessTokenMutation = { __typename?: "Mutation"; disconnectAccessToken: boolean }

export type PauseWheelSyncMutationVariables = Exact<{
  id: Scalars["String"]["input"]
  paused: Scalars["Boolean"]["input"]
}>

export type PauseWheelSyncMutation = {
  __typename?: "Mutation"
  pauseWheelSync?: {
    __typename?: "RandomWheelSync"
    id: string
    randomWheelId: string
    eventSubscriptionId?: string | null
    rewardId: string
    paused: boolean
    useInput: boolean
    pending: boolean
    createdAt: Date
  } | null
}

export type CreateChannelRewardMutationVariables = Exact<{
  reward: CustomRewardCreateInput
}>

export type CreateChannelRewardMutation = {
  __typename?: "Mutation"
  createChannelReward?: {
    __typename?: "CustomReward"
    id: string
    broadcasterId: string
    broadcasterName: string
    broadcasterDisplayName: string
    backgroundColor: string
    isEnabled: boolean
    cost: number
    title: string
    prompt: string
    userInputRequired: boolean
    maxRedemptionsPerStream?: number | null
    maxRedemptionsPerUserPerStream?: number | null
    globalCooldown?: number | null
    isPaused: boolean
    isInStock: boolean
    redemptionsThisStream?: number | null
    autoFulfill: boolean
    cooldownExpiryDate?: Date | null
    image: string
  } | null
}

export type CreateRewardLinkMutationVariables = Exact<{
  rewardId: Scalars["String"]["input"]
  type: Scalars["String"]["input"]
}>

export type CreateRewardLinkMutation = {
  __typename?: "Mutation"
  createRewardLink?: {
    __typename?: "RewardLink"
    id: string
    userId: string
    rewardId: string
    token: string
    type: string
  } | null
}

export type DeleteChannelRewardMutationVariables = Exact<{
  rewardId: Scalars["String"]["input"]
}>

export type DeleteChannelRewardMutation = { __typename?: "Mutation"; deleteChannelReward: boolean }

export type DeleteRewardLinkMutationVariables = Exact<{
  id: Scalars["String"]["input"]
}>

export type DeleteRewardLinkMutation = { __typename?: "Mutation"; deleteRewardLink: boolean }

export type UpdateChannelRewardMutationVariables = Exact<{
  rewardId: Scalars["String"]["input"]
  reward: CustomRewardUpdateInput
}>

export type UpdateChannelRewardMutation = {
  __typename?: "Mutation"
  updateChannelReward?: {
    __typename?: "CustomReward"
    id: string
    broadcasterId: string
    broadcasterName: string
    broadcasterDisplayName: string
    backgroundColor: string
    isEnabled: boolean
    cost: number
    title: string
    prompt: string
    userInputRequired: boolean
    maxRedemptionsPerStream?: number | null
    maxRedemptionsPerUserPerStream?: number | null
    globalCooldown?: number | null
    isPaused: boolean
    isInStock: boolean
    redemptionsThisStream?: number | null
    autoFulfill: boolean
    cooldownExpiryDate?: Date | null
    image: string
  } | null
}

export type UpdateRewardTokenMutationVariables = Exact<{
  type: Scalars["String"]["input"]
  token: Scalars["String"]["input"]
}>

export type UpdateRewardTokenMutation = {
  __typename?: "Mutation"
  updateRewardToken: {
    __typename?: "CustomReward"
    id: string
    title: string
    backgroundColor: string
    isEnabled: boolean
    isPaused: boolean
    image: string
  }
}

export type AddRewardGroupItemMutationVariables = Exact<{
  rewardGroupId: Scalars["String"]["input"]
  rewardId: Scalars["String"]["input"]
  triggerCooldown?: InputMaybe<Scalars["Boolean"]["input"]>
}>

export type AddRewardGroupItemMutation = {
  __typename?: "Mutation"
  addRewardGroupItem?: {
    __typename?: "RewardGroupItem"
    id: string
    rewardGroupId: string
    rewardId: string
    rewardEnabled: boolean
    triggerCooldown: boolean
  } | null
}

export type CreateRewardGroupMutationVariables = Exact<{
  rewardGroup: RewardGroupInput
  items: Array<RewardGroupItemInput> | RewardGroupItemInput
}>

export type CreateRewardGroupMutation = {
  __typename?: "Mutation"
  createRewardGroup?: {
    __typename?: "RewardGroup"
    id: string
    name?: string | null
    active: boolean
    triggerSelected: boolean
    userId: string
    cooldownExpiry?: Date | null
    items?: Array<{
      __typename?: "RewardGroupItem"
      id: string
      rewardGroupId: string
      rewardId: string
      rewardEnabled: boolean
      triggerCooldown: boolean
    }> | null
  } | null
}

export type DeleteRewardGroupMutationVariables = Exact<{
  id: Scalars["String"]["input"]
}>

export type DeleteRewardGroupMutation = { __typename?: "Mutation"; deleteRewardGroup?: boolean | null }

export type DeleteRewardGroupItemMutationVariables = Exact<{
  id: Scalars["String"]["input"]
}>

export type DeleteRewardGroupItemMutation = { __typename?: "Mutation"; deleteRewardGroupItem?: boolean | null }

export type UpdateRewardGroupMutationVariables = Exact<{
  id: Scalars["String"]["input"]
  rewardGroup?: InputMaybe<RewardGroupInput>
  items?: InputMaybe<Array<RewardGroupItemInput> | RewardGroupItemInput>
}>

export type UpdateRewardGroupMutation = {
  __typename?: "Mutation"
  updateRewardGroup?: {
    __typename?: "RewardGroup"
    id: string
    name?: string | null
    active: boolean
    triggerSelected: boolean
    userId: string
    cooldownExpiry?: Date | null
    items?: Array<{
      __typename?: "RewardGroupItem"
      id: string
      rewardGroupId: string
      rewardId: string
      rewardEnabled: boolean
      triggerCooldown: boolean
    }> | null
  } | null
}

export type UpdateRewardGroupItemMutationVariables = Exact<{
  id: Scalars["String"]["input"]
  rewardEnabled?: InputMaybe<Scalars["Boolean"]["input"]>
  triggerCooldown?: InputMaybe<Scalars["Boolean"]["input"]>
}>

export type UpdateRewardGroupItemMutation = {
  __typename?: "Mutation"
  updateRewardGroupItem?: {
    __typename?: "RewardGroupItem"
    id: string
    rewardGroupId: string
    rewardId: string
    rewardEnabled: boolean
    triggerCooldown: boolean
  } | null
}

export type UpdateUserMutationVariables = Exact<{
  user: UserInput
}>

export type UpdateUserMutation = {
  __typename?: "Mutation"
  updateUser: {
    __typename?: "UserResponse"
    user?: { __typename?: "User"; id: string; username: string; displayname?: string | null } | null
    errors?: Array<{ __typename?: "FieldError"; field: string; message: string }> | null
  }
}

export type ColorThemesQueryVariables = Exact<{
  type?: InputMaybe<Scalars["String"]["input"]>
}>

export type ColorThemesQuery = {
  __typename?: "Query"
  colorThemes: Array<{
    __typename?: "ColorTheme"
    id: string
    name?: string | null
    colors: Array<string>
    creatorId?: string | null
    global: boolean
  }>
}

export type MeQueryVariables = Exact<{ [key: string]: never }>

export type MeQuery = {
  __typename?: "Query"
  me?: { __typename?: "User"; id: string; username: string; displayname?: string | null } | null
}

export type MyRandomWheelsQueryVariables = Exact<{
  type?: InputMaybe<Scalars["String"]["input"]>
}>

export type MyRandomWheelsQuery = {
  __typename?: "Query"
  myRandomWheels: Array<{
    __typename?: "RandomWheel"
    id: string
    slug: string
    name?: string | null
    createdAt: Date
    rotation: number
    spinDuration: number
    fadeDuration: number
    accessType: string
    editable: boolean
    editAnonymous: boolean
    uniqueEntries: boolean
    shareToken?: string | null
    liked: boolean
    theme?: { __typename?: "ColorTheme"; id: string; name?: string | null; colors: Array<string> } | null
    _count?: { __typename?: "RandomWheelCount"; entries: number } | null
  }>
}

export type RandomWheelBySlugQueryVariables = Exact<{
  slug: Scalars["String"]["input"]
  token?: InputMaybe<Scalars["String"]["input"]>
}>

export type RandomWheelBySlugQuery = {
  __typename?: "Query"
  randomWheelBySlug?: {
    __typename?: "RandomWheel"
    id: string
    slug: string
    name?: string | null
    createdAt: Date
    rotation: number
    spinDuration: number
    fadeDuration: number
    accessType: string
    editable: boolean
    editAnonymous: boolean
    uniqueEntries: boolean
    shareToken?: string | null
    liked: boolean
    owner?: { __typename?: "User"; id: string; username: string; displayname?: string | null } | null
    members: Array<{
      __typename?: "RandomWheelMember"
      id: string
      roleName: string
      user: { __typename?: "User"; id: string; username: string; displayname?: string | null }
    }>
    theme?: { __typename?: "ColorTheme"; id: string; name?: string | null; colors: Array<string> } | null
    _count?: { __typename?: "RandomWheelCount"; entries: number } | null
  } | null
}

export type RandomWheelBySlugShareTokenQueryVariables = Exact<{
  slug: Scalars["String"]["input"]
  token?: InputMaybe<Scalars["String"]["input"]>
}>

export type RandomWheelBySlugShareTokenQuery = {
  __typename?: "Query"
  randomWheelBySlug?: { __typename?: "RandomWheel"; shareToken?: string | null } | null
}

export type RandomWheelBySlugEntriesQueryVariables = Exact<{
  slug: Scalars["String"]["input"]
  token?: InputMaybe<Scalars["String"]["input"]>
}>

export type RandomWheelBySlugEntriesQuery = {
  __typename?: "Query"
  randomWheelBySlug?: {
    __typename?: "RandomWheel"
    id: string
    entries: Array<{ __typename?: "RandomWheelEntry"; id: string; name: string; weight: number }>
  } | null
}

export type RandomWheelBySlugMembersQueryVariables = Exact<{
  slug: Scalars["String"]["input"]
  token?: InputMaybe<Scalars["String"]["input"]>
}>

export type RandomWheelBySlugMembersQuery = {
  __typename?: "Query"
  randomWheelBySlug?: {
    __typename?: "RandomWheel"
    id: string
    members: Array<{
      __typename?: "RandomWheelMember"
      id: string
      roleName: string
      user: { __typename?: "User"; id: string; username: string; displayname?: string | null }
    }>
  } | null
}

export type RandomWheelBySlugWinnersQueryVariables = Exact<{
  slug: Scalars["String"]["input"]
  token?: InputMaybe<Scalars["String"]["input"]>
}>

export type RandomWheelBySlugWinnersQuery = {
  __typename?: "Query"
  randomWheelBySlug?: {
    __typename?: "RandomWheel"
    id: string
    winners: Array<{
      __typename?: "RandomWheelWinner"
      id: string
      name: string
      createdAt: Date
      winnerIndex?: number | null
    }>
  } | null
}

export type ChannelRewardsQueryVariables = Exact<{
  userId?: InputMaybe<Scalars["String"]["input"]>
  onlyManageable?: InputMaybe<Scalars["Boolean"]["input"]>
}>

export type ChannelRewardsQuery = {
  __typename?: "Query"
  channelRewards: Array<{
    __typename?: "CustomReward"
    id: string
    broadcasterId: string
    broadcasterName: string
    broadcasterDisplayName: string
    backgroundColor: string
    isEnabled: boolean
    cost: number
    title: string
    prompt: string
    userInputRequired: boolean
    maxRedemptionsPerStream?: number | null
    maxRedemptionsPerUserPerStream?: number | null
    globalCooldown?: number | null
    isPaused: boolean
    isInStock: boolean
    redemptionsThisStream?: number | null
    autoFulfill: boolean
    cooldownExpiryDate?: Date | null
    image: string
  }>
}

export type RewardByTokenQueryVariables = Exact<{
  type: Scalars["String"]["input"]
  token: Scalars["String"]["input"]
}>

export type RewardByTokenQuery = {
  __typename?: "Query"
  rewardByToken: {
    __typename?: "CustomReward"
    id: string
    title: string
    backgroundColor: string
    isEnabled: boolean
    isPaused: boolean
    image: string
  }
}

export type RewardGroupQueryVariables = Exact<{
  id: Scalars["String"]["input"]
}>

export type RewardGroupQuery = {
  __typename?: "Query"
  rewardGroup: {
    __typename?: "RewardGroup"
    id: string
    name?: string | null
    active: boolean
    triggerSelected: boolean
    userId: string
    cooldownExpiry?: Date | null
    items?: Array<{
      __typename?: "RewardGroupItem"
      id: string
      rewardGroupId: string
      rewardId: string
      rewardEnabled: boolean
      triggerCooldown: boolean
    }> | null
  }
}

export type RewardGroupsQueryVariables = Exact<{
  items?: InputMaybe<Scalars["Boolean"]["input"]>
}>

export type RewardGroupsQuery = {
  __typename?: "Query"
  rewardGroups: Array<{
    __typename?: "RewardGroup"
    id: string
    name?: string | null
    active: boolean
    triggerSelected: boolean
    userId: string
    cooldownExpiry?: Date | null
    items?: Array<{
      __typename?: "RewardGroupItem"
      id: string
      rewardGroupId: string
      rewardId: string
      rewardEnabled: boolean
      triggerCooldown: boolean
    }> | null
  }>
}

export type RewardLinksQueryVariables = Exact<{
  rewardIds?: InputMaybe<Array<Scalars["String"]["input"]> | Scalars["String"]["input"]>
}>

export type RewardLinksQuery = {
  __typename?: "Query"
  rewardLinks: Array<{
    __typename?: "RewardLink"
    id: string
    userId: string
    rewardId: string
    token: string
    type: string
  }>
}

export type SyncForWheelQueryVariables = Exact<{
  randomWheelId: Scalars["String"]["input"]
}>

export type SyncForWheelQuery = {
  __typename?: "Query"
  syncForWheel: Array<{
    __typename?: "RandomWheelSync"
    id: string
    randomWheelId: string
    eventSubscriptionId?: string | null
    rewardId: string
    paused: boolean
    useInput: boolean
    pending: boolean
    createdAt: Date
    reward?: {
      __typename?: "CustomReward"
      id: string
      title: string
      backgroundColor: string
      isEnabled: boolean
      isPaused: boolean
      image: string
    } | null
  }>
}

export type UserAccessTokenQueryVariables = Exact<{ [key: string]: never }>

export type UserAccessTokenQuery = {
  __typename?: "Query"
  userAccesToken?: {
    __typename?: "UserAccessToken"
    id: string
    scope: Array<string>
    expiresIn: number
    obtainmentTimestamp: bigint
    twitchUserId?: string | null
    twitchUsername?: string | null
  } | null
}

export type UsernameExistsMutationVariables = Exact<{
  username: Scalars["String"]["input"]
}>

export type UsernameExistsMutation = { __typename?: "Mutation"; usernameExists: boolean }

export const ColorThemeFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ColorTheme" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "ColorTheme" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "colors" } },
          { kind: "Field", name: { kind: "Name", value: "creatorId" } },
          { kind: "Field", name: { kind: "Name", value: "global" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ColorThemeFragment, unknown>
export const CustomRewardFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "CustomReward" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "CustomReward" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "broadcasterId" } },
          { kind: "Field", name: { kind: "Name", value: "broadcasterName" } },
          { kind: "Field", name: { kind: "Name", value: "broadcasterDisplayName" } },
          { kind: "Field", name: { kind: "Name", value: "backgroundColor" } },
          { kind: "Field", name: { kind: "Name", value: "isEnabled" } },
          { kind: "Field", name: { kind: "Name", value: "cost" } },
          { kind: "Field", name: { kind: "Name", value: "title" } },
          { kind: "Field", name: { kind: "Name", value: "prompt" } },
          { kind: "Field", name: { kind: "Name", value: "userInputRequired" } },
          { kind: "Field", name: { kind: "Name", value: "maxRedemptionsPerStream" } },
          { kind: "Field", name: { kind: "Name", value: "maxRedemptionsPerUserPerStream" } },
          { kind: "Field", name: { kind: "Name", value: "globalCooldown" } },
          { kind: "Field", name: { kind: "Name", value: "isPaused" } },
          { kind: "Field", name: { kind: "Name", value: "isInStock" } },
          { kind: "Field", name: { kind: "Name", value: "redemptionsThisStream" } },
          { kind: "Field", name: { kind: "Name", value: "autoFulfill" } },
          { kind: "Field", name: { kind: "Name", value: "cooldownExpiryDate" } },
          { kind: "Field", name: { kind: "Name", value: "image" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CustomRewardFragment, unknown>
export const CustomRewardMenuItemFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "CustomRewardMenuItem" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "CustomReward" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "title" } },
          { kind: "Field", name: { kind: "Name", value: "backgroundColor" } },
          { kind: "Field", name: { kind: "Name", value: "isEnabled" } },
          { kind: "Field", name: { kind: "Name", value: "isPaused" } },
          { kind: "Field", name: { kind: "Name", value: "image" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CustomRewardMenuItemFragment, unknown>
export const RandomWheelDetailsFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "RandomWheelDetails" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "RandomWheel" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "slug" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
          { kind: "Field", name: { kind: "Name", value: "rotation" } },
          { kind: "Field", name: { kind: "Name", value: "spinDuration" } },
          { kind: "Field", name: { kind: "Name", value: "fadeDuration" } },
          { kind: "Field", name: { kind: "Name", value: "accessType" } },
          { kind: "Field", name: { kind: "Name", value: "editable" } },
          { kind: "Field", name: { kind: "Name", value: "editAnonymous" } },
          { kind: "Field", name: { kind: "Name", value: "uniqueEntries" } },
          { kind: "Field", name: { kind: "Name", value: "shareToken" } },
          { kind: "Field", name: { kind: "Name", value: "liked" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "theme" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "colors" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "_count" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "Field", name: { kind: "Name", value: "entries" } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<RandomWheelDetailsFragment, unknown>
export const RandomWheelEntryFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "RandomWheelEntry" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "RandomWheelEntry" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "weight" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<RandomWheelEntryFragment, unknown>
export const RandomWheelWinnerFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "RandomWheelWinner" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "RandomWheelWinner" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
          { kind: "Field", name: { kind: "Name", value: "winnerIndex" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<RandomWheelWinnerFragment, unknown>
export const UserNameFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "UserName" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "User" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "username" } },
          { kind: "Field", name: { kind: "Name", value: "displayname" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UserNameFragment, unknown>
export const RandomWheelMemberFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "RandomWheelMember" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "RandomWheelMember" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "roleName" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "user" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: "UserName" } }],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "UserName" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "User" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "username" } },
          { kind: "Field", name: { kind: "Name", value: "displayname" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<RandomWheelMemberFragment, unknown>
export const RandomWheelSyncFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "RandomWheelSync" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "RandomWheelSync" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "randomWheelId" } },
          { kind: "Field", name: { kind: "Name", value: "eventSubscriptionId" } },
          { kind: "Field", name: { kind: "Name", value: "rewardId" } },
          { kind: "Field", name: { kind: "Name", value: "paused" } },
          { kind: "Field", name: { kind: "Name", value: "useInput" } },
          { kind: "Field", name: { kind: "Name", value: "pending" } },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<RandomWheelSyncFragment, unknown>
export const RewardGroupDetailsFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "RewardGroupDetails" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "RewardGroup" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "active" } },
          { kind: "Field", name: { kind: "Name", value: "triggerSelected" } },
          { kind: "Field", name: { kind: "Name", value: "userId" } },
          { kind: "Field", name: { kind: "Name", value: "cooldownExpiry" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<RewardGroupDetailsFragment, unknown>
export const RewardGroupItemFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "RewardGroupItem" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "RewardGroupItem" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "rewardGroupId" } },
          { kind: "Field", name: { kind: "Name", value: "rewardId" } },
          { kind: "Field", name: { kind: "Name", value: "rewardEnabled" } },
          { kind: "Field", name: { kind: "Name", value: "triggerCooldown" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<RewardGroupItemFragment, unknown>
export const RewardGroupFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "RewardGroup" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "RewardGroup" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "FragmentSpread", name: { kind: "Name", value: "RewardGroupDetails" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "items" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: "RewardGroupItem" } }],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "RewardGroupDetails" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "RewardGroup" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "active" } },
          { kind: "Field", name: { kind: "Name", value: "triggerSelected" } },
          { kind: "Field", name: { kind: "Name", value: "userId" } },
          { kind: "Field", name: { kind: "Name", value: "cooldownExpiry" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "RewardGroupItem" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "RewardGroupItem" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "rewardGroupId" } },
          { kind: "Field", name: { kind: "Name", value: "rewardId" } },
          { kind: "Field", name: { kind: "Name", value: "rewardEnabled" } },
          { kind: "Field", name: { kind: "Name", value: "triggerCooldown" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<RewardGroupFragment, unknown>
export const RewardLinkFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "RewardLink" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "RewardLink" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "userId" } },
          { kind: "Field", name: { kind: "Name", value: "rewardId" } },
          { kind: "Field", name: { kind: "Name", value: "token" } },
          { kind: "Field", name: { kind: "Name", value: "type" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<RewardLinkFragment, unknown>
export const NormalUserFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "NormalUser" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "User" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "username" } },
          { kind: "Field", name: { kind: "Name", value: "displayname" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<NormalUserFragment, unknown>
export const UserAccessTokenFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "UserAccessToken" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "UserAccessToken" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "scope" } },
          { kind: "Field", name: { kind: "Name", value: "expiresIn" } },
          { kind: "Field", name: { kind: "Name", value: "obtainmentTimestamp" } },
          { kind: "Field", name: { kind: "Name", value: "twitchUserId" } },
          { kind: "Field", name: { kind: "Name", value: "twitchUsername" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UserAccessTokenFragment, unknown>
export const LoginDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "Login" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "username" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "String" } } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "password" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "String" } } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "login" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "username" },
                value: { kind: "Variable", name: { kind: "Name", value: "username" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "password" },
                value: { kind: "Variable", name: { kind: "Name", value: "password" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "user" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: "NormalUser" } }],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "errors" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "field" } },
                      { kind: "Field", name: { kind: "Name", value: "message" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "NormalUser" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "User" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "username" } },
          { kind: "Field", name: { kind: "Name", value: "displayname" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>
export const LogoutDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "Logout" },
      selectionSet: { kind: "SelectionSet", selections: [{ kind: "Field", name: { kind: "Name", value: "logout" } }] },
    },
  ],
} as unknown as DocumentNode<LogoutMutation, LogoutMutationVariables>
export const AddRandomWheelEntryDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "AddRandomWheelEntry" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "randomWheelId" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "String" } } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "name" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "String" } } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "addRandomWheelEntry" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "randomWheelId" },
                value: { kind: "Variable", name: { kind: "Name", value: "randomWheelId" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "name" },
                value: { kind: "Variable", name: { kind: "Name", value: "name" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: "RandomWheelEntry" } }],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "RandomWheelEntry" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "RandomWheelEntry" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "weight" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AddRandomWheelEntryMutation, AddRandomWheelEntryMutationVariables>
export const ClearRandomWheelDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "ClearRandomWheel" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "String" } } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "clearRandomWheel" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: { kind: "Variable", name: { kind: "Name", value: "id" } },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ClearRandomWheelMutation, ClearRandomWheelMutationVariables>
export const CreateRandomWheelDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CreateRandomWheel" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "name" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "accessType" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "spinDuration" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "fadeDuration" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "editAnonymous" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "Boolean" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createRandomWheel" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "name" },
                value: { kind: "Variable", name: { kind: "Name", value: "name" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "accessType" },
                value: { kind: "Variable", name: { kind: "Name", value: "accessType" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "spinDuration" },
                value: { kind: "Variable", name: { kind: "Name", value: "spinDuration" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "fadeDuration" },
                value: { kind: "Variable", name: { kind: "Name", value: "fadeDuration" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "editAnonymous" },
                value: { kind: "Variable", name: { kind: "Name", value: "editAnonymous" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: "RandomWheelDetails" } }],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "RandomWheelDetails" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "RandomWheel" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "slug" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
          { kind: "Field", name: { kind: "Name", value: "rotation" } },
          { kind: "Field", name: { kind: "Name", value: "spinDuration" } },
          { kind: "Field", name: { kind: "Name", value: "fadeDuration" } },
          { kind: "Field", name: { kind: "Name", value: "accessType" } },
          { kind: "Field", name: { kind: "Name", value: "editable" } },
          { kind: "Field", name: { kind: "Name", value: "editAnonymous" } },
          { kind: "Field", name: { kind: "Name", value: "uniqueEntries" } },
          { kind: "Field", name: { kind: "Name", value: "shareToken" } },
          { kind: "Field", name: { kind: "Name", value: "liked" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "theme" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "colors" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "_count" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "Field", name: { kind: "Name", value: "entries" } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateRandomWheelMutation, CreateRandomWheelMutationVariables>
export const DeleteRandomWheelDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "DeleteRandomWheel" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "String" } } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "deleteRandomWheel" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: { kind: "Variable", name: { kind: "Name", value: "id" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "errorMessage" } },
                { kind: "Field", name: { kind: "Name", value: "errorCode" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DeleteRandomWheelMutation, DeleteRandomWheelMutationVariables>
export const DeleteRandomWheelEntryDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "DeleteRandomWheelEntry" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "String" } } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "deleteRandomWheelEntry" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: { kind: "Variable", name: { kind: "Name", value: "id" } },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DeleteRandomWheelEntryMutation, DeleteRandomWheelEntryMutationVariables>
export const LikeRandomWheelDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "LikeRandomWheel" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "randomWheelId" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "String" } } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "like" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "Boolean" } } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "likeRandomWheel" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "randomWheelId" },
                value: { kind: "Variable", name: { kind: "Name", value: "randomWheelId" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "like" },
                value: { kind: "Variable", name: { kind: "Name", value: "like" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "userId" } },
                { kind: "Field", name: { kind: "Name", value: "randomWheelId" } },
                { kind: "Field", name: { kind: "Name", value: "createdAt" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<LikeRandomWheelMutation, LikeRandomWheelMutationVariables>
export const ResetShareTokenDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "ResetShareToken" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "randomWheelId" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "String" } } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "resetShareToken" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "randommWheelId" },
                value: { kind: "Variable", name: { kind: "Name", value: "randomWheelId" } },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ResetShareTokenMutation, ResetShareTokenMutationVariables>
export const SpinRandomWheelDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "SpinRandomWheel" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "wheelId" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "String" } } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "spinRandomWheel" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "randommWheelId" },
                value: { kind: "Variable", name: { kind: "Name", value: "wheelId" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                { kind: "Field", name: { kind: "Name", value: "drawnById" } },
                { kind: "Field", name: { kind: "Name", value: "randomWheelId" } },
                { kind: "Field", name: { kind: "Name", value: "winnerIndex" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SpinRandomWheelMutation, SpinRandomWheelMutationVariables>
export const UpdateRandomWheelDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateRandomWheel" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "String" } } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "options" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "RandomWheelInput" } } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateRandomWheel" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: { kind: "Variable", name: { kind: "Name", value: "id" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "options" },
                value: { kind: "Variable", name: { kind: "Name", value: "options" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: "RandomWheelDetails" } }],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "RandomWheelDetails" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "RandomWheel" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "slug" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
          { kind: "Field", name: { kind: "Name", value: "rotation" } },
          { kind: "Field", name: { kind: "Name", value: "spinDuration" } },
          { kind: "Field", name: { kind: "Name", value: "fadeDuration" } },
          { kind: "Field", name: { kind: "Name", value: "accessType" } },
          { kind: "Field", name: { kind: "Name", value: "editable" } },
          { kind: "Field", name: { kind: "Name", value: "editAnonymous" } },
          { kind: "Field", name: { kind: "Name", value: "uniqueEntries" } },
          { kind: "Field", name: { kind: "Name", value: "shareToken" } },
          { kind: "Field", name: { kind: "Name", value: "liked" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "theme" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "colors" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "_count" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "Field", name: { kind: "Name", value: "entries" } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateRandomWheelMutation, UpdateRandomWheelMutationVariables>
export const UpdateRandomWheelEntryDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateRandomWheelEntry" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "String" } } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "entry" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "RandomWheelEntryInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateRandomWheelEntry" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: { kind: "Variable", name: { kind: "Name", value: "id" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "entry" },
                value: { kind: "Variable", name: { kind: "Name", value: "entry" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: "RandomWheelEntry" } }],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "RandomWheelEntry" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "RandomWheelEntry" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "weight" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateRandomWheelEntryMutation, UpdateRandomWheelEntryMutationVariables>
export const UpdateRandomWheelMembersDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateRandomWheelMembers" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "randomWheelId" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "String" } } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "members" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "ListType",
              type: {
                kind: "NonNullType",
                type: { kind: "NamedType", name: { kind: "Name", value: "RandomWheelMemberInput" } },
              },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateRandomWheelMembers" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "randomWheelId" },
                value: { kind: "Variable", name: { kind: "Name", value: "randomWheelId" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "members" },
                value: { kind: "Variable", name: { kind: "Name", value: "members" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "Field", name: { kind: "Name", value: "id" } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateRandomWheelMembersMutation, UpdateRandomWheelMembersMutationVariables>
export const RegisterDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "Register" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "username" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "String" } } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "password" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "String" } } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "displayname" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "register" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "username" },
                value: { kind: "Variable", name: { kind: "Name", value: "username" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "password" },
                value: { kind: "Variable", name: { kind: "Name", value: "password" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "displayname" },
                value: { kind: "Variable", name: { kind: "Name", value: "displayname" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "user" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: "NormalUser" } }],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "errors" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "field" } },
                      { kind: "Field", name: { kind: "Name", value: "message" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "NormalUser" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "User" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "username" } },
          { kind: "Field", name: { kind: "Name", value: "displayname" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<RegisterMutation, RegisterMutationVariables>
export const AddWheelSyncDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "AddWheelSync" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "rewardId" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "String" } } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "randomWheelId" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "String" } } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "useInput" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "Boolean" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "addExisting" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "Boolean" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "addWheelSync" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "rewardId" },
                value: { kind: "Variable", name: { kind: "Name", value: "rewardId" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "randomWheelId" },
                value: { kind: "Variable", name: { kind: "Name", value: "randomWheelId" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "useInput" },
                value: { kind: "Variable", name: { kind: "Name", value: "useInput" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "addExisting" },
                value: { kind: "Variable", name: { kind: "Name", value: "addExisting" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: "RandomWheelSync" } }],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "RandomWheelSync" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "RandomWheelSync" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "randomWheelId" } },
          { kind: "Field", name: { kind: "Name", value: "eventSubscriptionId" } },
          { kind: "Field", name: { kind: "Name", value: "rewardId" } },
          { kind: "Field", name: { kind: "Name", value: "paused" } },
          { kind: "Field", name: { kind: "Name", value: "useInput" } },
          { kind: "Field", name: { kind: "Name", value: "pending" } },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AddWheelSyncMutation, AddWheelSyncMutationVariables>
export const DeleteWheelSyncDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "DeleteWheelSync" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "ids" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "ListType",
              type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "String" } } },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "deleteWheelSync" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "ids" },
                value: { kind: "Variable", name: { kind: "Name", value: "ids" } },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DeleteWheelSyncMutation, DeleteWheelSyncMutationVariables>
export const DisconnectAccessTokenDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "DisconnectAccessToken" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [{ kind: "Field", name: { kind: "Name", value: "disconnectAccessToken" } }],
      },
    },
  ],
} as unknown as DocumentNode<DisconnectAccessTokenMutation, DisconnectAccessTokenMutationVariables>
export const PauseWheelSyncDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "PauseWheelSync" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "String" } } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "paused" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "Boolean" } } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "pauseWheelSync" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: { kind: "Variable", name: { kind: "Name", value: "id" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "paused" },
                value: { kind: "Variable", name: { kind: "Name", value: "paused" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: "RandomWheelSync" } }],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "RandomWheelSync" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "RandomWheelSync" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "randomWheelId" } },
          { kind: "Field", name: { kind: "Name", value: "eventSubscriptionId" } },
          { kind: "Field", name: { kind: "Name", value: "rewardId" } },
          { kind: "Field", name: { kind: "Name", value: "paused" } },
          { kind: "Field", name: { kind: "Name", value: "useInput" } },
          { kind: "Field", name: { kind: "Name", value: "pending" } },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<PauseWheelSyncMutation, PauseWheelSyncMutationVariables>
export const CreateChannelRewardDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CreateChannelReward" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "reward" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "CustomRewardCreateInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createChannelReward" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "reward" },
                value: { kind: "Variable", name: { kind: "Name", value: "reward" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: "CustomReward" } }],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "CustomReward" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "CustomReward" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "broadcasterId" } },
          { kind: "Field", name: { kind: "Name", value: "broadcasterName" } },
          { kind: "Field", name: { kind: "Name", value: "broadcasterDisplayName" } },
          { kind: "Field", name: { kind: "Name", value: "backgroundColor" } },
          { kind: "Field", name: { kind: "Name", value: "isEnabled" } },
          { kind: "Field", name: { kind: "Name", value: "cost" } },
          { kind: "Field", name: { kind: "Name", value: "title" } },
          { kind: "Field", name: { kind: "Name", value: "prompt" } },
          { kind: "Field", name: { kind: "Name", value: "userInputRequired" } },
          { kind: "Field", name: { kind: "Name", value: "maxRedemptionsPerStream" } },
          { kind: "Field", name: { kind: "Name", value: "maxRedemptionsPerUserPerStream" } },
          { kind: "Field", name: { kind: "Name", value: "globalCooldown" } },
          { kind: "Field", name: { kind: "Name", value: "isPaused" } },
          { kind: "Field", name: { kind: "Name", value: "isInStock" } },
          { kind: "Field", name: { kind: "Name", value: "redemptionsThisStream" } },
          { kind: "Field", name: { kind: "Name", value: "autoFulfill" } },
          { kind: "Field", name: { kind: "Name", value: "cooldownExpiryDate" } },
          { kind: "Field", name: { kind: "Name", value: "image" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateChannelRewardMutation, CreateChannelRewardMutationVariables>
export const CreateRewardLinkDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CreateRewardLink" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "rewardId" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "String" } } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "type" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "String" } } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createRewardLink" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "rewardId" },
                value: { kind: "Variable", name: { kind: "Name", value: "rewardId" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "type" },
                value: { kind: "Variable", name: { kind: "Name", value: "type" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: "RewardLink" } }],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "RewardLink" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "RewardLink" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "userId" } },
          { kind: "Field", name: { kind: "Name", value: "rewardId" } },
          { kind: "Field", name: { kind: "Name", value: "token" } },
          { kind: "Field", name: { kind: "Name", value: "type" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateRewardLinkMutation, CreateRewardLinkMutationVariables>
export const DeleteChannelRewardDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "DeleteChannelReward" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "rewardId" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "String" } } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "deleteChannelReward" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "rewardId" },
                value: { kind: "Variable", name: { kind: "Name", value: "rewardId" } },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DeleteChannelRewardMutation, DeleteChannelRewardMutationVariables>
export const DeleteRewardLinkDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "DeleteRewardLink" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "String" } } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "deleteRewardLink" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: { kind: "Variable", name: { kind: "Name", value: "id" } },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DeleteRewardLinkMutation, DeleteRewardLinkMutationVariables>
export const UpdateChannelRewardDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateChannelReward" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "rewardId" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "String" } } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "reward" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "CustomRewardUpdateInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateChannelReward" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "rewardId" },
                value: { kind: "Variable", name: { kind: "Name", value: "rewardId" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "reward" },
                value: { kind: "Variable", name: { kind: "Name", value: "reward" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: "CustomReward" } }],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "CustomReward" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "CustomReward" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "broadcasterId" } },
          { kind: "Field", name: { kind: "Name", value: "broadcasterName" } },
          { kind: "Field", name: { kind: "Name", value: "broadcasterDisplayName" } },
          { kind: "Field", name: { kind: "Name", value: "backgroundColor" } },
          { kind: "Field", name: { kind: "Name", value: "isEnabled" } },
          { kind: "Field", name: { kind: "Name", value: "cost" } },
          { kind: "Field", name: { kind: "Name", value: "title" } },
          { kind: "Field", name: { kind: "Name", value: "prompt" } },
          { kind: "Field", name: { kind: "Name", value: "userInputRequired" } },
          { kind: "Field", name: { kind: "Name", value: "maxRedemptionsPerStream" } },
          { kind: "Field", name: { kind: "Name", value: "maxRedemptionsPerUserPerStream" } },
          { kind: "Field", name: { kind: "Name", value: "globalCooldown" } },
          { kind: "Field", name: { kind: "Name", value: "isPaused" } },
          { kind: "Field", name: { kind: "Name", value: "isInStock" } },
          { kind: "Field", name: { kind: "Name", value: "redemptionsThisStream" } },
          { kind: "Field", name: { kind: "Name", value: "autoFulfill" } },
          { kind: "Field", name: { kind: "Name", value: "cooldownExpiryDate" } },
          { kind: "Field", name: { kind: "Name", value: "image" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateChannelRewardMutation, UpdateChannelRewardMutationVariables>
export const UpdateRewardTokenDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateRewardToken" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "type" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "String" } } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "token" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "String" } } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateRewardToken" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "type" },
                value: { kind: "Variable", name: { kind: "Name", value: "type" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "token" },
                value: { kind: "Variable", name: { kind: "Name", value: "token" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: "CustomRewardMenuItem" } }],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "CustomRewardMenuItem" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "CustomReward" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "title" } },
          { kind: "Field", name: { kind: "Name", value: "backgroundColor" } },
          { kind: "Field", name: { kind: "Name", value: "isEnabled" } },
          { kind: "Field", name: { kind: "Name", value: "isPaused" } },
          { kind: "Field", name: { kind: "Name", value: "image" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateRewardTokenMutation, UpdateRewardTokenMutationVariables>
export const AddRewardGroupItemDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "AddRewardGroupItem" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "rewardGroupId" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "String" } } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "rewardId" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "String" } } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "triggerCooldown" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "Boolean" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "addRewardGroupItem" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "rewardId" },
                value: { kind: "Variable", name: { kind: "Name", value: "rewardId" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "rewardGroupId" },
                value: { kind: "Variable", name: { kind: "Name", value: "rewardGroupId" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "triggerCooldown" },
                value: { kind: "Variable", name: { kind: "Name", value: "triggerCooldown" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: "RewardGroupItem" } }],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "RewardGroupItem" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "RewardGroupItem" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "rewardGroupId" } },
          { kind: "Field", name: { kind: "Name", value: "rewardId" } },
          { kind: "Field", name: { kind: "Name", value: "rewardEnabled" } },
          { kind: "Field", name: { kind: "Name", value: "triggerCooldown" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AddRewardGroupItemMutation, AddRewardGroupItemMutationVariables>
export const CreateRewardGroupDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CreateRewardGroup" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "rewardGroup" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "RewardGroupInput" } } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "items" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "ListType",
              type: {
                kind: "NonNullType",
                type: { kind: "NamedType", name: { kind: "Name", value: "RewardGroupItemInput" } },
              },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createRewardGroup" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "rewardGroup" },
                value: { kind: "Variable", name: { kind: "Name", value: "rewardGroup" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "items" },
                value: { kind: "Variable", name: { kind: "Name", value: "items" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: "RewardGroup" } }],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "RewardGroupDetails" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "RewardGroup" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "active" } },
          { kind: "Field", name: { kind: "Name", value: "triggerSelected" } },
          { kind: "Field", name: { kind: "Name", value: "userId" } },
          { kind: "Field", name: { kind: "Name", value: "cooldownExpiry" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "RewardGroupItem" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "RewardGroupItem" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "rewardGroupId" } },
          { kind: "Field", name: { kind: "Name", value: "rewardId" } },
          { kind: "Field", name: { kind: "Name", value: "rewardEnabled" } },
          { kind: "Field", name: { kind: "Name", value: "triggerCooldown" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "RewardGroup" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "RewardGroup" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "FragmentSpread", name: { kind: "Name", value: "RewardGroupDetails" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "items" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: "RewardGroupItem" } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateRewardGroupMutation, CreateRewardGroupMutationVariables>
export const DeleteRewardGroupDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "DeleteRewardGroup" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "String" } } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "deleteRewardGroup" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: { kind: "Variable", name: { kind: "Name", value: "id" } },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DeleteRewardGroupMutation, DeleteRewardGroupMutationVariables>
export const DeleteRewardGroupItemDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "DeleteRewardGroupItem" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "String" } } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "deleteRewardGroupItem" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: { kind: "Variable", name: { kind: "Name", value: "id" } },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DeleteRewardGroupItemMutation, DeleteRewardGroupItemMutationVariables>
export const UpdateRewardGroupDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateRewardGroup" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "String" } } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "rewardGroup" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "RewardGroupInput" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "items" } },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: { kind: "NamedType", name: { kind: "Name", value: "RewardGroupItemInput" } },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateRewardGroup" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: { kind: "Variable", name: { kind: "Name", value: "id" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "rewardGroup" },
                value: { kind: "Variable", name: { kind: "Name", value: "rewardGroup" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "items" },
                value: { kind: "Variable", name: { kind: "Name", value: "items" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: "RewardGroup" } }],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "RewardGroupDetails" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "RewardGroup" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "active" } },
          { kind: "Field", name: { kind: "Name", value: "triggerSelected" } },
          { kind: "Field", name: { kind: "Name", value: "userId" } },
          { kind: "Field", name: { kind: "Name", value: "cooldownExpiry" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "RewardGroupItem" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "RewardGroupItem" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "rewardGroupId" } },
          { kind: "Field", name: { kind: "Name", value: "rewardId" } },
          { kind: "Field", name: { kind: "Name", value: "rewardEnabled" } },
          { kind: "Field", name: { kind: "Name", value: "triggerCooldown" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "RewardGroup" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "RewardGroup" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "FragmentSpread", name: { kind: "Name", value: "RewardGroupDetails" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "items" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: "RewardGroupItem" } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateRewardGroupMutation, UpdateRewardGroupMutationVariables>
export const UpdateRewardGroupItemDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateRewardGroupItem" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "String" } } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "rewardEnabled" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "Boolean" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "triggerCooldown" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "Boolean" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateRewardGroupItem" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: { kind: "Variable", name: { kind: "Name", value: "id" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "rewardEnabled" },
                value: { kind: "Variable", name: { kind: "Name", value: "rewardEnabled" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "triggerCooldown" },
                value: { kind: "Variable", name: { kind: "Name", value: "triggerCooldown" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: "RewardGroupItem" } }],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "RewardGroupItem" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "RewardGroupItem" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "rewardGroupId" } },
          { kind: "Field", name: { kind: "Name", value: "rewardId" } },
          { kind: "Field", name: { kind: "Name", value: "rewardEnabled" } },
          { kind: "Field", name: { kind: "Name", value: "triggerCooldown" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateRewardGroupItemMutation, UpdateRewardGroupItemMutationVariables>
export const UpdateUserDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateUser" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "user" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "UserInput" } } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateUser" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "user" },
                value: { kind: "Variable", name: { kind: "Name", value: "user" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "user" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: "NormalUser" } }],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "errors" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "field" } },
                      { kind: "Field", name: { kind: "Name", value: "message" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "NormalUser" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "User" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "username" } },
          { kind: "Field", name: { kind: "Name", value: "displayname" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateUserMutation, UpdateUserMutationVariables>
export const ColorThemesDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "ColorThemes" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "type" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "colorThemes" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "type" },
                value: { kind: "Variable", name: { kind: "Name", value: "type" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: "ColorTheme" } }],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ColorTheme" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "ColorTheme" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "colors" } },
          { kind: "Field", name: { kind: "Name", value: "creatorId" } },
          { kind: "Field", name: { kind: "Name", value: "global" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ColorThemesQuery, ColorThemesQueryVariables>
export const MeDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Me" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "me" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: "NormalUser" } }],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "NormalUser" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "User" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "username" } },
          { kind: "Field", name: { kind: "Name", value: "displayname" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<MeQuery, MeQueryVariables>
export const MyRandomWheelsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "MyRandomWheels" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "type" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "myRandomWheels" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "type" },
                value: { kind: "Variable", name: { kind: "Name", value: "type" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: "RandomWheelDetails" } }],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "RandomWheelDetails" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "RandomWheel" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "slug" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
          { kind: "Field", name: { kind: "Name", value: "rotation" } },
          { kind: "Field", name: { kind: "Name", value: "spinDuration" } },
          { kind: "Field", name: { kind: "Name", value: "fadeDuration" } },
          { kind: "Field", name: { kind: "Name", value: "accessType" } },
          { kind: "Field", name: { kind: "Name", value: "editable" } },
          { kind: "Field", name: { kind: "Name", value: "editAnonymous" } },
          { kind: "Field", name: { kind: "Name", value: "uniqueEntries" } },
          { kind: "Field", name: { kind: "Name", value: "shareToken" } },
          { kind: "Field", name: { kind: "Name", value: "liked" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "theme" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "colors" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "_count" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "Field", name: { kind: "Name", value: "entries" } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<MyRandomWheelsQuery, MyRandomWheelsQueryVariables>
export const RandomWheelBySlugDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "RandomWheelBySlug" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "slug" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "String" } } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "token" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "randomWheelBySlug" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "slug" },
                value: { kind: "Variable", name: { kind: "Name", value: "slug" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "token" },
                value: { kind: "Variable", name: { kind: "Name", value: "token" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "FragmentSpread", name: { kind: "Name", value: "RandomWheelDetails" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "owner" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: "UserName" } }],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "members" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: "RandomWheelMember" } }],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "UserName" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "User" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "username" } },
          { kind: "Field", name: { kind: "Name", value: "displayname" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "RandomWheelDetails" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "RandomWheel" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "slug" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
          { kind: "Field", name: { kind: "Name", value: "rotation" } },
          { kind: "Field", name: { kind: "Name", value: "spinDuration" } },
          { kind: "Field", name: { kind: "Name", value: "fadeDuration" } },
          { kind: "Field", name: { kind: "Name", value: "accessType" } },
          { kind: "Field", name: { kind: "Name", value: "editable" } },
          { kind: "Field", name: { kind: "Name", value: "editAnonymous" } },
          { kind: "Field", name: { kind: "Name", value: "uniqueEntries" } },
          { kind: "Field", name: { kind: "Name", value: "shareToken" } },
          { kind: "Field", name: { kind: "Name", value: "liked" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "theme" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "colors" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "_count" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "Field", name: { kind: "Name", value: "entries" } }],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "RandomWheelMember" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "RandomWheelMember" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "roleName" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "user" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: "UserName" } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<RandomWheelBySlugQuery, RandomWheelBySlugQueryVariables>
export const RandomWheelBySlugShareTokenDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "RandomWheelBySlugShareToken" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "slug" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "String" } } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "token" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "randomWheelBySlug" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "slug" },
                value: { kind: "Variable", name: { kind: "Name", value: "slug" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "token" },
                value: { kind: "Variable", name: { kind: "Name", value: "token" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "Field", name: { kind: "Name", value: "shareToken" } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<RandomWheelBySlugShareTokenQuery, RandomWheelBySlugShareTokenQueryVariables>
export const RandomWheelBySlugEntriesDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "RandomWheelBySlugEntries" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "slug" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "String" } } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "token" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "randomWheelBySlug" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "slug" },
                value: { kind: "Variable", name: { kind: "Name", value: "slug" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "token" },
                value: { kind: "Variable", name: { kind: "Name", value: "token" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "entries" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: "RandomWheelEntry" } }],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "RandomWheelEntry" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "RandomWheelEntry" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "weight" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<RandomWheelBySlugEntriesQuery, RandomWheelBySlugEntriesQueryVariables>
export const RandomWheelBySlugMembersDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "RandomWheelBySlugMembers" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "slug" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "String" } } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "token" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "randomWheelBySlug" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "slug" },
                value: { kind: "Variable", name: { kind: "Name", value: "slug" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "token" },
                value: { kind: "Variable", name: { kind: "Name", value: "token" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "members" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: "RandomWheelMember" } }],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "UserName" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "User" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "username" } },
          { kind: "Field", name: { kind: "Name", value: "displayname" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "RandomWheelMember" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "RandomWheelMember" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "roleName" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "user" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: "UserName" } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<RandomWheelBySlugMembersQuery, RandomWheelBySlugMembersQueryVariables>
export const RandomWheelBySlugWinnersDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "RandomWheelBySlugWinners" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "slug" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "String" } } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "token" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "randomWheelBySlug" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "slug" },
                value: { kind: "Variable", name: { kind: "Name", value: "slug" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "token" },
                value: { kind: "Variable", name: { kind: "Name", value: "token" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "winners" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: "RandomWheelWinner" } }],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "RandomWheelWinner" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "RandomWheelWinner" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
          { kind: "Field", name: { kind: "Name", value: "winnerIndex" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<RandomWheelBySlugWinnersQuery, RandomWheelBySlugWinnersQueryVariables>
export const ChannelRewardsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "ChannelRewards" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "userId" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "onlyManageable" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "Boolean" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "channelRewards" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "userId" },
                value: { kind: "Variable", name: { kind: "Name", value: "userId" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "onlyManageable" },
                value: { kind: "Variable", name: { kind: "Name", value: "onlyManageable" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: "CustomReward" } }],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "CustomReward" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "CustomReward" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "broadcasterId" } },
          { kind: "Field", name: { kind: "Name", value: "broadcasterName" } },
          { kind: "Field", name: { kind: "Name", value: "broadcasterDisplayName" } },
          { kind: "Field", name: { kind: "Name", value: "backgroundColor" } },
          { kind: "Field", name: { kind: "Name", value: "isEnabled" } },
          { kind: "Field", name: { kind: "Name", value: "cost" } },
          { kind: "Field", name: { kind: "Name", value: "title" } },
          { kind: "Field", name: { kind: "Name", value: "prompt" } },
          { kind: "Field", name: { kind: "Name", value: "userInputRequired" } },
          { kind: "Field", name: { kind: "Name", value: "maxRedemptionsPerStream" } },
          { kind: "Field", name: { kind: "Name", value: "maxRedemptionsPerUserPerStream" } },
          { kind: "Field", name: { kind: "Name", value: "globalCooldown" } },
          { kind: "Field", name: { kind: "Name", value: "isPaused" } },
          { kind: "Field", name: { kind: "Name", value: "isInStock" } },
          { kind: "Field", name: { kind: "Name", value: "redemptionsThisStream" } },
          { kind: "Field", name: { kind: "Name", value: "autoFulfill" } },
          { kind: "Field", name: { kind: "Name", value: "cooldownExpiryDate" } },
          { kind: "Field", name: { kind: "Name", value: "image" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ChannelRewardsQuery, ChannelRewardsQueryVariables>
export const RewardByTokenDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "RewardByToken" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "type" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "String" } } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "token" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "String" } } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "rewardByToken" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "type" },
                value: { kind: "Variable", name: { kind: "Name", value: "type" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "token" },
                value: { kind: "Variable", name: { kind: "Name", value: "token" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: "CustomRewardMenuItem" } }],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "CustomRewardMenuItem" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "CustomReward" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "title" } },
          { kind: "Field", name: { kind: "Name", value: "backgroundColor" } },
          { kind: "Field", name: { kind: "Name", value: "isEnabled" } },
          { kind: "Field", name: { kind: "Name", value: "isPaused" } },
          { kind: "Field", name: { kind: "Name", value: "image" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<RewardByTokenQuery, RewardByTokenQueryVariables>
export const RewardGroupDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "RewardGroup" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "String" } } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "rewardGroup" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: { kind: "Variable", name: { kind: "Name", value: "id" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: "RewardGroup" } }],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "RewardGroupDetails" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "RewardGroup" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "active" } },
          { kind: "Field", name: { kind: "Name", value: "triggerSelected" } },
          { kind: "Field", name: { kind: "Name", value: "userId" } },
          { kind: "Field", name: { kind: "Name", value: "cooldownExpiry" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "RewardGroupItem" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "RewardGroupItem" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "rewardGroupId" } },
          { kind: "Field", name: { kind: "Name", value: "rewardId" } },
          { kind: "Field", name: { kind: "Name", value: "rewardEnabled" } },
          { kind: "Field", name: { kind: "Name", value: "triggerCooldown" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "RewardGroup" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "RewardGroup" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "FragmentSpread", name: { kind: "Name", value: "RewardGroupDetails" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "items" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: "RewardGroupItem" } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<RewardGroupQuery, RewardGroupQueryVariables>
export const RewardGroupsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "RewardGroups" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "items" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "Boolean" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "rewardGroups" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "items" },
                value: { kind: "Variable", name: { kind: "Name", value: "items" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: "RewardGroup" } }],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "RewardGroupDetails" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "RewardGroup" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "active" } },
          { kind: "Field", name: { kind: "Name", value: "triggerSelected" } },
          { kind: "Field", name: { kind: "Name", value: "userId" } },
          { kind: "Field", name: { kind: "Name", value: "cooldownExpiry" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "RewardGroupItem" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "RewardGroupItem" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "rewardGroupId" } },
          { kind: "Field", name: { kind: "Name", value: "rewardId" } },
          { kind: "Field", name: { kind: "Name", value: "rewardEnabled" } },
          { kind: "Field", name: { kind: "Name", value: "triggerCooldown" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "RewardGroup" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "RewardGroup" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "FragmentSpread", name: { kind: "Name", value: "RewardGroupDetails" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "items" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: "RewardGroupItem" } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<RewardGroupsQuery, RewardGroupsQueryVariables>
export const RewardLinksDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "RewardLinks" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "rewardIds" } },
          type: {
            kind: "ListType",
            type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "String" } } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "rewardLinks" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "rewardIds" },
                value: { kind: "Variable", name: { kind: "Name", value: "rewardIds" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "userId" } },
                { kind: "Field", name: { kind: "Name", value: "rewardId" } },
                { kind: "Field", name: { kind: "Name", value: "token" } },
                { kind: "Field", name: { kind: "Name", value: "type" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<RewardLinksQuery, RewardLinksQueryVariables>
export const SyncForWheelDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "SyncForWheel" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "randomWheelId" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "String" } } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "syncForWheel" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "randomWheelId" },
                value: { kind: "Variable", name: { kind: "Name", value: "randomWheelId" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "FragmentSpread", name: { kind: "Name", value: "RandomWheelSync" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "reward" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: "CustomRewardMenuItem" } }],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "RandomWheelSync" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "RandomWheelSync" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "randomWheelId" } },
          { kind: "Field", name: { kind: "Name", value: "eventSubscriptionId" } },
          { kind: "Field", name: { kind: "Name", value: "rewardId" } },
          { kind: "Field", name: { kind: "Name", value: "paused" } },
          { kind: "Field", name: { kind: "Name", value: "useInput" } },
          { kind: "Field", name: { kind: "Name", value: "pending" } },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "CustomRewardMenuItem" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "CustomReward" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "title" } },
          { kind: "Field", name: { kind: "Name", value: "backgroundColor" } },
          { kind: "Field", name: { kind: "Name", value: "isEnabled" } },
          { kind: "Field", name: { kind: "Name", value: "isPaused" } },
          { kind: "Field", name: { kind: "Name", value: "image" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SyncForWheelQuery, SyncForWheelQueryVariables>
export const UserAccessTokenDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "UserAccessToken" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "userAccesToken" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: "UserAccessToken" } }],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "UserAccessToken" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "UserAccessToken" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "scope" } },
          { kind: "Field", name: { kind: "Name", value: "expiresIn" } },
          { kind: "Field", name: { kind: "Name", value: "obtainmentTimestamp" } },
          { kind: "Field", name: { kind: "Name", value: "twitchUserId" } },
          { kind: "Field", name: { kind: "Name", value: "twitchUsername" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UserAccessTokenQuery, UserAccessTokenQueryVariables>
export const UsernameExistsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UsernameExists" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "username" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "String" } } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "usernameExists" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "username" },
                value: { kind: "Variable", name: { kind: "Name", value: "username" } },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UsernameExistsMutation, UsernameExistsMutationVariables>
