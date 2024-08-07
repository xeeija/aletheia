import gql from "graphql-tag"
import * as Urql from "urql"
export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  BigInt: bigint
  DateTime: Date
  JSON: Record<string, any>
}

export type AccessType = {
  __typename?: "AccessType"
  _count?: Maybe<AccessTypeCount>
  type: Scalars["String"]
}

export type AccessTypeCount = {
  __typename?: "AccessTypeCount"
  randomWheel: Scalars["Int"]
}

export type AccessTypeCountRandomWheelArgs = {
  where?: Maybe<RandomWheelWhereInput>
}

export type AccessTypeRelationFilter = {
  is?: Maybe<AccessTypeWhereInput>
  isNot?: Maybe<AccessTypeWhereInput>
}

export type AccessTypeWhereInput = {
  AND?: Maybe<Array<AccessTypeWhereInput>>
  NOT?: Maybe<Array<AccessTypeWhereInput>>
  OR?: Maybe<Array<AccessTypeWhereInput>>
  randomWheel?: Maybe<RandomWheelListRelationFilter>
  type?: Maybe<StringFilter>
}

export type AppError = {
  __typename?: "AppError"
  errorCode: Scalars["Int"]
  errorMessage?: Maybe<Scalars["String"]>
  fieldErrors?: Maybe<Array<FieldError>>
}

export type BigIntFilter = {
  equals?: Maybe<Scalars["BigInt"]>
  gt?: Maybe<Scalars["BigInt"]>
  gte?: Maybe<Scalars["BigInt"]>
  in?: Maybe<Array<Scalars["BigInt"]>>
  lt?: Maybe<Scalars["BigInt"]>
  lte?: Maybe<Scalars["BigInt"]>
  not?: Maybe<NestedBigIntFilter>
  notIn?: Maybe<Array<Scalars["BigInt"]>>
}

export type BoolFilter = {
  equals?: Maybe<Scalars["Boolean"]>
  not?: Maybe<NestedBoolFilter>
}

export type ColorTheme = {
  __typename?: "ColorTheme"
  _count?: Maybe<ColorThemeCount>
  colors: Array<Scalars["String"]>
  creatorId?: Maybe<Scalars["String"]>
  global: Scalars["Boolean"]
  id: Scalars["String"]
  name?: Maybe<Scalars["String"]>
}

export type ColorThemeCount = {
  __typename?: "ColorThemeCount"
  randomWheels: Scalars["Int"]
  usersStandard: Scalars["Int"]
}

export type ColorThemeCountRandomWheelsArgs = {
  where?: Maybe<RandomWheelWhereInput>
}

export type ColorThemeCountUsersStandardArgs = {
  where?: Maybe<UserWhereInput>
}

export type ColorThemeInput = {
  colors?: Maybe<Array<Scalars["String"]>>
  id?: Maybe<Scalars["String"]>
  name?: Maybe<Scalars["String"]>
}

export type ColorThemeListRelationFilter = {
  every?: Maybe<ColorThemeWhereInput>
  none?: Maybe<ColorThemeWhereInput>
  some?: Maybe<ColorThemeWhereInput>
}

export type ColorThemeNullableRelationFilter = {
  is?: Maybe<ColorThemeWhereInput>
  isNot?: Maybe<ColorThemeWhereInput>
}

export type ColorThemeWhereInput = {
  AND?: Maybe<Array<ColorThemeWhereInput>>
  NOT?: Maybe<Array<ColorThemeWhereInput>>
  OR?: Maybe<Array<ColorThemeWhereInput>>
  colors?: Maybe<StringNullableListFilter>
  creator?: Maybe<UserNullableRelationFilter>
  creatorId?: Maybe<UuidNullableFilter>
  global?: Maybe<BoolFilter>
  id?: Maybe<UuidFilter>
  name?: Maybe<StringNullableFilter>
  randomWheels?: Maybe<RandomWheelListRelationFilter>
  usersStandard?: Maybe<UserListRelationFilter>
}

export type CustomReward = {
  __typename?: "CustomReward"
  autoFulfill: Scalars["Boolean"]
  backgroundColor: Scalars["String"]
  broadcasterDisplayName: Scalars["String"]
  broadcasterId: Scalars["String"]
  broadcasterName: Scalars["String"]
  cooldownExpiryDate?: Maybe<Scalars["DateTime"]>
  cost: Scalars["Float"]
  globalCooldown?: Maybe<Scalars["Int"]>
  id: Scalars["String"]
  image: Scalars["String"]
  isEnabled: Scalars["Boolean"]
  isInStock: Scalars["Boolean"]
  isPaused: Scalars["Boolean"]
  maxRedemptionsPerStream?: Maybe<Scalars["Int"]>
  maxRedemptionsPerUserPerStream?: Maybe<Scalars["Int"]>
  prompt: Scalars["String"]
  redemptionsThisStream?: Maybe<Scalars["Int"]>
  title: Scalars["String"]
  userInputRequired: Scalars["Boolean"]
}

export type CustomRewardCreateInput = {
  autoFulfill?: Maybe<Scalars["Boolean"]>
  backgroundColor?: Maybe<Scalars["String"]>
  cost: Scalars["Int"]
  globalCooldown?: Maybe<Scalars["Int"]>
  isEnabled?: Maybe<Scalars["Boolean"]>
  isPaused?: Maybe<Scalars["Boolean"]>
  maxRedemptionsPerStream?: Maybe<Scalars["Int"]>
  maxRedemptionsPerUserPerStream?: Maybe<Scalars["Int"]>
  prompt?: Maybe<Scalars["String"]>
  title: Scalars["String"]
  userInputRequired?: Maybe<Scalars["Boolean"]>
}

export type CustomRewardUpdateInput = {
  autoFulfill?: Maybe<Scalars["Boolean"]>
  backgroundColor?: Maybe<Scalars["String"]>
  cost?: Maybe<Scalars["Int"]>
  globalCooldown?: Maybe<Scalars["Int"]>
  isEnabled?: Maybe<Scalars["Boolean"]>
  isPaused?: Maybe<Scalars["Boolean"]>
  maxRedemptionsPerStream?: Maybe<Scalars["Int"]>
  maxRedemptionsPerUserPerStream?: Maybe<Scalars["Int"]>
  prompt?: Maybe<Scalars["String"]>
  title?: Maybe<Scalars["String"]>
  userInputRequired?: Maybe<Scalars["Boolean"]>
}

export type DateTimeFilter = {
  equals?: Maybe<Scalars["DateTime"]>
  gt?: Maybe<Scalars["DateTime"]>
  gte?: Maybe<Scalars["DateTime"]>
  in?: Maybe<Array<Scalars["DateTime"]>>
  lt?: Maybe<Scalars["DateTime"]>
  lte?: Maybe<Scalars["DateTime"]>
  not?: Maybe<NestedDateTimeFilter>
  notIn?: Maybe<Array<Scalars["DateTime"]>>
}

export type DateTimeNullableFilter = {
  equals?: Maybe<Scalars["DateTime"]>
  gt?: Maybe<Scalars["DateTime"]>
  gte?: Maybe<Scalars["DateTime"]>
  in?: Maybe<Array<Scalars["DateTime"]>>
  lt?: Maybe<Scalars["DateTime"]>
  lte?: Maybe<Scalars["DateTime"]>
  not?: Maybe<NestedDateTimeNullableFilter>
  notIn?: Maybe<Array<Scalars["DateTime"]>>
}

export type EventSubscriptionListRelationFilter = {
  every?: Maybe<EventSubscriptionWhereInput>
  none?: Maybe<EventSubscriptionWhereInput>
  some?: Maybe<EventSubscriptionWhereInput>
}

export type EventSubscriptionNullableRelationFilter = {
  is?: Maybe<EventSubscriptionWhereInput>
  isNot?: Maybe<EventSubscriptionWhereInput>
}

export type EventSubscriptionWhereInput = {
  AND?: Maybe<Array<EventSubscriptionWhereInput>>
  NOT?: Maybe<Array<EventSubscriptionWhereInput>>
  OR?: Maybe<Array<EventSubscriptionWhereInput>>
  condition?: Maybe<JsonNullableFilter>
  id?: Maybe<UuidFilter>
  itemId?: Maybe<StringNullableFilter>
  paused?: Maybe<BoolFilter>
  subscriptionId?: Maybe<StringNullableFilter>
  subscriptionType?: Maybe<StringFilter>
  twitchUserId?: Maybe<StringFilter>
  type?: Maybe<StringFilter>
  user?: Maybe<UserNullableRelationFilter>
  userId?: Maybe<UuidNullableFilter>
  wheelSync?: Maybe<RandomWheelSyncListRelationFilter>
}

export type FieldError = {
  __typename?: "FieldError"
  field: Scalars["String"]
  message: Scalars["String"]
}

export type FloatFilter = {
  equals?: Maybe<Scalars["Float"]>
  gt?: Maybe<Scalars["Float"]>
  gte?: Maybe<Scalars["Float"]>
  in?: Maybe<Array<Scalars["Float"]>>
  lt?: Maybe<Scalars["Float"]>
  lte?: Maybe<Scalars["Float"]>
  not?: Maybe<NestedFloatFilter>
  notIn?: Maybe<Array<Scalars["Float"]>>
}

export type IntFilter = {
  equals?: Maybe<Scalars["Int"]>
  gt?: Maybe<Scalars["Int"]>
  gte?: Maybe<Scalars["Int"]>
  in?: Maybe<Array<Scalars["Int"]>>
  lt?: Maybe<Scalars["Int"]>
  lte?: Maybe<Scalars["Int"]>
  not?: Maybe<NestedIntFilter>
  notIn?: Maybe<Array<Scalars["Int"]>>
}

export type IntNullableFilter = {
  equals?: Maybe<Scalars["Int"]>
  gt?: Maybe<Scalars["Int"]>
  gte?: Maybe<Scalars["Int"]>
  in?: Maybe<Array<Scalars["Int"]>>
  lt?: Maybe<Scalars["Int"]>
  lte?: Maybe<Scalars["Int"]>
  not?: Maybe<NestedIntNullableFilter>
  notIn?: Maybe<Array<Scalars["Int"]>>
}

export type JsonNullableFilter = {
  array_contains?: Maybe<Scalars["JSON"]>
  array_ends_with?: Maybe<Scalars["JSON"]>
  array_starts_with?: Maybe<Scalars["JSON"]>
  equals?: Maybe<Scalars["JSON"]>
  gt?: Maybe<Scalars["JSON"]>
  gte?: Maybe<Scalars["JSON"]>
  lt?: Maybe<Scalars["JSON"]>
  lte?: Maybe<Scalars["JSON"]>
  not?: Maybe<Scalars["JSON"]>
  path?: Maybe<Array<Scalars["String"]>>
  string_contains?: Maybe<Scalars["String"]>
  string_ends_with?: Maybe<Scalars["String"]>
  string_starts_with?: Maybe<Scalars["String"]>
}

export type Mutation = {
  __typename?: "Mutation"
  addRandomWheelEntry: RandomWheelEntry
  addRewardGroupItem?: Maybe<RewardGroupItem>
  addWheelSync?: Maybe<RandomWheelSync>
  clearRandomWheel: Scalars["Int"]
  createChannelReward?: Maybe<CustomReward>
  createRandomWheel: RandomWheel
  createRewardGroup?: Maybe<RewardGroup>
  createRewardLink?: Maybe<RewardLink>
  deleteChannelReward: Scalars["Boolean"]
  deleteRandomWheel?: Maybe<AppError>
  deleteRandomWheelEntry?: Maybe<Scalars["Boolean"]>
  deleteRandomWheelMember?: Maybe<Scalars["Boolean"]>
  deleteRewardGroup?: Maybe<Scalars["Boolean"]>
  deleteRewardGroupItem?: Maybe<Scalars["Boolean"]>
  deleteRewardLink: Scalars["Boolean"]
  deleteWheelSync?: Maybe<Scalars["Boolean"]>
  disconnectAccessToken: Scalars["Boolean"]
  likeRandomWheel?: Maybe<RandomWheelLike>
  login: UserResponse
  logout: Scalars["Boolean"]
  pauseWheelSync?: Maybe<RandomWheelSync>
  register: UserResponse
  resetShareToken?: Maybe<Scalars["Boolean"]>
  spinRandomWheel: RandomWheelWinner
  updateChannelReward?: Maybe<CustomReward>
  updateRandomWheel?: Maybe<RandomWheel>
  updateRandomWheelEntry: RandomWheelEntry
  updateRandomWheelMembers?: Maybe<Array<RandomWheelMember>>
  updateRewardGroup?: Maybe<RewardGroup>
  updateRewardGroupItem?: Maybe<RewardGroupItem>
  updateRewardToken: CustomReward
  updateUser: UserResponse
  usernameExists: Scalars["Boolean"]
}

export type MutationAddRandomWheelEntryArgs = {
  color?: Maybe<Scalars["String"]>
  name: Scalars["String"]
  randomWheelId: Scalars["String"]
  weight?: Maybe<Scalars["Float"]>
}

export type MutationAddRewardGroupItemArgs = {
  rewardGroupId: Scalars["String"]
  rewardId: Scalars["String"]
  triggerCooldown?: Maybe<Scalars["Boolean"]>
}

export type MutationAddWheelSyncArgs = {
  addExisting?: Maybe<Scalars["Boolean"]>
  randomWheelId: Scalars["String"]
  rewardId: Scalars["String"]
  useInput?: Maybe<Scalars["Boolean"]>
}

export type MutationClearRandomWheelArgs = {
  id: Scalars["String"]
}

export type MutationCreateChannelRewardArgs = {
  reward: CustomRewardCreateInput
}

export type MutationCreateRandomWheelArgs = {
  accessType?: Maybe<Scalars["String"]>
  editAnonymous?: Maybe<Scalars["Boolean"]>
  fadeDuration?: Maybe<Scalars["Int"]>
  name?: Maybe<Scalars["String"]>
  spinDuration?: Maybe<Scalars["Int"]>
  uniqueEntries?: Maybe<Scalars["Boolean"]>
}

export type MutationCreateRewardGroupArgs = {
  items: Array<RewardGroupItemInput>
  rewardGroup: RewardGroupInput
}

export type MutationCreateRewardLinkArgs = {
  rewardId: Scalars["String"]
  type: Scalars["String"]
}

export type MutationDeleteChannelRewardArgs = {
  rewardId: Scalars["String"]
}

export type MutationDeleteRandomWheelArgs = {
  id: Scalars["String"]
}

export type MutationDeleteRandomWheelEntryArgs = {
  id: Scalars["String"]
}

export type MutationDeleteRandomWheelMemberArgs = {
  id: Scalars["String"]
}

export type MutationDeleteRewardGroupArgs = {
  id: Scalars["String"]
}

export type MutationDeleteRewardGroupItemArgs = {
  id: Scalars["String"]
}

export type MutationDeleteRewardLinkArgs = {
  id: Scalars["String"]
}

export type MutationDeleteWheelSyncArgs = {
  ids: Array<Scalars["String"]>
}

export type MutationLikeRandomWheelArgs = {
  like: Scalars["Boolean"]
  randomWheelId: Scalars["String"]
}

export type MutationLoginArgs = {
  password: Scalars["String"]
  username: Scalars["String"]
}

export type MutationPauseWheelSyncArgs = {
  id: Scalars["String"]
  paused: Scalars["Boolean"]
}

export type MutationRegisterArgs = {
  displayname?: Maybe<Scalars["String"]>
  password: Scalars["String"]
  username: Scalars["String"]
}

export type MutationResetShareTokenArgs = {
  randommWheelId: Scalars["String"]
}

export type MutationSpinRandomWheelArgs = {
  randommWheelId: Scalars["String"]
}

export type MutationUpdateChannelRewardArgs = {
  reward: CustomRewardUpdateInput
  rewardId: Scalars["String"]
}

export type MutationUpdateRandomWheelArgs = {
  id: Scalars["String"]
  options: RandomWheelInput
}

export type MutationUpdateRandomWheelEntryArgs = {
  entry: RandomWheelEntryInput
  id: Scalars["String"]
}

export type MutationUpdateRandomWheelMembersArgs = {
  members: Array<RandomWheelMemberInput>
  randomWheelId: Scalars["String"]
}

export type MutationUpdateRewardGroupArgs = {
  id: Scalars["String"]
  items?: Maybe<Array<RewardGroupItemInput>>
  rewardGroup?: Maybe<RewardGroupInput>
}

export type MutationUpdateRewardGroupItemArgs = {
  id: Scalars["String"]
  rewardEnabled?: Maybe<Scalars["Boolean"]>
  triggerCooldown?: Maybe<Scalars["Boolean"]>
}

export type MutationUpdateRewardTokenArgs = {
  token: Scalars["String"]
  type: Scalars["String"]
}

export type MutationUpdateUserArgs = {
  user: UserInput
}

export type MutationUsernameExistsArgs = {
  username: Scalars["String"]
}

export type NestedBigIntFilter = {
  equals?: Maybe<Scalars["BigInt"]>
  gt?: Maybe<Scalars["BigInt"]>
  gte?: Maybe<Scalars["BigInt"]>
  in?: Maybe<Array<Scalars["BigInt"]>>
  lt?: Maybe<Scalars["BigInt"]>
  lte?: Maybe<Scalars["BigInt"]>
  not?: Maybe<NestedBigIntFilter>
  notIn?: Maybe<Array<Scalars["BigInt"]>>
}

export type NestedBoolFilter = {
  equals?: Maybe<Scalars["Boolean"]>
  not?: Maybe<NestedBoolFilter>
}

export type NestedDateTimeFilter = {
  equals?: Maybe<Scalars["DateTime"]>
  gt?: Maybe<Scalars["DateTime"]>
  gte?: Maybe<Scalars["DateTime"]>
  in?: Maybe<Array<Scalars["DateTime"]>>
  lt?: Maybe<Scalars["DateTime"]>
  lte?: Maybe<Scalars["DateTime"]>
  not?: Maybe<NestedDateTimeFilter>
  notIn?: Maybe<Array<Scalars["DateTime"]>>
}

export type NestedDateTimeNullableFilter = {
  equals?: Maybe<Scalars["DateTime"]>
  gt?: Maybe<Scalars["DateTime"]>
  gte?: Maybe<Scalars["DateTime"]>
  in?: Maybe<Array<Scalars["DateTime"]>>
  lt?: Maybe<Scalars["DateTime"]>
  lte?: Maybe<Scalars["DateTime"]>
  not?: Maybe<NestedDateTimeNullableFilter>
  notIn?: Maybe<Array<Scalars["DateTime"]>>
}

export type NestedFloatFilter = {
  equals?: Maybe<Scalars["Float"]>
  gt?: Maybe<Scalars["Float"]>
  gte?: Maybe<Scalars["Float"]>
  in?: Maybe<Array<Scalars["Float"]>>
  lt?: Maybe<Scalars["Float"]>
  lte?: Maybe<Scalars["Float"]>
  not?: Maybe<NestedFloatFilter>
  notIn?: Maybe<Array<Scalars["Float"]>>
}

export type NestedIntFilter = {
  equals?: Maybe<Scalars["Int"]>
  gt?: Maybe<Scalars["Int"]>
  gte?: Maybe<Scalars["Int"]>
  in?: Maybe<Array<Scalars["Int"]>>
  lt?: Maybe<Scalars["Int"]>
  lte?: Maybe<Scalars["Int"]>
  not?: Maybe<NestedIntFilter>
  notIn?: Maybe<Array<Scalars["Int"]>>
}

export type NestedIntNullableFilter = {
  equals?: Maybe<Scalars["Int"]>
  gt?: Maybe<Scalars["Int"]>
  gte?: Maybe<Scalars["Int"]>
  in?: Maybe<Array<Scalars["Int"]>>
  lt?: Maybe<Scalars["Int"]>
  lte?: Maybe<Scalars["Int"]>
  not?: Maybe<NestedIntNullableFilter>
  notIn?: Maybe<Array<Scalars["Int"]>>
}

export type NestedStringFilter = {
  contains?: Maybe<Scalars["String"]>
  endsWith?: Maybe<Scalars["String"]>
  equals?: Maybe<Scalars["String"]>
  gt?: Maybe<Scalars["String"]>
  gte?: Maybe<Scalars["String"]>
  in?: Maybe<Array<Scalars["String"]>>
  lt?: Maybe<Scalars["String"]>
  lte?: Maybe<Scalars["String"]>
  not?: Maybe<NestedStringFilter>
  notIn?: Maybe<Array<Scalars["String"]>>
  startsWith?: Maybe<Scalars["String"]>
}

export type NestedStringNullableFilter = {
  contains?: Maybe<Scalars["String"]>
  endsWith?: Maybe<Scalars["String"]>
  equals?: Maybe<Scalars["String"]>
  gt?: Maybe<Scalars["String"]>
  gte?: Maybe<Scalars["String"]>
  in?: Maybe<Array<Scalars["String"]>>
  lt?: Maybe<Scalars["String"]>
  lte?: Maybe<Scalars["String"]>
  not?: Maybe<NestedStringNullableFilter>
  notIn?: Maybe<Array<Scalars["String"]>>
  startsWith?: Maybe<Scalars["String"]>
}

export type NestedUuidFilter = {
  equals?: Maybe<Scalars["String"]>
  gt?: Maybe<Scalars["String"]>
  gte?: Maybe<Scalars["String"]>
  in?: Maybe<Array<Scalars["String"]>>
  lt?: Maybe<Scalars["String"]>
  lte?: Maybe<Scalars["String"]>
  not?: Maybe<NestedUuidFilter>
  notIn?: Maybe<Array<Scalars["String"]>>
}

export type NestedUuidNullableFilter = {
  equals?: Maybe<Scalars["String"]>
  gt?: Maybe<Scalars["String"]>
  gte?: Maybe<Scalars["String"]>
  in?: Maybe<Array<Scalars["String"]>>
  lt?: Maybe<Scalars["String"]>
  lte?: Maybe<Scalars["String"]>
  not?: Maybe<NestedUuidNullableFilter>
  notIn?: Maybe<Array<Scalars["String"]>>
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
  onlyManageable?: Maybe<Scalars["Boolean"]>
  userId?: Maybe<Scalars["String"]>
}

export type QueryColorThemesArgs = {
  type?: Maybe<Scalars["String"]>
}

export type QueryMyRandomWheelsArgs = {
  type?: Maybe<Scalars["String"]>
}

export type QueryRandomWheelBySlugArgs = {
  slug: Scalars["String"]
  token?: Maybe<Scalars["String"]>
}

export type QueryRewardByTokenArgs = {
  token: Scalars["String"]
  type: Scalars["String"]
}

export type QueryRewardGroupArgs = {
  id: Scalars["String"]
}

export type QueryRewardGroupsArgs = {
  items?: Maybe<Scalars["Boolean"]>
}

export type QueryRewardLinksArgs = {
  rewardIds?: Maybe<Array<Scalars["String"]>>
}

export type QuerySyncForWheelArgs = {
  randomWheelId: Scalars["String"]
}

export enum QueryMode {
  Default = "default",
  Insensitive = "insensitive",
}

export type RandomWheel = {
  __typename?: "RandomWheel"
  _count?: Maybe<RandomWheelCount>
  access: AccessType
  accessType: Scalars["String"]
  createdAt: Scalars["DateTime"]
  editAnonymous: Scalars["Boolean"]
  editable: Scalars["Boolean"]
  entries: Array<RandomWheelEntry>
  fadeDuration: Scalars["Int"]
  id: Scalars["String"]
  liked: Scalars["Boolean"]
  members: Array<RandomWheelMember>
  name?: Maybe<Scalars["String"]>
  owner?: Maybe<User>
  ownerId?: Maybe<Scalars["String"]>
  rotation: Scalars["Float"]
  shareToken?: Maybe<Scalars["String"]>
  slug: Scalars["String"]
  spinDuration: Scalars["Int"]
  theme?: Maybe<ColorTheme>
  themeId?: Maybe<Scalars["String"]>
  uniqueEntries: Scalars["Boolean"]
  winners: Array<RandomWheelWinner>
}

export type RandomWheelCount = {
  __typename?: "RandomWheelCount"
  entries: Scalars["Int"]
  likes: Scalars["Int"]
  members: Scalars["Int"]
  wheelSync: Scalars["Int"]
  winners: Scalars["Int"]
}

export type RandomWheelCountEntriesArgs = {
  where?: Maybe<RandomWheelEntryWhereInput>
}

export type RandomWheelCountLikesArgs = {
  where?: Maybe<RandomWheelLikeWhereInput>
}

export type RandomWheelCountMembersArgs = {
  where?: Maybe<RandomWheelMemberWhereInput>
}

export type RandomWheelCountWheelSyncArgs = {
  where?: Maybe<RandomWheelSyncWhereInput>
}

export type RandomWheelCountWinnersArgs = {
  where?: Maybe<RandomWheelWinnerWhereInput>
}

export type RandomWheelEntry = {
  __typename?: "RandomWheelEntry"
  color?: Maybe<Scalars["String"]>
  createdAt: Scalars["DateTime"]
  id: Scalars["String"]
  name: Scalars["String"]
  randomWheelId: Scalars["String"]
  redemptionId?: Maybe<Scalars["String"]>
  weight: Scalars["Int"]
}

export type RandomWheelEntryInput = {
  color?: Maybe<Scalars["String"]>
  name?: Maybe<Scalars["String"]>
  weight?: Maybe<Scalars["Int"]>
}

export type RandomWheelEntryListRelationFilter = {
  every?: Maybe<RandomWheelEntryWhereInput>
  none?: Maybe<RandomWheelEntryWhereInput>
  some?: Maybe<RandomWheelEntryWhereInput>
}

export type RandomWheelEntryWhereInput = {
  AND?: Maybe<Array<RandomWheelEntryWhereInput>>
  NOT?: Maybe<Array<RandomWheelEntryWhereInput>>
  OR?: Maybe<Array<RandomWheelEntryWhereInput>>
  color?: Maybe<StringNullableFilter>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<UuidFilter>
  name?: Maybe<StringFilter>
  randomWheel?: Maybe<RandomWheelRelationFilter>
  randomWheelId?: Maybe<UuidFilter>
  redemptionId?: Maybe<StringNullableFilter>
  weight?: Maybe<IntFilter>
}

export type RandomWheelInput = {
  accessType?: Maybe<Scalars["String"]>
  editAnonymous?: Maybe<Scalars["Boolean"]>
  fadeDuration?: Maybe<Scalars["Int"]>
  name?: Maybe<Scalars["String"]>
  spinDuration?: Maybe<Scalars["Int"]>
  theme?: Maybe<ColorThemeInput>
  uniqueEntries?: Maybe<Scalars["Boolean"]>
}

export type RandomWheelLike = {
  __typename?: "RandomWheelLike"
  createdAt: Scalars["DateTime"]
  id: Scalars["String"]
  randomWheelId: Scalars["String"]
  userId: Scalars["String"]
}

export type RandomWheelLikeListRelationFilter = {
  every?: Maybe<RandomWheelLikeWhereInput>
  none?: Maybe<RandomWheelLikeWhereInput>
  some?: Maybe<RandomWheelLikeWhereInput>
}

export type RandomWheelLikeWhereInput = {
  AND?: Maybe<Array<RandomWheelLikeWhereInput>>
  NOT?: Maybe<Array<RandomWheelLikeWhereInput>>
  OR?: Maybe<Array<RandomWheelLikeWhereInput>>
  createdAt?: Maybe<DateTimeFilter>
  id?: Maybe<UuidFilter>
  randomWheel?: Maybe<RandomWheelRelationFilter>
  randomWheelId?: Maybe<UuidFilter>
  user?: Maybe<UserRelationFilter>
  userId?: Maybe<UuidFilter>
}

export type RandomWheelListRelationFilter = {
  every?: Maybe<RandomWheelWhereInput>
  none?: Maybe<RandomWheelWhereInput>
  some?: Maybe<RandomWheelWhereInput>
}

export type RandomWheelMember = {
  __typename?: "RandomWheelMember"
  id: Scalars["String"]
  randomWheelId: Scalars["String"]
  role: RandomWheelRole
  roleName: Scalars["String"]
  user: User
  userId: Scalars["String"]
}

export type RandomWheelMemberInput = {
  delete?: Maybe<Scalars["Boolean"]>
  id?: Maybe<Scalars["String"]>
  role: Scalars["String"]
  username: Scalars["String"]
}

export type RandomWheelMemberListRelationFilter = {
  every?: Maybe<RandomWheelMemberWhereInput>
  none?: Maybe<RandomWheelMemberWhereInput>
  some?: Maybe<RandomWheelMemberWhereInput>
}

export type RandomWheelMemberWhereInput = {
  AND?: Maybe<Array<RandomWheelMemberWhereInput>>
  NOT?: Maybe<Array<RandomWheelMemberWhereInput>>
  OR?: Maybe<Array<RandomWheelMemberWhereInput>>
  id?: Maybe<UuidFilter>
  randomWheel?: Maybe<RandomWheelRelationFilter>
  randomWheelId?: Maybe<UuidFilter>
  role?: Maybe<RandomWheelRoleRelationFilter>
  roleName?: Maybe<StringFilter>
  user?: Maybe<UserRelationFilter>
  userId?: Maybe<UuidFilter>
}

export type RandomWheelRelationFilter = {
  is?: Maybe<RandomWheelWhereInput>
  isNot?: Maybe<RandomWheelWhereInput>
}

export type RandomWheelRole = {
  __typename?: "RandomWheelRole"
  _count?: Maybe<RandomWheelRoleCount>
  description?: Maybe<Scalars["String"]>
  name: Scalars["String"]
}

export type RandomWheelRoleCount = {
  __typename?: "RandomWheelRoleCount"
  members: Scalars["Int"]
}

export type RandomWheelRoleCountMembersArgs = {
  where?: Maybe<RandomWheelMemberWhereInput>
}

export type RandomWheelRoleRelationFilter = {
  is?: Maybe<RandomWheelRoleWhereInput>
  isNot?: Maybe<RandomWheelRoleWhereInput>
}

export type RandomWheelRoleWhereInput = {
  AND?: Maybe<Array<RandomWheelRoleWhereInput>>
  NOT?: Maybe<Array<RandomWheelRoleWhereInput>>
  OR?: Maybe<Array<RandomWheelRoleWhereInput>>
  description?: Maybe<StringNullableFilter>
  members?: Maybe<RandomWheelMemberListRelationFilter>
  name?: Maybe<StringFilter>
}

export type RandomWheelSync = {
  __typename?: "RandomWheelSync"
  createdAt: Scalars["DateTime"]
  eventSubscriptionId?: Maybe<Scalars["String"]>
  id: Scalars["String"]
  paused: Scalars["Boolean"]
  pending: Scalars["Boolean"]
  randomWheelId: Scalars["String"]
  reward?: Maybe<CustomReward>
  rewardId: Scalars["String"]
  useInput: Scalars["Boolean"]
}

export type RandomWheelSyncListRelationFilter = {
  every?: Maybe<RandomWheelSyncWhereInput>
  none?: Maybe<RandomWheelSyncWhereInput>
  some?: Maybe<RandomWheelSyncWhereInput>
}

export type RandomWheelSyncWhereInput = {
  AND?: Maybe<Array<RandomWheelSyncWhereInput>>
  NOT?: Maybe<Array<RandomWheelSyncWhereInput>>
  OR?: Maybe<Array<RandomWheelSyncWhereInput>>
  createdAt?: Maybe<DateTimeFilter>
  eventSubscription?: Maybe<EventSubscriptionNullableRelationFilter>
  eventSubscriptionId?: Maybe<UuidNullableFilter>
  id?: Maybe<UuidFilter>
  paused?: Maybe<BoolFilter>
  randomWheel?: Maybe<RandomWheelRelationFilter>
  randomWheelId?: Maybe<UuidFilter>
  rewardId?: Maybe<StringFilter>
  useInput?: Maybe<BoolFilter>
}

export type RandomWheelWhereInput = {
  AND?: Maybe<Array<RandomWheelWhereInput>>
  NOT?: Maybe<Array<RandomWheelWhereInput>>
  OR?: Maybe<Array<RandomWheelWhereInput>>
  access?: Maybe<AccessTypeRelationFilter>
  accessType?: Maybe<StringFilter>
  createdAt?: Maybe<DateTimeFilter>
  editAnonymous?: Maybe<BoolFilter>
  entries?: Maybe<RandomWheelEntryListRelationFilter>
  fadeDuration?: Maybe<IntFilter>
  id?: Maybe<UuidFilter>
  likes?: Maybe<RandomWheelLikeListRelationFilter>
  members?: Maybe<RandomWheelMemberListRelationFilter>
  name?: Maybe<StringNullableFilter>
  owner?: Maybe<UserNullableRelationFilter>
  ownerId?: Maybe<UuidNullableFilter>
  rotation?: Maybe<FloatFilter>
  shareToken?: Maybe<StringNullableFilter>
  slug?: Maybe<StringFilter>
  spinDuration?: Maybe<IntFilter>
  theme?: Maybe<ColorThemeNullableRelationFilter>
  themeId?: Maybe<UuidNullableFilter>
  uniqueEntries?: Maybe<BoolFilter>
  wheelSync?: Maybe<RandomWheelSyncListRelationFilter>
  winners?: Maybe<RandomWheelWinnerListRelationFilter>
}

export type RandomWheelWinner = {
  __typename?: "RandomWheelWinner"
  createdAt: Scalars["DateTime"]
  drawnById?: Maybe<Scalars["String"]>
  id: Scalars["String"]
  name: Scalars["String"]
  randomWheelId: Scalars["String"]
  winnerIndex?: Maybe<Scalars["Int"]>
}

export type RandomWheelWinnerListRelationFilter = {
  every?: Maybe<RandomWheelWinnerWhereInput>
  none?: Maybe<RandomWheelWinnerWhereInput>
  some?: Maybe<RandomWheelWinnerWhereInput>
}

export type RandomWheelWinnerWhereInput = {
  AND?: Maybe<Array<RandomWheelWinnerWhereInput>>
  NOT?: Maybe<Array<RandomWheelWinnerWhereInput>>
  OR?: Maybe<Array<RandomWheelWinnerWhereInput>>
  createdAt?: Maybe<DateTimeFilter>
  drawnBy?: Maybe<UserNullableRelationFilter>
  drawnById?: Maybe<UuidNullableFilter>
  id?: Maybe<UuidFilter>
  name?: Maybe<StringFilter>
  randomWheel?: Maybe<RandomWheelRelationFilter>
  randomWheelId?: Maybe<UuidFilter>
  winnerIndex?: Maybe<IntNullableFilter>
}

export type RewardGroup = {
  __typename?: "RewardGroup"
  _count?: Maybe<RewardGroupCount>
  active: Scalars["Boolean"]
  cooldownExpiry?: Maybe<Scalars["DateTime"]>
  id: Scalars["String"]
  items?: Maybe<Array<RewardGroupItem>>
  name?: Maybe<Scalars["String"]>
  triggerSelected: Scalars["Boolean"]
  userId: Scalars["String"]
}

export type RewardGroupCount = {
  __typename?: "RewardGroupCount"
  items: Scalars["Int"]
}

export type RewardGroupCountItemsArgs = {
  where?: Maybe<RewardGroupItemWhereInput>
}

export type RewardGroupInput = {
  active?: Maybe<Scalars["Boolean"]>
  name?: Maybe<Scalars["String"]>
  triggerSelected?: Maybe<Scalars["Boolean"]>
}

export type RewardGroupItem = {
  __typename?: "RewardGroupItem"
  id: Scalars["String"]
  rewardEnabled: Scalars["Boolean"]
  rewardGroupId: Scalars["String"]
  rewardId: Scalars["String"]
  triggerCooldown: Scalars["Boolean"]
}

export type RewardGroupItemInput = {
  rewardId: Scalars["String"]
  triggerCooldown?: Maybe<Scalars["Boolean"]>
}

export type RewardGroupItemListRelationFilter = {
  every?: Maybe<RewardGroupItemWhereInput>
  none?: Maybe<RewardGroupItemWhereInput>
  some?: Maybe<RewardGroupItemWhereInput>
}

export type RewardGroupItemWhereInput = {
  AND?: Maybe<Array<RewardGroupItemWhereInput>>
  NOT?: Maybe<Array<RewardGroupItemWhereInput>>
  OR?: Maybe<Array<RewardGroupItemWhereInput>>
  id?: Maybe<UuidFilter>
  rewardEnabled?: Maybe<BoolFilter>
  rewardGroup?: Maybe<RewardGroupRelationFilter>
  rewardGroupId?: Maybe<UuidFilter>
  rewardId?: Maybe<StringFilter>
  triggerCooldown?: Maybe<BoolFilter>
}

export type RewardGroupListRelationFilter = {
  every?: Maybe<RewardGroupWhereInput>
  none?: Maybe<RewardGroupWhereInput>
  some?: Maybe<RewardGroupWhereInput>
}

export type RewardGroupRelationFilter = {
  is?: Maybe<RewardGroupWhereInput>
  isNot?: Maybe<RewardGroupWhereInput>
}

export type RewardGroupWhereInput = {
  AND?: Maybe<Array<RewardGroupWhereInput>>
  NOT?: Maybe<Array<RewardGroupWhereInput>>
  OR?: Maybe<Array<RewardGroupWhereInput>>
  active?: Maybe<BoolFilter>
  cooldownExpiry?: Maybe<DateTimeNullableFilter>
  id?: Maybe<UuidFilter>
  items?: Maybe<RewardGroupItemListRelationFilter>
  name?: Maybe<StringNullableFilter>
  triggerSelected?: Maybe<BoolFilter>
  user?: Maybe<UserRelationFilter>
  userId?: Maybe<UuidFilter>
}

export type RewardLink = {
  __typename?: "RewardLink"
  id: Scalars["String"]
  rewardId: Scalars["String"]
  token: Scalars["String"]
  type: Scalars["String"]
  userId: Scalars["String"]
}

export type RewardLinkListRelationFilter = {
  every?: Maybe<RewardLinkWhereInput>
  none?: Maybe<RewardLinkWhereInput>
  some?: Maybe<RewardLinkWhereInput>
}

export type RewardLinkWhereInput = {
  AND?: Maybe<Array<RewardLinkWhereInput>>
  NOT?: Maybe<Array<RewardLinkWhereInput>>
  OR?: Maybe<Array<RewardLinkWhereInput>>
  id?: Maybe<UuidFilter>
  rewardId?: Maybe<StringFilter>
  token?: Maybe<StringFilter>
  type?: Maybe<StringFilter>
  user?: Maybe<UserRelationFilter>
  userId?: Maybe<UuidFilter>
}

export type StringFilter = {
  contains?: Maybe<Scalars["String"]>
  endsWith?: Maybe<Scalars["String"]>
  equals?: Maybe<Scalars["String"]>
  gt?: Maybe<Scalars["String"]>
  gte?: Maybe<Scalars["String"]>
  in?: Maybe<Array<Scalars["String"]>>
  lt?: Maybe<Scalars["String"]>
  lte?: Maybe<Scalars["String"]>
  mode?: Maybe<QueryMode>
  not?: Maybe<NestedStringFilter>
  notIn?: Maybe<Array<Scalars["String"]>>
  startsWith?: Maybe<Scalars["String"]>
}

export type StringNullableFilter = {
  contains?: Maybe<Scalars["String"]>
  endsWith?: Maybe<Scalars["String"]>
  equals?: Maybe<Scalars["String"]>
  gt?: Maybe<Scalars["String"]>
  gte?: Maybe<Scalars["String"]>
  in?: Maybe<Array<Scalars["String"]>>
  lt?: Maybe<Scalars["String"]>
  lte?: Maybe<Scalars["String"]>
  mode?: Maybe<QueryMode>
  not?: Maybe<NestedStringNullableFilter>
  notIn?: Maybe<Array<Scalars["String"]>>
  startsWith?: Maybe<Scalars["String"]>
}

export type StringNullableListFilter = {
  equals?: Maybe<Array<Scalars["String"]>>
  has?: Maybe<Scalars["String"]>
  hasEvery?: Maybe<Array<Scalars["String"]>>
  hasSome?: Maybe<Array<Scalars["String"]>>
  isEmpty?: Maybe<Scalars["Boolean"]>
}

export type User = {
  __typename?: "User"
  _count?: Maybe<UserCount>
  createdAt: Scalars["DateTime"]
  displayname?: Maybe<Scalars["String"]>
  id: Scalars["String"]
  standardThemeId?: Maybe<Scalars["String"]>
  updatedAt: Scalars["DateTime"]
  username: Scalars["String"]
}

export type UserAccessToken = {
  __typename?: "UserAccessToken"
  expiresIn: Scalars["Int"]
  id: Scalars["String"]
  obtainmentTimestamp: Scalars["BigInt"]
  scope: Array<Scalars["String"]>
  twitchUserId?: Maybe<Scalars["String"]>
  twitchUsername?: Maybe<Scalars["String"]>
  userId: Scalars["String"]
}

export type UserAccessTokenListRelationFilter = {
  every?: Maybe<UserAccessTokenWhereInput>
  none?: Maybe<UserAccessTokenWhereInput>
  some?: Maybe<UserAccessTokenWhereInput>
}

export type UserAccessTokenWhereInput = {
  AND?: Maybe<Array<UserAccessTokenWhereInput>>
  NOT?: Maybe<Array<UserAccessTokenWhereInput>>
  OR?: Maybe<Array<UserAccessTokenWhereInput>>
  accessToken?: Maybe<StringFilter>
  expiresIn?: Maybe<IntFilter>
  id?: Maybe<UuidFilter>
  obtainmentTimestamp?: Maybe<BigIntFilter>
  refreshToken?: Maybe<StringNullableFilter>
  scope?: Maybe<StringNullableListFilter>
  twitchUserId?: Maybe<StringNullableFilter>
  twitchUsername?: Maybe<StringNullableFilter>
  user?: Maybe<UserRelationFilter>
  userId?: Maybe<UuidFilter>
}

export type UserCount = {
  __typename?: "UserCount"
  colorThemes: Scalars["Int"]
  drawnWinners: Scalars["Int"]
  eventSubscriptions: Scalars["Int"]
  likes: Scalars["Int"]
  randomWheelMember: Scalars["Int"]
  randomWheels: Scalars["Int"]
  rewardGroups: Scalars["Int"]
  rewardLinks: Scalars["Int"]
  userAccessTokens: Scalars["Int"]
}

export type UserCountColorThemesArgs = {
  where?: Maybe<ColorThemeWhereInput>
}

export type UserCountDrawnWinnersArgs = {
  where?: Maybe<RandomWheelWinnerWhereInput>
}

export type UserCountEventSubscriptionsArgs = {
  where?: Maybe<EventSubscriptionWhereInput>
}

export type UserCountLikesArgs = {
  where?: Maybe<RandomWheelLikeWhereInput>
}

export type UserCountRandomWheelMemberArgs = {
  where?: Maybe<RandomWheelMemberWhereInput>
}

export type UserCountRandomWheelsArgs = {
  where?: Maybe<RandomWheelWhereInput>
}

export type UserCountRewardGroupsArgs = {
  where?: Maybe<RewardGroupWhereInput>
}

export type UserCountRewardLinksArgs = {
  where?: Maybe<RewardLinkWhereInput>
}

export type UserCountUserAccessTokensArgs = {
  where?: Maybe<UserAccessTokenWhereInput>
}

export type UserInput = {
  displayname?: Maybe<Scalars["String"]>
  username?: Maybe<Scalars["String"]>
}

export type UserListRelationFilter = {
  every?: Maybe<UserWhereInput>
  none?: Maybe<UserWhereInput>
  some?: Maybe<UserWhereInput>
}

export type UserNullableRelationFilter = {
  is?: Maybe<UserWhereInput>
  isNot?: Maybe<UserWhereInput>
}

export type UserRelationFilter = {
  is?: Maybe<UserWhereInput>
  isNot?: Maybe<UserWhereInput>
}

export type UserResponse = {
  __typename?: "UserResponse"
  errors?: Maybe<Array<FieldError>>
  user?: Maybe<User>
}

export type UserWhereInput = {
  AND?: Maybe<Array<UserWhereInput>>
  NOT?: Maybe<Array<UserWhereInput>>
  OR?: Maybe<Array<UserWhereInput>>
  colorThemes?: Maybe<ColorThemeListRelationFilter>
  createdAt?: Maybe<DateTimeFilter>
  displayname?: Maybe<StringNullableFilter>
  drawnWinners?: Maybe<RandomWheelWinnerListRelationFilter>
  eventSubscriptions?: Maybe<EventSubscriptionListRelationFilter>
  id?: Maybe<UuidFilter>
  likes?: Maybe<RandomWheelLikeListRelationFilter>
  password?: Maybe<StringFilter>
  randomWheelMember?: Maybe<RandomWheelMemberListRelationFilter>
  randomWheels?: Maybe<RandomWheelListRelationFilter>
  rewardGroups?: Maybe<RewardGroupListRelationFilter>
  rewardLinks?: Maybe<RewardLinkListRelationFilter>
  standardTheme?: Maybe<ColorThemeNullableRelationFilter>
  standardThemeId?: Maybe<UuidNullableFilter>
  updatedAt?: Maybe<DateTimeFilter>
  userAccessTokens?: Maybe<UserAccessTokenListRelationFilter>
  username?: Maybe<StringFilter>
}

export type UuidFilter = {
  equals?: Maybe<Scalars["String"]>
  gt?: Maybe<Scalars["String"]>
  gte?: Maybe<Scalars["String"]>
  in?: Maybe<Array<Scalars["String"]>>
  lt?: Maybe<Scalars["String"]>
  lte?: Maybe<Scalars["String"]>
  mode?: Maybe<QueryMode>
  not?: Maybe<NestedUuidFilter>
  notIn?: Maybe<Array<Scalars["String"]>>
}

export type UuidNullableFilter = {
  equals?: Maybe<Scalars["String"]>
  gt?: Maybe<Scalars["String"]>
  gte?: Maybe<Scalars["String"]>
  in?: Maybe<Array<Scalars["String"]>>
  lt?: Maybe<Scalars["String"]>
  lte?: Maybe<Scalars["String"]>
  mode?: Maybe<QueryMode>
  not?: Maybe<NestedUuidNullableFilter>
  notIn?: Maybe<Array<Scalars["String"]>>
}

export type ColorThemeFragment = {
  __typename?: "ColorTheme"
  id: string
  name?: Maybe<string>
  colors: Array<string>
  creatorId?: Maybe<string>
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
  maxRedemptionsPerStream?: Maybe<number>
  maxRedemptionsPerUserPerStream?: Maybe<number>
  globalCooldown?: Maybe<number>
  isPaused: boolean
  isInStock: boolean
  redemptionsThisStream?: Maybe<number>
  autoFulfill: boolean
  cooldownExpiryDate?: Maybe<Date>
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
  name?: Maybe<string>
  createdAt: Date
  rotation: number
  spinDuration: number
  fadeDuration: number
  accessType: string
  editable: boolean
  editAnonymous: boolean
  uniqueEntries: boolean
  shareToken?: Maybe<string>
  liked: boolean
  theme?: Maybe<{ __typename?: "ColorTheme"; id: string; name?: Maybe<string>; colors: Array<string> }>
  _count?: Maybe<{ __typename?: "RandomWheelCount"; entries: number }>
}

export type RandomWheelEntryFragment = { __typename?: "RandomWheelEntry"; id: string; name: string; weight: number }

export type RandomWheelWinnerFragment = {
  __typename?: "RandomWheelWinner"
  id: string
  name: string
  createdAt: Date
  winnerIndex?: Maybe<number>
}

export type RandomWheelMemberFragment = {
  __typename?: "RandomWheelMember"
  id: string
  roleName: string
  user: { __typename?: "User"; id: string; username: string; displayname?: Maybe<string> }
}

export type RandomWheelSyncFragment = {
  __typename?: "RandomWheelSync"
  id: string
  randomWheelId: string
  eventSubscriptionId?: Maybe<string>
  rewardId: string
  paused: boolean
  useInput: boolean
  pending: boolean
  createdAt: Date
}

export type RewardGroupFragment = {
  __typename?: "RewardGroup"
  id: string
  name?: Maybe<string>
  active: boolean
  triggerSelected: boolean
  userId: string
  cooldownExpiry?: Maybe<Date>
  items?: Maybe<
    Array<{
      __typename?: "RewardGroupItem"
      id: string
      rewardGroupId: string
      rewardId: string
      rewardEnabled: boolean
      triggerCooldown: boolean
    }>
  >
}

export type RewardGroupDetailsFragment = {
  __typename?: "RewardGroup"
  id: string
  name?: Maybe<string>
  active: boolean
  triggerSelected: boolean
  userId: string
  cooldownExpiry?: Maybe<Date>
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

export type NormalUserFragment = { __typename?: "User"; id: string; username: string; displayname?: Maybe<string> }

export type UserNameFragment = { __typename?: "User"; id: string; username: string; displayname?: Maybe<string> }

export type UserAccessTokenFragment = {
  __typename?: "UserAccessToken"
  id: string
  scope: Array<string>
  expiresIn: number
  obtainmentTimestamp: bigint
  twitchUserId?: Maybe<string>
  twitchUsername?: Maybe<string>
}

export type LoginMutationVariables = Exact<{
  username: Scalars["String"]
  password: Scalars["String"]
}>

export type LoginMutation = {
  __typename?: "Mutation"
  login: {
    __typename?: "UserResponse"
    user?: Maybe<{ __typename?: "User"; id: string; username: string; displayname?: Maybe<string> }>
    errors?: Maybe<Array<{ __typename?: "FieldError"; field: string; message: string }>>
  }
}

export type LogoutMutationVariables = Exact<{ [key: string]: never }>

export type LogoutMutation = { __typename?: "Mutation"; logout: boolean }

export type AddRandomWheelEntryMutationVariables = Exact<{
  randomWheelId: Scalars["String"]
  name: Scalars["String"]
}>

export type AddRandomWheelEntryMutation = {
  __typename?: "Mutation"
  addRandomWheelEntry: { __typename?: "RandomWheelEntry"; id: string; name: string; weight: number }
}

export type ClearRandomWheelMutationVariables = Exact<{
  id: Scalars["String"]
}>

export type ClearRandomWheelMutation = { __typename?: "Mutation"; clearRandomWheel: number }

export type CreateRandomWheelMutationVariables = Exact<{
  name?: Maybe<Scalars["String"]>
  accessType?: Maybe<Scalars["String"]>
  spinDuration?: Maybe<Scalars["Int"]>
  fadeDuration?: Maybe<Scalars["Int"]>
  editAnonymous?: Maybe<Scalars["Boolean"]>
}>

export type CreateRandomWheelMutation = {
  __typename?: "Mutation"
  createRandomWheel: {
    __typename?: "RandomWheel"
    id: string
    slug: string
    name?: Maybe<string>
    createdAt: Date
    rotation: number
    spinDuration: number
    fadeDuration: number
    accessType: string
    editable: boolean
    editAnonymous: boolean
    uniqueEntries: boolean
    shareToken?: Maybe<string>
    liked: boolean
    theme?: Maybe<{ __typename?: "ColorTheme"; id: string; name?: Maybe<string>; colors: Array<string> }>
    _count?: Maybe<{ __typename?: "RandomWheelCount"; entries: number }>
  }
}

export type DeleteRandomWheelMutationVariables = Exact<{
  id: Scalars["String"]
}>

export type DeleteRandomWheelMutation = {
  __typename?: "Mutation"
  deleteRandomWheel?: Maybe<{ __typename?: "AppError"; errorMessage?: Maybe<string>; errorCode: number }>
}

export type DeleteRandomWheelEntryMutationVariables = Exact<{
  id: Scalars["String"]
}>

export type DeleteRandomWheelEntryMutation = { __typename?: "Mutation"; deleteRandomWheelEntry?: Maybe<boolean> }

export type LikeRandomWheelMutationVariables = Exact<{
  randomWheelId: Scalars["String"]
  like: Scalars["Boolean"]
}>

export type LikeRandomWheelMutation = {
  __typename?: "Mutation"
  likeRandomWheel?: Maybe<{
    __typename?: "RandomWheelLike"
    id: string
    userId: string
    randomWheelId: string
    createdAt: Date
  }>
}

export type ResetShareTokenMutationVariables = Exact<{
  randomWheelId: Scalars["String"]
}>

export type ResetShareTokenMutation = { __typename?: "Mutation"; resetShareToken?: Maybe<boolean> }

export type SpinRandomWheelMutationVariables = Exact<{
  wheelId: Scalars["String"]
}>

export type SpinRandomWheelMutation = {
  __typename?: "Mutation"
  spinRandomWheel: {
    __typename?: "RandomWheelWinner"
    id: string
    name: string
    createdAt: Date
    drawnById?: Maybe<string>
    randomWheelId: string
    winnerIndex?: Maybe<number>
  }
}

export type UpdateRandomWheelMutationVariables = Exact<{
  id: Scalars["String"]
  options: RandomWheelInput
}>

export type UpdateRandomWheelMutation = {
  __typename?: "Mutation"
  updateRandomWheel?: Maybe<{
    __typename?: "RandomWheel"
    id: string
    slug: string
    name?: Maybe<string>
    createdAt: Date
    rotation: number
    spinDuration: number
    fadeDuration: number
    accessType: string
    editable: boolean
    editAnonymous: boolean
    uniqueEntries: boolean
    shareToken?: Maybe<string>
    liked: boolean
    theme?: Maybe<{ __typename?: "ColorTheme"; id: string; name?: Maybe<string>; colors: Array<string> }>
    _count?: Maybe<{ __typename?: "RandomWheelCount"; entries: number }>
  }>
}

export type UpdateRandomWheelEntryMutationVariables = Exact<{
  id: Scalars["String"]
  entry: RandomWheelEntryInput
}>

export type UpdateRandomWheelEntryMutation = {
  __typename?: "Mutation"
  updateRandomWheelEntry: { __typename?: "RandomWheelEntry"; id: string; name: string; weight: number }
}

export type UpdateRandomWheelMembersMutationVariables = Exact<{
  randomWheelId: Scalars["String"]
  members: Array<RandomWheelMemberInput> | RandomWheelMemberInput
}>

export type UpdateRandomWheelMembersMutation = {
  __typename?: "Mutation"
  updateRandomWheelMembers?: Maybe<Array<{ __typename?: "RandomWheelMember"; id: string }>>
}

export type RegisterMutationVariables = Exact<{
  username: Scalars["String"]
  password: Scalars["String"]
  displayname?: Maybe<Scalars["String"]>
}>

export type RegisterMutation = {
  __typename?: "Mutation"
  register: {
    __typename?: "UserResponse"
    user?: Maybe<{ __typename?: "User"; id: string; username: string; displayname?: Maybe<string> }>
    errors?: Maybe<Array<{ __typename?: "FieldError"; field: string; message: string }>>
  }
}

export type AddWheelSyncMutationVariables = Exact<{
  rewardId: Scalars["String"]
  randomWheelId: Scalars["String"]
  useInput?: Maybe<Scalars["Boolean"]>
  addExisting?: Maybe<Scalars["Boolean"]>
}>

export type AddWheelSyncMutation = {
  __typename?: "Mutation"
  addWheelSync?: Maybe<{
    __typename?: "RandomWheelSync"
    id: string
    randomWheelId: string
    eventSubscriptionId?: Maybe<string>
    rewardId: string
    paused: boolean
    useInput: boolean
    pending: boolean
    createdAt: Date
  }>
}

export type DeleteWheelSyncMutationVariables = Exact<{
  ids: Array<Scalars["String"]> | Scalars["String"]
}>

export type DeleteWheelSyncMutation = { __typename?: "Mutation"; deleteWheelSync?: Maybe<boolean> }

export type DisconnectAccessTokenMutationVariables = Exact<{ [key: string]: never }>

export type DisconnectAccessTokenMutation = { __typename?: "Mutation"; disconnectAccessToken: boolean }

export type PauseWheelSyncMutationVariables = Exact<{
  id: Scalars["String"]
  paused: Scalars["Boolean"]
}>

export type PauseWheelSyncMutation = {
  __typename?: "Mutation"
  pauseWheelSync?: Maybe<{
    __typename?: "RandomWheelSync"
    id: string
    randomWheelId: string
    eventSubscriptionId?: Maybe<string>
    rewardId: string
    paused: boolean
    useInput: boolean
    pending: boolean
    createdAt: Date
  }>
}

export type CreateChannelRewardMutationVariables = Exact<{
  reward: CustomRewardCreateInput
}>

export type CreateChannelRewardMutation = {
  __typename?: "Mutation"
  createChannelReward?: Maybe<{
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
    maxRedemptionsPerStream?: Maybe<number>
    maxRedemptionsPerUserPerStream?: Maybe<number>
    globalCooldown?: Maybe<number>
    isPaused: boolean
    isInStock: boolean
    redemptionsThisStream?: Maybe<number>
    autoFulfill: boolean
    cooldownExpiryDate?: Maybe<Date>
    image: string
  }>
}

export type CreateRewardLinkMutationVariables = Exact<{
  rewardId: Scalars["String"]
  type: Scalars["String"]
}>

export type CreateRewardLinkMutation = {
  __typename?: "Mutation"
  createRewardLink?: Maybe<{
    __typename?: "RewardLink"
    id: string
    userId: string
    rewardId: string
    token: string
    type: string
  }>
}

export type DeleteChannelRewardMutationVariables = Exact<{
  rewardId: Scalars["String"]
}>

export type DeleteChannelRewardMutation = { __typename?: "Mutation"; deleteChannelReward: boolean }

export type DeleteRewardLinkMutationVariables = Exact<{
  id: Scalars["String"]
}>

export type DeleteRewardLinkMutation = { __typename?: "Mutation"; deleteRewardLink: boolean }

export type UpdateChannelRewardMutationVariables = Exact<{
  rewardId: Scalars["String"]
  reward: CustomRewardUpdateInput
}>

export type UpdateChannelRewardMutation = {
  __typename?: "Mutation"
  updateChannelReward?: Maybe<{
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
    maxRedemptionsPerStream?: Maybe<number>
    maxRedemptionsPerUserPerStream?: Maybe<number>
    globalCooldown?: Maybe<number>
    isPaused: boolean
    isInStock: boolean
    redemptionsThisStream?: Maybe<number>
    autoFulfill: boolean
    cooldownExpiryDate?: Maybe<Date>
    image: string
  }>
}

export type UpdateRewardTokenMutationVariables = Exact<{
  type: Scalars["String"]
  token: Scalars["String"]
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
  rewardGroupId: Scalars["String"]
  rewardId: Scalars["String"]
  triggerCooldown?: Maybe<Scalars["Boolean"]>
}>

export type AddRewardGroupItemMutation = {
  __typename?: "Mutation"
  addRewardGroupItem?: Maybe<{
    __typename?: "RewardGroupItem"
    id: string
    rewardGroupId: string
    rewardId: string
    rewardEnabled: boolean
    triggerCooldown: boolean
  }>
}

export type CreateRewardGroupMutationVariables = Exact<{
  rewardGroup: RewardGroupInput
  items: Array<RewardGroupItemInput> | RewardGroupItemInput
}>

export type CreateRewardGroupMutation = {
  __typename?: "Mutation"
  createRewardGroup?: Maybe<{
    __typename?: "RewardGroup"
    id: string
    name?: Maybe<string>
    active: boolean
    triggerSelected: boolean
    userId: string
    cooldownExpiry?: Maybe<Date>
    items?: Maybe<
      Array<{
        __typename?: "RewardGroupItem"
        id: string
        rewardGroupId: string
        rewardId: string
        rewardEnabled: boolean
        triggerCooldown: boolean
      }>
    >
  }>
}

export type DeleteRewardGroupMutationVariables = Exact<{
  id: Scalars["String"]
}>

export type DeleteRewardGroupMutation = { __typename?: "Mutation"; deleteRewardGroup?: Maybe<boolean> }

export type DeleteRewardGroupItemMutationVariables = Exact<{
  id: Scalars["String"]
}>

export type DeleteRewardGroupItemMutation = { __typename?: "Mutation"; deleteRewardGroupItem?: Maybe<boolean> }

export type UpdateRewardGroupMutationVariables = Exact<{
  id: Scalars["String"]
  rewardGroup?: Maybe<RewardGroupInput>
  items?: Maybe<Array<RewardGroupItemInput> | RewardGroupItemInput>
}>

export type UpdateRewardGroupMutation = {
  __typename?: "Mutation"
  updateRewardGroup?: Maybe<{
    __typename?: "RewardGroup"
    id: string
    name?: Maybe<string>
    active: boolean
    triggerSelected: boolean
    userId: string
    cooldownExpiry?: Maybe<Date>
    items?: Maybe<
      Array<{
        __typename?: "RewardGroupItem"
        id: string
        rewardGroupId: string
        rewardId: string
        rewardEnabled: boolean
        triggerCooldown: boolean
      }>
    >
  }>
}

export type UpdateRewardGroupItemMutationVariables = Exact<{
  id: Scalars["String"]
  rewardEnabled?: Maybe<Scalars["Boolean"]>
  triggerCooldown?: Maybe<Scalars["Boolean"]>
}>

export type UpdateRewardGroupItemMutation = {
  __typename?: "Mutation"
  updateRewardGroupItem?: Maybe<{
    __typename?: "RewardGroupItem"
    id: string
    rewardGroupId: string
    rewardId: string
    rewardEnabled: boolean
    triggerCooldown: boolean
  }>
}

export type UpdateUserMutationVariables = Exact<{
  user: UserInput
}>

export type UpdateUserMutation = {
  __typename?: "Mutation"
  updateUser: {
    __typename?: "UserResponse"
    user?: Maybe<{ __typename?: "User"; id: string; username: string; displayname?: Maybe<string> }>
    errors?: Maybe<Array<{ __typename?: "FieldError"; field: string; message: string }>>
  }
}

export type ColorThemesQueryVariables = Exact<{
  type?: Maybe<Scalars["String"]>
}>

export type ColorThemesQuery = {
  __typename?: "Query"
  colorThemes: Array<{
    __typename?: "ColorTheme"
    id: string
    name?: Maybe<string>
    colors: Array<string>
    creatorId?: Maybe<string>
    global: boolean
  }>
}

export type MeQueryVariables = Exact<{ [key: string]: never }>

export type MeQuery = {
  __typename?: "Query"
  me?: Maybe<{ __typename?: "User"; id: string; username: string; displayname?: Maybe<string> }>
}

export type MyRandomWheelsQueryVariables = Exact<{
  type?: Maybe<Scalars["String"]>
}>

export type MyRandomWheelsQuery = {
  __typename?: "Query"
  myRandomWheels: Array<{
    __typename?: "RandomWheel"
    id: string
    slug: string
    name?: Maybe<string>
    createdAt: Date
    rotation: number
    spinDuration: number
    fadeDuration: number
    accessType: string
    editable: boolean
    editAnonymous: boolean
    uniqueEntries: boolean
    shareToken?: Maybe<string>
    liked: boolean
    theme?: Maybe<{ __typename?: "ColorTheme"; id: string; name?: Maybe<string>; colors: Array<string> }>
    _count?: Maybe<{ __typename?: "RandomWheelCount"; entries: number }>
  }>
}

export type RandomWheelBySlugQueryVariables = Exact<{
  slug: Scalars["String"]
  token?: Maybe<Scalars["String"]>
}>

export type RandomWheelBySlugQuery = {
  __typename?: "Query"
  randomWheelBySlug?: Maybe<{
    __typename?: "RandomWheel"
    id: string
    slug: string
    name?: Maybe<string>
    createdAt: Date
    rotation: number
    spinDuration: number
    fadeDuration: number
    accessType: string
    editable: boolean
    editAnonymous: boolean
    uniqueEntries: boolean
    shareToken?: Maybe<string>
    liked: boolean
    owner?: Maybe<{ __typename?: "User"; id: string; username: string; displayname?: Maybe<string> }>
    members: Array<{
      __typename?: "RandomWheelMember"
      id: string
      roleName: string
      user: { __typename?: "User"; id: string; username: string; displayname?: Maybe<string> }
    }>
    theme?: Maybe<{ __typename?: "ColorTheme"; id: string; name?: Maybe<string>; colors: Array<string> }>
    _count?: Maybe<{ __typename?: "RandomWheelCount"; entries: number }>
  }>
}

export type RandomWheelBySlugShareTokenQueryVariables = Exact<{
  slug: Scalars["String"]
  token?: Maybe<Scalars["String"]>
}>

export type RandomWheelBySlugShareTokenQuery = {
  __typename?: "Query"
  randomWheelBySlug?: Maybe<{ __typename?: "RandomWheel"; shareToken?: Maybe<string> }>
}

export type RandomWheelBySlugEntriesQueryVariables = Exact<{
  slug: Scalars["String"]
  token?: Maybe<Scalars["String"]>
}>

export type RandomWheelBySlugEntriesQuery = {
  __typename?: "Query"
  randomWheelBySlug?: Maybe<{
    __typename?: "RandomWheel"
    id: string
    entries: Array<{ __typename?: "RandomWheelEntry"; id: string; name: string; weight: number }>
  }>
}

export type RandomWheelBySlugMembersQueryVariables = Exact<{
  slug: Scalars["String"]
  token?: Maybe<Scalars["String"]>
}>

export type RandomWheelBySlugMembersQuery = {
  __typename?: "Query"
  randomWheelBySlug?: Maybe<{
    __typename?: "RandomWheel"
    id: string
    members: Array<{
      __typename?: "RandomWheelMember"
      id: string
      roleName: string
      user: { __typename?: "User"; id: string; username: string; displayname?: Maybe<string> }
    }>
  }>
}

export type RandomWheelBySlugWinnersQueryVariables = Exact<{
  slug: Scalars["String"]
  token?: Maybe<Scalars["String"]>
}>

export type RandomWheelBySlugWinnersQuery = {
  __typename?: "Query"
  randomWheelBySlug?: Maybe<{
    __typename?: "RandomWheel"
    id: string
    winners: Array<{
      __typename?: "RandomWheelWinner"
      id: string
      name: string
      createdAt: Date
      winnerIndex?: Maybe<number>
    }>
  }>
}

export type ChannelRewardsQueryVariables = Exact<{
  userId?: Maybe<Scalars["String"]>
  onlyManageable?: Maybe<Scalars["Boolean"]>
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
    maxRedemptionsPerStream?: Maybe<number>
    maxRedemptionsPerUserPerStream?: Maybe<number>
    globalCooldown?: Maybe<number>
    isPaused: boolean
    isInStock: boolean
    redemptionsThisStream?: Maybe<number>
    autoFulfill: boolean
    cooldownExpiryDate?: Maybe<Date>
    image: string
  }>
}

export type RewardByTokenQueryVariables = Exact<{
  type: Scalars["String"]
  token: Scalars["String"]
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
  id: Scalars["String"]
}>

export type RewardGroupQuery = {
  __typename?: "Query"
  rewardGroup: {
    __typename?: "RewardGroup"
    id: string
    name?: Maybe<string>
    active: boolean
    triggerSelected: boolean
    userId: string
    cooldownExpiry?: Maybe<Date>
    items?: Maybe<
      Array<{
        __typename?: "RewardGroupItem"
        id: string
        rewardGroupId: string
        rewardId: string
        rewardEnabled: boolean
        triggerCooldown: boolean
      }>
    >
  }
}

export type RewardGroupsQueryVariables = Exact<{
  items?: Maybe<Scalars["Boolean"]>
}>

export type RewardGroupsQuery = {
  __typename?: "Query"
  rewardGroups: Array<{
    __typename?: "RewardGroup"
    id: string
    name?: Maybe<string>
    active: boolean
    triggerSelected: boolean
    userId: string
    cooldownExpiry?: Maybe<Date>
    items?: Maybe<
      Array<{
        __typename?: "RewardGroupItem"
        id: string
        rewardGroupId: string
        rewardId: string
        rewardEnabled: boolean
        triggerCooldown: boolean
      }>
    >
  }>
}

export type RewardLinksQueryVariables = Exact<{
  rewardIds?: Maybe<Array<Scalars["String"]> | Scalars["String"]>
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
  randomWheelId: Scalars["String"]
}>

export type SyncForWheelQuery = {
  __typename?: "Query"
  syncForWheel: Array<{
    __typename?: "RandomWheelSync"
    id: string
    randomWheelId: string
    eventSubscriptionId?: Maybe<string>
    rewardId: string
    paused: boolean
    useInput: boolean
    pending: boolean
    createdAt: Date
    reward?: Maybe<{
      __typename?: "CustomReward"
      id: string
      title: string
      backgroundColor: string
      isEnabled: boolean
      isPaused: boolean
      image: string
    }>
  }>
}

export type UserAccessTokenQueryVariables = Exact<{ [key: string]: never }>

export type UserAccessTokenQuery = {
  __typename?: "Query"
  userAccesToken?: Maybe<{
    __typename?: "UserAccessToken"
    id: string
    scope: Array<string>
    expiresIn: number
    obtainmentTimestamp: bigint
    twitchUserId?: Maybe<string>
    twitchUsername?: Maybe<string>
  }>
}

export type UsernameExistsMutationVariables = Exact<{
  username: Scalars["String"]
}>

export type UsernameExistsMutation = { __typename?: "Mutation"; usernameExists: boolean }

export const ColorThemeFragmentDoc = gql`
  fragment ColorTheme on ColorTheme {
    id
    name
    colors
    creatorId
    global
  }
`
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
`
export const CustomRewardMenuItemFragmentDoc = gql`
  fragment CustomRewardMenuItem on CustomReward {
    id
    title
    backgroundColor
    isEnabled
    isPaused
    image
  }
`
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
    uniqueEntries
    shareToken
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
`
export const RandomWheelEntryFragmentDoc = gql`
  fragment RandomWheelEntry on RandomWheelEntry {
    id
    name
    weight
  }
`
export const RandomWheelWinnerFragmentDoc = gql`
  fragment RandomWheelWinner on RandomWheelWinner {
    id
    name
    createdAt
    winnerIndex
  }
`
export const UserNameFragmentDoc = gql`
  fragment UserName on User {
    id
    username
    displayname
  }
`
export const RandomWheelMemberFragmentDoc = gql`
  fragment RandomWheelMember on RandomWheelMember {
    id
    roleName
    user {
      ...UserName
    }
  }
  ${UserNameFragmentDoc}
`
export const RandomWheelSyncFragmentDoc = gql`
  fragment RandomWheelSync on RandomWheelSync {
    id
    randomWheelId
    eventSubscriptionId
    rewardId
    paused
    useInput
    pending
    createdAt
  }
`
export const RewardGroupDetailsFragmentDoc = gql`
  fragment RewardGroupDetails on RewardGroup {
    id
    name
    active
    triggerSelected
    userId
    cooldownExpiry
  }
`
export const RewardGroupItemFragmentDoc = gql`
  fragment RewardGroupItem on RewardGroupItem {
    id
    rewardGroupId
    rewardId
    rewardEnabled
    triggerCooldown
  }
`
export const RewardGroupFragmentDoc = gql`
  fragment RewardGroup on RewardGroup {
    ...RewardGroupDetails
    items {
      ...RewardGroupItem
    }
  }
  ${RewardGroupDetailsFragmentDoc}
  ${RewardGroupItemFragmentDoc}
`
export const RewardLinkFragmentDoc = gql`
  fragment RewardLink on RewardLink {
    id
    userId
    rewardId
    token
    type
  }
`
export const NormalUserFragmentDoc = gql`
  fragment NormalUser on User {
    id
    username
    displayname
  }
`
export const UserAccessTokenFragmentDoc = gql`
  fragment UserAccessToken on UserAccessToken {
    id
    scope
    expiresIn
    obtainmentTimestamp
    twitchUserId
    twitchUsername
  }
`
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
  ${NormalUserFragmentDoc}
`

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument)
}
export const LogoutDocument = gql`
  mutation Logout {
    logout
  }
`

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument)
}
export const AddRandomWheelEntryDocument = gql`
  mutation AddRandomWheelEntry($randomWheelId: String!, $name: String!) {
    addRandomWheelEntry(randomWheelId: $randomWheelId, name: $name) {
      ...RandomWheelEntry
    }
  }
  ${RandomWheelEntryFragmentDoc}
`

export function useAddRandomWheelEntryMutation() {
  return Urql.useMutation<AddRandomWheelEntryMutation, AddRandomWheelEntryMutationVariables>(
    AddRandomWheelEntryDocument
  )
}
export const ClearRandomWheelDocument = gql`
  mutation ClearRandomWheel($id: String!) {
    clearRandomWheel(id: $id)
  }
`

export function useClearRandomWheelMutation() {
  return Urql.useMutation<ClearRandomWheelMutation, ClearRandomWheelMutationVariables>(ClearRandomWheelDocument)
}
export const CreateRandomWheelDocument = gql`
  mutation CreateRandomWheel(
    $name: String
    $accessType: String
    $spinDuration: Int
    $fadeDuration: Int
    $editAnonymous: Boolean
  ) {
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
  ${RandomWheelDetailsFragmentDoc}
`

export function useCreateRandomWheelMutation() {
  return Urql.useMutation<CreateRandomWheelMutation, CreateRandomWheelMutationVariables>(CreateRandomWheelDocument)
}
export const DeleteRandomWheelDocument = gql`
  mutation DeleteRandomWheel($id: String!) {
    deleteRandomWheel(id: $id) {
      errorMessage
      errorCode
    }
  }
`

export function useDeleteRandomWheelMutation() {
  return Urql.useMutation<DeleteRandomWheelMutation, DeleteRandomWheelMutationVariables>(DeleteRandomWheelDocument)
}
export const DeleteRandomWheelEntryDocument = gql`
  mutation DeleteRandomWheelEntry($id: String!) {
    deleteRandomWheelEntry(id: $id)
  }
`

export function useDeleteRandomWheelEntryMutation() {
  return Urql.useMutation<DeleteRandomWheelEntryMutation, DeleteRandomWheelEntryMutationVariables>(
    DeleteRandomWheelEntryDocument
  )
}
export const LikeRandomWheelDocument = gql`
  mutation LikeRandomWheel($randomWheelId: String!, $like: Boolean!) {
    likeRandomWheel(randomWheelId: $randomWheelId, like: $like) {
      id
      userId
      randomWheelId
      createdAt
    }
  }
`

export function useLikeRandomWheelMutation() {
  return Urql.useMutation<LikeRandomWheelMutation, LikeRandomWheelMutationVariables>(LikeRandomWheelDocument)
}
export const ResetShareTokenDocument = gql`
  mutation ResetShareToken($randomWheelId: String!) {
    resetShareToken(randommWheelId: $randomWheelId)
  }
`

export function useResetShareTokenMutation() {
  return Urql.useMutation<ResetShareTokenMutation, ResetShareTokenMutationVariables>(ResetShareTokenDocument)
}
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
`

export function useSpinRandomWheelMutation() {
  return Urql.useMutation<SpinRandomWheelMutation, SpinRandomWheelMutationVariables>(SpinRandomWheelDocument)
}
export const UpdateRandomWheelDocument = gql`
  mutation UpdateRandomWheel($id: String!, $options: RandomWheelInput!) {
    updateRandomWheel(id: $id, options: $options) {
      ...RandomWheelDetails
    }
  }
  ${RandomWheelDetailsFragmentDoc}
`

export function useUpdateRandomWheelMutation() {
  return Urql.useMutation<UpdateRandomWheelMutation, UpdateRandomWheelMutationVariables>(UpdateRandomWheelDocument)
}
export const UpdateRandomWheelEntryDocument = gql`
  mutation UpdateRandomWheelEntry($id: String!, $entry: RandomWheelEntryInput!) {
    updateRandomWheelEntry(id: $id, entry: $entry) {
      ...RandomWheelEntry
    }
  }
  ${RandomWheelEntryFragmentDoc}
`

export function useUpdateRandomWheelEntryMutation() {
  return Urql.useMutation<UpdateRandomWheelEntryMutation, UpdateRandomWheelEntryMutationVariables>(
    UpdateRandomWheelEntryDocument
  )
}
export const UpdateRandomWheelMembersDocument = gql`
  mutation UpdateRandomWheelMembers($randomWheelId: String!, $members: [RandomWheelMemberInput!]!) {
    updateRandomWheelMembers(randomWheelId: $randomWheelId, members: $members) {
      id
    }
  }
`

export function useUpdateRandomWheelMembersMutation() {
  return Urql.useMutation<UpdateRandomWheelMembersMutation, UpdateRandomWheelMembersMutationVariables>(
    UpdateRandomWheelMembersDocument
  )
}
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
  ${NormalUserFragmentDoc}
`

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument)
}
export const AddWheelSyncDocument = gql`
  mutation AddWheelSync($rewardId: String!, $randomWheelId: String!, $useInput: Boolean, $addExisting: Boolean) {
    addWheelSync(rewardId: $rewardId, randomWheelId: $randomWheelId, useInput: $useInput, addExisting: $addExisting) {
      ...RandomWheelSync
    }
  }
  ${RandomWheelSyncFragmentDoc}
`

export function useAddWheelSyncMutation() {
  return Urql.useMutation<AddWheelSyncMutation, AddWheelSyncMutationVariables>(AddWheelSyncDocument)
}
export const DeleteWheelSyncDocument = gql`
  mutation DeleteWheelSync($ids: [String!]!) {
    deleteWheelSync(ids: $ids)
  }
`

export function useDeleteWheelSyncMutation() {
  return Urql.useMutation<DeleteWheelSyncMutation, DeleteWheelSyncMutationVariables>(DeleteWheelSyncDocument)
}
export const DisconnectAccessTokenDocument = gql`
  mutation DisconnectAccessToken {
    disconnectAccessToken
  }
`

export function useDisconnectAccessTokenMutation() {
  return Urql.useMutation<DisconnectAccessTokenMutation, DisconnectAccessTokenMutationVariables>(
    DisconnectAccessTokenDocument
  )
}
export const PauseWheelSyncDocument = gql`
  mutation PauseWheelSync($id: String!, $paused: Boolean!) {
    pauseWheelSync(id: $id, paused: $paused) {
      ...RandomWheelSync
    }
  }
  ${RandomWheelSyncFragmentDoc}
`

export function usePauseWheelSyncMutation() {
  return Urql.useMutation<PauseWheelSyncMutation, PauseWheelSyncMutationVariables>(PauseWheelSyncDocument)
}
export const CreateChannelRewardDocument = gql`
  mutation CreateChannelReward($reward: CustomRewardCreateInput!) {
    createChannelReward(reward: $reward) {
      ...CustomReward
    }
  }
  ${CustomRewardFragmentDoc}
`

export function useCreateChannelRewardMutation() {
  return Urql.useMutation<CreateChannelRewardMutation, CreateChannelRewardMutationVariables>(
    CreateChannelRewardDocument
  )
}
export const CreateRewardLinkDocument = gql`
  mutation CreateRewardLink($rewardId: String!, $type: String!) {
    createRewardLink(rewardId: $rewardId, type: $type) {
      ...RewardLink
    }
  }
  ${RewardLinkFragmentDoc}
`

export function useCreateRewardLinkMutation() {
  return Urql.useMutation<CreateRewardLinkMutation, CreateRewardLinkMutationVariables>(CreateRewardLinkDocument)
}
export const DeleteChannelRewardDocument = gql`
  mutation DeleteChannelReward($rewardId: String!) {
    deleteChannelReward(rewardId: $rewardId)
  }
`

export function useDeleteChannelRewardMutation() {
  return Urql.useMutation<DeleteChannelRewardMutation, DeleteChannelRewardMutationVariables>(
    DeleteChannelRewardDocument
  )
}
export const DeleteRewardLinkDocument = gql`
  mutation DeleteRewardLink($id: String!) {
    deleteRewardLink(id: $id)
  }
`

export function useDeleteRewardLinkMutation() {
  return Urql.useMutation<DeleteRewardLinkMutation, DeleteRewardLinkMutationVariables>(DeleteRewardLinkDocument)
}
export const UpdateChannelRewardDocument = gql`
  mutation UpdateChannelReward($rewardId: String!, $reward: CustomRewardUpdateInput!) {
    updateChannelReward(rewardId: $rewardId, reward: $reward) {
      ...CustomReward
    }
  }
  ${CustomRewardFragmentDoc}
`

export function useUpdateChannelRewardMutation() {
  return Urql.useMutation<UpdateChannelRewardMutation, UpdateChannelRewardMutationVariables>(
    UpdateChannelRewardDocument
  )
}
export const UpdateRewardTokenDocument = gql`
  mutation UpdateRewardToken($type: String!, $token: String!) {
    updateRewardToken(type: $type, token: $token) {
      ...CustomRewardMenuItem
    }
  }
  ${CustomRewardMenuItemFragmentDoc}
`

export function useUpdateRewardTokenMutation() {
  return Urql.useMutation<UpdateRewardTokenMutation, UpdateRewardTokenMutationVariables>(UpdateRewardTokenDocument)
}
export const AddRewardGroupItemDocument = gql`
  mutation AddRewardGroupItem($rewardGroupId: String!, $rewardId: String!, $triggerCooldown: Boolean) {
    addRewardGroupItem(rewardId: $rewardId, rewardGroupId: $rewardGroupId, triggerCooldown: $triggerCooldown) {
      ...RewardGroupItem
    }
  }
  ${RewardGroupItemFragmentDoc}
`

export function useAddRewardGroupItemMutation() {
  return Urql.useMutation<AddRewardGroupItemMutation, AddRewardGroupItemMutationVariables>(AddRewardGroupItemDocument)
}
export const CreateRewardGroupDocument = gql`
  mutation CreateRewardGroup($rewardGroup: RewardGroupInput!, $items: [RewardGroupItemInput!]!) {
    createRewardGroup(rewardGroup: $rewardGroup, items: $items) {
      ...RewardGroup
    }
  }
  ${RewardGroupFragmentDoc}
`

export function useCreateRewardGroupMutation() {
  return Urql.useMutation<CreateRewardGroupMutation, CreateRewardGroupMutationVariables>(CreateRewardGroupDocument)
}
export const DeleteRewardGroupDocument = gql`
  mutation DeleteRewardGroup($id: String!) {
    deleteRewardGroup(id: $id)
  }
`

export function useDeleteRewardGroupMutation() {
  return Urql.useMutation<DeleteRewardGroupMutation, DeleteRewardGroupMutationVariables>(DeleteRewardGroupDocument)
}
export const DeleteRewardGroupItemDocument = gql`
  mutation DeleteRewardGroupItem($id: String!) {
    deleteRewardGroupItem(id: $id)
  }
`

export function useDeleteRewardGroupItemMutation() {
  return Urql.useMutation<DeleteRewardGroupItemMutation, DeleteRewardGroupItemMutationVariables>(
    DeleteRewardGroupItemDocument
  )
}
export const UpdateRewardGroupDocument = gql`
  mutation UpdateRewardGroup($id: String!, $rewardGroup: RewardGroupInput, $items: [RewardGroupItemInput!]) {
    updateRewardGroup(id: $id, rewardGroup: $rewardGroup, items: $items) {
      ...RewardGroup
    }
  }
  ${RewardGroupFragmentDoc}
`

export function useUpdateRewardGroupMutation() {
  return Urql.useMutation<UpdateRewardGroupMutation, UpdateRewardGroupMutationVariables>(UpdateRewardGroupDocument)
}
export const UpdateRewardGroupItemDocument = gql`
  mutation UpdateRewardGroupItem($id: String!, $rewardEnabled: Boolean, $triggerCooldown: Boolean) {
    updateRewardGroupItem(id: $id, rewardEnabled: $rewardEnabled, triggerCooldown: $triggerCooldown) {
      ...RewardGroupItem
    }
  }
  ${RewardGroupItemFragmentDoc}
`

export function useUpdateRewardGroupItemMutation() {
  return Urql.useMutation<UpdateRewardGroupItemMutation, UpdateRewardGroupItemMutationVariables>(
    UpdateRewardGroupItemDocument
  )
}
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
  ${NormalUserFragmentDoc}
`

export function useUpdateUserMutation() {
  return Urql.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument)
}
export const ColorThemesDocument = gql`
  query ColorThemes($type: String) {
    colorThemes(type: $type) {
      ...ColorTheme
    }
  }
  ${ColorThemeFragmentDoc}
`

export function useColorThemesQuery(options?: Omit<Urql.UseQueryArgs<ColorThemesQueryVariables>, "query">) {
  return Urql.useQuery<ColorThemesQuery, ColorThemesQueryVariables>({ query: ColorThemesDocument, ...options })
}
export const MeDocument = gql`
  query Me {
    me {
      ...NormalUser
    }
  }
  ${NormalUserFragmentDoc}
`

export function useMeQuery(options?: Omit<Urql.UseQueryArgs<MeQueryVariables>, "query">) {
  return Urql.useQuery<MeQuery, MeQueryVariables>({ query: MeDocument, ...options })
}
export const MyRandomWheelsDocument = gql`
  query MyRandomWheels($type: String) {
    myRandomWheels(type: $type) {
      ...RandomWheelDetails
    }
  }
  ${RandomWheelDetailsFragmentDoc}
`

export function useMyRandomWheelsQuery(options?: Omit<Urql.UseQueryArgs<MyRandomWheelsQueryVariables>, "query">) {
  return Urql.useQuery<MyRandomWheelsQuery, MyRandomWheelsQueryVariables>({ query: MyRandomWheelsDocument, ...options })
}
export const RandomWheelBySlugDocument = gql`
  query RandomWheelBySlug($slug: String!, $token: String) {
    randomWheelBySlug(slug: $slug, token: $token) {
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
  ${RandomWheelMemberFragmentDoc}
`

export function useRandomWheelBySlugQuery(options: Omit<Urql.UseQueryArgs<RandomWheelBySlugQueryVariables>, "query">) {
  return Urql.useQuery<RandomWheelBySlugQuery, RandomWheelBySlugQueryVariables>({
    query: RandomWheelBySlugDocument,
    ...options,
  })
}
export const RandomWheelBySlugShareTokenDocument = gql`
  query RandomWheelBySlugShareToken($slug: String!, $token: String) {
    randomWheelBySlug(slug: $slug, token: $token) {
      shareToken
    }
  }
`

export function useRandomWheelBySlugShareTokenQuery(
  options: Omit<Urql.UseQueryArgs<RandomWheelBySlugShareTokenQueryVariables>, "query">
) {
  return Urql.useQuery<RandomWheelBySlugShareTokenQuery, RandomWheelBySlugShareTokenQueryVariables>({
    query: RandomWheelBySlugShareTokenDocument,
    ...options,
  })
}
export const RandomWheelBySlugEntriesDocument = gql`
  query RandomWheelBySlugEntries($slug: String!, $token: String) {
    randomWheelBySlug(slug: $slug, token: $token) {
      id
      entries {
        ...RandomWheelEntry
      }
    }
  }
  ${RandomWheelEntryFragmentDoc}
`

export function useRandomWheelBySlugEntriesQuery(
  options: Omit<Urql.UseQueryArgs<RandomWheelBySlugEntriesQueryVariables>, "query">
) {
  return Urql.useQuery<RandomWheelBySlugEntriesQuery, RandomWheelBySlugEntriesQueryVariables>({
    query: RandomWheelBySlugEntriesDocument,
    ...options,
  })
}
export const RandomWheelBySlugMembersDocument = gql`
  query RandomWheelBySlugMembers($slug: String!, $token: String) {
    randomWheelBySlug(slug: $slug, token: $token) {
      id
      members {
        ...RandomWheelMember
      }
    }
  }
  ${RandomWheelMemberFragmentDoc}
`

export function useRandomWheelBySlugMembersQuery(
  options: Omit<Urql.UseQueryArgs<RandomWheelBySlugMembersQueryVariables>, "query">
) {
  return Urql.useQuery<RandomWheelBySlugMembersQuery, RandomWheelBySlugMembersQueryVariables>({
    query: RandomWheelBySlugMembersDocument,
    ...options,
  })
}
export const RandomWheelBySlugWinnersDocument = gql`
  query RandomWheelBySlugWinners($slug: String!, $token: String) {
    randomWheelBySlug(slug: $slug, token: $token) {
      id
      winners {
        ...RandomWheelWinner
      }
    }
  }
  ${RandomWheelWinnerFragmentDoc}
`

export function useRandomWheelBySlugWinnersQuery(
  options: Omit<Urql.UseQueryArgs<RandomWheelBySlugWinnersQueryVariables>, "query">
) {
  return Urql.useQuery<RandomWheelBySlugWinnersQuery, RandomWheelBySlugWinnersQueryVariables>({
    query: RandomWheelBySlugWinnersDocument,
    ...options,
  })
}
export const ChannelRewardsDocument = gql`
  query ChannelRewards($userId: String, $onlyManageable: Boolean) {
    channelRewards(userId: $userId, onlyManageable: $onlyManageable) {
      ...CustomReward
    }
  }
  ${CustomRewardFragmentDoc}
`

export function useChannelRewardsQuery(options?: Omit<Urql.UseQueryArgs<ChannelRewardsQueryVariables>, "query">) {
  return Urql.useQuery<ChannelRewardsQuery, ChannelRewardsQueryVariables>({ query: ChannelRewardsDocument, ...options })
}
export const RewardByTokenDocument = gql`
  query RewardByToken($type: String!, $token: String!) {
    rewardByToken(type: $type, token: $token) {
      ...CustomRewardMenuItem
    }
  }
  ${CustomRewardMenuItemFragmentDoc}
`

export function useRewardByTokenQuery(options: Omit<Urql.UseQueryArgs<RewardByTokenQueryVariables>, "query">) {
  return Urql.useQuery<RewardByTokenQuery, RewardByTokenQueryVariables>({ query: RewardByTokenDocument, ...options })
}
export const RewardGroupDocument = gql`
  query RewardGroup($id: String!) {
    rewardGroup(id: $id) {
      ...RewardGroup
    }
  }
  ${RewardGroupFragmentDoc}
`

export function useRewardGroupQuery(options: Omit<Urql.UseQueryArgs<RewardGroupQueryVariables>, "query">) {
  return Urql.useQuery<RewardGroupQuery, RewardGroupQueryVariables>({ query: RewardGroupDocument, ...options })
}
export const RewardGroupsDocument = gql`
  query RewardGroups($items: Boolean) {
    rewardGroups(items: $items) {
      ...RewardGroup
    }
  }
  ${RewardGroupFragmentDoc}
`

export function useRewardGroupsQuery(options?: Omit<Urql.UseQueryArgs<RewardGroupsQueryVariables>, "query">) {
  return Urql.useQuery<RewardGroupsQuery, RewardGroupsQueryVariables>({ query: RewardGroupsDocument, ...options })
}
export const RewardLinksDocument = gql`
  query RewardLinks($rewardIds: [String!]) {
    rewardLinks(rewardIds: $rewardIds) {
      id
      userId
      rewardId
      token
      type
    }
  }
`

export function useRewardLinksQuery(options?: Omit<Urql.UseQueryArgs<RewardLinksQueryVariables>, "query">) {
  return Urql.useQuery<RewardLinksQuery, RewardLinksQueryVariables>({ query: RewardLinksDocument, ...options })
}
export const SyncForWheelDocument = gql`
  query SyncForWheel($randomWheelId: String!) {
    syncForWheel(randomWheelId: $randomWheelId) {
      ...RandomWheelSync
      reward {
        ...CustomRewardMenuItem
      }
    }
  }
  ${RandomWheelSyncFragmentDoc}
  ${CustomRewardMenuItemFragmentDoc}
`

export function useSyncForWheelQuery(options: Omit<Urql.UseQueryArgs<SyncForWheelQueryVariables>, "query">) {
  return Urql.useQuery<SyncForWheelQuery, SyncForWheelQueryVariables>({ query: SyncForWheelDocument, ...options })
}
export const UserAccessTokenDocument = gql`
  query UserAccessToken {
    userAccesToken {
      ...UserAccessToken
    }
  }
  ${UserAccessTokenFragmentDoc}
`

export function useUserAccessTokenQuery(options?: Omit<Urql.UseQueryArgs<UserAccessTokenQueryVariables>, "query">) {
  return Urql.useQuery<UserAccessTokenQuery, UserAccessTokenQueryVariables>({
    query: UserAccessTokenDocument,
    ...options,
  })
}
export const UsernameExistsDocument = gql`
  mutation UsernameExists($username: String!) {
    usernameExists(username: $username)
  }
`

export function useUsernameExistsMutation() {
  return Urql.useMutation<UsernameExistsMutation, UsernameExistsMutationVariables>(UsernameExistsDocument)
}
